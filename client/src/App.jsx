import { useState, useRef } from "react";
import axios from "axios";
const API = "http://localhost:5000/api";

const COLORS = {
  bg: "#0F1117",
  panel: "#1C1F2E",
  panelAlt: "#252836",
  border: "#2E3250",
  accent: "#6C63FF",
  accentDim: "#3D3880",
  accentText: "#A89FFF",
  text: "#E8E9F0",
  textMuted: "#7B80A0",
  textDim: "#4A4F6E",
  success: "#3ECF8E",
  error: "#FF5C6C",
  errorDim: "#3D1A1E",
  tag: "#1A1D30",
};

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 1rem 4rem",
  },
  header: {
    width: "100%",
    maxWidth: 780,
    marginBottom: "2.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: COLORS.accent,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: COLORS.text,
    margin: 0,
    letterSpacing: "-0.3px",
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    margin: 0,
  },
  main: {
    width: "100%",
    maxWidth: 780,
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  card: {
    backgroundColor: COLORS.panel,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "1.5rem",
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: COLORS.textMuted,
    marginBottom: "0.75rem",
  },
  dropZone: (dragging, hasFile) => ({
    border: `1.5px dashed ${dragging ? COLORS.accent : hasFile ? COLORS.accentDim : COLORS.border}`,
    borderRadius: 10,
    padding: "2rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    backgroundColor: dragging ? `${COLORS.accent}0D` : "transparent",
    outline: "none",
  }),
  dropIcon: {
    fontSize: 32,
    marginBottom: "0.25rem",
  },
  dropText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
  },
  fileChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: COLORS.accentDim,
    color: COLORS.accentText,
    borderRadius: 8,
    padding: "0.4rem 0.75rem",
    fontSize: 13,
    fontWeight: 500,
    marginTop: "0.5rem",
  },
  uploadBtn: (loading) => ({
    marginTop: "1rem",
    width: "100%",
    padding: "0.7rem",
    backgroundColor: loading ? COLORS.accentDim : COLORS.accent,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: loading ? "not-allowed" : "pointer",
    transition: "background 0.2s",
    letterSpacing: "-0.1px",
  }),
  pageCount: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: 13,
    color: COLORS.success,
    marginTop: "0.5rem",
  },
  divider: {
    height: 1,
    background: COLORS.border,
    margin: "1rem 0",
  },
  textarea: {
    width: "100%",
    backgroundColor: COLORS.panelAlt,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 1.6,
    padding: "0.75rem 1rem",
    resize: "vertical",
    minHeight: 80,
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.15s",
  },
  askBtn: (loading, disabled) => ({
    marginTop: "0.75rem",
    width: "100%",
    padding: "0.7rem",
    backgroundColor: disabled ? COLORS.panelAlt : loading ? COLORS.accentDim : COLORS.accent,
    color: disabled ? COLORS.textDim : "#fff",
    border: `1px solid ${disabled ? COLORS.border : "transparent"}`,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "background 0.2s",
  }),
  errorBox: {
    background: COLORS.errorDim,
    border: `1px solid ${COLORS.error}44`,
    borderRadius: 8,
    padding: "0.75rem 1rem",
    color: COLORS.error,
    fontSize: 13,
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    marginTop: "0.75rem",
  },
  answerCard: {
    backgroundColor: COLORS.panel,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    overflow: "hidden",
  },
  answerHeader: {
    background: COLORS.panelAlt,
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "0.85rem 1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  answerHeaderLabel: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: COLORS.textMuted,
  },
  answerBody: {
    padding: "1.25rem 1.5rem",
    fontSize: 15,
    lineHeight: 1.75,
    color: COLORS.text,
    whiteSpace: "pre-wrap",
  },
  citationsWrap: {
    borderTop: `1px solid ${COLORS.border}`,
    padding: "1rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  citationLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: COLORS.textMuted,
    marginBottom: "0.25rem",
  },
  citation: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "flex-start",
  },
  citationPage: {
    flexShrink: 0,
    backgroundColor: COLORS.tag,
    border: `1px solid ${COLORS.accentDim}`,
    color: COLORS.accentText,
    borderRadius: 6,
    padding: "0.2rem 0.5rem",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
  },
  citationText: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 1.55,
    fontStyle: "italic",
  },
  tokensWrap: {
    borderTop: `1px solid ${COLORS.border}`,
    padding: "0.85rem 1.5rem",
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  tokenStat: {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
  },
  tokenValue: {
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.accentText,
    letterSpacing: "-0.5px",
  },
  tokenKey: {
    fontSize: 11,
    color: COLORS.textDim,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },
  spinner: {
    width: 14,
    height: 14,
    border: `2px solid ${COLORS.accentDim}`,
    borderTop: `2px solid ${COLORS.accent}`,
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
    marginRight: 8,
    verticalAlign: "middle",
  },
};

