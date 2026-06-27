"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import "../public.css";

export default function SolicitaDemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    accept: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, accept: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accept) {
      setErrorMsg("Debes aceptar ser contactado para continuar.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "demo",
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error");
      }

      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al enviar la solicitud.");
      setStatus("error");
    }
  };

  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div className="section-header" style={{ marginBottom: "4rem" }}>
          <span className="section-subtitle">Demostración</span>
          <h1 className="section-title" style={{ fontSize: "3rem" }}>
            Solicita una Demo
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            Completa el formulario y agenda una sesión personalizada para conocer el poder de James AI en tu operación.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start", maxWidth: "1100px", margin: "0 auto" }}>
          {/* Steps */}
          <div className="glass-panel" style={{ padding: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.5rem", marginBottom: "2rem", color: "#fff" }}>
              Pasos del Proceso
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0 }}>
                  1
                </span>
                <div>
                  <h4 style={{ color: "#fff", marginBottom: "0.25rem" }}>Solicita la Demo</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Completa el formulario a la derecha con tus datos.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0 }}>
                  2
                </span>
                <div>
                  <h4 style={{ color: "#fff", marginBottom: "0.25rem" }}>Confirmación de cita</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Recibirás un correo electrónico para confirmar fecha y hora.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--accent-blue)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", flexShrink: 0 }}>
                  3
                </span>
                <div>
                  <h4 style={{ color: "#fff", marginBottom: "0.25rem" }}>Demo online en vivo</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Participa en una sesión interactiva y personalizada con un experto.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-panel" style={{ padding: "3rem" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(16,185,129,0.1)", color: "var(--accent-green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1.5rem" }}>
                  ✓
                </div>
                <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.5rem", marginBottom: "1rem", color: "#fff" }}>
                  ¡Solicitud Recibida!
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  Hemos recibido tus datos correctamente. Uno de nuestros analistas se pondrá en contacto contigo en breve para programar la demostración en vivo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Empresa</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="form-input"
                    required
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Número de Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ej: +56 9 1234 5678"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensaje / Requerimientos Especiales</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="form-input form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <label className="form-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.accept}
                    onChange={handleCheckbox}
                  />
                  <span>Acepto ser contactado para coordinar la demostración.</span>
                </label>

                {status === "error" && (
                  <p style={{ color: "#ef4444", fontSize: "0.9rem", marginBottom: "1rem" }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Enviando..." : "Solicitar Demo"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
