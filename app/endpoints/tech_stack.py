from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

class TechStackItem(BaseModel):
    name: str
    icon: str
    color: str

router = APIRouter()

@router.get("/tech-stack", response_model=List[TechStackItem])
async def get_tech_stack():
    tech_stack = [
        {"name": "Python", "icon": "fab fa-python", "color": "#3776AB"},
        {"name": "Docker", "icon": "fab fa-docker", "color": "#2496ED"},
        {"name": "Git", "icon": "fab fa-git-alt", "color": "#F05032"},
        {"name": "Azure", "icon": "fab fa-microsoft", "color": "#0078D4"},
    ]
    return tech_stack