export default function App() {
   const [uploadSuccess, setUploadSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pages, setPages] = useState([]);
  const [uploadError, setUploadError] = useState("");

  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [result, setResult] = useState(null);
  const [askError, setAskError] = useState("");

  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") {
      setFile(dropped);
      setUploadError("");
      setPages([]);
      setResult(null);
    } else {
      setUploadError("Please drop a PDF file.");
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setUploadError("");
      setPages([]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    setPages([]);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        setPages(data.pages);
        setUploadSuccess(true);
      } else {
        setUploadError(data.error || "Upload failed.");
      }
    } catch (err) {
      setUploadError(err.response?.data?.error || err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim() || pages.length === 0) return;
    setAsking(true);
    setAskError("");
    setResult(null);
    try {
      const { data } = await axios.post(`${API}/ask`, { question });
      if (data.success) {
        setResult(data);
      } else {
        setAskError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setAskError(err.response?.data?.error || err.message);
    } finally {
      setAsking(false);
    }
  };

  const documentReady = pages.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.25s ease forwards; }
        textarea:focus { border-color: ${COLORS.accent} !important; }
        .drop-zone:focus-visible { outline: 2px solid ${COLORS.accent}; outline-offset: 2px; }
      `}</style>

      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.logoMark}>📄</div>
          <div>
            <p style={styles.title}>Ask My Notes</p>
            <p style={styles.subtitle}>
  AI-powered PDF Question Answering with Citations and Token Tracking
</p>
          </div>
        </header>

        <main style={styles.main}>
          {/* Upload card */}
          <div style={styles.card}>
            <p style={styles.cardLabel}>Document</p>
            <div
              className="drop-zone"
              style={styles.dropZone(dragging, !!file)}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              tabIndex={0}
              role="button"
              aria-label="Upload PDF"
            >
              <span style={styles.dropIcon}>📁</span>
              <span style={styles.dropText}>
                {file ? "Click to change file" : "Drop a PDF here, or click to browse"}
              </span>
              {file && (
                <span style={styles.fileChip}>
                  📄 {file.name}
                </span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {documentReady && (
              <div style={styles.pageCount}>
                <span>✓</span>
                <span>{pages.length} page{pages.length !== 1 ? "s" : ""} indexed</span>
              </div>
            )}
            {uploadSuccess && (
  <div
    style={{
      color: "#3ECF8E",
      marginTop: "10px",
      fontSize: "14px",
    }}
  >
    ✓ PDF uploaded successfully
  </div>
)}

            {uploadError && (
              <div style={styles.errorBox}>
                <span>⚠</span> {uploadError}
              </div>
            )}

            <button
              style={styles.uploadBtn(uploading)}
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? (
                <><span style={styles.spinner} />Extracting text…</>
              ) : documentReady ? "Re-upload" : "Upload PDF"}
            </button>
          </div>

          {/* Ask card */}
          <div style={styles.card}>
            <p style={styles.cardLabel}>Question</p>
            <textarea
              style={styles.textarea}
              placeholder={documentReady ? "What is this document about?" : "Upload a PDF first…"}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAsk();
              }}
              disabled={!documentReady}
              rows={3}
            />
            <button
              style={styles.askBtn(asking, !documentReady || !question.trim())}
              onClick={handleAsk}
              disabled={!documentReady || !question.trim() || asking}
            >
              {asking ? (
                <><span style={styles.spinner} />Thinking…</>
              ) : "Ask  ⌘↵"}
            </button>
            {askError && (
              <div style={styles.errorBox}>
                <span>⚠</span> {askError}
              </div>
            )}
          </div>

          {/* Answer card */}
          {result && (
            <div style={styles.answerCard} className="fade-in">
              <div style={styles.answerHeader}>
                <span style={styles.answerHeaderLabel}>Answer</span>
              </div>

              <div style={styles.answerBody}>{result.answer}</div>

              {result.citations?.length > 0 && (
  <div style={styles.citationsWrap}>
    <p style={styles.citationLabel}>Sources</p>

    {result.citations.map((page, index) => (
      <div key={index} style={styles.citation}>
        <span style={styles.citationPage}>
          Page {page}
        </span>
      </div>
    ))}
  </div>
)}

{result.usage && (
  <div style={styles.tokensWrap}>
    {[
      ["Prompt", result.usage.promptTokens],
      ["Completion", result.usage.completionTokens],
      ["Total", result.usage.totalTokens],
    ].map(([label, value]) => (
      <div key={label} style={styles.tokenStat}>
        <span style={styles.tokenValue}>
          {value ?? 0}
        </span>

        <span style={styles.tokenKey}>
          {label} Tokens
        </span>
      </div>
    ))}
  </div>
)}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
