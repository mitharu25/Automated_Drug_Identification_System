from sqlalchemy import Column, Integer, String
from app.database.database import Base

class Drug(Base):
    __tablename__ = "drugs"

    id = Column(Integer, primary_key=True, index=True)
    name_drug = Column(String, index=True)
    nama_generic = Column(String)
    category = Column(String)
    dosage_form = Column(String)
    description = Column(String)