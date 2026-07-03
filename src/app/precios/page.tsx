export const runtime = "edge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import "../public.css";

export default function PreciosPage() {
  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        
        {/* Title & Subtitle */}
        <div className="section-header" style={{ marginBottom: "4rem" }}>
          <span className="section-subtitle">Valorización</span>
          <h1 className="section-title" style={{ fontSize: "3.2rem" }}>
            Modelo de Valorización iCenit
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "700px", margin: "1rem auto 0", lineHeight: "1.7", fontSize: "1.05rem" }}>
            Dimensionamos cada proyecto según su alcance, complejidad and objetivos. Entregamos oferta valorizada en menos de 12 horas hábiles.
          </p>
        </div>

        {/* Process Banner */}
        <div className="glass-panel pricing-process-banner" style={{ padding: "2rem 3rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "2.5rem", marginBottom: "5rem", maxWidth: "850px", margin: "0 auto 5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "50%", background: "#FF4100", color: "#fff", fontWeight: "700", fontSize: "1.1rem" }}>1</span>
            <span style={{ color: "#fff", fontWeight: "600", fontSize: "1.1rem" }}>Reunión de Entendimiento</span>
          </div>
          
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", minWidth: "150px" }}>
            <span style={{ color: "#FF4100", fontSize: "0.85rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.25rem" }}>
              ⚡ &lt; 12 Horas hábiles
            </span>
            <div style={{ width: "100%", height: "2px", borderTop: "2px dashed rgba(255,255,255,0.2)" }}></div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "50%", background: "#FF4100", color: "#fff", fontWeight: "700", fontSize: "1.1rem" }}>2</span>
            <span style={{ color: "#fff", fontWeight: "600", fontSize: "1.1rem" }}>Oferta Valorizada</span>
          </div>
        </div>

        {/* Two Pricing Stage Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", marginBottom: "6rem" }} className="consultant-row">
          
          {/* Card 1: Implementación */}
          <div className="glass-panel" style={{ padding: "3rem 2.5rem", display: "flex", flexDirection: "column", position: "relative" }}>
            <div style={{ alignSelf: "start", background: "#FF4100", color: "#fff", fontSize: "0.75rem", fontWeight: "700", padding: "0.35rem 1rem", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.5rem" }}>
              Etapa 1
            </div>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "2rem", fontWeight: "700", color: "#fff", marginBottom: "0.5rem" }}>
              Implementación
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#FF4100", fontWeight: "600", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
              <span>⏱</span>
              <span>3 a 8 semanas, normalmente</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "2rem" }}>
              Fase inicial para entregar plataforma operativa y configurada según tu estrategia.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span><strong>Historia:</strong> 2 a 3 años de datos.</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span><strong>Módulos:</strong> Cantidad de capacidades.</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span><strong>Estándares:</strong> Riesgos y controles estratégicos.</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span><strong>Fuentes:</strong> Integración de incidentes, ERP, SAP.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Uso de Plataforma */}
          <div className="glass-panel" style={{ padding: "3rem 2.5rem", display: "flex", flexDirection: "column", position: "relative" }}>
            <div style={{ alignSelf: "start", background: "#FF4100", color: "#fff", fontSize: "0.75rem", fontWeight: "700", padding: "0.35rem 1rem", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.5rem" }}>
              Etapa 2
            </div>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "2rem", fontWeight: "700", color: "#fff", marginBottom: "0.5rem" }}>
              Uso de Plataforma
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#FF4100", fontWeight: "600", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
              <span>🔄</span>
              <span>Recurrente Mensual</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "2rem" }}>
              Uso de la solución, soporte, cuentas de ingreso y licenciamiento de recursos.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span><strong>Fee Mensual:</strong> Uso y soporte continuo.</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span><strong>Usuarios:</strong> 3 grupos según cantidad.</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span><strong>Apoyo Experto:</strong> Acompañamiento en interpretación (opcional).</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span><strong>Change Management:</strong> Gestión del cambio cultural (opcional).</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Nuestro Enfoque */}
        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "5rem", marginBottom: "6rem" }}>
          <div style={{ marginBottom: "3rem", textAlign: "left" }}>
            <h2 className="section-title" style={{ textAlign: "left", fontSize: "2.4rem", marginBottom: "1rem" }}>
              Nuestro Enfoque
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.6", maxWidth: "800px" }}>
              Recomendamos comenzar de forma inteligente, normalmente mediante un piloto enfocado en los principales desafíos inmediatos de la organización.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "3rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem 3rem" }} className="consultant-row">
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "22px", height: "22px", color: "#FF4100", flexShrink: 0, marginTop: "0.2rem" }}>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  <span style={{ color: "#fff", fontSize: "1rem", lineHeight: "1.5" }}>Conocer rápidamente la herramienta en uso real</span>
                </div>
                <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "22px", height: "22px", color: "#FF4100", flexShrink: 0, marginTop: "0.2rem" }}>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  <span style={{ color: "#fff", fontSize: "1rem", lineHeight: "1.5" }}>Comenzar inicialmente desconectado para entender datos y sistemas</span>
                </div>
                <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "22px", height: "22px", color: "#FF4100", flexShrink: 0, marginTop: "0.2rem" }}>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  <span style={{ color: "#fff", fontSize: "1rem", lineHeight: "1.5" }}>Modelar información con mayor velocidad</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "22px", height: "22px", color: "#FF4100", flexShrink: 0, marginTop: "0.2rem" }}>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  <span style={{ color: "#fff", fontSize: "1rem", lineHeight: "1.5" }}>Asegurar adopción temprana</span>
                </div>
                <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "22px", height: "22px", color: "#FF4100", flexShrink: 0, marginTop: "0.2rem" }}>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  <span style={{ color: "#fff", fontSize: "1rem", lineHeight: "1.5" }}>Evidenciar resultados concretos rápidamente</span>
                </div>
                <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "22px", height: "22px", color: "#FF4100", flexShrink: 0, marginTop: "0.2rem" }}>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  <span style={{ color: "#fff", fontSize: "1rem", lineHeight: "1.5" }}>Preparar una escalabilidad posterior mucho más ágil</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stage 1: Implementación */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem", alignItems: "center", marginBottom: "6rem", borderTop: "1px solid var(--border-color)", paddingTop: "5rem" }} className="consultant-row">
          <div>
            <span style={{ color: "#FF4100", fontSize: "0.85rem", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              Etapa 1
            </span>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "2.4rem", fontWeight: "700", color: "#fff", marginBottom: "1.5rem" }}>
              Implementación
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "2rem" }}>
              Toda incorporación de iCenit considera una fase inicial de implementación, orientada a entregar la plataforma operativa, normalmente entre 3 y 10 semanas, según las variables que definen el proyecto.
            </p>
            
            <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "600", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Qué define el valor del proyecto:
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", padding: 0 }}>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span>Años de historia requeridos (referencia habitual: 2 a 3 años).</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span>Cantidad de módulos a implementar.</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span>Cantidad de estándares de riesgos y controles a incorporar desde la estrategia del cliente.</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span>Fuentes de información a integrar (incidentes, investigaciones, verificación de controles, reportes de peligros, otros).</span>
              </li>
            </ul>
          </div>

          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <img 
              src="/implementacion_etapa_1.png" 
              alt="Etapa 1: Implementación" 
              style={{ width: "100%", height: "auto", display: "block" }} 
            />
          </div>
        </div>

        {/* Detailed Stage 2: Uso de Plataforma */}
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "4rem", alignItems: "center", marginBottom: "6rem" }} className="consultant-row">
          
          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }} className="consultant-row-first-on-mobile">
            <img 
              src="/uso_plataforma_etapa_2.png" 
              alt="Etapa 2: Uso de Plataforma" 
              style={{ width: "100%", height: "auto", display: "block" }} 
            />
          </div>

          <div>
            <span style={{ color: "#FF4100", fontSize: "0.85rem", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              Etapa 2
            </span>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "2.4rem", fontWeight: "700", color: "#fff", marginBottom: "1.5rem" }}>
              Uso de Plataforma
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "2rem" }}>
              Una vez implementada, comienza la etapa recurrente de uso de iCenit con un esquema mensual claro y escalable.
            </p>
            
            <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "600", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Considera:
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", padding: 0 }}>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span>Años de historia requeridos (referencia habitual: 2 a 3 años).</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span>Cantidad de módulos a implementar.</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span>Cantidad de estándares de riesgos y controles a incorporar desde la estrategia del cliente.</span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "0.75rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                <span style={{ color: "#FF4100", fontWeight: "700" }}>→</span>
                <span>Fuentes de información a integrar (incidentes, investigaciones, verificación de controles, reportes de peligros, otros).</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="glass-panel" style={{ padding: "3rem 2rem", textAlign: "center", marginBottom: "5rem", borderTop: "2px solid #FF4100" }}>
          <p style={{ fontSize: "1.35rem", color: "#fff", margin: 0, fontWeight: "500", lineHeight: "1.6" }}>
            Nuestro foco es simple: <span style={{ color: "#FF4100", fontWeight: "700" }}>implementar bien</span>, lograr <span style={{ color: "#FF4100", fontWeight: "700" }}>uso real</span> y crecer con <span style={{ color: "#FF4100", fontWeight: "700" }}>inteligencia</span>.
          </p>
        </div>

        {/* Demo Button */}
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <Link href="/solicita-una-demo" className="btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}>
            Solicitar Oferta Comercial
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
