import { useEffect, useState } from "react";
import {
    getEvidence,
    addEvidence,
    uploadEvidence,
} from "../api";

function Evidence() {
    const [evidence, setEvidence] = useState([]);

    const [title, setTitle] = useState("");
    const [evidenceType, setEvidenceType] = useState("meeting");
    const [source, setSource] = useState("");
    const [content, setContent] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadEvidence();
    }, []);

    async function loadEvidence() {
        try {
            const data = await getEvidence();
            setEvidence(data);
        } catch (error) {
            console.error(error);
            setMessage("Could not load evidence.");
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!title || !content) {
            setMessage("Please enter a title and evidence content.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const newEvidence = await addEvidence({
                title,
                evidence_type: evidenceType,
                content,
                source,
            });

            setEvidence((previous) => [...previous, newEvidence]);

            setTitle("");
            setEvidenceType("meeting");
            setSource("");
            setContent("");

            setMessage("Evidence saved successfully.");
        } catch (error) {
            console.error(error);
            setMessage("Failed to save evidence.");
        } finally {
            setLoading(false);
        }
    }

    async function handleFileUpload() {
        if (!selectedFile) {
            setUploadMessage("Please select a file first.");
            return;
        }

        setUploadMessage("Uploading...");

        try {
            await uploadEvidence(selectedFile);

            setUploadMessage("File uploaded successfully.");

            setSelectedFile(null);

            // Reset the file input
            const fileInput = document.getElementById("evidence-file");
            if (fileInput) {
                fileInput.value = "";
            }

            // Refresh evidence list
            const updatedEvidence = await getEvidence();
            setEvidence(updatedEvidence);
        } catch (error) {
            console.error(error);
            setUploadMessage("Failed to upload file.");
        }
    }

    return (
        <div
            style={{
                padding: "30px",
                maxWidth: "1000px",
                margin: "auto",
            }}
        >
            <h1>Project Evidence</h1>

            <p>
                Add project information that HandoverOS can use to understand
                the project context.
            </p>

            {/* Manual Evidence Form */}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Evidence Title</label>
                    <br />

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Example: Meeting Notes"
                        style={{
                            width: "100%",
                            padding: "10px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Evidence Type</label>
                    <br />

                    <select
                        value={evidenceType}
                        onChange={(e) => setEvidenceType(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                        }}
                    >
                        <option value="meeting">
                            Meeting Notes
                        </option>

                        <option value="document">
                            Architecture Document
                        </option>

                        <option value="update">
                            Project Update
                        </option>

                        <option value="task">
                            Task Notes
                        </option>
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Source</label>
                    <br />

                    <input
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        placeholder="Example: Team Meeting - November 8"
                        style={{
                            width: "100%",
                            padding: "10px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Evidence Content</label>
                    <br />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Paste project notes, decisions, tasks, updates, etc."
                        rows="8"
                        style={{
                            width: "100%",
                            padding: "10px",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Evidence"}
                </button>
            </form>

            {/* Manual Evidence Message */}
            {message && (
                <p style={{ marginTop: "15px" }}>
                    {message}
                </p>
            )}

            {/* File Upload Section */}
            <div
                className="upload-section"
                style={{
                    marginTop: "30px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                }}
            >
                <h2>Upload Evidence</h2>

                <p>
                    Upload a project evidence file in .txt or .md format.
                </p>

                <input
                    id="evidence-file"
                    type="file"
                    accept=".txt,.md"
                    onChange={(e) => {
                        setSelectedFile(e.target.files[0]);
                        setUploadMessage("");
                    }}
                />

                <br />
                <br />

                <button
                    type="button"
                    onClick={handleFileUpload}
                    disabled={!selectedFile}
                >
                    Upload File
                </button>

                {selectedFile && (
                    <p>
                        Selected file: <strong>{selectedFile.name}</strong>
                    </p>
                )}

                {uploadMessage && (
                    <p>{uploadMessage}</p>
                )}
            </div>

            <hr style={{ margin: "30px 0" }} />

            {/* Collected Evidence */}
            <h2>Collected Evidence</h2>

            {evidence.length === 0 ? (
                <p>No evidence added yet.</p>
            ) : (
                evidence.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "15px",
                            marginBottom: "15px",
                        }}
                    >
                        <h3>{item.title}</h3>

                        <p>
                            <strong>Type:</strong>{" "}
                            {item.evidence_type}
                        </p>

                        <p>
                            <strong>Source:</strong>{" "}
                            {item.source || "Not specified"}
                        </p>

                        <p>{item.content}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Evidence;