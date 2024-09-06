from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from ghapi.all import GhApi

VERSION = "0.0.1"
USERNAME = "blacksmithop"

app = FastAPI(
    version=VERSION, description="OpenAI Xfly - Demo Insight Processing Toolkit"
)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


api = GhApi()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("./static/images/favicon.png")


@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")


@app.get("/version")
async def index():
    return {"version": VERSION}


@app.get("/github")
async def github_stats():
    return api.users.get_by_username("blacksmithop")


@app.get("/githubRepos")
async def github_repo_stats():
    repos = []

    for i in range(1, 4):
        result = api.repos.list_for_user(username=USERNAME, per_page=100, page=i)
        result = list(result)  # fastcore.foundation.L -> List
        result_len = len(result)
        print(f"Found {result_len} repos on page {i}")
        if result_len:
            repos.extend(result)
        else:
            break
    return repos
