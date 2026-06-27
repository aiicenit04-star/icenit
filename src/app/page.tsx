import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db, modules, useCases } from "@/db/client";
import WaveBackground from "@/components/WaveBackground";
import "./public.css";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allModules = await db.select().from(modules);
  const allCases = await db.select().from(useCases);

  return (
    <>
      <Header />
      
      <main style={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <section className="hero-section">
          <WaveBackground />
          <div className="hero-content-wrapper">
            <div>
              <div className="hero-tag">James AI Assistant®</div>
              <h1 className="hero-h1 text-gradient">
                Transformamos datos en decisiones que anticipan riesgos en seguridad y medio ambiente
              </h1>
              <p className="hero-sub">
                Inteligencia validada por expertos para proteger vidas y operaciones.
              </p>
              <div className="hero-ctas">
                <Link href="/empresa/contacto" className="btn-primary">
                  Habla con un experto icenit
                </Link>
                <Link href="/solicita-una-demo" className="btn-secondary">
                  Solicita una Demo
                </Link>
              </div>
            </div>
            <div className="hero-image-container" style={{ background: "transparent", border: "none", boxShadow: "none", display: "flex", justifyContent: "center", alignSelf: "end" }}>
              <img 
                src="/james-robot.png" 
                alt="James - Asistente de IA de iCenit" 
                className="hero-image" 
                style={{ 
                  maxHeight: "360px", 
                  width: "auto", 
                  display: "block",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)"
                }} 
              />
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="page-section" style={{ paddingTop: 0 }}>
          <div className="problem-card">
            <p className="problem-text">
              <span className="problem-highlight">
                Los incidentes no avisan. La falta de visibilidad puede costar millones — o vidas.
              </span>
              <br />
              <span style={{ color: "var(--accent-blue)" }}>James cambia eso.</span> Con inteligencia predictiva y validación experta, convierte señales dispersas en decisiones que previenen el próximo accidente.
            </p>
          </div>
        </section>

        {/* How It Works (01 / 03 / 10) */}
        <section className="page-section" style={{ background: "rgba(255,255,255,0.01)" }}>
          <div className="section-header">
            <span className="section-subtitle">Cómo lo hace James</span>
            <h2 className="section-title">De los datos al control total, en solo minutos</h2>
            <p className="section-desc">
              James transforma tu información en alertas, explicaciones y acciones validadas por expertos.
            </p>
          </div>
          <div className="how-it-works-grid">
            <div className="step-card">
              <span className="step-number">01"</span>
              <div className="step-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="step-title">Detecta</h3>
              <p className="step-desc">
                James identifica desviaciones en tiempo real, comparando variables y contextos.
              </p>
            </div>
            <div className="step-card">
              <span className="step-number">03"</span>
              <div className="step-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
                </svg>
              </div>
              <h3 className="step-title">Entiende</h3>
              <p className="step-desc">
                Explica causas raíz mediante modelos explicativos validados por expertos.
              </p>
            </div>
            <div className="step-card">
              <span className="step-number">10"</span>
              <div className="step-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="step-title">Actúa</h3>
              <p className="step-desc">
                Entrega alertas y recomendaciones accionables para mitigar el riesgo antes del incidente.
              </p>
            </div>
          </div>
        </section>

        {/* Stats / Social Proof */}
        <section className="page-section" style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
          <div className="section-header" style={{ marginBottom: "2.5rem" }}>
            <h2 className="section-title" style={{ fontSize: "2.0rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.5px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", flexWrap: "wrap" }}>
              Más de 40 empresas ya lideran con
              <img src="/james-dots.png" alt="James Dots" style={{ height: "1.2rem", width: "auto", mixBlendMode: "screen", display: "inline-block" }} />
            </h2>
            <p className="section-desc" style={{ maxWidth: "700px", margin: "0.75rem auto 0", fontSize: "1.0rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
              Desde minería hasta energía y transporte, ICENIT impulsa decisiones seguras en los sectores más exigentes.
            </p>
          </div>

          <div className="stats-grid" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
            <div className="stat-item">
              <span className="stat-number">+40</span>
              <span className="stat-label">Empresas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">06</span>
              <span className="stat-label">Países</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">13</span>
              <span className="stat-label">Sectores</span>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="page-section">
          <div className="section-header">
            <span className="section-subtitle">Módulos</span>
            <h2 className="section-title">James Cloud Platform</h2>
          </div>
          <div className="modules-grid">
            {allModules.slice(0, 6).map((m) => (
              <div key={m.id} className="module-card">
                <div>
                  <span className="module-meta">
                    {m.category.replace("-", " ")}
                  </span>
                  <h3 className="module-title">{m.title}</h3>
                  <p className="module-desc">{m.metaDescription}</p>
                </div>
                <Link href={`/modulos/${m.id}`} className="module-link">
                  Saber más &rarr;
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/modulos" className="btn-secondary">
              Ver Todos los Módulos
            </Link>
          </div>
        </section>

        {/* Data Driven Section */}
        <section className="page-section" style={{ background: "rgba(255,255,255,0.01)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div>
              <h2 className="section-title" style={{ textAlign: "left", marginBottom: "1.5rem" }}>
                ¿Qué significa ser una plataforma Data Driven?
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                Significa que cada decisión que James sugiere está respaldada por datos reales de tu operación.
                No trabaja con supuestos, sino con información concreta, analizada con inteligencia artificial,
                patrones multicausales y visualización avanzada.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
                Esto permite detectar riesgos antes de que se materialicen y actuar con mayor precisión.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: "3rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ padding: "1rem", borderLeft: "4px solid var(--accent-blue)", background: "rgba(255,255,255,0.02)" }}>
                <strong style={{ display: "block", marginBottom: "0.25rem" }}>Predicción Temprana</strong>
                <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Algoritmos avanzados que anticipan el próximo incidente.</span>
              </div>
              <div style={{ padding: "1rem", borderLeft: "4px solid var(--accent-green)", background: "rgba(255,255,255,0.02)" }}>
                <strong style={{ display: "block", marginBottom: "0.25rem" }}>Evidencia Concreta</strong>
                <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Decisiones respaldadas por telemetría e histórico operativo.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section className="page-section">
          <div className="section-header">
            <span className="section-subtitle">Casos de Éxito</span>
            <h2 className="section-title">Resultados validados en terreno</h2>
          </div>
          <div className="how-it-works-grid">
            {allCases.map((c) => (
              <div key={c.id} className="step-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 className="step-title" style={{ color: "#fff" }}>{c.title}</h3>
                  <p className="step-desc" style={{ fontSize: "0.9rem" }}>{c.context}</p>
                </div>
                <Link href={`/modulos/casos?case=${c.id}`} className="module-link" style={{ marginTop: "1.5rem" }}>
                  Ver Caso Completo &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="page-section" style={{ borderTop: "1px solid var(--border-color)", paddingBottom: "8rem" }}>
          <div className="problem-card" style={{ background: "radial-gradient(circle at center, rgba(37,99,235,0.1) 0%, transparent 80%)" }}>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
              JAMES AI ASSISTANT® — Hablemos del futuro de tu operación
            </h2>
            <p className="hero-sub" style={{ margin: "0 auto 2.5rem" }}>
              Tu operación es única. Cuéntanos cómo podemos ayudarte a anticipar riesgos y proteger lo que más importa.
            </p>
            <Link href="/empresa/contacto" className="btn-primary">
              Habla con un experto icenit
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
