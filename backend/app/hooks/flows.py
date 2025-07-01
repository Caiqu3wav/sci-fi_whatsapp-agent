from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from backend.app.db.database import SessionLocal
from backend.app.hooks import send_message_wp
from models import Flow, Integration, Client

def executar_flows_agendados():
    db = SessionLocal()
    now = datetime.now()

    flows = db.query(Flow).filter(Flow.schedule_time <= now, Flow.active == True).all()

    for flow in flows:
        integration = db.query(Integration).filter(Integration.user_id == flow.user_id).first()
        client = db.query(Client).filter(Client.user_id == flow.user_id).first()  # ou baseado em flow.target_id
        if integration and client:
            send_message_wp(integration, client.phone_number, flow.message_template, flow.pdf_path)
            flow.active = False
            db.commit()

scheduler = BackgroundScheduler()
scheduler.add_job(executar_flows_agendados, 'interval', minutes=1)
scheduler.start()
