from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User, Flow
from schemas import FlowPromptRequest, FlowResponse
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from app.db.database import get_db
from app.langchain.flow_generator import flow_generator

import json

router = APIRouter(prefix="/flows", tags=["Flows"])

@router.post("/from-prompt", response_model=FlowResponse)
def criar_flow_via_prompt(data: FlowPromptRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    flow_data = flow_generator(data.prompt)

    novo_flow = Flow(
        user_id=data.user_id,
        name=flow_data["name"],
        description=flow_data["description"],
        message_template=flow_data["message_template"],
        target_type=flow_data["target_type"],
        schedule_time=flow_data["schedule_time"],
        pdf_path=flow_data.get("pdf_path"),
    )

    db.add(novo_flow)
    db.commit()
    db.refresh(novo_flow)

    return novo_flow