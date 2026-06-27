import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db, useCases } from "@/db/client";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import "../../public.css";

export const dynamic = "force-dynamic";

interface UseCasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function UseCaseDetailPage({ params }: UseCasePageProps) {
  const { slug } = await params;

  const [useCase] = await db
    .select()
    .from(useCases)
    .where(eq(useCases.id, slug));

  if (!useCase) {
    notFound();
  }

  // Parse carriage returns for bullets or lists if applicable
  const challenges = useCase.challenge.split("\n");
  const strategies = useCase.strategy.split("\n");
  const results = useCase.results.split("\n");

  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/"
            style={{ color: "var(--accent-blue-light)", fontWeight: "600", fontSize: "0.9rem" }}
          >
            &larr; Volver al Inicio
          </Link>
        </div>

        <div className="section-header" style={{ marginBottom: "4rem", textAlign: "left" }}>
          <span className="section-subtitle">Caso de Uso Práctico</span>
          <h1 className="section-title" style={{ fontSize: "3rem", textAlign: "left" }}>
            {useCase.title}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "1rem", lineHeight: "1.6" }}>
            <strong>Contexto:</strong> {useCase.context}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
          {/* Left Column: Challenge */}
          <div className="glass-panel" style={{ padding: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "1.4rem",
                fontWeight: "700",
                color: "#fff",
                marginBottom: "1.5rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
              }}
            >
              El Desafío
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", color: "var(--text-secondary)" }}>
              {challenges.map((c, i) => (
                <li key={i} style={{ lineHeight: "1.6", fontSize: "0.95rem" }}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Right Column: Strategy with James */}
          <div className="glass-panel" style={{ padding: "2.5rem", borderLeft: "4px solid var(--accent-blue)" }}>
            <h2
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "1.4rem",
                fontWeight: "700",
                color: "var(--accent-blue-light)",
                marginBottom: "1.5rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
              }}
            >
              Estrategia con James®
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", color: "var(--text-secondary)" }}>
              {strategies.map((s, i) => (
                <li key={i} style={{ lineHeight: "1.6", fontSize: "0.95rem" }}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <section
          className="problem-card"
          style={{
            marginTop: "4rem",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 7, 12, 0.6) 100%)",
            borderTop: "2px solid var(--accent-green)",
            textAlign: "left",
            padding: "3.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "1.8rem",
              fontWeight: "700",
              color: "var(--accent-green)",
              marginBottom: "1.5rem",
            }}
          >
            Resultados Obtenidos
          </h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", color: "var(--text-primary)" }}>
            {results.map((r, i) => (
              <li
                key={i}
                style={{
                  lineHeight: "1.6",
                  fontSize: "1.05rem",
                  display: "flex",
                  alignItems: "start",
                  gap: "0.75rem",
                }}
              >
                <span style={{ color: "var(--accent-green)", fontWeight: "bold" }}>✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
