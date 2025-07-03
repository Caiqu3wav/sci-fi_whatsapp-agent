from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.client import Integration
from uuid import uuid4

router = APIRouter(prefix="/integration", tags=["Integration"])

@router.post("/whatsapp")
def integrar_whatsapp(data: dict, db: Session = Depends(get_db)):
    nova = Integration(
        id=str(uuid4()),
        user_id=data["user_id"],
        whatsapp_token=data["whatsapp_token"],
        phone_number_id=data["phone_number_id"],
        business_name=data.get("business_name"),
        verified=True
    )
    db.add(nova)
    db.commit()
    return {"msg": "Integração WhatsApp salva com sucesso!"}
