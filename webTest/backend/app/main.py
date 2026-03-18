from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.drugs_route import router as drugs_router
from app.api.detect_route import router as detect_router

app = FastAPI(title="Web Test")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(drugs_router)
app.include_router(detect_router)

@app.get("/")
def read_root():
    return {"message": "API is working!"}