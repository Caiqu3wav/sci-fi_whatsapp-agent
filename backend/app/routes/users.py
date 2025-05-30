from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.database import get_db
from app.models.client import User
from app.auth.auth import hash_password, verify_password

router = APIRouter(prefix="/users", tags=["Users"])

class RegisterInput(BaseModel):
    email: str
    phone_number: str
    password: str
    name: str

class LoginInput(BaseModel):
    identifier: str
    password: str

@router.post("/register")
def register(data: RegisterInput, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Usuário já existe")

    new_user = User(
        email=data.email,
        phone_number=data.phone_number,
        name=data.name,
        password=hash_password(data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "email": new_user.email, "name": new_user.name}

@router.post("/login")
def login(data: LoginInput, db: Session = Depends(get_db)):
    if "@" in data.identifier:
        user = db.query(User).filter(User.email == data.email).first()
    else:
        user = db.query(User).filter(User.phone_number == data.phone_number).first()
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    return {"id": user.id, "email": user.email, "name": user.name}


@router.post("/google")
def google_login(data: RegisterInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        new_user = User(
            email=data.email,
            name=data.name,
            password=None  # pode ser null ou string vazia
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"id": new_user.id, "status": "created"}
    
    return {"id": user.id, "status": "exists"}
