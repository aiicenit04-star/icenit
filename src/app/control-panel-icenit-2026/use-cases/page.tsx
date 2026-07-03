"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface UseCaseData {
  id: string;
  title: string;
  context: string;
  challenge: string;
  strategy: string;
  results: string;
  image_url?: string | null;
}

// Canvas compression
function compress(file: File, maxW = 1400, q = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const u = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(u);
      let { width, height } = img;
      if (width > maxW) { height = Math.round(height * maxW / width); width = maxW; }
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas error"));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error("Compression failed")), "image/webp", q);
    };
    img.onerror = () => reject(new Error("Image load error"));
    img.src = u;
  });
}

export default function UseCasesAdminPage() {
  const [allUseCases, setAllUseCases] = useState<UseCaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Text editor state
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [challenge, setChallenge] = useState("");
  const [strategy, setStrategy] = useState("");
  const [results, setResults] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Image state
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{ type: "idle" | "uploading" | "success" | "error"; text?: string }>({ type: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/use-cases")
      .then(res => { if (!res.ok) throw new Error(`Error ${res.status}`); return res.json(); })
      .then((data: UseCaseData[]) => {
        setAllUseCases(data);
        if (data.length > 0) selectUseCase(data[0]);
        setLoading(false);
      })
      .catch(err => { setFetchError(err.message); setLoading(false); });
  }, []);

  const selectUseCase = useCallback((uc: UseCaseData) => {
    setSelectedId(uc.id);
    setTitle(uc.title);
    setContext(uc.context);
    setChallenge(uc.challenge);
    setStrategy(uc.strategy);
    setResults(uc.results);
    setImageUrl(uc.image_url ?? null);
    setImagePreview(null);
    setUploadFile(null);
    setUploadStatus({ type: "idle" });
    setSaveMessage(null);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    setUploadStatus({ type: "idle" });
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!uploadFile || !selectedId) return;
    setUploadStatus({ type: "uploading", text: "Comprimiendo y subiendo..." });
    try {
      const blob = await compress(uploadFile);
      const compressed = new File([blob], `${selectedId}.webp`, { type: "image/webp" });
      const form = new FormData();
      form.append("caseId", selectedId);
      form.append("file", compressed);
      const res = await fetch("/api/admin/use-cases/upload", { method: "POST", body: form });
      const json = await res.json();
      if (res.ok && json.success) {
        const newUrl = json.url + `?t=${Date.now()}`;
        setImageUrl(newUrl);
        setImagePreview(null);
        setUploadFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setAllUseCases(prev => prev.map(uc => uc.id === selectedId ? { ...uc, image_url: newUrl } : uc));
        setUploadStatus({ type: "success", text: "✓ Imagen actualizada. Visible en el sitio." });
      } else {
        setUploadStatus({ type: "error", text: json.error || "Error al subir" });
      }
    } catch (err: any) {
      setUploadStatus({ type: "error", text: err.message });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    setIsPending(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/admin/use-cases", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedId, title, context, challenge, strategy, results }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSaveMessage({ type: "success", text: "¡Caso de uso actualizado con éxito!" });
        setAllUseCases(prev => prev.map(uc => uc.id === selectedId ? { ...uc, title, context, challenge, strategy, results } : uc));
      } else {
        setSaveMessage({ type: "error", text: json.error || "Error al guardar." });
      }
    } catch (err: any) {
      setSaveMessage({ type: "error", text: err.message });
    } finally {
      setIsPending(false);
    }
  };

  const selectedUseCase = allUseCases.find(uc => uc.id === selectedId);
  const displayImage = imagePreview ?? imageUrl;

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Editar Casos de Uso</h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.5rem" }}>
          Los cambios se reflejan en el sitio inmediatamente.
        </p>
      </header>

      {fetchError && (
        <div style={{ padding: "1.25rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "10px", color: "#f87171", marginBottom: "2rem" }}>
          ⚠️ Error al cargar los casos de uso: {fetchError}
        </div>
      )}

      {loading ? (
        <div className="admin-card" style={{ opacity: 0.6 }}>
          <p style={{ color: "#9ca3af" }}>Cargando casos de uso...</p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="admin-tabs" style={{ flexWrap: "wrap" }}>
            {allUseCases.map(uc => (
              <button
                key={uc.id}
                type="button"
                className={`admin-tab ${selectedId === uc.id ? "active" : ""}`}
                onClick={() => selectUseCase(uc)}
              >
                {uc.title}
              </button>
            ))}
          </div>

          {selectedUseCase && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "1.5rem", alignItems: "start" }}>

              {/* LEFT — Image Panel */}
              <div className="admin-card" style={{ position: "sticky", top: "1rem" }}>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "1.25rem" }}>
                  🖼 Foto del Caso
                </h2>

                {/* Preview */}
                <div style={{
                  width: "100%", aspectRatio: "16/9", borderRadius: "10px", overflow: "hidden",
                  background: "rgba(0,0,0,0.4)", border: `2px dashed ${displayImage ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.12)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", marginBottom: "1rem"
                }}>
                  {displayImage ? (
                    <img src={displayImage} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ textAlign: "center", color: "#6b7280" }}>
                      <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📷</div>
                      <div style={{ fontSize: "0.85rem" }}>Sin foto</div>
                    </div>
                  )}
                  {imagePreview && (
                    <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(245,158,11,0.9)", color: "#000", fontSize: "0.65rem", fontWeight: 700, padding: "3px 7px", borderRadius: "5px" }}>
                      PREVIEW
                    </div>
                  )}
                </div>

                {/* Upload zone */}
                <label style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                  padding: "0.85rem 1rem", background: "rgba(255,255,255,0.05)",
                  border: "1px dashed rgba(255,255,255,0.15)", borderRadius: "8px",
                  cursor: "pointer", fontSize: "0.9rem", color: "#9ca3af",
                  marginBottom: "0.75rem", transition: "all 0.2s"
                }}>
                  📁 Elegir imagen (JPG, PNG, WEBP)
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>

                {uploadFile && (
                  <div style={{ marginBottom: "0.75rem", fontSize: "0.82rem", color: "#9ca3af" }}>
                    📄 {uploadFile.name} ({(uploadFile.size / 1024).toFixed(0)} KB)
                  </div>
                )}

                <button
                  onClick={handleUpload}
                  disabled={!uploadFile || uploadStatus.type === "uploading"}
                  style={{
                    width: "100%", padding: "0.75rem 1rem",
                    background: uploadFile ? "linear-gradient(135deg,#10b981,#059669)" : "rgba(255,255,255,0.06)",
                    border: "none", borderRadius: "8px",
                    color: uploadFile ? "#fff" : "#6b7280",
                    fontWeight: 700, cursor: uploadFile ? "pointer" : "not-allowed",
                    fontSize: "0.9rem", marginBottom: "0.75rem"
                  }}
                >
                  {uploadStatus.type === "uploading" ? "⏳ Subiendo..." : "⬆️ Subir Foto"}
                </button>

                {uploadStatus.type !== "idle" && (
                  <div style={{
                    padding: "0.75rem", borderRadius: "7px", fontSize: "0.85rem", fontWeight: 600, textAlign: "center",
                    background: uploadStatus.type === "success" ? "rgba(16,185,129,0.1)" : uploadStatus.type === "error" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
                    color: uploadStatus.type === "success" ? "#10b981" : uploadStatus.type === "error" ? "#f87171" : "#f59e0b",
                    border: `1px solid ${uploadStatus.type === "success" ? "rgba(16,185,129,0.2)" : uploadStatus.type === "error" ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)"}`
                  }}>
                    {uploadStatus.text}
                  </div>
                )}

                {imageUrl && (
                  <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "6px" }}>
                    <div style={{ fontSize: "0.72rem", color: "#4b5563", marginBottom: "0.25rem" }}>URL actual:</div>
                    <a href={imageUrl.startsWith("/") ? imageUrl : imageUrl} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: "0.75rem", color: "#6b7280", wordBreak: "break-all", textDecoration: "underline" }}>
                      {imageUrl.length > 60 ? imageUrl.substring(0, 60) + "..." : imageUrl}
                    </a>
                  </div>
                )}
              </div>

              {/* RIGHT — Text Editor */}
              <div className="admin-card">
                <h2 style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>✏️ {selectedUseCase.title}</span>
                  <span style={{ fontSize: "0.82rem", color: "#6b7280", fontWeight: "normal" }}>slug: {selectedUseCase.id}</span>
                </h2>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className="admin-form-group">
                    <label htmlFor="uc-title">Título del Caso de Uso</label>
                    <input id="uc-title" type="text" className="admin-input" value={title} onChange={e => setTitle(e.target.value)} required />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="uc-context">Contexto / Introducción</label>
                    <textarea id="uc-context" className="admin-textarea" rows={4} value={context} onChange={e => setContext(e.target.value)} required style={{ resize: "vertical" }} />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="uc-challenge">Desafíos <span style={{ color: "#6b7280", fontWeight: 400 }}>(un punto por línea)</span></label>
                    <textarea id="uc-challenge" className="admin-textarea" rows={6} value={challenge} onChange={e => setChallenge(e.target.value)} required placeholder={"Desafío 1\nDesafío 2"} style={{ resize: "vertical" }} />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="uc-strategy">Estrategia <span style={{ color: "#6b7280", fontWeight: 400 }}>(un punto por línea)</span></label>
                    <textarea id="uc-strategy" className="admin-textarea" rows={6} value={strategy} onChange={e => setStrategy(e.target.value)} required placeholder={"Estrategia 1\nEstrategia 2"} style={{ resize: "vertical" }} />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="uc-results">Resultados <span style={{ color: "#6b7280", fontWeight: 400 }}>(un punto por línea)</span></label>
                    <textarea id="uc-results" className="admin-textarea" rows={6} value={results} onChange={e => setResults(e.target.value)} required placeholder={"Resultado 1\nResultado 2"} style={{ resize: "vertical" }} />
                  </div>

                  {saveMessage && (
                    <div style={{
                      padding: "1rem", borderRadius: "8px", fontWeight: 600, textAlign: "center",
                      background: saveMessage.type === "success" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                      border: saveMessage.type === "success" ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(239,68,68,0.2)",
                      color: saveMessage.type === "success" ? "#10b981" : "#ef4444"
                    }}>
                      {saveMessage.type === "success" ? "✓ " : "⚠️ "}{saveMessage.text}
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" className="admin-btn" disabled={isPending}>
                      {isPending ? "Guardando..." : "💾 Guardar Cambios"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
