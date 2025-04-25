from fastapi import Request, HTTPException
from starlette.requests import Request
from functools import wraps
import time

_rate_limits = {}
WINDOW = 3600  # 1 hour in seconds

def rate_limit(limit: int, window: int = WINDOW):
    def decorator(func):
        @wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            client_ip = request.client.host
            current_time = time.time()
            if client_ip not in _rate_limits:
                _rate_limits[client_ip] = []
            _rate_limits[client_ip] = [t for t in _rate_limits[client_ip] if current_time - t < window]
            if len(_rate_limits[client_ip]) >= limit:
                raise HTTPException(status_code=429, detail="Too many requests")
            _rate_limits[client_ip].append(current_time)
            return await func(request, *args, **kwargs)
        return wrapper
    return decorator