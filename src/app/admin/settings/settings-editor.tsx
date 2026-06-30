"use client";

import { useState } from "react";
import { updateSiteSettings } from "../actions";

interface SiteSettingsData {
  phone: string;
  email: string;
  address: string;
  linkedin: string | null;
  metaTitle: string;
  metaDescription: string;
}

interface SettingsEditorProps {
  initialSettings: SiteSettingsData;
}

export default function SettingsEditor({ initialSettings }: SettingsEditorProps) {
  const [phone, setPhone] = useState(initialSettings.phone);
  const [email, setEmail] = useState(initialSettings.email);
  const [address, setAddress] = useState(initialSettings.address);
  const [linkedin, setLinkedin] = useState(initialSettings.linkedin || "");
  const [metaTitle, setMetaTitle] = useState(initialSettings.metaTitle);
  const [metaDescription, setMetaDescription] = useState(initialSettings.metaDescription);

  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const res = await updateSiteSettings(
      phone,
      email,
      address,
      linkedin,
      metaTitle,
      metaDescription
    );

    setIsPending(false);
    if (res.success) {
      setMessage({ type: "success", text: "¡Configuración de la página actualizada con éxito!" });
    } else {
      setMessage({ type: "error", text: res.error || "Ocurrió un error al guardar." });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
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

      <h3 style={{ fontSize: "1.2rem", color: "#fff", marginTop: "1rem", marginBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
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

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <button type="submit" className="admin-btn" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar Configuración"}
        </button>
      </div>
    </form>
  );
}
