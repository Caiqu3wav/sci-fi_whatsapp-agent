from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.client import Integration
from uuid import uuid4
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/integration", tags=["Integration"])

@router.post("/whatsapp")
def integrar_whatsapp(data: dict, db: Session = Depends(get_db)):
    try:
        # Verificar se já existe uma integração para o mesmo user_id e phone_number_id
        existing_integration = db.query(Integration).filter(
            Integration.user_id == data.user_id,
            Integration.phone_number_id == data.phone_number_id
        ).first()

        if existing_integration:
            logger.warning(f"Integração já existe para user_id={data.user_id}, phone_number_id={data.phone_number_id}")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Integração com este número de telefone já existe para o usuário."
            )

        # Validar o formato do whatsapp_token (exemplo: deve ter pelo menos 10 caracteres)
        if len(data.whatsapp_token) < 10:
            logger.error(f"Token WhatsApp inválido para user_id={data.user_id}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="O token do WhatsApp é inválido ou muito curto."
            )

        # Criar nova integração
        nova = Integration(
            id=str(uuid4()),
            user_id=data.user_id,
            whatsapp_token=data.whatsapp_token,
            phone_number_id=data.phone_number_id,
            business_name=data.business_name,
            verified=True,
        )

        # Salvar no banco
        db.add(nova)
        db.commit()
        db.refresh(nova)  # Atualiza o objeto com os dados do banco (ex.: created_at)

        logger.info(f"Integração WhatsApp criada com sucesso para user_id={data.user_id}")

        # Retornar os dados da integração criada
        return nova

    except Exception as e:
        logger.error(f"Erro ao criar integração WhatsApp: {str(e)}")
        db.rollback()  # Reverter transação em caso de erro
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao processar a integração."
        )