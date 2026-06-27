import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import "../public.css";

export default function PreciosPage() {
  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div className="section-header" style={{ marginBottom: "5rem" }}>
          <span className="section-subtitle">Valorización</span>
          <h1 className="section-title" style={{ fontSize: "3rem" }}>
            Modelo de Valorización iCenit
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            Dimensionamos cada proyecto según su alcance, complejidad y objetivos. Entregamos una oferta valorizada en menos de 12 horas hábiles.
          </p>
        </div>

        {/* Contract Process */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "5rem" }}>
          <div className="glass-panel" style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent-blue-light)", fontWeight: 700, marginBottom: "0.5rem" }}>
              Contratación Ágil
            </span>
            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.75rem", marginBottom: "1rem" }}>
              Proceso de Contratación
            </h2>
            <ol style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "1rem" }}>
              <li><strong>Reunión de Entendimiento:</strong> Analizamos juntos los desafíos de tu operación y los datos disponibles.</li>
              <li><strong>Oferta Valorizada:</strong> Te entregamos una propuesta personalizada en menos de 12 horas hábiles.</li>
            </ol>
          </div>
          <div className="glass-panel" style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "4px solid var(--accent-green)" }}>
            <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", fontFamily: "var(--font-title)" }}>
              Piloto Recomendado
            </span>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
              Recomendamos comenzar mediante un piloto enfocado en los principales desafíos inmediatos de la organización para asegurar adopción temprana y evidenciar resultados concretos rápidamente.
            </p>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="pricing-grid">
          {/* Tier 1: Implementación */}
          <div className="pricing-card">
            <h2 className="pricing-title">Etapa 1: Implementación</h2>
            <p className="pricing-desc">Fase inicial para configurar y entregar la plataforma configurada según tu estrategia.</p>
            <span className="pricing-duration">Duración: 3 a 8 semanas</span>
            
            <h3 style={{ fontSize: "0.9rem", textTransform: "uppercase", color: "#fff", marginBottom: "1rem" }}>Variables del Proyecto:</h3>
            <ul className="pricing-features">
              <li>Historial: 2 a 3 años de datos operacionales.</li>
              <li>Módulos: Cantidad de capacidades activas.</li>
              <li>Estándares: Riesgos y controles estratégicos.</li>
              <li>Integración: Conexión con sistemas ERP, SAP, etc.</li>
            </ul>
          </div>

          {/* Tier 2: Uso recurrente */}
          <div className="pricing-card featured">
            <div className="pricing-badge">Recomendado</div>
            <h2 className="pricing-title">Etapa 2: Licenciamiento</h2>
            <p className="pricing-desc">Acceso continuo a la plataforma James Cloud, soporte dedicado y actualizaciones.</p>
            <span className="pricing-duration">Modalidad: Suscripción Mensual</span>

            <h3 style={{ fontSize: "0.9rem", textTransform: "uppercase", color: "#fff", marginBottom: "1rem" }}>¿Qué Incluye?</h3>
            <ul className="pricing-features">
              <li>Fee Mensual: Uso y soporte continuo ilimitado.</li>
              <li>Usuarios: 3 grupos de acceso según volumen.</li>
              <li>Apoyo Experto: Acompañamiento técnico analítico (opcional).</li>
              <li>Change Management: Apoyo en transformación cultural (opcional).</li>
            </ul>
          </div>
        </div>

        {/* Pilot Focus */}
        <div className="problem-card" style={{ marginTop: "5rem", textAlign: "left", padding: "3.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1.5rem", fontSize: "2rem" }}>Nuestro Enfoque</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <ul className="pricing-features" style={{ marginBottom: 0 }}>
              <li>Conocer rápidamente la herramienta en uso real.</li>
              <li>Comenzar inicialmente desconectado para entender datos.</li>
              <li>Modelar la información con mayor velocidad.</li>
            </ul>
            <ul className="pricing-features" style={{ marginBottom: 0 }}>
              <li>Asegurar una adopción temprana en terreno.</li>
              <li>Evidenciar resultados concretos en corto plazo.</li>
              <li>Preparar una escalabilidad posterior ágil.</li>
            </ul>
          </div>
          <p style={{ marginTop: "2.5rem", fontStyle: "italic", fontSize: "1.2rem", color: "var(--accent-blue-light)", fontWeight: 600, textAlign: "center" }}>
            \"Nuestro foco es simple: implementar bien, lograr uso real y crecer con inteligencia.\"
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          <Link href="/solicita-una-demo" className="btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}>
            Solicitar Oferta Comercial
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
