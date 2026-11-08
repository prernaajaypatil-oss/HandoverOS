import sqlite3

DATABASE_NAME = "evidence.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_NAME)
    connection.row_factory = sqlite3.Row
    return connection


def create_tables():
    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS evidence (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            evidence_type TEXT NOT NULL,
            content TEXT NOT NULL,
            source TEXT
        )
    """)

    connection.commit()
    connection.close()