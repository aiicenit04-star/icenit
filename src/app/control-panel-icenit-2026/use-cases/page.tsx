"use client";

import { useEffect, useState, useCallback } from "react";

interface UseCaseData {
  id: string;
  title: string;
  context: string;
  challenge: string;
  strategy: string;
  results: string;
}

export default function UseCasesAdminPage() {
  const [allUseCases, setAllUseCases] = useState<UseCaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Editor state
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [challenge, setChallenge] = useState("");
  const [strategy, setStrategy] = useState("");
  const [results, setResults] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/use-cases")
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data: UseCaseData[]) => {
        setAllUseCases(data);
        if (data.length > 0) selectUseCase(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setFetchError(err.message);
        setLoading(false);
      });
  }, []);

  const selectUseCase = useCallback((uc: UseCaseData) => {
    setSelectedId(uc.id);
    setTitle(uc.title);
    setContext(uc.context);
    setChallenge(uc.challenge);
    setStrategy(uc.strategy);
    setResults(uc.results);
    setSaveMessage(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    setIsPending(true);
    setSaveMessage(null);

    try {
      const res = await fetch("/api/admin/use-cases", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedId, title, context, challenge, strategy, results }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setSaveMessage({ type: "success", text: "¡Caso de uso actualizado con éxito!" });
        // Sync local list
        setAllUseCases((prev) =>
          prev.map((uc) =>
            uc.id === selectedId ? { ...uc, title, context, challenge, strategy, results } : uc
          )
        );
      } else {
        setSaveMessage({ type: "error", text: json.error || "Error al guardar el caso de uso." });
      }
    } catch (err: any) {
      setSaveMessage({ type: "error", text: err.message || "Error de red al guardar." });
    } finally {
      setIsPending(false);
    }
  };

  const selectedUseCase = allUseCases.find((uc) => uc.id === selectedId);

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Editar Casos de Uso</h1>
      </header>

      {fetchError && (
        <div
          style={{
            padding: "1.25rem 1.5rem",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "10px",
            color: "#f87171",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            marginBottom: "2rem",
          }}
        >
          ⚠️ Error al cargar los casos de uso: {fetchError}
        </div>
      )}

      {loading ? (
        <div className="admin-card" style={{ opacity: 0.6 }}>
          <p style={{ color: "#9ca3af" }}>Cargando casos de uso...</p>
        </div>
      ) : (
        <>
          {/* Use Case Tabs */}
          <div className="admin-tabs" style={{ flexWrap: "wrap" }}>
            {allUseCases.map((uc) => (
              <button
                key={uc.id}
                type="button"
                className={`admin-tab ${selectedId === uc.id ? "active" : ""}`}
                onClick={() => selectUseCase(uc)}
              >
                {uc.title}
              </button>
            ))}
          </div>

          {selectedUseCase ? (
            <div className="admin-card">
              <h2
                style={{
                  marginBottom: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Caso de Uso: {selectedUseCase.title}</span>
                <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: "normal" }}>
                  Slug: {selectedUseCase.id}
                </span>
              </h2>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
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
                    placeholder={"Desafío 1\nDesafío 2"}
                    style={{ resize: "vertical" }}
                  />
                  <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    Presiona Enter para crear un nuevo punto. Cada línea se mostrará de forma independiente.
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
                    placeholder={"Estrategia 1\nEstrategia 2"}
                    style={{ resize: "vertical" }}
                  />
                  <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    Presiona Enter para crear un nuevo punto.
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
                    placeholder={"Resultado 1\nResultado 2"}
                    style={{ resize: "vertical" }}
                  />
                  <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    Cada línea se mostrará con el estilo de éxito en la página pública.
                  </span>
                </div>

                {saveMessage && (
                  <div
                    style={{
                      padding: "1rem",
                      borderRadius: "8px",
                      background:
                        saveMessage.type === "success"
                          ? "rgba(16,185,129,0.1)"
                          : "rgba(239,68,68,0.1)",
                      border:
                        saveMessage.type === "success"
                          ? "1px solid rgba(16,185,129,0.2)"
                          : "1px solid rgba(239,68,68,0.2)",
                      color: saveMessage.type === "success" ? "#10b981" : "#ef4444",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {saveMessage.type === "success" ? "✓ " : "⚠️ "}
                    {saveMessage.text}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="admin-btn" disabled={isPending}>
                    {isPending ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="admin-card" style={{ textAlign: "center" }}>
              <p style={{ color: "#6b7280" }}>No se encontró ningún caso de uso registrado.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
