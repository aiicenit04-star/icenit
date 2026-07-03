"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ErrorBoundary caught an error:", error);
  }, [error]);

  return (
    <div style={{ padding: "3rem", color: "#ef4444", backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px", margin: "2rem", fontFamily: "monospace" }}>
      <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#f87171" }}>Error en el Panel de Administración</h3>
      <p style={{ marginBottom: "1rem", fontWeight: "bold" }}>{error.message || String(error)}</p>
      
      {error.digest && (
        <div style={{ fontSize: "0.9rem", color: "#9ca3af", marginBottom: "1rem" }}>
          <strong>Digest:</strong> {error.digest}
        </div>
      )}

      <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.85rem", color: "#9ca3af", background: "#1f2937", padding: "1rem", borderRadius: "4px", marginBottom: "1rem" }}>
        {error.stack || "Sin stack trace disponible"}
      </pre>

      <button
        onClick={() => reset()}
        style={{
          padding: "0.5rem 1rem",
          background: "#FF4100",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Reintentar
      </button>
    </div>
  );
}
