from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.database import SessionLocal
from app.models.drugs_model import Drug
from app.schemas.drug_schema import DrugResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/drugs", response_model=List[DrugResponse])
def get_drugs(db: Session = Depends(get_db)):
    drugs_list = db.query(Drug).all()
    return drugs_list

@router.get("/drugs/{name}", response_model=DrugResponse)
def get_drug_by_name(name: str, db: Session = Depends(get_db)):
    drug = db.query(Drug).filter(Drug.name_drug == name).first()

    if not drug:
        return {"message": "Drug not found"}

    return drug