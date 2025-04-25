from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
import logging
from colorlog import ColoredFormatter

# Configure colored logging
LOG_FORMAT = "%(log_color)s%(asctime)s - %(levelname)s - %(message)s"
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
formatter = ColoredFormatter(LOG_FORMAT)
handler = logging.StreamHandler()
handler.setFormatter(formatter)
logger.addHandler(handler)

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.info(f"Request: {request.method} {request.url}")
        response: Response = await call_next(request)
        logger.info(f"Response: {response.status_code}")
        return response