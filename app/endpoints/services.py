from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

class ServiceItem(BaseModel):
    icon: str
    title: str
    description: str

router = APIRouter()

@router.get("/services", response_model=List[ServiceItem])
async def get_services():
    return [
        {
            "icon": "fas fa-brain",
            "title": "AI/ML Engineering",
            "description": "Designing and implementing machine learning models for real-world applications."
        },
        {
            "icon": "fas fa-server",
            "title": "Backend Development",
            "description": "Building robust and scalable backend systems using Python and Node.js."
        },
        {
            "icon": "fas fa-cloud",
            "title": "Cloud & DevOps",
            "description": "Leveraging cloud platforms like AWS for deploying and managing applications."
        }
    ]
