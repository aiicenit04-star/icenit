import { db, contactSubmissions, demoRequests, jobApplications, getRedactedConnectionString } from "@/db/client";
import { desc } from "drizzle-orm";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const runtime = "edge";

async function LeadsDashboard() {
  try {
    // Run the queries concurrently to speed up database performance
    const [contacts, demos, applications] = await Promise.all([
      db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.id)),
      db.select().from(demoRequests).orderBy(desc(demoRequests.id)),
      db.select().from(jobApplications).orderBy(desc(jobApplications.id))
    ]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* Demo Requests Section */}
        <section className="admin-card">
          <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1rem" }}>
            Solicitudes de Demo
          </h2>
          <div className="admin-table-container">
            {demos.length === 0 ? (
              <p style={{ color: "var(--text-secondary)" }}>No hay solicitudes de demostración aún.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Empresa</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Mensaje</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {demos.map((d) => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>{d.company}</td>
                      <td>{d.email}</td>
                      <td>{d.phone || "—"}</td>
                      <td title={d.message || ""}>{d.message || "—"}</td>
                      <td>{d.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Contact Submissions Section */}
        <section className="admin-card">
          <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1rem" }}>
            Mensajes de Contacto
          </h2>
          <div className="admin-table-container">
            {contacts.length === 0 ? (
              <p style={{ color: "var(--text-secondary)" }}>No hay mensajes de contacto aún.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Empresa</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Asunto</th>
                    <th>Mensaje</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>{c.company || "—"}</td>
                      <td>{c.email}</td>
                      <td>{c.phone || "—"}</td>
                      <td>{c.subject || "—"}</td>
                      <td title={c.message}>{c.message}</td>
                      <td>{c.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Job Applications Section */}
        <section className="admin-card">
          <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1rem" }}>
            Postulaciones de Empleo (Carreras)
          </h2>
          <div className="admin-table-container">
            {applications.length === 0 ? (
              <p style={{ color: "var(--text-secondary)" }}>No hay postulaciones de empleo aún.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Posición</th>
                    <th>Mensaje</th>
                    <th>CV</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((a) => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.name}</td>
                      <td>{a.email}</td>
                      <td>{a.phone}</td>
                      <td>{a.position}</td>
                      <td title={a.message || ""}>{a.message || "—"}</td>
                      <td>
                        <a
                          href={a.cvUrl}
                          download={`CV_${a.name.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`}
                          style={{ color: "#FF4100", textDecoration: "underline", fontWeight: "600" }}
                        >
                          Descargar CV
                        </a>
                      </td>
                      <td>{a.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    );
  } catch (error: any) {
    const connectionString = getRedactedConnectionString();
    const redactedUrl = connectionString.replace(/:[^:@]+@/, ":****@");

    return (
      <div style={{ padding: "2rem", color: "#ef4444", backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", fontFamily: "monospace" }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#f87171" }}>Error al cargar datos de formularios</h3>
        <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>{error.message || String(error)}</p>
        <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}><strong>Causa:</strong> {error.cause ? (error.cause.message || JSON.stringify(error.cause)) : "N/A"}</div>
      </div>
    );
  }
}

function LeadsFallback() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <section className="admin-card" style={{ opacity: 0.6 }}>
        <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1rem" }}>Solicitudes de Demo</h2>
        <p style={{ color: "var(--text-secondary)" }}>Cargando solicitudes...</p>
      </section>
      <section className="admin-card" style={{ opacity: 0.6 }}>
        <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1rem" }}>Mensajes de Contacto</h2>
        <p style={{ color: "var(--text-secondary)" }}>Cargando mensajes...</p>
      </section>
      <section className="admin-card" style={{ opacity: 0.6 }}>
        <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1rem" }}>Postulaciones de Empleo (Carreras)</h2>
        <p style={{ color: "var(--text-secondary)" }}>Cargando postulaciones...</p>
      </section>
    </div>
  );
}

export default async function AdminLeads() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== "authenticated") {
    return <div style={{ padding: "2rem", color: "#9ca3af" }}>Cargando panel...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <header className="admin-header">
        <h1 className="admin-title">Leads y Formularios</h1>
      </header>

      <Suspense fallback={<LeadsFallback />}>
        <LeadsDashboard />
      </Suspense>
    </div>
  );
}
