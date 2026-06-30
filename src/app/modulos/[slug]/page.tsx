import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db, modules, moduleFeatures } from "@/db/client";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import "../../public.css";

export const dynamic = "force-dynamic";
export const runtime = "edge";

interface ModulePageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getModuleIcon(id: string) {
  const strokeWidth = 0.95;
  const style = { width: "42px", height: "42px", color: "var(--accent-blue-light)" };
  
  switch (id) {
    case "hallazgos":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      );
    case "riesgo-dinamico":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <path d="M12 2v3M5 5l2.2 2.2M19 5l-2.2 2.2M4 22h16M6 22V13a6 6 0 1 1 12 0v9" />
          <path d="M9 22V14a3 3 0 0 1 6 0v8" />
        </svg>
      );
    case "inspecciones":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <circle cx="10" cy="10" r="7" />
          <path d="M21 21l-6-6M7 10h2l1-2 2 4 1-2h2" />
        </svg>
      );
    case "predictor":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <circle cx="14" cy="12" r="8" />
          <path d="M14 8v4l3 3M2 8h4M2 12h6M2 16h4" />
        </svg>
      );
    case "estrategia":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
          <path d="M9 17V7l7 3-7 3" />
        </svg>
      );
    case "acciones":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <circle cx="9" cy="9" r="2" />
          <circle cx="15" cy="9" r="2" />
          <circle cx="9" cy="15" r="2" />
          <circle cx="17" cy="17" r="4" />
          <path d="M20 20l3 3" />
        </svg>
      );
    case "investigaciones":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      );
    case "gestor-de-matrices":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
        </svg>
      );
    case "indicadores":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M3 20h18" />
        </svg>
      );
    case "casos":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );
  }
}

export default async function ModuleDetailPage({ params }: ModulePageProps) {
  const { slug } = await params;

  // Fetch module metadata
  const [moduleData] = await db
    .select()
    .from(modules)
    .where(eq(modules.id, slug));

  if (!moduleData) {
    notFound();
  }

  // Fetch module features
  const features = await db
    .select()
    .from(moduleFeatures)
    .where(eq(moduleFeatures.moduleId, slug));

  // Fetch related modules in the same category
  const relatedModules = await db
    .select()
    .from(modules)
    .where(eq(modules.category, moduleData.category));

  // Human readable category mapping
  const categoryNames: Record<string, string> = {
    "analitica-avanzada": "Analítica Avanzada",
    "aplicaciones": "Aplicaciones",
    "apoyo-a-la-gestion": "Apoyo a la Gestión",
  };

  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href={`/categoria/${moduleData.category}`}
            style={{ color: "var(--accent-blue-light)", fontWeight: "600", fontSize: "0.9rem" }}
          >
            &larr; Categoría: {categoryNames[moduleData.category] || moduleData.category}
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start" }}>
          <div>
            <h1
              className="section-title"
              style={{ textAlign: "left", fontSize: "3rem", marginBottom: "0.5rem" }}
            >
              {moduleData.title}
            </h1>
            <h3
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.25rem",
                fontWeight: "500",
                marginBottom: "2rem",
              }}
            >
              {moduleData.subtitle}
            </h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", fontSize: "1.05rem" }}>
              {moduleData.description}
            </p>
            <div style={{ marginTop: "3rem" }}>
              <Link href="/solicita-una-demo" className="btn-primary">
                Solicitar Demostración de {moduleData.title}
              </Link>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: "3rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "1.4rem",
                fontWeight: "700",
                marginBottom: "1.5rem",
                color: "#fff",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
              }}
            >
              Valores Destacados
            </h2>
            <ul className="pricing-features" style={{ marginBottom: 0 }}>
              {features.map((f) => (
                <li key={f.id} style={{ color: "var(--text-primary)" }}>{f.feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Other modules in this category */}
        <div style={{ marginTop: "6rem", borderTop: "1px solid var(--border-color)", paddingTop: "4rem" }}>
          <h2 className="section-title" style={{ textAlign: "left", fontSize: "1.8rem", marginBottom: "2.5rem" }}>
            Módulos en {categoryNames[moduleData.category] || moduleData.category}
          </h2>
          
          <div className="modules-grid">
            {relatedModules.map((m) => (
              <div key={m.id} className="module-card" style={{ padding: 0, overflow: "hidden", border: m.id === slug ? "1px solid var(--accent-blue)" : "1px solid var(--border-color)" }}>
                <div>
                  <div style={{ background: "rgba(255, 255, 255, 0.02)", height: "160px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                    {getModuleIcon(m.id)}
                  </div>
                  <div style={{ padding: "1.75rem 1.75rem 1rem 1.75rem" }}>
                    <h3 className="module-title" style={{ color: "#fff", marginTop: 0, marginBottom: "0.75rem", fontSize: "1.2rem", fontWeight: "700", textAlign: "left" }}>
                      {m.title}
                    </h3>
                    <p className="module-desc" style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6", textAlign: "left", marginBottom: 0 }}>
                      {m.metaDescription}
                    </p>
                  </div>
                </div>
                <div style={{ padding: "0 1.75rem 1.75rem 1.75rem" }}>
                  {m.id === slug ? (
                    <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>
                      Módulo Actual
                    </span>
                  ) : (
                    <Link 
                      href={`/modulos/${m.id}`} 
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
                      Ver Módulo <span style={{ marginLeft: "0.5rem", fontWeight: "bold", fontSize: "0.95rem" }}>&gt;</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
