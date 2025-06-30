from models import Flow
from db import SessionLocal

def salvar_flow(flow_dict, user_id):
    db = SessionLocal()
    novo_flow = Flow(
        user_id=user_id,
        name=flow_dict.get("name"),
        description=flow_dict.get("description"),
        message_template=flow_dict.get("message_template"),
        target_type=flow_dict.get("target_type"),
        schedule_time=flow_dict.get("schedule_time"),
        pdf_path=flow_dict.get("pdf_path")
    )
    db.add(novo_flow)
    db.commit()
    db.refresh(novo_flow)
    return novo_flow