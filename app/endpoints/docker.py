from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any, Optional
import docker
from docker.errors import DockerException
from datetime import datetime, timezone
import logging
import asyncio
import platform
import os

router = APIRouter()
logger = logging.getLogger(__name__)

def get_docker_client():
    """Initialize Docker client with OS-specific handling"""
    try:
        # Determine Docker endpoint based on OS
        docker_host = os.getenv("DOCKER_HOST")
        if docker_host:
            logger.info(f"Using DOCKER_HOST: {docker_host}")
        else:
            if platform.system() == "Windows":
                docker_host = "npipe:////./pipe/docker_engine"
                logger.info("Using Windows named pipe for Docker")
            else:
                docker_host = "unix:///var/run/docker.sock"
                logger.info("Using Unix socket for Docker")

        # Initialize Docker client
        client = docker.DockerClient(base_url=docker_host)
        # Test connection
        version = client.version()
        logger.info(f"Connected to Docker daemon, version: {version['Version']}")
        return client
    except DockerException as e:
        logger.error(f"Failed to connect to Docker: {e}")
        raise HTTPException(
            status_code=503,
            detail=f"Unable to connect to Docker daemon. Ensure Docker is running and accessible (endpoint: {docker_host})."
        )
    except Exception as e:
        logger.error(f"Unexpected error connecting to Docker: {e}")
        raise HTTPException(
            status_code=503,
            detail=f"Failed to initialize Docker client: {str(e)}"
        )

def format_uptime(created_timestamp: str) -> str:
    """Calculate and format container uptime"""
    try:
        created_time = datetime.fromisoformat(created_timestamp.replace('Z', '+00:00'))
        now = datetime.now(timezone.utc)
        uptime_delta = now - created_time
        
        days = uptime_delta.days
        hours, remainder = divmod(uptime_delta.seconds, 3600)
        minutes, _ = divmod(remainder, 60)
        
        if days > 0:
            return f"{days} days, {hours} hours"
        elif hours > 0:
            return f"{hours} hours, {minutes} minutes"
        else:
            return f"{minutes} minutes"
    except Exception as e:
        logger.warning(f"Error calculating uptime: {e}")
        return "Unknown"

def format_bytes(bytes_value: int) -> str:
    """Convert bytes to human readable format"""
    if bytes_value == 0:
        return "0 B"
    
    units = ['B', 'KB', 'MB', 'GB', 'TB']
    unit_index = 0
    size = float(bytes_value)
    
    while size >= 1024 and unit_index < len(units) - 1:
        size /= 1024
        unit_index += 1
    
    return f"{size:.1f} {units[unit_index]}"

async def get_container_stats(container) -> Dict[str, Any]:
    """Get container resource usage statistics"""
    loop = asyncio.get_running_loop()
    try:
        if container.status != 'running':
            return {
                'cpu_usage': 0,
                'memory_usage': 0,
                'network_rx': '0 B',
                'network_tx': '0 B'
            }
        
        # Run synchronous stats call in thread pool
        stats = await loop.run_in_executor(None, lambda: container.stats(stream=False))
        
        # Calculate CPU usage percentage
        cpu_usage = 0
        if 'cpu_stats' in stats and 'precpu_stats' in stats:
            cpu_delta = stats['cpu_stats']['cpu_usage']['total_usage'] - \
                       stats['precpu_stats']['cpu_usage']['total_usage']
            system_delta = stats['cpu_stats']['system_cpu_usage'] - \
                          stats['precpu_stats']['system_cpu_usage']
            
            num_cpus = len(stats['cpu_stats']['cpu_usage'].get('percpu_usage', [])) or 1
            if system_delta > 0 and num_cpus > 0:
                cpu_usage = (cpu_delta / system_delta) * num_cpus * 100
        
        # Get memory usage in MB
        memory_usage = 0
        if 'memory_stats' in stats and 'usage' in stats['memory_stats']:
            memory_usage = stats['memory_stats']['usage'] / (1024 * 1024)  # Convert to MB
        
        # Get network statistics
        network_rx = network_tx = 0
        if 'networks' in stats:
            for interface_stats in stats['networks'].values():
                network_rx += interface_stats.get('rx_bytes', 0)
                network_tx += interface_stats.get('tx_bytes', 0)
        
        return {
            'cpu_usage': round(cpu_usage, 1),
            'memory_usage': round(memory_usage, 1),
            'network_rx': format_bytes(network_rx),
            'network_tx': format_bytes(network_tx)
        }
    
    except Exception as e:
        logger.warning(f"Error getting container stats for {container.name}: {e}")
        return {
            'cpu_usage': 0,
            'memory_usage': 0,
            'network_rx': '0 B',
            'network_tx': '0 B'
        }

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    loop = asyncio.get_running_loop()
    client = None
    try:
        # Run synchronous client initialization in thread pool
        client = await loop.run_in_executor(None, get_docker_client)
        version = await loop.run_in_executor(None, client.version)
        return {
            "status": "healthy",
            "docker_version": version['Version'],
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }
    finally:
        if client:
            await loop.run_in_executor(None, client.close)

