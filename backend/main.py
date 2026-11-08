from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import EvidenceCreate
from database import get_connection, create_tables
from routes.evidence import router as evidence_router


app = FastAPI(title="HandoverOS API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include file upload routes
app.include_router(evidence_router)


# Create database tables
create_tables()


@app.get("/")
def root():
    return {"message": "HandoverOS API is running"}


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "HandoverOS backend"
    }


@app.get("/api/evidence")
def get_evidence():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT id, title, evidence_type, content, source
        FROM evidence
        ORDER BY id
    """)

    rows = cursor.fetchall()
    connection.close()

    return [dict(row) for row in rows]


@app.post("/api/evidence")
def add_evidence(evidence: EvidenceCreate):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO evidence
        (title, evidence_type, content, source)
        VALUES (?, ?, ?, ?)
    """, (
        evidence.title,
        evidence.evidence_type,
        evidence.content,
        evidence.source
    ))

    connection.commit()

    evidence_id = cursor.lastrowid

    connection.close()

    return {
        "id": evidence_id,
        "title": evidence.title,
        "evidence_type": evidence.evidence_type,
        "content": evidence.content,
        "source": evidence.source
    }