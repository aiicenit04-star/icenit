import { db, contactSubmissions, demoRequests, jobApplications } from "@/db/client";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {
  const contacts = await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.id));
  const demos = await db
    .select()
    .from(demoRequests)
    .orderBy(desc(demoRequests.id));
  const applications = await db
    .select()
    .from(jobApplications)
    .orderBy(desc(jobApplications.id));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <header className="admin-header">
        <h1 className="admin-title">Leads y Formularios</h1>
      </header>

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
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#3b82f6", textDecoration: "underline" }}
                      >
                        Ver Currículum
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
}
