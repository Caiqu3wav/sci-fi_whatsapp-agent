# routes/routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.database import get_db
from app.models.client import User
from app.auth.auth import hash_password, verify_password, decode_access_token, oauth2_scheme

router = APIRouter()

class RegisterInput(BaseModel):
    email: str
    password: str
    name: str

class LoginInput(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(data: RegisterInput, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Usuário já existe")

    new_user = User(
        email=data.email,
        name=data.name,
        password=hash_password(data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "email": new_user.email, "name": new_user.name}

@router.post("/login")
def login(data: LoginInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    return {"id": user.id, "email": user.email, "name": user.name}

@router.get("/me")
def me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = db.query(User).filter(User.email == email).first()
    return user
