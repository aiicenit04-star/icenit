import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db, useCases } from "@/db/client";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import "../../public.css";

export async function generateStaticParams() {
  try {
    const cases = await db.select({ id: useCases.id }).from(useCases);
    return cases.map((c) => ({ slug: c.id }));
  } catch {
    return [];
  }
}


interface UseCasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function UseCaseDetailPage({ params }: UseCasePageProps) {
  const { slug } = await params;

  const [useCase] = await db
    .select()
    .from(useCases)
    .where(eq(useCases.id, slug));

  if (!useCase) {
    notFound();
  }

  const challenges = useCase.challenge.split("\n");
  const strategies = useCase.strategy.split("\n");
  const results = useCase.results.split("\n");

  // Custom layout for "Investigación de Accidente"
  if (slug === "investigacion-de-accidente") {
    return (
      <>
        <Header />

        <main className="page-section" style={{ flexGrow: 1 }}>
          <div style={{ marginBottom: "2rem" }}>
            <Link
              href="/"
              style={{ color: "var(--accent-blue-light)", fontWeight: "600", fontSize: "0.9rem" }}
            >
              &larr; Volver al Inicio
            </Link>
          </div>

          <div className="section-header" style={{ marginBottom: "3rem", textAlign: "left" }}>
            <span className="section-subtitle">Caso de Uso Práctico</span>
            <h1 className="section-title" style={{ fontSize: "3rem", textAlign: "left" }}>
              {useCase.title}
            </h1>
          </div>

          {/* Top Section: Truck Image and Context */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "3rem", alignItems: "center", marginBottom: "4rem" }} className="consultant-row">
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              <img 
                src="/caso-1.jpg" 
                alt="Incidente Camión Minero" 
                style={{ width: "100%", height: "auto", display: "block" }} 
              />
            </div>
            <div className="glass-panel" style={{ padding: "2.5rem", borderLeft: "4px solid var(--accent-blue-light)", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                Descripción del Suceso
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7", margin: 0 }}>
                Incidente de alto potencial en faena minera, sin lesionados: Camión abastece combustible sobrepasa pretil y casi cae en banco donde opera pala.
              </p>
            </div>
          </div>

          {/* Three Cards Grid */}
          <div className="three-cards-grid" style={{ marginBottom: "5rem", alignItems: "stretch" }}>
            
            {/* Card 1: El Desafío */}
            <div className="glass-panel" style={{ padding: "2.5rem 2.2rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px", color: "#FF4100" }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                  Desafío
                </h2>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>1.</strong> Incidente de alto potencial en faena minera, sin lesionados: Camión que abastece combustible y casi cae en banco donde opera pala.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>2.</strong> Investigación realizada por equipo de 8 personas, incluyendo altos ejecutivos, durante 3 semanas, con un costo de US$ 45K, donde se recopilaron y analizaron 84 documentos.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>3.</strong> Investigación no concluyente, basada en juicio experto y sin identificar causas raíz.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>4.</strong> Se tomó la decisión de repetir la investigación.
                </li>
              </ul>
            </div>

            {/* Card 2: Estrategia */}
            <div className="glass-panel" style={{ padding: "2.5rem 2.2rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px", color: "#FF4100" }}>
                  <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
                  <path d="M9 17V7l7 3-7 3" />
                </svg>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                  Estrategia
                </h2>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>1.</strong> Investigación realizada por un facilitador más James.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>2.</strong> Analizando los mismos antecedentes, aplicando método PEEPO*, se detectaron causas raíz concretas:
                  <ul style={{ listStyle: "none", paddingLeft: "1.2rem", marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "#FF4100" }}>•</span>
                      <span>Conductor apto pero con restricción visual de 220 lúmenes. Sin embargo, camión posee focos con 180 lúmenes.</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "#FF4100" }}>•</span>
                      <span>Desconocimiento de riesgos del fondo mina por parte de la empresa.</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "#FF4100" }}>•</span>
                      <span>Falta de identificación del riesgo de Condición Dinámica del Terreno en fondo Mina en la actividad de "conducción con camión tanque".</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Card 3: Resultados */}
            <div className="glass-panel" style={{ padding: "2.5rem 2.2rem", borderLeft: "4px solid var(--accent-green)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px", color: "var(--accent-green)" }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="8 12 11 15 16 9" />
                </svg>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                  Resultados
                </h2>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>1.</strong> Investigación concluyente, concreta y concisa.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>2.</strong> Resultados validados a nivel corporativo.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>3.</strong> Se identificaron factores que no eran evidentes a simple vista, basados en datos y no en juicio experto.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>4.</strong> Se llegó a resultados concluyentes luego de 3 días de análisis por parte de un facilitador asistido por James.
                </li>
              </ul>
            </div>

          </div>

          {/* Document Classification Section */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "4rem" }}>
            <div style={{ marginBottom: "3rem" }}>
              <span className="section-subtitle">Evidencia Analizada</span>
              <h2 className="section-title" style={{ textAlign: "left", fontSize: "2rem" }}>
                Clasificación de Documentos
              </h2>
            </div>

            {/* 84+ Card on the left, 3-column details on the right */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "2.5rem", alignItems: "stretch" }} className="consultant-row">
              {/* Left Card: Summary Count */}
              <div className="glass-panel" style={{ padding: "3rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ color: "#FF4100", marginBottom: "1.5rem" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" style={{ width: "44px", height: "44px" }}>
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span style={{ fontSize: "4.5rem", fontWeight: "800", color: "#fff", lineHeight: 1 }}>84+</span>
                <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "1rem", fontWeight: "500", letterSpacing: "0.5px" }}>Documentos</span>
              </div>

              {/* Right Side: 3-column grid for categories */}
              <div className="glass-panel doc-details-grid-3" style={{ padding: "3rem" }}>
                {/* Column 1: Entorno & Equipos */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Entorno</h3>
                    <span style={{ color: "#FF4100", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "1.2px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      DOCUMENTOS: 18
                    </span>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
                      Videos, fotografías, planimetrías.
                    </p>
                  </div>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Equipos</h3>
                    <span style={{ color: "#FF4100", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "1.2px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      DOCUMENTOS: 10
                    </span>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
                      Legales, certificaciones, checklist, mantención preventiva, estándar equipos mina, audio dispatch.
                    </p>
                  </div>
                </div>

                {/* Column 2: Organización & Personas */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Organización</h3>
                    <span style={{ color: "#FF4100", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "1.2px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      DOCUMENTOS: 16
                    </span>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
                      Plan de entrenamiento, planes de emergencia, manejo de emergencias, CV, listas de verificación, observación de conducta.
                    </p>
                  </div>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Personas</h3>
                    <span style={{ color: "#FF4100", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "1.2px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                      DOCUMENTOS: 20
                    </span>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
                      Declaraciones, entrevistas.
                    </p>
                  </div>
                </div>

                {/* Column 3: Procedimientos */}
                <div>
                  <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Procedimientos</h3>
                  <span style={{ color: "#FF4100", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "1.2px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                    DOCUMENTOS: 16
                  </span>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
                    IPER, AST, Contratos, capacitaciones, controles operacionales, Protocolo Cognos Gauss.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // Custom layout for "Análisis Multivariable"
  if (slug === "analisis-multivariable") {
    return (
      <>
        <Header />

        <main className="page-section" style={{ flexGrow: 1 }}>
          <div style={{ marginBottom: "2rem" }}>
            <Link
              href="/"
              style={{ color: "var(--accent-blue-light)", fontWeight: "600", fontSize: "0.9rem" }}
            >
              &larr; Volver al Inicio
            </Link>
          </div>

          <div className="section-header" style={{ marginBottom: "3rem", textAlign: "left" }}>
            <span className="section-subtitle">Caso de Uso Práctico</span>
            <h1 className="section-title" style={{ fontSize: "3rem", textAlign: "left" }}>
              {useCase.title}
            </h1>
          </div>

          {/* Top Section: Truck Image and Context */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "3rem", alignItems: "center", marginBottom: "4rem" }} className="consultant-row">
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              <img 
                src="/caso-2.jpg" 
                alt="Transporte de Combustible" 
                style={{ width: "100%", height: "auto", display: "block" }} 
              />
            </div>
            <div className="glass-panel" style={{ padding: "2.5rem", borderLeft: "4px solid var(--accent-blue-light)", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                Descripción del Suceso
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7", margin: 0 }}>
                Empresa de transporte de combustible que enfrentaba un promedio de 30 incidentes anuales por derrames causados por volcamientos y otros accidentes.
              </p>
            </div>
          </div>

          {/* Three Cards Grid */}
          <div className="three-cards-grid" style={{ marginBottom: "5rem", alignItems: "stretch" }}>
            
            {/* Card 1: El Desafío */}
            <div className="glass-panel" style={{ padding: "2.5rem 2.2rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px", color: "#FF4100" }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                  Desafío
                </h2>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>1.</strong> Empresa de transporte de combustible que enfrentaba un promedio de 30 incidentes anuales por derrames causados por volcamientos y otros accidentes, a pesar de implementar múltiples acciones preventivas:
                  <ul style={{ listStyle: "none", paddingLeft: "1.2rem", marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "#FF4100" }}>•</span>
                      <span>Verificación de salud compatible de conductores</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "#FF4100" }}>•</span>
                      <span>Reentrenamiento y medidas administrativas</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "#FF4100" }}>•</span>
                      <span>Uso de geocercas, control de velocidad y somnolencia (Guardian) a nivel nacional.</span>
                    </li>
                  </ul>
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>2.</strong> Dado que estas medidas no lograron reducir la recurrencia, se requiere identificar patrones de incidentes y recomendación de controles.
                </li>
              </ul>
            </div>

            {/* Card 2: Estrategia */}
            <div className="glass-panel" style={{ padding: "2.5rem 2.2rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px", color: "#FF4100" }}>
                  <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
                  <path d="M9 17V7l7 3-7 3" />
                </svg>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                  Estrategia
                </h2>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>1.</strong> James procesó 15 años de información histórica y analizó más de 800 mil combinaciones posibles considerando cerca de 50 variables. Identificó 8 como las más relevantes y concluyó:
                  <ul style={{ listStyle: "none", paddingLeft: "1.2rem", marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "#FF4100" }}>•</span>
                      <span>Velocidad inadecuada para contexto operacional: Guardian tenía umbral de 50 Km/h pero el 90% de la ruta se conduce bajo 40 Km/h, lo que hacía inefectiva la alerta. Recomendación: Ajustar umbral a 30 Km/h</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "#FF4100" }}>•</span>
                      <span>Fatiga y somnolencia no detectada clínicamente: Aunque conductores cumplían requisitos de salud, presentaban condiciones anexas, como somnolencia postprandial en casos de diabetes tipo 2. Recomendación: Incorporar estas condiciones al plan de vigilancia médica, considerando las interconsultas recomendadas por la Mutualidad</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Card 3: Resultados */}
            <div className="glass-panel" style={{ padding: "2.5rem 2.2rem", borderLeft: "4px solid var(--accent-green)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px", color: "var(--accent-green)" }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="8 12 11 15 16 9" />
                </svg>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                  Resultados
                </h2>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>1.</strong> Cero nuevos volcamientos en la ruta intervenida.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>2.</strong> 30% menos incidentes similares en otras empresas del grupo y en otras rutas.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>3.</strong> Ajustes de controles en base a contexto operacional.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>4.</strong> Incorporación al Plan Nacional de Vigilancia de Salud Ocupacional.
                </li>
              </ul>
            </div>

          </div>

          {/* Sankey Analysis Section */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "4rem" }}>
            <div style={{ marginBottom: "3rem" }}>
              <span className="section-subtitle">Visualización de Datos</span>
              <h2 className="section-title" style={{ textAlign: "left", fontSize: "2rem" }}>
                Análisis Sankey Propuesto por James
              </h2>
            </div>

            <div className="glass-panel" style={{ padding: "2rem", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <img 
                src="/caso2-analisis-sankey.jpg" 
                alt="Análisis Sankey Propuesto por James" 
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }} 
              />
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // Custom layout for "Gestión 1-3-10"
  if (slug === "gestion-1-3-10") {
    return (
      <>
        <Header />

        <main className="page-section" style={{ flexGrow: 1 }}>
          <div style={{ marginBottom: "2rem" }}>
            <Link
              href="/"
              style={{ color: "var(--accent-blue-light)", fontWeight: "600", fontSize: "0.9rem" }}
            >
              &larr; Volver al Inicio
            </Link>
          </div>

          <div className="section-header" style={{ marginBottom: "3rem", textAlign: "left" }}>
            <span className="section-subtitle">Caso de Uso Práctico</span>
            <h1 className="section-title" style={{ fontSize: "3rem", textAlign: "left" }}>
              {useCase.title}
            </h1>
          </div>

          {/* Top Section: Dashboard Image and Context */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "3rem", alignItems: "center", marginBottom: "4rem" }} className="consultant-row">
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              <img 
                src="/caso-3.jpg" 
                alt="Monitoreo de Operaciones" 
                style={{ width: "100%", height: "auto", display: "block" }} 
              />
            </div>
            <div className="glass-panel" style={{ padding: "2.5rem", borderLeft: "4px solid var(--accent-blue-light)", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                Descripción del Suceso
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7", margin: 0 }}>
                Analizar la pertinencia de los KPIs existentes de monitoreo y control de riesgos.
              </p>
            </div>
          </div>

          {/* Three Cards Grid */}
          <div className="three-cards-grid" style={{ marginBottom: "5rem", alignItems: "stretch" }}>
            
            {/* Card 1: El Desafío */}
            <div className="glass-panel" style={{ padding: "2.5rem 2.2rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px", color: "#FF4100" }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                  Desafío
                </h2>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>1.</strong> Analizar la pertinencia de los KPIs existentes de monitoreo y control de riesgos.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>2.</strong> Aplicar KPIs para monitoreo y control en tiempo real de la operación.
                </li>
              </ul>
            </div>

            {/* Card 2: Estrategia */}
            <div className="glass-panel" style={{ padding: "2.5rem 2.2rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px", color: "#FF4100" }}>
                  <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
                  <path d="M9 17V7l7 3-7 3" />
                </svg>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                  Estrategia
                </h2>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>1.</strong> Integración de fuentes de información a James: registro de incidentes, reglas SST, principales procesos, actividades, matrices IPER, controles.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>2.</strong> Diseño de KPIs que cumplan con los objetivos de trazabilidad de riesgos.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>3.</strong> Diseño de tableros de control que permitan tomar decisiones en tiempo real.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "#FF4100", marginRight: "0.25rem" }}>4.</strong> Instalación de prácticas de gestión para toma de decisiones basadas en información.
                </li>
              </ul>
            </div>

            {/* Card 3: Resultados */}
            <div className="glass-panel" style={{ padding: "2.5rem 2.2rem", borderLeft: "4px solid var(--accent-green)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px", color: "var(--accent-green)" }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="8 12 11 15 16 9" />
                </svg>
                <h2 style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                  Resultados
                </h2>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>1.</strong> Se cuenta con tableros de control que implementan el método 1-3-10:
                  <ul style={{ listStyle: "none", paddingLeft: "1.2rem", marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "var(--accent-green)" }}>•</span>
                      <span><strong>1 segundo</strong> para ver qué está pasado;</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "var(--accent-green)" }}>•</span>
                      <span><strong>3 segundos</strong> para entender por qué;</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "start", gap: "0.5rem", lineHeight: "1.5", fontSize: "0.88rem" }}>
                      <span style={{ color: "var(--accent-green)" }}>•</span>
                      <span><strong>10 segundos</strong> para saber qué hacer.</span>
                    </li>
                  </ul>
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>2.</strong> Permite analizar cómo pequeñas señales llevan a eventos severos si no se gestionan.
                </li>
                <li style={{ lineHeight: "1.6", fontSize: "0.92rem", textAlign: "left" }}>
                  <strong style={{ color: "var(--accent-green)", marginRight: "0.25rem" }}>3.</strong> Mejora en la trazabilidad de incidentes y eficiencia en la respuesta preventiva.
                </li>
              </ul>
            </div>

          </div>

          {/* KPI Dashboard Section */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "4rem" }}>
            <div style={{ marginBottom: "3rem" }}>
              <span className="section-subtitle">Visualización de Datos</span>
              <h2 className="section-title" style={{ textAlign: "left", fontSize: "2rem" }}>
                Monitoreo de KPIs principales y detalle de incidentes
              </h2>
            </div>

            <div className="glass-panel" style={{ padding: "2rem", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <img 
                src="/caso3-monitoreo-KPIs.jpg" 
                alt="Monitoreo de KPIs principales y detalle de incidentes" 
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }} 
              />
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // Default layout for other use cases
  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/"
            style={{ color: "var(--accent-blue-light)", fontWeight: "600", fontSize: "0.9rem" }}
          >
            &larr; Volver al Inicio
          </Link>
        </div>

        <div className="section-header" style={{ marginBottom: "4rem", textAlign: "left" }}>
          <span className="section-subtitle">Caso de Uso Práctico</span>
          <h1 className="section-title" style={{ fontSize: "3rem", textAlign: "left" }}>
            {useCase.title}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "1rem", lineHeight: "1.6" }}>
            <strong>Contexto:</strong> {useCase.context}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }} className="consultant-row">
          {/* Left Column: Challenge */}
          <div className="glass-panel" style={{ padding: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "1.4rem",
                fontWeight: "700",
                color: "#fff",
                marginBottom: "1.5rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
              }}
            >
              El Desafío
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", color: "var(--text-secondary)", padding: 0 }}>
              {challenges.map((c, i) => (
                <li key={i} style={{ lineHeight: "1.6", fontSize: "0.95rem" }}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Right Column: Strategy with James */}
          <div className="glass-panel" style={{ padding: "2.5rem", borderLeft: "4px solid var(--accent-blue)" }}>
            <h2
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "1.4rem",
                fontWeight: "700",
                color: "var(--accent-blue-light)",
                marginBottom: "1.5rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
              }}
            >
              Estrategia con James®
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", color: "var(--text-secondary)", padding: 0 }}>
              {strategies.map((s, i) => (
                <li key={i} style={{ lineHeight: "1.6", fontSize: "0.95rem" }}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <section
          className="problem-card"
          style={{
            marginTop: "4rem",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 7, 12, 0.6) 100%)",
            borderTop: "2px solid var(--accent-green)",
            textAlign: "left",
            padding: "3.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "1.8rem",
              fontWeight: "700",
              color: "var(--accent-green)",
              marginBottom: "1.5rem",
            }}
          >
            Resultados Obtenidos
          </h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", color: "var(--text-primary)", padding: 0 }}>
            {results.map((r, i) => (
              <li
                key={i}
                style={{
                  lineHeight: "1.6",
                  fontSize: "1.05rem",
                  display: "flex",
                  alignItems: "start",
                  gap: "0.75rem",
                }}
              >
                <span style={{ color: "var(--accent-green)", fontWeight: "bold" }}>✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
