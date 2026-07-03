"use client";

import { useEffect, useState, useRef } from "react";

interface Logo { id: number; name: string; url: string; display_order: number; is_visible: boolean; }

function compress(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (file.type === "image/svg+xml") { resolve(file); return; }
    const img = new Image();
    const u = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(u);
      const W = 400, H = 200;
      const ratio = Math.min(W / img.width, H / img.height);
      const w = Math.round(img.width * ratio), h = Math.round(img.height * ratio);
      const canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d"); if (!ctx) return reject(new Error("Canvas error"));
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error("Compress failed")), "image/webp", 0.9);
    };
    img.onerror = () => reject(new Error("Load error"));
    img.src = u;
  });
}

export default function LogosPage() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [addStatus, setAddStatus] = useState("");
  const uploadRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const [uploadStatus, setUploadStatus] = useState<Record<number, string>>({});

  const load = () => fetch("/api/admin/client-logos").then(r => r.json()).then(d => { setLogos(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const update = async (id: number, changes: Partial<Logo>) => {
    await fetch("/api/admin/client-logos", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...changes }) });
    setLogos(prev => prev.map(l => l.id === id ? { ...l, ...changes } : l));
  };

  const del = async (logo: Logo) => {
    if (!confirm(`¿Eliminar "${logo.name}"?`)) return;
    await fetch("/api/admin/client-logos", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: logo.id }) });
    setLogos(prev => prev.filter(l => l.id !== logo.id));
  };

  const addLogo = async () => {
    if (!newName.trim()) return;
    setAddStatus("Agregando...");
    const res = await fetch("/api/admin/client-logos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newName.trim() }) });
    const json = await res.json();
    if (res.ok) { setNewName(""); setAddStatus("✓ Agregado"); load(); }
    else setAddStatus("Error: " + json.error);
  };

  const uploadLogo = async (logoId: number, file: File) => {
    setUploadStatus(p => ({ ...p, [logoId]: "⏳ Comprimiendo..." }));
    try {
      const blob = await compress(file);
      const isSvg = file.type === "image/svg+xml";
      const compressed = new File([blob], `logo-${logoId}.${isSvg ? "svg" : "webp"}`, { type: isSvg ? "image/svg+xml" : "image/webp" });
      const form = new FormData(); form.append("logoId", String(logoId)); form.append("file", compressed);
      const res = await fetch("/api/admin/client-logos/upload", { method: "POST", body: form });
      const json = await res.json();
      if (res.ok && json.success) {
        setLogos(prev => prev.map(l => l.id === logoId ? { ...l, url: json.url + `?t=${Date.now()}` } : l));
        setUploadStatus(p => ({ ...p, [logoId]: "✓ Actualizado" }));
      } else setUploadStatus(p => ({ ...p, [logoId]: "Error: " + json.error }));
    } catch (e: any) { setUploadStatus(p => ({ ...p, [logoId]: "Error: " + e.message })); }
  };

  const moveOrder = async (logo: Logo, dir: -1 | 1) => {
    const sorted = [...logos].sort((a, b) => a.display_order - b.display_order);
    const idx = sorted.findIndex(l => l.id === logo.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    await update(logo.id, { display_order: swap.display_order });
    await update(swap.id, { display_order: logo.display_order });
    load();
  };

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Logos de Clientes</h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.5rem" }}>Los logos visibles aparecen en la sección de clientes del homepage.</p>
      </header>

      {/* Add new logo */}
      <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem", color: "#e5e7eb", fontWeight: 700, marginBottom: "1rem" }}>➕ Agregar Logo</h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <input className="admin-input" placeholder="Nombre de la empresa" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: "240px" }} />
          <button onClick={addLogo} className="admin-btn" style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>Agregar</button>
          {addStatus && <span style={{ color: addStatus.startsWith("✓") ? "#10b981" : "#f87171", fontSize: "0.85rem" }}>{addStatus}</span>}
        </div>
      </div>

      {loading ? <div className="admin-card"><p style={{ color: "#9ca3af" }}>Cargando logos...</p></div> : (
        <div className="admin-card">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {[...logos].sort((a, b) => a.display_order - b.display_order).map((logo) => (
              <div key={logo.id} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${logo.is_visible ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.06)"}`, borderRadius: "12px", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {/* Preview */}
                <div style={{ height: "80px", background: "rgba(255,255,255,0.08)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {logo.url ? <img src={logo.url} alt={logo.name} style={{ maxHeight: "60px", maxWidth: "100%", objectFit: "contain" }} /> : <span style={{ color: "#4b5563", fontSize: "0.8rem" }}>Sin logo</span>}
                </div>
                {/* Name */}
                <input className="admin-input" value={logo.name} onChange={e => setLogos(prev => prev.map(l => l.id === logo.id ? { ...l, name: e.target.value } : l))} onBlur={() => update(logo.id, { name: logo.name })} style={{ fontSize: "0.85rem", padding: "0.4rem 0.6rem" }} />
                {/* Upload */}
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.7rem", background: "rgba(255,255,255,0.06)", border: "1px dashed rgba(255,255,255,0.12)", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", color: "#9ca3af" }}>
                  📁 Subir logo
                  <input type="file" accept="image/*" style={{ display: "none" }} ref={el => { uploadRefs.current[logo.id] = el; }} onChange={e => { const f = e.target.files?.[0]; if (f) uploadLogo(logo.id, f); }} />
                </label>
                {uploadStatus[logo.id] && <span style={{ fontSize: "0.78rem", color: uploadStatus[logo.id]?.startsWith("✓") ? "#10b981" : "#f87171" }}>{uploadStatus[logo.id]}</span>}
                {/* Controls */}
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  <button onClick={() => update(logo.id, { is_visible: !logo.is_visible })} style={{ padding: "0.35rem 0.7rem", background: logo.is_visible ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.07)", border: `1px solid ${logo.is_visible ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.12)"}`, borderRadius: "6px", color: logo.is_visible ? "#10b981" : "#9ca3af", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}>
                    {logo.is_visible ? "✅ Visible" : "⬜ Oculto"}
                  </button>
                  <button onClick={() => moveOrder(logo, -1)} style={{ padding: "0.35rem 0.6rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#9ca3af", cursor: "pointer", fontSize: "0.85rem" }}>↑</button>
                  <button onClick={() => moveOrder(logo, 1)} style={{ padding: "0.35rem 0.6rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#9ca3af", cursor: "pointer", fontSize: "0.85rem" }}>↓</button>
                  <button onClick={() => del(logo)} style={{ padding: "0.35rem 0.6rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "6px", color: "#f87171", cursor: "pointer", fontSize: "0.78rem" }}>🗑</button>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#4b5563" }}>Orden: {logo.display_order}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