@router.get("/docker-services")
async def get_docker_services():
    """Get all Docker containers with their details"""
    loop = asyncio.get_running_loop()
    client = None
    try:
        # Run synchronous client initialization in thread pool
        client = await loop.run_in_executor(None, get_docker_client)
        containers = await loop.run_in_executor(None, lambda: client.containers.list(all=True))
        
        # Fetch stats concurrently
        stats_tasks = [get_container_stats(container) for container in containers]
        stats_results = await asyncio.gather(*stats_tasks, return_exceptions=True)
        
        services = []
        for container, stats in zip(containers, stats_results):
            try:
                # Get container attributes
                attrs = container.attrs
                
                # Extract port mappings
                ports = []
                if attrs.get('NetworkSettings', {}).get('Ports'):
                    for container_port, host_bindings in attrs['NetworkSettings']['Ports'].items():
                        if host_bindings:
                            for binding in host_bindings:
                                host_port = binding.get('HostPort', '')
                                if host_port:
                                    ports.append(f"{host_port}:{container_port}")
                        else:
                            ports.append(container_port)
                
                # Build service info
                service_info = {
                    'id': container.short_id,
                    'name': container.name,
                    'status': container.status,
                    'image': attrs['Config']['Image'],
                    'created': attrs['Created'],
                    'uptime': format_uptime(attrs['Created']) if container.status == 'running' else '0 minutes',
                    'ports': ports,
                    **(stats if isinstance(stats, dict) else {
                        'cpu_usage': 0,
                        'memory_usage': 0,
                        'network_rx': '0 B',
                        'network_tx': '0 B'
                    })
                }
                
                services.append(service_info)
                
            except Exception as e:
                logger.error(f"Error processing container {container.name}: {e}")
                continue
        
        return {
            'services': services,
            'total_count': len(services),
            'running_count': len([s for s in services if s['status'] == 'running']),
            'stopped_count': len([s for s in services if s['status'] == 'exited']),
            'timestamp': datetime.now().isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    finally:
        if client:
            await loop.run_in_executor(None, client.close)

@router.get("/docker-services/{container_id}")
async def get_docker_service_details(container_id: str):
    """Get detailed information for a specific container"""
    loop = asyncio.get_running_loop()
    client = None
    try:
        # Run synchronous client initialization in thread pool
        client = await loop.run_in_executor(None, get_docker_client)
        
        try:
            container = await loop.run_in_executor(None, lambda: client.containers.get(container_id))
        except docker.errors.NotFound:
            raise HTTPException(status_code=404, detail="Container not found")
        
        attrs = container.attrs
        stats = await get_container_stats(container)
        
        # Extract detailed information
        detailed_info = {
            'id': container.id,
            'short_id': container.short_id,
            'name': container.name,
            'status': container.status,
            'image': attrs['Config']['Image'],
            'created': attrs['Created'],
            'started': attrs.get('State', {}).get('StartedAt', ''),
            'finished': attrs.get('State', {}).get('FinishedAt', ''),
            'uptime': format_uptime(attrs['Created']) if container.status == 'running' else '0 minutes',
            'restart_count': attrs.get('RestartCount', 0),
            'platform': attrs.get('Platform', 'unknown'),
            'architecture': attrs.get('Architecture', 'unknown'),
            'environment': attrs.get('Config', {}).get('Env', []),
            'command': attrs.get('Config', {}).get('Cmd', []),
            'working_dir': attrs.get('Config', {}).get('WorkingDir', ''),
            'ports': [],
            **stats
        }
        
        # Extract detailed port mappings
        if attrs.get('NetworkSettings', {}).get('Ports'):
            for container_port, host_bindings in attrs['NetworkSettings']['Ports'].items():
                port_info = {'container_port': container_port, 'host_bindings': []}
                if host_bindings:
                    for binding in host_bindings:
                        port_info['host_bindings'].append({
                            'host_ip': binding.get('HostIp', '0.0.0.0'),
                            'host_port': binding.get('HostPort', '')
                        })
                detailed_info['ports'].append(port_info)
        
        return detailed_info
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting container details: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    finally:
        if client:
            await loop.run_in_executor(None, client.close)