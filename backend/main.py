from fastapi import FastAPI
from app.routes import users, company, flows
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from app.models.client import Flow, Integration, Client
from app.db.database import SessionLocal
from app.services.whatsapp import enviar_mensagem_whatsapp

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["http://localhost:3000"] etc.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(company.router)
app.include_router(flows.router)

def executar_flows():
    db = SessionLocal()
    now = datetime.now()
    flows = db.query(Flow).filter(Flow.schedule_time <= now, Flow.active == True).all()

    for flow in flows:
        integration = db.query(Integration).filter(Integration.user_id == flow.user_id).first()
        client = db.query(Client).filter(Client.user_id == flow.user_id).first()

        if integration and client:
            enviar_mensagem_whatsapp(
                integration=integration,
                numero_destino=client.phone_number,
                mensagem=flow.message_template,
                pdf_path=flow.pdf_path
            )
            flow.active = False
            db.commit()

    db.close()

scheduler = BackgroundScheduler()
scheduler.add_job(executar_flows, 'interval', minutes=1)
scheduler.start()

