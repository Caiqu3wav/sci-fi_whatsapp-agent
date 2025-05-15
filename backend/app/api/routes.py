from fastapi import FastAPI
from app.db.database import Base, engine

router = FastAPI()

router.get("/")
def read_root():
    return {"Hello": "World"} 