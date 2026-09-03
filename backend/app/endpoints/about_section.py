from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app import models
from os import path
from json import load


router = APIRouter()
BASE_DIR = path.dirname(path.dirname(path.abspath(__file__)))
STATIC_DIR = path.join(BASE_DIR, "static")


@router.get("/image")
async def get_image() -> FileResponse:
    file_path = path.join(STATIC_DIR, "Avatar.jpg")
    if not path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(file_path, media_type="image/jpeg")


@router.get("/resume")
async def get_resume() -> FileResponse:
    file_path = path.join(STATIC_DIR, "Resume.pdf")
    if not path.exists(file_path):
        raise HTTPException(status_code=404, detail="Resume not found")
    return FileResponse(file_path, media_type="application/pdf")


@router.get("/about", response_model=models.AboutSection)
async def get_about() -> models.AboutSection:
    file_path = path.join(STATIC_DIR, "about.json")
    with open(file_path, "r") as f:
        about_section = models.AboutSection(**load(f))
    return about_section
