"use client";

export const runtime = "edge";

import { useEffect, useState } from "react";

interface Metrics {
  contacts: number;
  demos: number;
  applications: number;
}

function MetricCard({ label, value, loading }: { label: string; value: number; loading: boolean }) {
  return (
    <div className="metric-card">
      <span className="metric-label">{label}</span>
      <span className="metric-value">{loading ? "..." : value}</span>
    </div>
  );
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Resumen</h1>
      </header>

      {error && (
        <div
          style={{
            padding: "1.25rem 1.5rem",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "10px",
            color: "#f87171",
            marginBottom: "2rem",
            fontFamily: "monospace",
            fontSize: "0.9rem",
          }}
        >
          ⚠️ Error al cargar métricas: {error}
        </div>
      )}

      <div className="admin-grid">
        <MetricCard label="Demos Solicitadas" value={metrics?.demos ?? 0} loading={loading} />
        <MetricCard label="Mensajes de Contacto" value={metrics?.contacts ?? 0} loading={loading} />
        <MetricCard label="Postulaciones (Carreras)" value={metrics?.applications ?? 0} loading={loading} />
      </div>

      <div className="admin-card">
        <h2 style={{ marginBottom: "1rem", fontFamily: "var(--font-title)" }}>
          Panel de Administración de iCenit.ai
        </h2>
        <p style={{ color: "#9ca3af", lineHeight: "1.6" }}>
          Utiliza este panel para revisar los contactos comerciales y solicitudes de demostración
          recibidos a través de los formularios del sitio web. Toda la información registrada se
          almacena localmente y de forma segura.
        </p>
      </div>
    </div>
  );
}
