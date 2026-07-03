"use client";
export const runtime = "edge";

import { useEffect, useState } from "react";

interface TextItem { id: string; label: string; value: string; }

const SECTIONS: Record<string, string[]> = {
  "🦸 Hero": ["hero_tag", "hero_h1", "hero_sub", "hero_cta1", "hero_cta2"],
  "⚠️ Tarjeta Problema": ["problem_highlight", "problem_body"],
  "📊 Estadísticas": ["stats_title", "stats_sub", "stats_companies", "stats_countries", "stats_sectors"],
  "🤖 CTA Mascota": ["mascot_cta_h2"],
  "📋 Sección Casos de Uso": ["cases_title", "cases_desc"],
};

const MULTILINE = ["hero_h1", "hero_sub", "problem_highlight", "problem_body", "stats_title", "stats_sub", "mascot_cta_h2", "cases_desc"];

export default function HomepagePage() {
  const [items, setItems] = useState<TextItem[]>([]);
  const [dirty, setDirty] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<{ t: "idle"|"saving"|"ok"|"err"; msg?: string }>({ t: "idle" });

  useEffect(() => {
    fetch("/api/admin/homepage-text").then(r => r.json()).then(d => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const onChange = (id: string, val: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, value: val } : i));
    setDirty(d => ({ ...d, [id]: val }));
    setSaveStatus({ t: "idle" });
  };

  const save = async () => {
    if (Object.keys(dirty).length === 0) { setSaveStatus({ t: "ok", msg: "✓ Sin cambios que guardar" }); return; }
    setSaveStatus({ t: "saving" });
    const changedItems = items.filter(i => dirty[i.id] !== undefined).map(i => ({ id: i.id, value: i.value }));
    const res = await fetch("/api/admin/homepage-text", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: changedItems }) });
    const json = await res.json();
    if (res.ok && json.success) {
      setDirty({});
      setSaveStatus({ t: "ok", msg: `✓ ${changedItems.length} campos guardados` });
    } else setSaveStatus({ t: "err", msg: json.error });
  };

  const itemMap = Object.fromEntries(items.map(i => [i.id, i]));
  const hasDirty = Object.keys(dirty).length > 0;

  return (
    <div>
      <header className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="admin-title">Texto del Homepage</h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.5rem" }}>Los cambios se aplican en tiempo real al guardar.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {saveStatus.t !== "idle" && saveStatus.msg && (
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: saveStatus.t === "ok" ? "#10b981" : saveStatus.t === "err" ? "#f87171" : "#f59e0b" }}>{saveStatus.msg}</span>
          )}
          <button onClick={save} disabled={saveStatus.t === "saving"} style={{ padding: "0.65rem 1.5rem", background: hasDirty ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "rgba(255,255,255,0.06)", border: hasDirty ? "none" : "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: hasDirty ? "#fff" : "#9ca3af", fontWeight: 700, cursor: hasDirty ? "pointer" : "not-allowed", fontSize: "0.9rem" }}>
            {saveStatus.t === "saving" ? "⏳ Guardando..." : "💾 Guardar Cambios"}
          </button>
        </div>
      </header>

      {loading ? <div className="admin-card"><p style={{ color: "#9ca3af" }}>Cargando textos...</p></div> : (
        Object.entries(SECTIONS).map(([sectionName, ids]) => (
          <div key={sectionName} className="admin-card" style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.05rem", color: "#e5e7eb", fontWeight: 700, marginBottom: "1.25rem" }}>{sectionName}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {ids.map(id => {
                const item = itemMap[id];
                if (!item) return null;
                const isMultiline = MULTILINE.includes(id);
                const isDirtyField = dirty[id] !== undefined;
                return (
                  <div key={id} className="admin-form-group">
                    <label style={{ fontSize: "0.82rem", color: "#9ca3af", marginBottom: "0.4rem", display: "flex", justifyContent: "space-between" }}>
                      {item.label}
                      {isDirtyField && <span style={{ color: "#f59e0b", fontSize: "0.75rem", fontWeight: 600 }}>● Modificado</span>}
                    </label>
                    {isMultiline ? (
                      <textarea className="admin-textarea" value={item.value} onChange={e => onChange(id, e.target.value)} rows={item.value.length > 120 ? 4 : 2} style={{ width: "100%", resize: "vertical" }} />
                    ) : (
                      <input className="admin-input" value={item.value} onChange={e => onChange(id, e.target.value)} style={{ width: "100%" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {/* Bottom save bar */}
      <div style={{ position: "sticky", bottom: "1.5rem", display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <button onClick={save} disabled={saveStatus.t === "saving"} style={{ padding: "0.8rem 2rem", background: "linear-gradient(135deg,#3b82f6,#2563eb)", border: "none", borderRadius: "10px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "1rem", boxShadow: "0 4px 20px rgba(59,130,246,0.4)" }}>
          {saveStatus.t === "saving" ? "⏳ Guardando..." : "💾 Guardar Todos los Cambios"}
        </button>
      </div>
    </div>
  );
}
