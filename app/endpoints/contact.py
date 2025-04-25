from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class ContactForm(BaseModel):
    name: str
    email: str
    subject: str | None = None
    message: str

@router.post("/contact")
async def submit_contact(form: ContactForm):
    try:
        logger.info(f"Contact form received: {form.dict()}")
        # Here you would typically send an email or store the data
        # For now, just log it and return success
        return {"message": "Contact form submitted successfully"}
    except Exception as e:
        logger.error(f"Error processing contact form: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")