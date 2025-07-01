from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User, Flow
from schemas import FlowPromptRequest, FlowResponse
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from app.db.database import 
import json

router = APIRouter()

@router.post("/flows/from-prompt", response_model=FlowResponse)
def criar_flow_via_prompt(data: FlowPromptRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    llm = ChatOpenAI(
        model="google/gemma-7b-it",
        base_url="https://openrouter.ai/api/v1",
        api_key="YOUR_OPENROUTER_API_KEY"
    )

    system_instruction = """
Você é um assistente de automações para WhatsApp.
Com base no pedido do usuário, retorne um JSON com os campos:
- name
- description
- message_template
- target_type (client | group | custom_number)
- schedule_time (formato ISO8601)
- pdf_path (se aplicável)
"""

    prompt = f"{system_instruction}\n\nUsuário: {data.prompt}"
    response = llm.invoke([HumanMessage(content=prompt)])

    try:
        flow_data = json.loads(response.content)
    except:
        raise HTTPException(status_code=500, detail="Erro ao interpretar resposta da IA")

    novo_flow = Flow(
        user_id=data.user_id,
        name=flow_data.get("name"),
        description=flow_data.get("description"),
        message_template=flow_data.get("message_template"),
        target_type=flow_data.get("target_type"),
        schedule_time=flow_data.get("schedule_time"),
        pdf_path=flow_data.get("pdf_path")
    )

    db.add(novo_flow)
    db.commit()
    db.refresh(novo_flow)

    return novo_flow
