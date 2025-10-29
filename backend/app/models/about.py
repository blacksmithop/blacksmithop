from pydantic import BaseModel
from typing import Optional

class Section(BaseModel):
    text: str
    enabled: bool = True

class AboutSection(BaseModel):
    introduction: Section
    long_text: Section
    hobbies: Section
    quote: Section
    
__all__ = ["AboutSection"]