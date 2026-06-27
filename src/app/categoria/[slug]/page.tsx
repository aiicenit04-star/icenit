import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db, modules } from "@/db/client";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import "../../public.css";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  const validCategories: Record<string, { title: string; subtitle: string; desc: string }> = {
    "analitica-avanzada": {
      title: "Analítica Avanzada",
      subtitle: "Estandarizamos procesos y fortalecemos la gestión preventiva",
      desc: "El grupo de 6 módulos de Analítica Avanzada de iCenit transforma datos operacionales en conocimiento accionable. Integra analítica supervisada, modelos predictivos y librerías especializadas para identificar desviaciones, anticipar riesgos y fortalecer la gestión. Conecta evidencia, estrategia y resultados, impulsando una gestión preventiva más inteligente y orientada a decisiones efectivas.",
    },
    "aplicaciones": {
      title: "Aplicaciones",
      subtitle: "Acciones y resultados conectados a la estrategia y riesgos",
      desc: "Las aplicaciones de iCenit permiten digitalizar e investigar incidentes en terreno y administrar matrices de riesgo dinámicamente bajo estándares internacionales. Facilitan el registro estructurado de actividades operacionales, la investigación científica de causas raíz y el control inmediato sobre desviaciones identificadas.",
    },
    "apoyo-a-la-gestion": {
      title: "Apoyo a la Gestión",
      subtitle: "Monitoreo y KPIs integrados en tiempo real",
      desc: "Los módulos de Apoyo a la Gestión consolidan la información analítica y operativa de toda la plataforma. Permiten monitorear el avance, evidenciar mejoras y cerrar el ciclo de gestión de seguridad y salud ocupacional. Aseguran trazabilidad, transparencia y una gestión basada en datos, integrando estrategia, ejecución y resultados medibles.",
    },
  };

  const categoryMeta = validCategories[slug];
  if (!categoryMeta) {
    notFound();
  }

  const categoryModules = await db
    .select()
    .from(modules)
    .where(eq(modules.category, slug));

  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div className="section-header" style={{ marginBottom: "4rem" }}>
          <span className="section-subtitle">Categoría de Módulos</span>
          <h1 className="section-title" style={{ fontSize: "3rem" }}>
            {categoryMeta.title}
          </h1>
          <p style={{ color: "var(--accent-blue-light)", fontWeight: "500", marginTop: "0.5rem" }}>
            {categoryMeta.subtitle}
          </p>
        </div>

        <div className="problem-card" style={{ marginBottom: "5rem", textAlign: "left", padding: "3rem" }}>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-primary)" }}>
            {categoryMeta.desc}
          </p>
        </div>

        <div className="modules-grid">
          {categoryModules.map((m) => (
            <div key={m.id} className="module-card">
              <div>
                <span className="module-meta">{categoryMeta.title}</span>
                <h3 className="module-title" style={{ color: "var(--accent-blue-light)" }}>{m.title}</h3>
                <p className="module-desc">{m.metaDescription}</p>
              </div>
              <Link href={`/modulos/${m.id}`} className="module-link">
                Ver Detalles &rarr;
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <Link href="/modulos" className="btn-secondary">
            &larr; Volver a Todos los Módulos
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
