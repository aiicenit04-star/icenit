"use client";

import { useState } from "react";
import { updateModule } from "../actions";

interface ModuleData {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  description: string;
}

interface ModuleEditorProps {
  moduleData: ModuleData;
  initialFeatures: string[];
}

export default function ModuleEditor({ moduleData, initialFeatures }: ModuleEditorProps) {
  const [title, setTitle] = useState(moduleData.title);
  const [subtitle, setSubtitle] = useState(moduleData.subtitle);
  const [metaDescription, setMetaDescription] = useState(moduleData.metaDescription);
  const [description, setDescription] = useState(moduleData.description);
  const [features, setFeatures] = useState<string[]>(initialFeatures.length > 0 ? initialFeatures : [""]);
  
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeatureRow = () => {
    setFeatures([...features, ""]);
  };

  const removeFeatureRow = (index: number) => {
    if (features.length === 1) {
      setFeatures([""]);
    } else {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const res = await updateModule(
      moduleData.id,
      title,
      subtitle,
      metaDescription,
      description,
      features.filter(f => f.trim() !== "")
    );

    setIsPending(false);
    if (res.success) {
      setMessage({ type: "success", text: "¡Módulo actualizado con éxito!" });
    } else {
      setMessage({ type: "error", text: res.error || "Ocurrió un error al guardar." });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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

      {/* Features List Section */}
      <div className="admin-card" style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "1.75rem", marginBottom: 0 }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                  padding: "0.5rem"
                }}
                title="Eliminar"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {message && (
        <div style={{
          padding: "1rem",
          borderRadius: "8px",
          background: message.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
          border: message.type === "success" ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(239, 68, 68, 0.2)",
          color: message.type === "success" ? "#10b981" : "#ef4444",
          fontWeight: "600",
          textAlign: "center"
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" className="admin-btn" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}
