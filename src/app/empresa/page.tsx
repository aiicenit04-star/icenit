export const runtime = "edge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../public.css";

export default function EmpresaPage() {
  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        
        {/* Propósito Section */}
        <section style={{ marginBottom: "6rem", textAlign: "center", paddingTop: "2rem" }}>
          <h1 className="section-title" style={{ fontSize: "3.5rem", marginBottom: "2rem" }}>
            Propósito
          </h1>
          <p style={{ fontSize: "1.4rem", fontWeight: "700", color: "#fff", maxWidth: "900px", margin: "0 auto 1.75rem", lineHeight: "1.5" }}>
            Estamos convencidos de que el futuro de la seguridad se construye transformando experiencia, procesos y datos en inteligencia aplicada.
          </p>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "850px", margin: "0 auto", lineHeight: "1.7" }}>
            En iCenit ya estamos abriendo un camino único y disruptivo en el mercado: convertir información histórica y actual en decisiones proactivo-predictivas para organizaciones más seguras, inteligentes y capaces de aprender continuamente.
          </p>
        </section>

        {/* Historia Section (Timeline) */}
        <section style={{ marginBottom: "7rem", borderTop: "1px solid var(--border-color)", paddingTop: "5rem" }}>
          <div className="section-header" style={{ marginBottom: "3rem", textAlign: "left" }}>
            <h2 className="section-title" style={{ fontSize: "2.8rem", textAlign: "left" }}>
              Historia
            </h2>
          </div>

          <div className="timeline-container">
            {/* Symmetrical vertical line */}
            <div className="timeline-line"></div>

            {/* Node 1: Cenit Consultores */}
            <div className="timeline-row">
              {/* Left Column: Card */}
              <div className="timeline-card-col" style={{ display: "flex", justifyContent: "flex-end" }}>
                <div className="glass-panel" style={{ padding: "2.2rem", maxWidth: "450px" }}>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: "0 0 1.25rem" }}>
                    Hace más de 20 años nace CENIT Consultores, especializada en seguridad, investigación de incidentes, riesgos operacionales y desarrollo de capacidades para grandes organizaciones nacionales e internacionales.
                  </p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
                    De esa trayectoria surgió un aprendizaje clave: la calidad de la información es esencial para generar buenos análisis, mejores decisiones y aprendizajes reales.
                  </p>
                </div>
              </div>

              {/* Middle Column: Node */}
              <div className="timeline-node-col" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2 }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#FF4100", border: "4px solid #05070c", boxShadow: "0 0 0 4px #FF4100" }}></div>
              </div>

              {/* Right Column: Label */}
              <div className="timeline-label-col" style={{ textAlign: "left", paddingLeft: "1.5rem" }}>
                <span style={{ color: "#FF4100", fontWeight: "700", letterSpacing: "1.2px", textTransform: "uppercase", fontSize: "1.05rem" }}>
                  CENIT CONSULTORES
                </span>
              </div>
            </div>

            {/* Node 2: iCenit */}
            <div className="timeline-row">
              {/* Left Column: Label */}
              <div className="timeline-label-col" style={{ textAlign: "right", paddingRight: "1.5rem" }}>
                <span style={{ color: "#FF4100", fontWeight: "700", letterSpacing: "1.2px", textTransform: "uppercase", fontSize: "1.05rem" }}>
                  ICENIT
                </span>
              </div>

              {/* Middle Column: Node */}
              <div className="timeline-node-col" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2 }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#FF4100", border: "4px solid #05070c", boxShadow: "0 0 0 4px #FF4100" }}></div>
              </div>

              {/* Right Column: Card */}
              <div className="timeline-card-col" style={{ display: "flex", justifyContent: "flex-start" }}>
                <div className="glass-panel" style={{ padding: "2.2rem", maxWidth: "450px" }}>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: "0 0 1.25rem" }}>
                    Hace cinco años, esa experiencia se cruza con una visión digital clara: combinar experiencia humana, procesos estructurados y datos de calidad para resolver problemas complejos y avanzar hacia una gestión capaz de anticiparse.
                  </p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
                    Así nace iCenit, una plataforma modular, inteligente y especializada en riesgos de seguridad y medio ambiente, creada para transformar la gestión desde un enfoque reactivo hacia uno más preventivo, analítico y habilitador de capacidades predictivas.
                  </p>
                </div>
              </div>
            </div>

            {/* Node 3: Hoy */}
            <div className="timeline-row" style={{ marginBottom: 0 }}>
              {/* Left Column: Card */}
              <div className="timeline-card-col" style={{ display: "flex", justifyContent: "flex-end" }}>
                <div className="glass-panel" style={{ padding: "2.2rem", maxWidth: "450px" }}>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
                    Hoy seguimos evolucionando con un propósito claro: convertir datos y experiencia en decisiones que ayuden a construir organizaciones más seguras, inteligentes y con mayor capacidad de aprendizaje continuo.
                  </p>
                </div>
              </div>

              {/* Middle Column: Node */}
              <div className="timeline-node-col" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2 }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#FF4100", border: "4px solid #05070c", boxShadow: "0 0 0 4px #FF4100" }}></div>
              </div>

              {/* Right Column: Label */}
              <div className="timeline-label-col" style={{ textAlign: "left", paddingLeft: "1.5rem" }}>
                <span style={{ color: "#FF4100", fontWeight: "700", letterSpacing: "1.2px", textTransform: "uppercase", fontSize: "1.05rem" }}>
                  HOY
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Nuestro Equipo Section */}
        <section style={{ marginBottom: "4rem", borderTop: "1px solid var(--border-color)", paddingTop: "5rem" }}>
          <div style={{ marginBottom: "3.5rem", textAlign: "left" }}>
            <h2 className="section-title" style={{ fontSize: "2.8rem", textAlign: "left", marginBottom: "1rem" }}>
              Nuestro Equipo
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", lineHeight: "1.6", maxWidth: "900px" }}>
              iCenit reúne experiencia en seguridad y salud ocupacional, analítica avanzada, transformación digital e implementación de soluciones industriales.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3rem" }} className="consultant-row">
            <div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.7", margin: 0 }}>
                El equipo es liderado por socios con más de 20 años de trayectoria en SSO, gestión de proyectos digitales, consultoría industrial y desarrollo de plataformas tecnológicas para grandes organizaciones en Chile y Sudamérica.
              </p>
            </div>
            <div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.7", margin: 0 }}>
                Complementamos esta experiencia con un equipo técnico especializado en arquitectura cloud, desarrollo de aplicaciones, inteligencia artificial y QA/QC, asegurando soluciones robustas, escalables y orientadas a resultados reales.
              </p>
            </div>
            <div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.7", margin: 0 }}>
                Esta combinación nos permite acompañar al cliente desde la definición estratégica hasta la implementación y uso efectivo de la plataforma.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
