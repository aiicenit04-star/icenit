"use client";


import { useEffect, useState, useCallback, useRef } from "react";

interface ModuleData {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  meta_description: string;
  description: string;
  features: string[];
  image_url?: string | null;
}

export default function ModulesAdminPage() {
  const [allModules, setAllModules] = useState<ModuleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Editor state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Image upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{ type: "idle" | "uploading" | "success" | "error"; text?: string }>({ type: "idle" });
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "deleting">("idle");

  useEffect(() => {
    fetch("/api/admin/modules")
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data: ModuleData[]) => {
        setAllModules(data);
        if (data.length > 0) selectModule(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setFetchError(err.message);
        setLoading(false);
      });
  }, []);

  const selectModule = useCallback((mod: ModuleData) => {
    setSelectedId(mod.id);
    setTitle(mod.title);
    setSubtitle(mod.subtitle);
    setMetaDescription(mod.meta_description ?? "");
    setDescription(mod.description);
    setFeatures(mod.features.length > 0 ? mod.features : [""]);
    setImageUrl(mod.image_url ?? null);
    setImagePreview(null);
    setUploadFile(null);
    setUploadStatus({ type: "idle" });
    setDeleteStatus("idle");
    setSaveMessage(null);
  }, []);

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };
  const addFeatureRow = () => setFeatures([...features, ""]);
  const removeFeatureRow = (index: number) => {
    if (features.length === 1) setFeatures([""]);
    else setFeatures(features.filter((_, i) => i !== index));
  };

  // ─── Image compression via Canvas API ────────────────────────────────────
  /** Compresses an image file using Canvas. Returns a compressed Blob. */
  const compressImage = (file: File, maxWidth = 1200, quality = 0.82): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        // Calculate target dimensions keeping aspect ratio
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas no disponible"));
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Compresión fallida"));
            resolve(blob);
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => reject(new Error("No se pudo cargar la imagen"));
      img.src = objectUrl;
    });
  };

  // ─── Image handlers ────────────────────────────────────────────────────────

  const [compressInfo, setCompressInfo] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    setUploadStatus({ type: "idle" });
    setCompressInfo(`Original: ${(file.size / 1024).toFixed(0)} KB`);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!uploadFile || !selectedId) return;
    setUploadStatus({ type: "uploading" });

    try {
      // Compress before upload
      const compressed = await compressImage(uploadFile);
      const compressedKB = (compressed.size / 1024).toFixed(0);
      const originalKB = (uploadFile.size / 1024).toFixed(0);
      setCompressInfo(`${originalKB} KB → ${compressedKB} KB (WebP)`);

      const compressedFile = new File([compressed], `${selectedId}.webp`, { type: "image/webp" });

      const form = new FormData();
      form.append("moduleId", selectedId);
      form.append("file", compressedFile);

      const res = await fetch("/api/admin/modules/image", { method: "POST", body: form });
      const json = await res.json();

      if (res.ok && json.success) {
        const newUrl = json.url + `?t=${Date.now()}`;
        setImageUrl(newUrl);
        setAllModules((prev) =>
          prev.map((m) => (m.id === selectedId ? { ...m, image_url: newUrl } : m))
        );
        setUploadFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setUploadStatus({ type: "success", text: `Imagen subida y comprimida (${originalKB}→${compressedKB} KB)` });
      } else {
        setUploadStatus({ type: "error", text: json.error ?? "Error al subir imagen" });
      }
    } catch (err: any) {
      setUploadStatus({ type: "error", text: err.message });
    }
  };

  const handleDeleteImage = async () => {
    if (!selectedId) return;
    if (!confirm("¿Eliminar la imagen de este módulo?")) return;
    setDeleteStatus("deleting");

    try {
      const res = await fetch("/api/admin/modules/image", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId: selectedId, currentUrl: imageUrl }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setImageUrl(null);
        setImagePreview(null);
        setUploadFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setAllModules((prev) => prev.map((m) => (m.id === selectedId ? { ...m, image_url: null } : m)));
      } else {
        alert(json.error ?? "Error al eliminar la imagen");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleteStatus("idle");
    }
  };

  const cancelPreview = () => {
    setUploadFile(null);
    setImagePreview(null);
    setUploadStatus({ type: "idle" });
    setCompressInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── Form submit ────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    setIsPending(true);
    setSaveMessage(null);

    try {
      const res = await fetch("/api/admin/modules", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedId,
          title,
          subtitle,
          meta_description: metaDescription,
          description,
          features: features.filter((f) => f.trim() !== ""),
        }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setSaveMessage({ type: "success", text: "¡Módulo actualizado con éxito!" });
        setAllModules((prev) =>
          prev.map((m) =>
            m.id === selectedId
              ? { ...m, title, subtitle, meta_description: metaDescription, description, features: features.filter((f) => f.trim() !== "") }
              : m
          )
        );
      } else {
        setSaveMessage({ type: "error", text: json.error || "Error al guardar el módulo." });
      }
    } catch (err: any) {
      setSaveMessage({ type: "error", text: err.message || "Error de red al guardar." });
    } finally {
      setIsPending(false);
    }
  };

  const selectedModule = allModules.find((m) => m.id === selectedId);

  const displayImage = imagePreview ?? imageUrl;

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Editar Módulos de Plataforma</h1>
      </header>

      {fetchError && (
        <div style={{ padding: "1.25rem 1.5rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "10px", color: "#f87171", fontFamily: "monospace", fontSize: "0.9rem", marginBottom: "2rem" }}>
          ⚠️ Error al cargar los módulos: {fetchError}
        </div>
      )}

      {loading ? (
        <div className="admin-card" style={{ opacity: 0.6 }}>
          <p style={{ color: "#9ca3af" }}>Cargando módulos...</p>
        </div>
      ) : (
        <>
          {/* Module Tabs */}
          <div className="admin-tabs" style={{ flexWrap: "wrap" }}>
            {allModules.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`admin-tab ${selectedId === m.id ? "active" : ""}`}
                onClick={() => selectModule(m)}
              >
                {m.title}
                {m.image_url && (
                  <span style={{ marginLeft: "0.4rem", fontSize: "0.7rem", color: "#10b981" }}>●</span>
                )}
              </button>
            ))}
          </div>

          {selectedModule ? (
            <div className="admin-card">
              <h2 style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Módulo: {selectedModule.title}</span>
                <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: "normal" }}>
                  Slug: {selectedModule.id}
                </span>
              </h2>

              {/* ── Image Management Section ─────────────────────────────── */}
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <h3 style={{ fontSize: "1rem", color: "#e5e7eb", marginBottom: "1.25rem", fontWeight: 600 }}>
                  🖼 Imagen del Módulo
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "1.5rem", alignItems: "start" }}>
                  {/* Preview */}
                  <div
                    style={{
                      width: "200px",
                      height: "140px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.04)",
                      border: `2px dashed ${displayImage ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.12)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={`Imagen de ${selectedModule.title}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{ textAlign: "center", color: "#6b7280" }}>
                        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📷</div>
                        <div style={{ fontSize: "0.75rem" }}>Sin imagen</div>
                      </div>
                    )}
                    {imagePreview && (
                      <div
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          background: "rgba(245,158,11,0.9)",
                          color: "#000",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        PREVIEW
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {/* File picker */}
                    <div>
                      <label
                        htmlFor={`file-${selectedId}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.6rem 1.2rem",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          borderRadius: "8px",
                          color: "#e5e7eb",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                      >
                        📁 Seleccionar imagen
                      </label>
                      <input
                        ref={fileInputRef}
                        id={`file-${selectedId}`}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      <span style={{ marginLeft: "0.75rem", fontSize: "0.8rem", color: "#6b7280" }}>
                        {uploadFile
                          ? <>{uploadFile.name} {compressInfo && <span style={{ color: "#10b981" }}>— {compressInfo}</span>}</>
                          : "JPG, PNG, WEBP o GIF — máx. 5 MB (se comprime automáticamente)"}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      {uploadFile && (
                        <>
                          <button
                            type="button"
                            onClick={handleUpload}
                            disabled={uploadStatus.type === "uploading"}
                            style={{
                              padding: "0.55rem 1.2rem",
                              background: "linear-gradient(135deg, #10b981, #059669)",
                              border: "none",
                              borderRadius: "8px",
                              color: "#fff",
                              fontWeight: 600,
                              cursor: uploadStatus.type === "uploading" ? "not-allowed" : "pointer",
                              opacity: uploadStatus.type === "uploading" ? 0.7 : 1,
                              fontSize: "0.9rem",
                            }}
                          >
                            {uploadStatus.type === "uploading" ? "⏳ Subiendo..." : "⬆️ Subir imagen"}
                          </button>
                          <button
                            type="button"
                            onClick={cancelPreview}
                            style={{
                              padding: "0.55rem 1rem",
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: "8px",
                              color: "#9ca3af",
                              cursor: "pointer",
                              fontSize: "0.9rem",
                            }}
                          >
                            Cancelar
                          </button>
                        </>
                      )}

                      {imageUrl && !uploadFile && (
                        <button
                          type="button"
                          onClick={handleDeleteImage}
                          disabled={deleteStatus === "deleting"}
                          style={{
                            padding: "0.55rem 1.1rem",
                            background: "rgba(239,68,68,0.12)",
                            border: "1px solid rgba(239,68,68,0.3)",
                            borderRadius: "8px",
                            color: "#f87171",
                            cursor: deleteStatus === "deleting" ? "not-allowed" : "pointer",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            opacity: deleteStatus === "deleting" ? 0.6 : 1,
                          }}
                        >
                          {deleteStatus === "deleting" ? "Eliminando..." : "🗑 Eliminar imagen"}
                        </button>
                      )}
                    </div>

                    {/* Upload status */}
                    {uploadStatus.type !== "idle" && uploadStatus.text && (
                      <div
                        style={{
                          padding: "0.6rem 1rem",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          background: uploadStatus.type === "success" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                          border: uploadStatus.type === "success" ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(239,68,68,0.2)",
                          color: uploadStatus.type === "success" ? "#10b981" : "#f87171",
                        }}
                      >
                        {uploadStatus.type === "success" ? "✓ " : "⚠️ "}{uploadStatus.text}
                      </div>
                    )}

                    {imageUrl && !imagePreview && (
                      <a
                        href={imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.8rem", color: "#6b7280", textDecoration: "underline" }}
                      >
                        Ver imagen actual ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Content Form ─────────────────────────────────────────── */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div className="admin-form-group">
                    <label htmlFor="mod-title">Título del Módulo</label>
                    <input id="mod-title" type="text" className="admin-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="mod-subtitle">Subtítulo</label>
                    <input id="mod-subtitle" type="text" className="admin-input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="mod-meta">Descripción SEO Corta (Meta Description)</label>
                  <input id="mod-meta" type="text" className="admin-input" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} required />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="mod-desc">Descripción Principal</label>
                  <textarea id="mod-desc" className="admin-textarea" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} required style={{ resize: "vertical" }} />
                </div>

                {/* Features */}
                <div className="admin-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "1.75rem", marginBottom: 0 }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Valores Destacados (Features)</span>
                    <button type="button" className="admin-btn" onClick={addFeatureRow} style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}>
                      + Agregar Valor
                    </button>
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {features.map((feat, index) => (
                      <div key={index} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <input
                          type="text"
                          className="admin-input"
                          value={feat}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder="Ej: Análisis predictivo en tiempo real"
                          style={{ flexGrow: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeatureRow(index)}
                          style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "1.1rem", padding: "0.5rem" }}
                          title="Eliminar"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {saveMessage && (
                  <div style={{ padding: "1rem", borderRadius: "8px", background: saveMessage.type === "success" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: saveMessage.type === "success" ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(239,68,68,0.2)", color: saveMessage.type === "success" ? "#10b981" : "#ef4444", fontWeight: "600", textAlign: "center" }}>
                    {saveMessage.type === "success" ? "✓ " : "⚠️ "}{saveMessage.text}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="admin-btn" disabled={isPending}>
                    {isPending ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="admin-card" style={{ textAlign: "center" }}>
              <p style={{ color: "#6b7280" }}>No se encontró ningún módulo registrado.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
