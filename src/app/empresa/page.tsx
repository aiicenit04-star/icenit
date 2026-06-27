import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import "../public.css";

export default function EmpresaPage() {
  const team = [
    {
      name: "Javier Pinto Jaén",
      role: "Socio Fundador - Especialista SSO",
      desc: "Más de 20 años de experiencia en consultoría industrial, investigación de incidentes y estrategias de seguridad y salud ocupacional.",
    },
    {
      name: "Pablo Herrera Dimter",
      role: "Socio Fundador - Transformación Digital",
      desc: "Especialista en arquitectura tecnológica cloud, analítica avanzada y desarrollo de soluciones industriales aplicadas a operaciones críticas.",
    },
    {
      name: "Mario Demarchi Rosa",
      role: "Socio - Operaciones & QA/QC",
      desc: "Dirección de proyectos de software, aseguramiento de la calidad e implementación ágil en empresas del sector energía y minería.",
    },
  ];

  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div className="section-header" style={{ marginBottom: "5rem" }}>
          <span className="section-subtitle">Nuestra Empresa</span>
          <h1 className="section-title" style={{ fontSize: "3.5rem" }}>
            Propósito e Historia
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            Estamos convencidos de que el futuro de la seguridad se construye transformando experiencia, procesos y datos en inteligencia aplicada.
          </p>
        </div>

        {/* Purpose */}
        <section className="problem-card" style={{ marginBottom: "5rem", textAlign: "center", padding: "3.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1.5rem", fontSize: "2rem" }}>Nuestro Propósito</h2>
          <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "var(--text-primary)", fontWeight: "500" }}>
            Convertir información histórica y actual en decisiones proactivo-predictivas para organizaciones más seguras, inteligentes y capaces de aprender continuamente.
          </p>
        </section>

        {/* History timeline */}
        <section style={{ marginBottom: "6rem" }}>
          <div className="section-header" style={{ marginBottom: "3rem" }}>
            <h2 className="section-title" style={{ fontSize: "2rem" }}>Nuestra Trayectoria</h2>
          </div>
          <div className="how-it-works-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <div className="step-card">
              <span className="step-number" style={{ fontSize: "2rem", color: "rgba(37,99,235,0.2)" }}>20+ años</span>
              <h3 className="step-title" style={{ color: "#fff" }}>Cenit Consultores</h3>
              <p className="step-desc" style={{ fontSize: "0.95rem" }}>
                Nace CENIT Consultores, especializada en seguridad, investigación de incidentes, riesgos operacionales y desarrollo de capacidades. Nace el aprendizaje clave: la calidad de la información es esencial para generar buenos análisis.
              </p>
            </div>
            <div className="step-card">
              <span className="step-number" style={{ fontSize: "2rem", color: "rgba(37,99,235,0.2)" }}>5 años</span>
              <h3 className="step-title" style={{ color: "#fff" }}>Nace iCenit</h3>
              <p className="step-desc" style={{ fontSize: "0.95rem" }}>
                Se fusiona la experiencia SSO con la visión digital. Nace iCenit: una plataforma modular, inteligente y especializada en riesgos de seguridad y medio ambiente para transformar la gestión reactiva en preventiva.
              </p>
            </div>
            <div className="step-card" style={{ borderRightColor: "var(--accent-blue-light)" }}>
              <span className="step-number" style={{ fontSize: "2rem", color: "var(--accent-blue-light)" }}>Hoy</span>
              <h3 className="step-title" style={{ color: "var(--accent-blue-light)" }}>Evolución Continua</h3>
              <p className="step-desc" style={{ fontSize: "0.95rem" }}>
                Convertimos datos y experiencia en decisiones rápidas y eficaces que ayudan a construir organizaciones seguras, inteligentes y con una gran cultura de aprendizaje organizacional.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section style={{ marginBottom: "3rem" }}>
          <div className="section-header" style={{ marginBottom: "4rem" }}>
            <span className="section-subtitle">Equipo</span>
            <h2 className="section-title" style={{ fontSize: "2.5rem" }}>Liderazgo y Experiencia</h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", fontSize: "0.95rem" }}>
              Combinamos consultores senior de seguridad industrial con ingenieros expertos en analítica de datos, inteligencia artificial y arquitectura de software.
            </p>
          </div>
          <div className="how-it-works-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {team.map((t, idx) => (
              <div key={idx} className="step-card" style={{ background: "rgba(17,24,39,0.6)" }}>
                <h3 className="step-title" style={{ color: "#fff", marginBottom: "0.25rem" }}>{t.name}</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--accent-blue-light)", fontWeight: 600, display: "block", marginBottom: "1.25rem" }}>
                  {t.role}
                </span>
                <p className="step-desc" style={{ fontSize: "0.9rem" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
