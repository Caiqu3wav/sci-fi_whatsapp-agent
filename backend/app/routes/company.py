from sqlalchemy import or_
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.client import Company

router = APIRouter(prefix="/company", tags=["Company"])

router = APIRouter()
 
@router.get("/company/search", status_code=status.HTTP_200_OK)
def search_companies(query: str, db: Session = Depends(get_db)):
    companies = db.query(Company).filter(
        or_(
            Company.name.ilike(f"%{query}%"),
            Company.code.ilike(f"%{query}%")
        )
    ).all()

    if not companies:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")

    return [
        {"id": c.id, "name": c.name, "code": c.code}
        for c in companies
    ]
 

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
    companies = db.query(Company).filter(function.lower(Company.name) == name.lower()).all()
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