"use client";

export const runtime = "edge";

import { useEffect, useState } from "react";

interface SiteSettings {
  id: number;
  phone: string;
  email: string;
  address: string;
  linkedin: string | null;
  metaTitle: string;
  metaDescription: string;
}

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data: SiteSettings) => {
        setSettings(data);
        setPhone(data.phone);
        setEmail(data.email);
        setAddress(data.address);
        setLinkedin(data.linkedin || "");
        setMetaTitle(data.metaTitle);
        setMetaDescription(data.metaDescription);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setSaveMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email, address, linkedin, metaTitle, metaDescription }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setSaveMessage({ type: "success", text: "¡Configuración actualizada con éxito!" });
      } else {
        setSaveMessage({ type: "error", text: json.error || "Error al guardar la configuración." });
      }
    } catch (err: any) {
      setSaveMessage({ type: "error", text: err.message || "Error de red al guardar." });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Configuración del Sitio</h1>
      </header>

      {error && (
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
          ⚠️ Error al cargar la configuración: {error}
        </div>
      )}

      {loading ? (
        <div className="admin-card" style={{ opacity: 0.6 }}>
          <p style={{ color: "#9ca3af" }}>Cargando configuración...</p>
        </div>
      ) : settings ? (
        <div className="admin-card">
          <h2 style={{ marginBottom: "2rem" }}>Datos Globales e Identidad</h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                color: "#fff",
                marginBottom: "0.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                paddingBottom: "0.5rem",
              }}
            >
              Datos de Contacto
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div className="admin-form-group">
                <label htmlFor="set-email">Correo de Contacto</label>
                <input
                  id="set-email"
                  type="email"
                  className="admin-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="contacto@icenit.ai"
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="set-phone">Teléfono</label>
                <input
                  id="set-phone"
                  type="text"
                  className="admin-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="(+562) 284 09 598"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div className="admin-form-group">
                <label htmlFor="set-address">Dirección Física</label>
                <input
                  id="set-address"
                  type="text"
                  className="admin-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="Estoril 200, Piso 10, Santiago de Chile"
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="set-linkedin">URL de LinkedIn de la Empresa</label>
                <input
                  id="set-linkedin"
                  type="url"
                  className="admin-input"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://www.linkedin.com/company/82856989/"
                />
              </div>
            </div>

            <h3
              style={{
                fontSize: "1.2rem",
                color: "#fff",
                marginTop: "1rem",
                marginBottom: "0.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                paddingBottom: "0.5rem",
              }}
            >
              SEO y Metaetiquetas Globales
            </h3>

            <div className="admin-form-group">
              <label htmlFor="set-metatitle">Título del Sitio (Meta Title)</label>
              <input
                id="set-metatitle"
                type="text"
                className="admin-input"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="set-metadesc">Descripción del Sitio (Meta Description)</label>
              <textarea
                id="set-metadesc"
                className="admin-textarea"
                rows={4}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                required
                style={{ resize: "vertical" }}
              />
            </div>

            {saveMessage && (
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "8px",
                  background:
                    saveMessage.type === "success"
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
                  border:
                    saveMessage.type === "success"
                      ? "1px solid rgba(16, 185, 129, 0.2)"
                      : "1px solid rgba(239, 68, 68, 0.2)",
                  color: saveMessage.type === "success" ? "#10b981" : "#ef4444",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {saveMessage.type === "success" ? "✓ " : "⚠️ "}
                {saveMessage.text}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
              <button type="submit" className="admin-btn" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar Configuración"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-card" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--text-secondary)" }}>
            No se encontró el registro de configuración del sitio (ID 1).
          </p>
        </div>
      )}
    </div>
  );
}
