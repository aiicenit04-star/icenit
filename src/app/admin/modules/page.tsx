import { db, modules, moduleFeatures } from "@/db/client";
import { eq } from "drizzle-orm";
import Link from "next/link";
import ModuleEditor from "./module-editor";

export const dynamic = "force-dynamic";
export const runtime = "edge";

interface ModulesAdminPageProps {
  searchParams: Promise<{
    selected?: string;
  }>;
}

export default async function ModulesAdminPage({ searchParams }: ModulesAdminPageProps) {
  const allModules = await db.select().from(modules);
  const resolvedParams = await searchParams;
  const selectedSlug = resolvedParams.selected || allModules[0]?.id;

  // Find selected module data
  const selectedModule = allModules.find((m) => m.id === selectedSlug);

  // Fetch features for the selected module
  const rawFeatures = selectedModule
    ? await db
        .select()
        .from(moduleFeatures)
        .where(eq(moduleFeatures.moduleId, selectedSlug))
    : [];

  const initialFeatures = rawFeatures.map((rf) => rf.feature);

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Editar Módulos de Plataforma</h1>
      </header>

      {/* Tabs to select module */}
      <div className="admin-tabs" style={{ flexWrap: "wrap" }}>
        {allModules.map((m) => (
          <Link
            key={m.id}
            href={`/admin/modules?selected=${m.id}`}
            className={`admin-tab ${selectedSlug === m.id ? "active" : ""}`}
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            {m.title}
          </Link>
        ))}
      </div>

      {selectedModule ? (
        <div className="admin-card">
          <h2 style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Módulo: {selectedModule.title}</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "normal" }}>
              Slug: {selectedModule.id}
            </span>
          </h2>

          <ModuleEditor
            key={selectedModule.id} // Bypasses React state reuse
            moduleData={selectedModule}
            initialFeatures={initialFeatures}
          />
        </div>
      ) : (
        <div className="admin-card" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--text-secondary)" }}>No se encontró ningún módulo registrado.</p>
        </div>
      )}
    </div>
  );
}
