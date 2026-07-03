import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../public.css";

export default function BusinessInitiativesPage() {
  const initiatives = [
    {
      title: "Data Management",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="var(--accent-blue-light)"
          width="48"
          height="48"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75"
          />
        </svg>
      ),
      desc: "Nuestra plataforma transforma datos dispersos en inteligencia estructurada y accionable. Integra información histórica y actual, estructurada y no estructurada, permitiendo analizar relaciones multicausales invisibles para herramientas tradicionales. Esto elimina análisis manuales extensos, mejora la calidad de la información y permite decisiones basadas en evidencia. La gestión de datos deja de ser operativa y pasa a ser estratégica, habilitando anticipación y control real del riesgo.",
    },
    {
      title: "Tool Consolidation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="var(--accent-blue-light)"
          width="48"
          height="48"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 9V4.5M9 9H4.5M9 9L3 3m12 6V4.5m0 4.5H19.5M15 9l6-6M9 15v4.5M9 15H4.5M9 15l-6 6m12-6v4.5m0-4.5H19.5m-4.5 0l6 6"
          />
        </svg>
      ),
      desc: "La solución no reemplaza sistemas existentes: los conecta, interpreta y potencia. Actúa como una capa analítica que consolida información de múltiples plataformas corporativas, evitando duplicidad de herramientas y reduciendo complejidad tecnológica. Esto permite aprovechar inversiones previas, unificar visibilidad operacional y mejorar la eficiencia digital. El resultado es un ecosistema integrado que convierte datos aislados en conocimiento útil para la toma de decisiones.",
    },
    {
      title: "Data Privacy",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="var(--accent-blue-light)"
          width="48"
          height="48"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
          />
        </svg>
      ),
      desc: "La protección de datos es parte estructural de la arquitectura. La plataforma opera bajo un marco formal de seguridad de la información que resguarda confidencialidad, integridad y disponibilidad durante todo el ciclo de vida del dato. Aplica controles de acceso por rol, clasificación de información y trazabilidad de uso. Cumple exigencias regulatorias y contractuales de clientes corporativos, garantizando un estándar robusto y confiable.",
    },
    {
      title: "Artificial Intelligence",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="var(--accent-blue-light)"
          width="48"
          height="48"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 21m0 0l-.813-5.096L3 15m6 6l6-6m-3.187-5.904L15 3m0 0l.813 5.096L21 9m-6-6l-6 6m3.187 6.904l.813 5.096"
          />
        </svg>
      ),
      desc: "La inteligencia artificial utilizada no es genérica ni experimental: está entrenada con datos industriales reales y diseñada específicamente para contextos operacionales complejos. Sus modelos propietarios analizan patrones multivariables, anticipan escenarios y entregan recomendaciones accionables. No automatiza decisiones: las fortalece con evidencia. Esta combinación de IA aplicada, experiencia sectorial y analítica predictiva permite pasar de una gestión reactiva a una verdaderamente preventiva.",
    },
  ];

  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div className="section-header" style={{ marginBottom: "5rem" }}>
          <span className="section-subtitle">Por qué James®</span>
          <h1 className="section-title" style={{ fontSize: "3.5rem" }}>
            Business Initiatives
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            Nuestra propuesta se fundamenta en cuatro pilares estratégicos de tecnología y negocio.
          </p>
        </div>

        <div className="how-it-works-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {initiatives.map((item, idx) => (
            <div key={idx} className="step-card" style={{ padding: "3rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>{item.icon}</div>
              <h2 className="step-title" style={{ fontSize: "1.8rem", color: "#fff", marginBottom: "1.5rem" }}>
                {item.title}
              </h2>
              <p className="step-desc" style={{ fontSize: "1rem", lineHeight: "1.7" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
