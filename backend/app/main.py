from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware import Middleware
from app.middleware.logging_middleware import LoggingMiddleware
from app.endpoints import about_section

ALLOWED_ORIGINS = ["https://abhinavkm.com", "http://localhost:3000"]

middleware = [
    Middleware(LoggingMiddleware),
    Middleware(CORSMiddleware, allow_origins=ALLOWED_ORIGINS, allow_methods=["GET"], allow_headers=["*"]),
]

app = FastAPI(middleware=middleware)

app.include_router(about_section.router)
