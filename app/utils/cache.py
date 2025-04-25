from functools import wraps
from fastapi import Response
import time
from typing import Callable

_cache = {}
_cache_expiry = {}

def cache(expire: int):
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{str(args)}:{str(kwargs)}"
            current_time = time.time()
            if cache_key in _cache_expiry and current_time < _cache_expiry[cache_key]:
                return _cache[cache_key]
            result = await func(*args, **kwargs)
            _cache[cache_key] = result
            _cache_expiry[cache_key] = current_time + expire
            return result
        return wrapper
    return decorator