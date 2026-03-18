from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import numpy as np
import cv2

from app.database.database import SessionLocal
from app.models.drugs_model import Drug
from app.services.detection_service import detect_objects

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/detect")
async def detect_drug(file: UploadFile = File(...), db: Session = Depends(get_db)):

    contents = await file.read()
    npimg = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    detections = detect_objects(image)

    results = []

    for d in detections:
        drug = db.query(Drug).filter(
            Drug.name_drug == d["name"]
        ).first()

        if drug:
            results.append({
                "name": drug.name_drug,
                "confidence": d["confidence"],
                "category": drug.category,
                "dosage_form": drug.dosage_form,
                "description": drug.description
            })

    return {"detections": results}

@router.post("/detect-stream")
async def detect_stream(file: UploadFile = File(...), db: Session = Depends(get_db)):

    contents = await file.read()

    npimg = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    detections = detect_objects(image)

    results = []

    for d in detections:
        drug = db.query(Drug).filter(
            Drug.name_drug == d["name"]
        ).first()

        if drug:
            results.append({
                "id": d["id"],
                "name": drug.name_drug,
                "confidence": d["confidence"],
                "bbox": d["bbox"],
                "name_generic": drug.nama_generic,
                "category": drug.category,
                "dosage_form": drug.dosage_form,
                "description": drug.description
            })

    return {"detections": results}