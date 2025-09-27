from fastapi import APIRouter
from fastapi.responses import FileResponse
from app import models
import os

router = APIRouter()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")


@router.get("/image")
async def get_image():
    file_path = os.path.join(STATIC_DIR, "Avatar.jpg")
    if not os.path.exists(file_path):
        return {"error": "Image not found"}
    return FileResponse(file_path, media_type="image/jpeg")


@router.get("/resume")
async def get_resume():
    file_path = os.path.join(STATIC_DIR, "Resume.pdf")
    if not os.path.exists(file_path):
        return {"error": "Resume not found"}
    return FileResponse(file_path, media_type="application/pdf")


@router.get("/about", response_model=models.AboutSection)
async def get_about() -> models.AboutSection:
    about_section = models.AboutSection(
        quote="Live and Learn",
        short_description="Hello there, I am 26 year old Software Developer from India.",
        long_description="I am currently working on creating Agentic Systems"
    )
    return about_section