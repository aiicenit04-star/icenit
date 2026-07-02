import { db, siteSettings } from "@/db/client";
import { eq } from "drizzle-orm";
import SettingsEditor from "./settings-editor";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function SettingsAdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== "authenticated") {
    return <div style={{ padding: "2rem", color: "#9ca3af" }}>Cargando panel...</div>;
  }

  // Fetch site settings (assumes ID 1 exists)
  const [settings] = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, 1));

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Configuración del Sitio</h1>
      </header>

      {settings ? (
        <div className="admin-card">
          <h2 style={{ marginBottom: "2rem" }}>Datos Globales e Identidad</h2>
          <SettingsEditor initialSettings={settings} />
        </div>
      ) : (
        <div className="admin-card" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--text-secondary)" }}>
            No se encontró el registro de configuración del sitio (ID 1). Asegúrate de haber ejecutado las migraciones y el sembrado de la base de datos.
          </p>
        </div>
      )}
    </div>
  );
}
