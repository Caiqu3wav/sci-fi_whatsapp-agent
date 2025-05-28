# routes/routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.database import get_db
from app.models.client import User, Company
from app.auth.auth import hash_password, verify_password

router = APIRouter()

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

@router.post("company", status_code=status.HTTP_201_CREATED)
def create_company(data: Company,db: Session = Depends(get_db)):
    exists = db.query(Company).filter(Company.email == data.email).first()
    if exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
        detail="Empresa já existe"
        )
        
    company = Company(
        name=data.name,
        email=data.email,
        phone_number=data.phone_number,
    )
    db.add(company)
    db.commit()
    db.refresh(company)

    return {"id": company.id, "name": company.name, "email": company.email, "phone_number": company.phone_number}

@router.get("/company/{id}", status_code=status.HTTP_200_OK)
def get_company(id: str, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == id).first()
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail="Empresa não encontrada"
        )
    return {"id": company.id, "name": company.name, "email": company.email, "phone_number": company.phone_number}

@router.get("/company/name", status_code=status.HTTP_200_OK)
def get_company_by_name(name: str, db: Session = Depends(get_db)):
    companies = db.query(Company).filter(func.lower(Company.name) == name.lower()).all()
    if not companies:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail="Empresas com esse nome não encontrada"
        )
    
    return [
            {
                "id": company.id,
                "name": company.name,
                "email": company.email,
                "phone_number": company.phone_number
            }
            for company in companies
        ]

        
@router.get("/company", status_code=status.HTTP_200_OK)
def get_companies(db: Session = Depends(get_db)):
    companies = db.query(Company).all()
    return companies

@router.put("/company/{id}", status_code=status.HTTP_200_OK)
def update_company(id: str, data: Company, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == id).first()
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
        detail="Empresa não encontrada"
        )
    company.name = data.name
    company.email = data.email
    company.phone_number = data.phone_number
    db.commit()
    db.refresh(company)
    return {"id": company.id, "name": company.name, "email": company.email, "phone_number": company.phone_number}