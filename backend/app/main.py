from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware import Middleware
from app.middleware.logging_middleware import LoggingMiddleware
from app.endpoints import about_section

middleware = [
    Middleware(LoggingMiddleware),
    Middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]),
]

app = FastAPI(middleware=middleware)

app.include_router(about_section.router)
