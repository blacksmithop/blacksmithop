from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ghapi.all import GhApi

api = GhApi()


VERSION = "0.0.1"

app = FastAPI(
    version=VERSION, description="OpenAI Xfly - Demo Insight Processing Toolkit"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def index():
    return {"version": VERSION}

@app.get("/github")
async def github_stats():
    return api.users.get_by_username("blacksmithop")

@app.get("/githubRepos")
async def github_repo_stats():
    return api.repos.list_for_user("blacksmithop")