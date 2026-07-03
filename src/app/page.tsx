import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db, modules, useCases } from "@/db/client";
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
          <div className="hero-content-wrapper">
            <div className="animate-fade-in-up">
              <div className="hero-tag animate-fade-in-up delay-1">James AI Assistant®</div>
              <h1 className="hero-h1 text-gradient animate-fade-in-up delay-2">
                Transformamos datos en decisiones que anticipan riesgos en seguridad y medio ambiente
              </h1>
              <p className="hero-sub animate-fade-in-up delay-3">
                Inteligencia validada por expertos para proteger vidas y operaciones.
              </p>
              <div className="hero-ctas animate-fade-in-up delay-4">
                <Link href="/empresa/contacto" className="btn-primary">
                  Habla con un experto icenit
                </Link>
                <Link href="/solicita-una-demo" className="btn-secondary">
                  Solicita una Demo
                </Link>
              </div>
            </div>
            <div className="hero-image-container animate-fade-in-up delay-3" style={{ background: "transparent", border: "none", boxShadow: "none", display: "flex", justifyContent: "center", alignSelf: "end" }}>
              <img 
                src="/james-robot.webp" 
                alt="James - Asistente de IA de iCenit" 
                fetchPriority="high"
                className="hero-image" 
                style={{ 
                  width: "auto", 
                  display: "block",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)"
                }} 
              />
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="page-section animate-fade-in-up delay-5" style={{ paddingTop: 0 }}>
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
        <section className="page-section animate-fade-in-up delay-6" style={{ background: "rgba(255,255,255,0.01)" }}>
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
            <h2 className="section-title" style={{ fontSize: "2.1rem", fontWeight: 800, letterSpacing: "-0.5px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", flexWrap: "wrap" }}>
              Más de 40 empresas ya lideran con
              <img src="/james-logo.png" alt="James Logo" style={{ height: "2.3rem", width: "auto", display: "inline-block", verticalAlign: "middle" }} />
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

          <div className="client-logos-grid animate-fade-in-up delay-6">
            <img src="/logo-glencore.png" alt="Glencore" className="client-logo-item" loading="lazy" />
            <img src="/logo-flsmidth.png" alt="FLSmidth" className="client-logo-item" loading="lazy" />
            <img src="/logo-copec.png" alt="Copec" className="client-logo-item" loading="lazy" />
            <img src="/logo-enap.png" alt="ENAP" className="client-logo-item" loading="lazy" />
            <img src="/logo-arauco.png" alt="Arauco" className="client-logo-item" loading="lazy" />
            <img src="/logo-antofagasta.png" alt="Antofagasta Minerals" className="client-logo-item" loading="lazy" />
            <img src="/logo-mutual.png" alt="Mutual de Seguridad" className="client-logo-item" loading="lazy" />
            <img src="/logo-cmpc.png" alt="CMPC" className="client-logo-item" loading="lazy" />
            <img src="/logo-codelco.png" alt="Codelco" className="client-logo-item" loading="lazy" />
            <img src="/logo-bhp.png" alt="BHP" className="client-logo-item" loading="lazy" />
          </div>
        </section>

        {/* Modules Section */}
        <section className="page-section">
          <div className="section-header" style={{ textAlign: "left", marginBottom: "2.5rem" }}>
            <h2 className="section-title" style={{ textAlign: "left", fontSize: "2.2rem", fontWeight: 800 }}>Módulos</h2>
          </div>
          <div className="modules-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.75rem" }}>
            
            {/* Card 1: Analítica Avanzada */}
            <Link href="/categoria/analitica-avanzada" className="category-card">
              <div>
                <div style={{ position: "relative", width: "100%", height: "210px", overflow: "hidden" }}>
                  <img 
                    src="/grupo-analitica-avanzada-v3.webp" 
                    alt="Analítica Avanzada" 
                    className="category-card-img"
                    loading="lazy"
                  />
                </div>
                <div className="category-card-title-container">
                  <h3 className="category-card-title">Analítica Avanzada</h3>
                </div>
              </div>
            </Link>

            {/* Card 2: Aplicaciones */}
            <Link href="/categoria/aplicaciones" className="category-card">
              <div>
                <div style={{ position: "relative", width: "100%", height: "210px", overflow: "hidden" }}>
                  <img 
                    src="/grupo-aplicaciones-v3.webp" 
                    alt="Aplicaciones" 
                    className="category-card-img"
                    loading="lazy"
                  />
                </div>
                <div className="category-card-title-container">
                  <h3 className="category-card-title">Aplicaciones</h3>
                </div>
              </div>
            </Link>

            {/* Card 3: Apoyo a la Gestión */}
            <Link href="/categoria/apoyo-a-la-gestion" className="category-card">
              <div>
                <div style={{ position: "relative", width: "100%", height: "210px", overflow: "hidden" }}>
                  <img 
                    src="/grupo-apoyo-a-la-gestion-v3.webp" 
                    alt="Apoyo a la Gestión" 
                    className="category-card-img"
                    loading="lazy"
                  />
                </div>
                <div className="category-card-title-container">
                  <h3 className="category-card-title">Apoyo a la Gestión</h3>
                </div>
              </div>
            </Link>

          </div>
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/modulos" className="btn-secondary">
              Ver Todos los Módulos
            </Link>
          </div>
        </section>

        {/* Mascot Call to Action Section */}
        <section className="page-section animate-fade-in-up delay-6" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,65,0,0.02) 100%)", padding: "5rem 2rem" }}>
          <div className="mascot-cta-grid">
            
            {/* Left: Mascot Image */}
            <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <img 
                src="/james-robot-v3.webp" 
                alt="James AI Assistant" 
                loading="lazy"
                style={{ 
                  width: "100%", 
                  maxWidth: "320px", 
                  height: "auto", 
                  display: "block",
                  maskImage: "linear-gradient(to bottom, black 70%, transparent 96%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 96%)"
                }}
              />
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "280px",
                height: "280px",
                background: "radial-gradient(circle, rgba(255,65,0,0.12) 0%, rgba(255,65,0,0) 70%)",
                zIndex: -1,
                filter: "blur(20px)"
              }} />
            </div>

            {/* Right: Text Content */}
            <div style={{ textAlign: "left" }}>
              <h2 className="section-title" style={{ 
                textAlign: "left", 
                fontSize: "2.3rem", 
                lineHeight: "1.25", 
                fontWeight: 800,
                marginBottom: "1.5rem",
                fontFamily: "var(--font-title)",
                letterSpacing: "-0.5px"
              }}>
                ¿Cuántos incidentes podrías evitar si tuvieras la información antes de que ocurrieran?
              </h2>
              <p style={{ 
                fontSize: "1.15rem", 
                color: "var(--text-secondary)", 
                marginBottom: "2.5rem", 
                display: "flex", 
                alignItems: "center", 
                gap: "0.4rem",
                flexWrap: "wrap"
              }}>
                Descúbrelo con 
                <img src="/james-logo.png" alt="James" style={{ height: "1.4rem", width: "auto", display: "inline-block", verticalAlign: "middle" }} />
              </p>
              <div>
                <Link href="/empresa/contacto" className="btn-primary" style={{ 
                  background: "#FF4100", 
                  color: "#ffffff", 
                  padding: "1rem 2rem", 
                  borderRadius: "8px", 
                  fontWeight: 700, 
                  fontSize: "0.95rem",
                  letterSpacing: "0.5px",
                  textDecoration: "none",
                  display: "inline-block",
                  boxShadow: "0 4px 15px rgba(255,65,0,0.3)",
                  transition: "all 0.3s"
                }}>
                  HABLA CON UN EXPERTO ICENIT
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Data Driven Section */}
        <section className="page-section animate-fade-in-up delay-7" style={{ background: "rgba(255,255,255,0.01)" }}>
          <div className="data-driven-grid">
            <div>
              <span className="section-subtitle" style={{ textAlign: "left" }}>
                PLATAFORMA JAMES CLOUD PLATFORM
              </span>
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img 
                src="/ilustracion-grafico-icenit-vectorial.svg" 
                alt="Ilustración Plataforma James Cloud" 
                style={{ width: "100%", height: "auto", maxWidth: "600px", display: "block" }} 
              />
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section className="page-section animate-fade-in-up delay-7">
          <div className="section-header" style={{ marginBottom: "3rem" }}>
            <span className="section-subtitle">Casos de Uso</span>
            <h2 className="section-title">Casos reales, resultados concretos</h2>
            <p className="section-desc" style={{ maxWidth: "700px", margin: "0.75rem auto 0" }}>
              Con James, las organizaciones detectan patrones críticos, reducen incidentes y actúan más rápido.
            </p>
          </div>
          <div className="how-it-works-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {allCases.map((c) => {
              const caseImages: Record<string, string> = {
                "investigacion-de-accidente": "/caso-1.webp",
                "analisis-multivariable": "/caso-2.webp",
                "gestion-1-3-10": "/caso-3.webp"
              };
              return (
                <div key={c.id} className="step-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 0, overflow: "hidden" }}>
                  <div>
                    <div style={{ position: "relative", width: "100%", height: "220px", overflow: "hidden" }}>
                      <img 
                        src={caseImages[c.id] || "/caso-1.webp"} 
                        alt={c.title} 
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                      />
                    </div>
                    <div style={{ padding: "2rem 2rem 1rem 2rem" }}>
                      <h3 className="step-title" style={{ color: "#fff", marginTop: 0, marginBottom: "0.75rem", fontSize: "1.25rem", textAlign: "left" }}>
                        {c.title}
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", textAlign: "left" }}>
                        {c.context}
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: "0 2rem 2rem 2rem" }}>
                    <Link 
                      href={`/casos-de-uso/${c.id}`} 
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "var(--accent-blue-light)", 
                        fontWeight: "700", 
                        textDecoration: "none", 
                        fontSize: "0.8rem", 
                        letterSpacing: "1px", 
                        textTransform: "uppercase" 
                      }}
                    >
                      Ver Caso de Uso <span style={{ marginLeft: "0.5rem", fontSize: "0.95rem", fontWeight: "bold" }}>&gt;</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Final */}
        <section className="page-section animate-fade-in-up delay-8" style={{ borderTop: "1px solid var(--border-color)", paddingBottom: "8rem" }}>
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
