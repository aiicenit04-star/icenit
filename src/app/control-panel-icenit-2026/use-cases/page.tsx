import { db, useCases } from "@/db/client";
import Link from "next/link";
import UseCaseEditor from "./use-case-editor";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const runtime = "edge";

interface UseCasesAdminPageProps {
  searchParams: Promise<{
    selected?: string;
  }>;
}

export default async function UseCasesAdminPage({ searchParams }: UseCasesAdminPageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== "authenticated") {
    return <div style={{ padding: "2rem", color: "#9ca3af" }}>Cargando panel...</div>;
  }

  const allUseCases = await db.select().from(useCases);
  const resolvedParams = await searchParams;
  const selectedSlug = resolvedParams.selected || allUseCases[0]?.id;

  // Find selected use case data
  const selectedUseCase = allUseCases.find((uc) => uc.id === selectedSlug);

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Editar Casos de Uso</h1>
      </header>

      {/* Tabs to select use case */}
      <div className="admin-tabs" style={{ flexWrap: "wrap" }}>
        {allUseCases.map((uc) => (
          <Link
            key={uc.id}
            href={`/control-panel-icenit-2026/use-cases?selected=${uc.id}`}
            className={`admin-tab ${selectedSlug === uc.id ? "active" : ""}`}
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            {uc.title}
          </Link>
        ))}
      </div>

      {selectedUseCase ? (
        <div className="admin-card">
          <h2 style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Caso de Uso: {selectedUseCase.title}</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "normal" }}>
              Slug: {selectedUseCase.id}
            </span>
          </h2>

          <UseCaseEditor
            key={selectedUseCase.id} // Bypasses React state reuse
            useCaseData={selectedUseCase}
          />
        </div>
      ) : (
        <div className="admin-card" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--text-secondary)" }}>No se encontró ningún caso de uso registrado.</p>
        </div>
      )}
    </div>
  );
}
