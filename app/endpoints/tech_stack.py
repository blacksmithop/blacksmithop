from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

class TechStackItem(BaseModel):
    name: str
    icon: str

router = APIRouter()

@router.get("/tech-stack")
async def get_tech_stack() -> List[TechStackItem]:
    tech_stack = [
        {"name": "TypeScript", "icon": "🔷"},
        {"name": "Python", "icon": "🐍"},
        {"name": "JavaScript", "icon": "💛"},
        {"name": "React", "icon": "⚛️"},
        {"name": "Node.js", "icon": "💚"},
        {"name": "Docker", "icon": "🐳"},
        {"name": "Git", "icon": "📚"},
        {"name": "AWS", "icon": "☁️"},
        {"name": "MongoDB", "icon": "🍃"},
        {"name": "Redis", "icon": "🔴"},
        {"name": "GraphQL", "icon": "📊"},
        {"name": "REST", "icon": "🔌"},
    ]
    return tech_stack