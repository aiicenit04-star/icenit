import { db, contactSubmissions, demoRequests, jobApplications, getRedactedConnectionString } from "@/db/client";
import { sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const runtime = "edge";

async function MetricCards() {
  let contactsCount = 0;
  let demosCount = 0;
  let applicationsCount = 0;

  try {
    // Run the count queries in parallel to speed up database fetching
    const [contactsCountResult, demosCountResult, applicationsCountResult] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(contactSubmissions).then(res => res[0]),
      db.select({ count: sql<number>`count(*)` }).from(demoRequests).then(res => res[0]),
      db.select({ count: sql<number>`count(*)` }).from(jobApplications).then(res => res[0])
    ]);

    contactsCount = contactsCountResult?.count || 0;
    demosCount = demosCountResult?.count || 0;
    applicationsCount = applicationsCountResult?.count || 0;
  } catch (error: any) {
    const connectionString = getRedactedConnectionString();
    const redactedUrl = connectionString.replace(/:[^:@]+@/, ":****@");
    
    return (
      <div style={{ gridColumn: "1 / -1", padding: "2rem", color: "#ef4444", backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", fontFamily: "monospace" }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#f87171" }}>Error al cargar métricas de Base de Datos</h3>
        <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>{error.message || String(error)}</p>
        <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}><strong>Causa:</strong> {error.cause ? (error.cause.message || JSON.stringify(error.cause)) : "N/A"}</div>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}

function MetricCardsFallback() {
  return (
    <>
      <div className="metric-card" style={{ opacity: 0.6 }}>
        <span className="metric-label">Demos Solicitadas</span>
        <span className="metric-value">...</span>
      </div>
      <div className="metric-card" style={{ opacity: 0.6 }}>
        <span className="metric-label">Mensajes de Contacto</span>
        <span className="metric-value">...</span>
      </div>
      <div className="metric-card" style={{ opacity: 0.6 }}>
        <span className="metric-label">Postulaciones (Carreras)</span>
        <span className="metric-value">...</span>
      </div>
    </>
  );
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== "authenticated") {
    return <div style={{ padding: "2rem", color: "#9ca3af" }}>Cargando panel...</div>;
  }

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Resumen</h1>
      </header>

      <div className="admin-grid">
        <Suspense fallback={<MetricCardsFallback />}>
          <MetricCards />
        </Suspense>
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
