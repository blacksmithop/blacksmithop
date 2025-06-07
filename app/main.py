from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware import Middleware
from app.middleware.logging_middleware import LoggingMiddleware
from app.endpoints import github_repos, static_files, tech_stack, contact, services
from dotenv import load_dotenv

load_dotenv()
middleware = [
    Middleware(LoggingMiddleware),
    Middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]),
]

app = FastAPI(middleware=middleware)

app.include_router(github_repos.router)
app.include_router(static_files.router)
app.include_router(tech_stack.router)
app.include_router(contact.router)
app.include_router(services.router)
