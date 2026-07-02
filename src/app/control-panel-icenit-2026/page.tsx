import { db, contactSubmissions, demoRequests, jobApplications } from "@/db/client";
import { sql } from "drizzle-orm";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== "authenticated") {
    return <div style={{ padding: "2rem", color: "#9ca3af" }}>Cargando panel...</div>;
  }

  const [contactsCountResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(contactSubmissions);
  const [demosCountResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(demoRequests);
  const [applicationsCountResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(jobApplications);

  const contactsCount = contactsCountResult?.count || 0;
  const demosCount = demosCountResult?.count || 0;
  const applicationsCount = applicationsCountResult?.count || 0;

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Resumen</h1>
      </header>

      <div className="admin-grid">
        <div className="metric-card">
          <span className="metric-label">Demos Solicitadas</span>
          <span className="metric-value">{demosCount}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Mensajes de Contacto</span>
          <span className="metric-value">{contactsCount}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Postulaciones (Carreras)</span>
          <span className="metric-value">{applicationsCount}</span>
        </div>
      </div>

      <div className="admin-card">
        <h2 style={{ marginBottom: "1rem", fontFamily: "var(--font-title)" }}>
          Panel de Administración de iCenit.ai
        </h2>
        <p style={{ color: "#9ca3af", lineHeight: "1.6" }}>
          Utiliza este panel para revisar los contactos comerciales y solicitudes de demostración recibidos a través de los formularios del sitio web. Toda la información registrada se almacena localmente y de forma segura.
        </p>
      </div>
    </div>
  );
}
