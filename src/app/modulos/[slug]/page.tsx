import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db, modules, moduleFeatures } from "@/db/client";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import "../../public.css";

export const dynamic = "force-dynamic";

interface ModulePageProps {
  params: Promise<{
    slug: string;
  }>;
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
      </main>

      <Footer />
    </>
  );
}
