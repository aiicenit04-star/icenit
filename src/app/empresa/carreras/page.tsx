"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import "../../public.css";

export default function CarrerasPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "Desarrollo de IA",
    message: "",
    accept: false,
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("El archivo excede el tamaño máximo de 5 MB.");
        setStatus("error");
        return;
      }
      setCvFile(file);
      setErrorMsg("");
    }
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
    if (!cvFile) {
      setErrorMsg("Debes adjuntar tu Hoja de Vida (PDF).");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const sendData = new FormData();
      sendData.append("type", "career");
      sendData.append("name", formData.name);
      sendData.append("email", formData.email);
      sendData.append("phone", formData.phone);
      sendData.append("position", formData.position);
      sendData.append("message", formData.message);
      sendData.append("cv", cvFile);

      const res = await fetch("/api/leads", {
        method: "POST",
        body: sendData, // Do NOT set Content-Type header when sending FormData! Browser sets it automatically with boundary values.
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error");
      }

      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al enviar la postulación.");
      setStatus("error");
    }
  };

  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div className="section-header" style={{ marginBottom: "4rem" }}>
          <span className="section-subtitle">Únete al Equipo</span>
          <h1 className="section-title" style={{ fontSize: "3rem" }}>
            Carreras en iCenit
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            En iCenit creemos en el talento, la innovación y el poder de las ideas para transformar industrias. ¡Nos encantaría conocerte!
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start", maxWidth: "1100px", margin: "0 auto" }}>
          {/* Values and Benefits */}
          <div className="glass-panel" style={{ padding: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.5rem", marginBottom: "1.5rem", color: "#fff" }}>
              ¿Por qué iCenit?
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "2rem" }}>
              Si te apasiona la tecnología, disfrutas resolver desafíos y quieres formar parte de un equipo que impulsa soluciones con impacto real en seguridad y medio ambiente, te ofrecemos un entorno colaborativo y de aprendizaje continuo.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              <div style={{ padding: "0.75rem", borderLeft: "3px solid var(--accent-blue)", background: "rgba(255,255,255,0.01)" }}>
                <strong>Impacto Real:</strong> Protegemos vidas y operaciones críticas industriales.
              </div>
              <div style={{ padding: "0.75rem", borderLeft: "3px solid var(--accent-blue)", background: "rgba(255,255,255,0.01)" }}>
                <strong>Tecnología de Vanguardia:</strong> Modelos predictivos de IA e integraciones escalables.
              </div>
              <div style={{ padding: "0.75rem", borderLeft: "3px solid var(--accent-blue)", background: "rgba(255,255,255,0.01)" }}>
                <strong>Flexibilidad y Aprendizaje:</strong> Desafíos constantes y crecimiento profesional continuo.
              </div>
            </div>
          </div>

          {/* Careers Form */}
          <div className="glass-panel" style={{ padding: "3rem" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(16,185,129,0.1)", color: "var(--accent-green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 1.5rem" }}>
                  ✓
                </div>
                <h3 style={{ fontFamily: "var(--font-title)", fontSize: "1.5rem", marginBottom: "1rem", color: "#fff" }}>
                  ¡Postulación Recibida!
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  Hemos recibido tu currículum. Si tu perfil calza con alguna de nuestras búsquedas activas, nos pondremos en contacto contigo para iniciar el proceso de entrevista.
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
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="position">Vacante o Área de Interés</label>
                  <select
                    id="position"
                    name="position"
                    className="form-input form-select"
                    value={formData.position}
                    onChange={handleChange}
                  >
                    <option value="Desarrollo de IA">Desarrollo de IA / Data Science</option>
                    <option value="Desarrollo Full Stack">Desarrollo Full Stack (React / Node)</option>
                    <option value="Especialista en Seguridad Industrial">Especialista en Seguridad Industrial (SSO)</option>
                    <option value="Ventas y Cuentas Clave">Key Account Manager / Ventas B2B</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensaje Breve (Opcional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="form-input form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cv">Hoja de Vida (PDF, máx. 5 MB)</label>
                  <input
                    type="file"
                    id="cv"
                    accept=".pdf"
                    className="form-input"
                    required
                    onChange={handleFileChange}
                    style={{ paddingTop: "0.5rem" }}
                  />
                </div>

                <label className="form-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.accept}
                    onChange={handleCheckbox}
                  />
                  <span>Acepto la política de privacidad.</span>
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
                  {status === "submitting" ? "Enviando..." : "QUIERO UNIRME AL EQUIPO"}
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
