const API_URL = "http://127.0.0.1:8000";

export async function getEvidence() {
    const response = await fetch(`${API_URL}/api/evidence`);

    if (!response.ok) {
        throw new Error("Failed to fetch evidence");
    }

    return response.json();
}

export async function addEvidence(evidence) {
    const response = await fetch(`${API_URL}/api/evidence`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(evidence),
    });

    if (!response.ok) {
        throw new Error("Failed to add evidence");
    }

    return response.json();
}
export async function uploadEvidence(file) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
        `${API_URL}/api/evidence/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error("Failed to upload evidence");
    }

    return response.json();
}