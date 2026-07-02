import { db, contactSubmissions, demoRequests, jobApplications, getRedactedConnectionString } from "@/db/client";
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

  let contactsCount = 0;
  let demosCount = 0;
  let applicationsCount = 0;

  try {
    const [contactsCountResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactSubmissions);
    const [demosCountResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(demoRequests);
    const [applicationsCountResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(jobApplications);

    contactsCount = contactsCountResult?.count || 0;
    demosCount = demosCountResult?.count || 0;
    applicationsCount = applicationsCountResult?.count || 0;
  } catch (error: any) {
    const connectionString = getRedactedConnectionString();
    const redactedUrl = connectionString.replace(/:[^:@]+@/, ":****@");
    
    return (
      <div style={{ padding: "3rem", color: "#ef4444", backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", margin: "2rem", fontFamily: "monospace" }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#f87171" }}>Error de Conexión a la Base de Datos</h3>
        <p style={{ marginBottom: "1rem", fontWeight: "bold" }}>{error.message || String(error)}</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem", fontSize: "0.9rem", color: "#e5e7eb" }}>
          <div><strong>Código de Error (PG/System):</strong> {error.code || "N/A"}</div>
          <div><strong>Detalle (PG):</strong> {error.detail || "N/A"}</div>
          <div><strong>Causa (Underlying Cause):</strong> {error.cause ? (error.cause.message || JSON.stringify(error.cause)) : "N/A"}</div>
          <div><strong>URL de Conexión (Redactada):</strong> {redactedUrl}</div>
        </div>

        <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.85rem", color: "#9ca3af", background: "#1f2937", padding: "1rem", borderRadius: "4px" }}>
          {error.stack || "Sin stack trace disponible"}
        </pre>
      </div>
    );
  }

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
