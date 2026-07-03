"use client";

export const runtime = "edge";

import { useEffect, useState } from "react";

interface ContactSubmission {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: string | null;
}

interface DemoRequest {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  message: string | null;
  createdAt: string | null;
}

interface JobApplication {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string | null;
  cvUrl: string;
  createdAt: string | null;
}

interface LeadsData {
  contacts: ContactSubmission[];
  demos: DemoRequest[];
  applications: JobApplication[];
}

function LoadingSection({ title }: { title: string }) {
  return (
    <section className="admin-card" style={{ opacity: 0.6 }}>
      <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1rem" }}>{title}</h2>
      <p style={{ color: "var(--text-secondary)" }}>Cargando...</p>
    </section>
  );
}

export default function AdminLeads() {
  const [data, setData] = useState<LeadsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <header className="admin-header">
        <h1 className="admin-title">Leads y Formularios</h1>
      </header>

      {error && (
        <div
          style={{
            padding: "1.25rem 1.5rem",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "10px",
            color: "#f87171",
            fontFamily: "monospace",
            fontSize: "0.9rem",
          }}
        >
          ⚠️ Error al cargar los datos: {error}
        </div>
      )}

      {loading ? (
        <>
          <LoadingSection title="Solicitudes de Demo" />
          <LoadingSection title="Mensajes de Contacto" />
          <LoadingSection title="Postulaciones de Empleo (Carreras)" />
        </>
      ) : data ? (
        <>
          {/* Demo Requests */}
          <section className="admin-card">
            <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1rem" }}>
              Solicitudes de Demo
              <span
                style={{
                  marginLeft: "0.75rem",
                  fontSize: "0.85rem",
                  color: "#FF4100",
                  fontWeight: "600",
                }}
              >
                ({data.demos.length})
              </span>
            </h2>
            <div className="admin-table-container">
              {data.demos.length === 0 ? (
                <p style={{ color: "var(--text-secondary)", padding: "1.5rem" }}>
                  No hay solicitudes de demostración aún.
                </p>
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
                    {data.demos.map((d) => (
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

          {/* Contact Submissions */}
          <section className="admin-card">
            <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1rem" }}>
              Mensajes de Contacto
              <span
                style={{
                  marginLeft: "0.75rem",
                  fontSize: "0.85rem",
                  color: "#FF4100",
                  fontWeight: "600",
                }}
              >
                ({data.contacts.length})
              </span>
            </h2>
            <div className="admin-table-container">
              {data.contacts.length === 0 ? (
                <p style={{ color: "var(--text-secondary)", padding: "1.5rem" }}>
                  No hay mensajes de contacto aún.
                </p>
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
                    {data.contacts.map((c) => (
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

          {/* Job Applications */}
          <section className="admin-card">
            <h2 style={{ fontFamily: "var(--font-title)", marginBottom: "1rem" }}>
              Postulaciones de Empleo (Carreras)
              <span
                style={{
                  marginLeft: "0.75rem",
                  fontSize: "0.85rem",
                  color: "#FF4100",
                  fontWeight: "600",
                }}
              >
                ({data.applications.length})
              </span>
            </h2>
            <div className="admin-table-container">
              {data.applications.length === 0 ? (
                <p style={{ color: "var(--text-secondary)", padding: "1.5rem" }}>
                  No hay postulaciones de empleo aún.
                </p>
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
                    {data.applications.map((a) => (
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
                            style={{
                              color: "#FF4100",
                              textDecoration: "underline",
                              fontWeight: "600",
                            }}
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
        </>
      ) : null}
    </div>
  );
}
