from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from app.utils.cache import cache
from app.utils.rate_limit import rate_limit
import requests
import os
from typing import Optional

router = APIRouter()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"}


@router.get("/github-repos")
@rate_limit(limit=100, window=3600)  # 100 requests per hour
@cache(expire=1800)  # 30 minutes cache
async def get_github_repos(request: Request):
    url = "https://api.github.com/user/repos"
    params = {"sort": "stars"}
    response = requests.get(url, headers=HEADERS, params=params)
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code, detail="Failed to fetch GitHub repos"
        )
    repos = response.json()
    sorted_repos = sorted(repos, key=lambda x: x.get("stargazers_count", 0), reverse=True)
    return JSONResponse(content=sorted_repos)
