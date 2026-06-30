"use client";

import { useState } from "react";
import { updateUseCase } from "../actions";

interface UseCaseData {
  id: string;
  title: string;
  context: string;
  challenge: string;
  strategy: string;
  results: string;
}

interface UseCaseEditorProps {
  useCaseData: UseCaseData;
}

export default function UseCaseEditor({ useCaseData }: UseCaseEditorProps) {
  const [title, setTitle] = useState(useCaseData.title);
  const [context, setContext] = useState(useCaseData.context);
  const [challenge, setChallenge] = useState(useCaseData.challenge);
  const [strategy, setStrategy] = useState(useCaseData.strategy);
  const [results, setResults] = useState(useCaseData.results);

  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const res = await updateUseCase(
      useCaseData.id,
      title,
      context,
      challenge,
      strategy,
      results
    );

    setIsPending(false);
    if (res.success) {
      setMessage({ type: "success", text: "¡Caso de uso actualizado con éxito!" });
    } else {
      setMessage({ type: "error", text: res.error || "Ocurrió un error al guardar." });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="admin-form-group">
        <label htmlFor="uc-title">Título del Caso de Uso</label>
        <input
          id="uc-title"
          type="text"
          className="admin-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="admin-form-group">
        <label htmlFor="uc-context">Contexto / Introducción</label>
        <textarea
          id="uc-context"
          className="admin-textarea"
          rows={4}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          required
          style={{ resize: "vertical" }}
        />
      </div>

      <div className="admin-form-group">
        <label htmlFor="uc-challenge">Desafíos (Un punto por línea)</label>
        <textarea
          id="uc-challenge"
          className="admin-textarea"
          rows={6}
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          required
          placeholder="Ej: Desafío 1&#10;Desafío 2"
          style={{ resize: "vertical" }}
        />
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Presiona Enter para crear un nuevo punto o viñeta. Cada línea se mostrará como un punto independiente.
        </span>
      </div>

      <div className="admin-form-group">
        <label htmlFor="uc-strategy">Estrategia (Un punto por línea)</label>
        <textarea
          id="uc-strategy"
          className="admin-textarea"
          rows={6}
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          required
          placeholder="Ej: Estrategia 1&#10;Estrategia 2"
          style={{ resize: "vertical" }}
        />
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Presiona Enter para crear un nuevo punto. Cada línea se mostrará como un punto independiente.
        </span>
      </div>

      <div className="admin-form-group">
        <label htmlFor="uc-results">Resultados (Un punto por línea)</label>
        <textarea
          id="uc-results"
          className="admin-textarea"
          rows={6}
          value={results}
          onChange={(e) => setResults(e.target.value)}
          required
          placeholder="Ej: Resultado 1&#10;Resultado 2"
          style={{ resize: "vertical" }}
        />
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Presiona Enter para crear un nuevo punto. En el caso de "Investigación de Accidentes", estos puntos se mostrarán con el estilo verde de éxito.
        </span>
      </div>

      {message && (
        <div style={{
          padding: "1rem",
          borderRadius: "8px",
          background: message.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
          border: message.type === "success" ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(239, 68, 68, 0.2)",
          color: message.type === "success" ? "#10b981" : "#ef4444",
          fontWeight: "600",
          textAlign: "center"
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" className="admin-btn" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}
