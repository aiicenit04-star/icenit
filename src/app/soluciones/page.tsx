export const runtime = "edge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import "../public.css";

export default function SolucionesPage() {
  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div className="section-header" style={{ marginBottom: "5rem" }}>
          <span className="section-subtitle">Soluciones</span>
          <h1 className="section-title" style={{ fontSize: "3rem" }}>
            Construye el futuro con nosotros
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            James combina detección temprana, análisis explicativo y recomendaciones accionables para ayudar a los equipos a gestionar riesgos de forma precisa, proactiva y oportuna.
          </p>
        </div>

        <div className="how-it-works-grid">
          {/* Solution 1: Detectar */}
          <div id="detectar" className="step-card" style={{ padding: "3rem" }}>
            <span className="step-number">01"</span>
            <h2 className="step-title" style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
              Detecta antes de que ocurra
            </h2>
            <p className="step-desc" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
              James identifica desviaciones y comportamientos anómalos en tiempo real, comparando múltiples
              variables, condiciones operativas y contextos históricos. Anticipa señales tempranas
              que permiten descubrir riesgos antes de que evolucionen generando un análisis automático
              que mejora la capacidad de reacción.
            </p>
          </div>

          {/* Solution 2: Entender */}
          <div id="entender" className="step-card" style={{ padding: "3rem" }}>
            <span className="step-number">03"</span>
            <h2 className="step-title" style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
              Entiende lo invisible
            </h2>
            <p className="step-desc" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
              James analiza causas raíz utilizando modelos explicativos validados por expertos. Relaciona
              factores operacionales, secuencias de eventos y patrones históricos para revelar qué
              ocurre realmente y por qué. Su lógica explicativa ayuda a comprender fenómenos complejos
              que suelen pasar desapercibidos.
            </p>
          </div>

          {/* Solution 3: Actuar */}
          <div id="actuar" className="step-card" style={{ padding: "3rem" }}>
            <span className="step-number">10"</span>
            <h2 className="step-title" style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
              Actúa sin fricción
            </h2>
            <p className="step-desc" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
              James entrega recomendaciones accionables basadas en riesgo, junto con alertas priorizadas
              que facilitan decisiones rápidas y efectivas. Indica pasos concretos para mitigar desviaciones,
              reducir exposición y evitar incidentes, permitiendo una acción informada, oportuna y sin
              fricción para los equipos.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          <Link href="/solicita-una-demo" className="btn-primary">
            Solicitar una Demo
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
