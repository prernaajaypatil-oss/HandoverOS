from fastapi import APIRouter, UploadFile, File, HTTPException
from database import get_connection

router = APIRouter(
    prefix="/api/evidence",
    tags=["Evidence"]
)


@router.post("/upload")
async def upload_evidence(file: UploadFile = File(...)):

    # Check if a file was selected
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="File name is missing"
        )

    # Allow only TXT and Markdown files
    allowed_extensions = (".txt", ".md")

    if not file.filename.lower().endswith(allowed_extensions):
        raise HTTPException(
            status_code=400,
            detail="Only .txt and .md files are supported"
        )

    # Read the file
    content = await file.read()

    # Convert file content to text
    try:
        text = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="File must be UTF-8 encoded text"
        )

    # Save evidence to SQLite
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO evidence
        (title, evidence_type, content, source)
        VALUES (?, ?, ?, ?)
        """,
        (
            file.filename,
            "document",
            text,
            "Uploaded file"
        )
    )

    connection.commit()

    evidence_id = cursor.lastrowid

    connection.close()

    # Return saved evidence
    return {
        "id": evidence_id,
        "title": file.filename,
        "evidence_type": "document",
        "content": text,
        "source": "Uploaded file",
        "message": "Evidence uploaded and saved successfully"
    }