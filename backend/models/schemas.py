from pydantic import BaseModel
from typing import Optional


class EvidenceCreate(BaseModel):
    title: str
    evidence_type: str
    content: str
    source: Optional[str] = None


class Evidence(BaseModel):
    id: int
    title: str
    evidence_type: str
    content: str
    source: Optional[str] = None