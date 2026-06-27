import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db, modules } from "@/db/client";
import { eq } from "drizzle-orm";
import "../public.css";

export const dynamic = "force-dynamic";

export default async function ModulosPage() {
  const analitica = await db
    .select()
    .from(modules)
    .where(eq(modules.category, "analitica-avanzada"));
  const aplicaciones = await db
    .select()
    .from(modules)
    .where(eq(modules.category, "aplicaciones"));
  const apoyo = await db
    .select()
    .from(modules)
    .where(eq(modules.category, "apoyo-a-la-gestion"));

  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div className="section-header" style={{ marginBottom: "5rem" }}>
          <span className="section-subtitle">James Cloud Platform</span>
          <h1 className="section-title" style={{ fontSize: "3rem" }}>
            Módulos y Aplicaciones
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            James es un modelo de IA supervisada que identifica patrones, anticipa riesgos y transforma información en acciones efectivas para fortalecer la prevención.
          </p>
        </div>

        {/* Category: Analítica Avanzada */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", marginBottom: "2rem" }}>
            <h2 className="section-title" style={{ textAlign: "left", fontSize: "1.8rem" }}>
              Analítica Avanzada
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
              Estandarizamos procesos y fortalecemos la gestión preventiva a través de modelos predictivos y algoritmos especializados.
            </p>
          </div>
          <div className="modules-grid">
            {analitica.map((m) => (
              <div key={m.id} className="module-card">
                <div>
                  <h3 className="module-title" style={{ color: "var(--accent-blue-light)" }}>{m.title}</h3>
                  <p className="module-desc">{m.metaDescription}</p>
                </div>
                <Link href={`/modulos/${m.id}`} className="module-link">
                  Ver Detalles &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Category: Aplicaciones */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", marginBottom: "2rem" }}>
            <h2 className="section-title" style={{ textAlign: "left", fontSize: "1.8rem" }}>
              Aplicaciones
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
              Herramientas de software diseñadas para estandarizar, registrar y optimizar flujos críticos de seguridad en terreno.
            </p>
          </div>
          <div className="modules-grid">
            {aplicaciones.map((m) => (
              <div key={m.id} className="module-card">
                <div>
                  <h3 className="module-title" style={{ color: "var(--accent-blue-light)" }}>{m.title}</h3>
                  <p className="module-desc">{m.metaDescription}</p>
                </div>
                <Link href={`/modulos/${m.id}`} className="module-link">
                  Ver Detalles &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Category: Apoyo a la Gestión */}
        <section style={{ marginBottom: "5rem" }}>
          <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", marginBottom: "2rem" }}>
            <h2 className="section-title" style={{ textAlign: "left", fontSize: "1.8rem" }}>
              Apoyo a la Gestión
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
              Tableros e indicadores que unifican métricas y centralizan el seguimiento de planes preventivos.
            </p>
          </div>
          <div className="modules-grid">
            {apoyo.map((m) => (
              <div key={m.id} className="module-card">
                <div>
                  <h3 className="module-title" style={{ color: "var(--accent-blue-light)" }}>{m.title}</h3>
                  <p className="module-desc">{m.metaDescription}</p>
                </div>
                <Link href={`/modulos/${m.id}`} className="module-link">
                  Ver Detalles &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
