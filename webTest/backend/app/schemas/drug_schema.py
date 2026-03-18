from pydantic import BaseModel

class DrugBase(BaseModel):
    name_drug: str
    nama_generic: str
    category: str
    dosage_form: str
    description: str


class DrugResponse(DrugBase):
    id: int

    class Config:
        orm_mode = True