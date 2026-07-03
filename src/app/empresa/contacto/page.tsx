"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import "../../public.css";

interface TeamMember { id: string; name: string; role: string; photo_url: string; whatsapp: string; display_order: number; }

export default function ContactoPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch('/api/admin/team')
      .then(r => r.ok ? r.json() : [])
      .catch(() => [])
      .then((data) => {
        // Team API is admin-protected; fall back to defaults if not authenticated
        if (Array.isArray(data) && data.length > 0) setTeam(data);
        else setTeam([
          { id: 'javier-pinto', name: 'JAVIER PINTO JAÉN', role: 'Consultor Senior', photo_url: '/javier_icenit.jpg', whatsapp: '+56982947647', display_order: 1 },
          { id: 'pablo-herrera', name: 'PABLO HERRERA DIMTER', role: 'Consultor Senior', photo_url: '/pablo_icenit.jpg', whatsapp: '+56991282833', display_order: 2 },
        ]);
      });
  }, []);

  // Use default team data if fetch hasn't resolved yet
  const displayTeam: TeamMember[] = team.length > 0 ? team : [
    { id: 'javier-pinto', name: 'JAVIER PINTO JAÉN', role: 'Consultor Senior', photo_url: '/javier_icenit.jpg', whatsapp: '+56982947647', display_order: 1 },
    { id: 'pablo-herrera', name: 'PABLO HERRERA DIMTER', role: 'Consultor Senior', photo_url: '/pablo_icenit.jpg', whatsapp: '+56991282833', display_order: 2 },
  ];

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "Consulta general",
    message: "",
    accept: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleConsultantClick = (subjectValue: string) => {
    setFormData((prev) => ({ ...prev, subject: subjectValue }));
    const formElement = document.getElementById("contact-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
    const nameInput = document.getElementById("name");
    if (nameInput) {
      setTimeout(() => {
        nameInput.focus();
      }, 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, accept: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accept) {
      setErrorMsg("Debes aceptar la política de privacidad para continuar.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error");
      }

      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al enviar el mensaje.");
      setStatus("error");
    }
  };

  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div className="section-header" style={{ marginBottom: "4rem" }}>
          <span className="section-subtitle">Contacto</span>
          <h1 className="section-title" style={{ fontSize: "3rem" }}>
            Hablemos
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad.
          </p>
        </div>

        <div id="contact-form-section" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start", maxWidth: "1100px", margin: "0 auto" }}>
          {/* Info Column */}
          <div className="glass-panel" style={{ padding: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.5rem", marginBottom: "1.5rem", color: "#fff" }}>
              Información de Contacto
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "2rem" }}>
              Atendemos consultas de lunes a viernes, de 9:00 a.m. a 6:00 p.m. (GMT-3), y respondemos la mayoría de los mensajes en un plazo de 4 a 6 horas hábiles.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "0.95rem" }}>
              <div>
                <strong style={{ color: "#fff", display: "block" }}>Dirección:</strong>
                <span style={{ color: "var(--text-secondary)" }}>Estoril 200, Piso 10, Santiago de Chile</span>
              </div>
              <div>
                <strong style={{ color: "#fff", display: "block" }}>Email:</strong>
                <span style={{ color: "var(--text-secondary)" }}>contacto@icenit.ai</span>
              </div>
              <div>
                <strong style={{ color: "#fff", display: "block" }}>Teléfono:</strong>
                <span style={{ color: "var(--text-secondary)" }}>(+562) 284 09 598</span>
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
                  ¡Mensaje Enviado!
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  Hemos recibido tu consulta. Nos pondremos en contacto contigo en las próximas horas hábiles.
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
                  <label htmlFor="company">Empresa (Opcional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="form-input"
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
                  <label htmlFor="phone">Número de Teléfono (Opcional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Asunto</label>
                  <select
                    id="subject"
                    name="subject"
                    className="form-input form-select"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="Consulta general">Consulta general</option>
                    <option value="Soluciones para Gerencia del SSO">Soluciones para Gerencia del SSO</option>
                    <option value="Implementación JAMES">Implementación JAMES</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="form-input form-textarea"
                    required
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
                  <span>Acepto ser contactado y la política de privacidad.</span>
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
                  {status === "submitting" ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>

          {/* Consultants Section */}
          <div style={{ marginTop: "6rem", display: "flex", flexDirection: "column", gap: "4rem", maxWidth: "1100px", margin: "6rem auto 0" }}>
            
            {/* Consultant 1 — first team member */}
            {displayTeam[0] && (
            <div className="consultant-row">
              {/* Text Card */}
              <div className="glass-panel" style={{ padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "2rem", fontWeight: "800", color: "#fff", marginBottom: "1rem", textAlign: "left" }}>
                  ¿Cómo puede ayudarte James?
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", fontWeight: "500", marginBottom: "1.5rem", textAlign: "left" }}>
                  Proveemos soluciones concretas a las necesidades de la gerencia del SSO
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5", textAlign: "left" }}>
                    <span style={{ color: "var(--accent-blue-light)", fontWeight: "bold", fontSize: "1.1rem" }}>✓</span>
                    <span>Alinea tu estrategia, riesgos y mide el desempeño.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5", textAlign: "left" }}>
                    <span style={{ color: "var(--accent-blue-light)", fontWeight: "bold", fontSize: "1.1rem" }}>✓</span>
                    <span>Ayuda a tu organización a mitigar riesgos, reducir incidentes y disminuirlos.</span>
                  </li>
                </ul>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem", textAlign: "left" }}>
                  Con más de 20 años en la consultoría de SSO desarrollando estrategias y políticas, ejecutando investigaciones en un amplio rubro de industrias.
                </p>
                <p style={{ color: "var(--accent-blue-light)", fontWeight: "700", fontSize: "0.95rem", margin: 0, textAlign: "left" }}>
                  Conéctate con nuestros consultores especialistas.
                </p>
              </div>
              {/* Person Card */}
              <div className="glass-panel" style={{ padding: "3rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ width: "160px", height: "160px", borderRadius: "50%", overflow: "hidden", marginBottom: "1.5rem", border: "2px solid rgba(255, 65, 0, 0.2)" }}>
                  <img src={displayTeam[0].photo_url} alt={displayTeam[0].name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.1rem", fontWeight: "700", color: "#fff", marginBottom: "1.5rem", letterSpacing: "0.5px" }}>
                  {displayTeam[0].name.toUpperCase()}
                </h3>
                <a href={`https://wa.me/${displayTeam[0].whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-primary"
                  style={{ padding: "0.75rem 2.5rem", borderRadius: "6px", fontWeight: "700", fontSize: "0.9rem", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.5px", textDecoration: "none", display: "inline-block" }}>
                  Hablemos
                </a>
              </div>
            </div>
            )}

            {/* Consultant 2 — second team member */}
            {displayTeam[1] && (
            <div className="consultant-row" style={{ gridTemplateColumns: "0.9fr 2.1fr" }}>
              {/* Person Card */}
              <div className="glass-panel" style={{ padding: "3rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ width: "160px", height: "160px", borderRadius: "50%", overflow: "hidden", marginBottom: "1.5rem", border: "2px solid rgba(255, 65, 0, 0.2)" }}>
                  <img src={displayTeam[1].photo_url} alt={displayTeam[1].name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.1rem", fontWeight: "700", color: "#fff", marginBottom: "1.5rem", letterSpacing: "0.5px" }}>
                  {displayTeam[1].name.toUpperCase()}
                </h3>
                <a href={`https://wa.me/${displayTeam[1].whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-primary"
                  style={{ padding: "0.75rem 2.5rem", borderRadius: "6px", fontWeight: "700", fontSize: "0.9rem", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.5px", textDecoration: "none", display: "inline-block" }}>
                  Hablemos
                </a>
              </div>
              {/* Text Card */}
              <div className="glass-panel" style={{ padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "2rem", fontWeight: "800", color: "#fff", marginBottom: "1rem", textAlign: "left" }}>
                  ¿No sabes cómo implementarlo?
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", fontWeight: "500", marginBottom: "1.5rem", textAlign: "left" }}>
                  Desplegamos la solución de manera ágil y rápida:
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5", textAlign: "left" }}>
                    <span style={{ color: "var(--accent-blue-light)", fontWeight: "bold", fontSize: "1.1rem" }}>✓</span>
                    <span>Ofrecemos PoC para validar nuestra solución.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5", textAlign: "left" }}>
                    <span style={{ color: "var(--accent-blue-light)", fontWeight: "bold", fontSize: "1.1rem" }}>✓</span>
                    <span>Implementamos pilotos de uno o todos los módulos.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5", textAlign: "left" }}>
                    <span style={{ color: "var(--accent-blue-light)", fontWeight: "bold", fontSize: "1.1rem" }}>✓</span>
                    <span>Desplegamos la solución a toda la organización.</span>
                  </li>
                </ul>
                <p style={{ color: "var(--accent-blue-light)", fontWeight: "700", fontSize: "0.95rem", margin: 0, textAlign: "left" }}>
                  Conéctate con nuestros consultores en producto e implementación.
                </p>
              </div>
            </div>
            )}
          </div>{/* end consultants section */}

      </main>

      <Footer />
    </>
  );
}
