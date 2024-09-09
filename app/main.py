from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from utils.github_stats import get_github_projects, get_profile_data


VERSION = "0.0.1"

app = FastAPI(version=VERSION, description="API server for my personal website")
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost", "http://abhinavkm.com/"],
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


@app.get("/github_stats")
async def github_stats():
    profile_data = get_profile_data()
    return profile_data


@app.get("/github_repos")
async def github_repo_stats():
    repos = get_github_projects()
    return repos
