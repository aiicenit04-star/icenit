"use client";

export const runtime = "edge";

import { useEffect, useState, useCallback } from "react";

interface ModuleData {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  description: string;
  features: string[];
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
  const [isPending, setIsPending] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
    setMetaDescription(mod.metaDescription);
    setDescription(mod.description);
    setFeatures(mod.features.length > 0 ? mod.features : [""]);
    setSaveMessage(null);
  }, []);

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeatureRow = () => setFeatures([...features, ""]);

  const removeFeatureRow = (index: number) => {
    if (features.length === 1) {
      setFeatures([""]);
    } else {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

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
          metaDescription,
          description,
          features: features.filter((f) => f.trim() !== ""),
        }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setSaveMessage({ type: "success", text: "¡Módulo actualizado con éxito!" });
        // Update local state to reflect saved changes
        setAllModules((prev) =>
          prev.map((m) =>
            m.id === selectedId
              ? { ...m, title, subtitle, metaDescription, description, features: features.filter((f) => f.trim() !== "") }
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

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Editar Módulos de Plataforma</h1>
      </header>

      {fetchError && (
        <div
          style={{
            padding: "1.25rem 1.5rem",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "10px",
            color: "#f87171",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            marginBottom: "2rem",
          }}
        >
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
              </button>
            ))}
          </div>

          {selectedModule ? (
            <div className="admin-card">
              <h2
                style={{
                  marginBottom: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Módulo: {selectedModule.title}</span>
                <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: "normal" }}>
                  Slug: {selectedModule.id}
                </span>
              </h2>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div className="admin-form-group">
                    <label htmlFor="mod-title">Título del Módulo</label>
                    <input
                      id="mod-title"
                      type="text"
                      className="admin-input"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="mod-subtitle">Subtítulo</label>
                    <input
                      id="mod-subtitle"
                      type="text"
                      className="admin-input"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="mod-meta">Descripción SEO Corta (Meta Description)</label>
                  <input
                    id="mod-meta"
                    type="text"
                    className="admin-input"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="mod-desc">Descripción Principal</label>
                  <textarea
                    id="mod-desc"
                    className="admin-textarea"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ resize: "vertical" }}
                  />
                </div>

                {/* Features */}
                <div
                  className="admin-card"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    padding: "1.75rem",
                    marginBottom: 0,
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      marginBottom: "1rem",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>Valores Destacados (Features)</span>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={addFeatureRow}
                      style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}
                    >
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
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            fontSize: "1.1rem",
                            padding: "0.5rem",
                          }}
                          title="Eliminar"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {saveMessage && (
                  <div
                    style={{
                      padding: "1rem",
                      borderRadius: "8px",
                      background:
                        saveMessage.type === "success"
                          ? "rgba(16,185,129,0.1)"
                          : "rgba(239,68,68,0.1)",
                      border:
                        saveMessage.type === "success"
                          ? "1px solid rgba(16,185,129,0.2)"
                          : "1px solid rgba(239,68,68,0.2)",
                      color: saveMessage.type === "success" ? "#10b981" : "#ef4444",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {saveMessage.type === "success" ? "✓ " : "⚠️ "}
                    {saveMessage.text}
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
