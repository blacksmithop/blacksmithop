from fastapi import APIRouter
from fastapi.responses import FileResponse
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
    file_path = os.path.join(STATIC_DIR, "Abhinav_KM_Resume.pdf")
    if not os.path.exists(file_path):
        return {"error": "Resume not found"}
    return FileResponse(file_path, media_type="application/pdf")