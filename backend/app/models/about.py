from pydantic import BaseModel
from typing import Optional

class AboutSection(BaseModel):
    quote: Optional[str] = "Live and Learn"
    short_description: str
    long_description: str
    
__all__ = ["AboutSection"]