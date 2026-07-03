"use client";

import { useEffect, useState, useRef } from "react";

interface SiteImage { id: string; label: string; url: string; }

const GROUPS: Record<string, string[]> = {
  "🤖 Robot & Mascota": ["hero-robot", "hero-robot-cta", "footer-robot"],
  "📂 Categorías de Módulos": ["grupo-analitica", "grupo-aplicaciones", "grupo-apoyo"],
  "📋 Casos de Uso — Tarjetas": ["caso-1-card", "caso-2-card", "caso-3-card"],
  "🖼 Casos de Uso — Detalles": ["caso-1-hero", "caso-2-hero", "caso-3-hero", "caso-2-sankey", "caso-3-kpi"],
  "📄 Otros": ["data-driven-illustration", "og-share-image", "pricing-stage1", "pricing-stage2"],
};

function compress(file: File, maxW = 1400, q = 0.82): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (file.type === "image/svg+xml") { resolve(file); return; }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxW) { height = Math.round(height * maxW / width); width = maxW; }
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas error"));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error("Compression failed")), "image/webp", q);
    };
    img.onerror = () => reject(new Error("Image load error"));
    img.src = url;
  });
}

function ImageCard({ img, onUpdated }: { img: SiteImage; onUpdated: (id: string, url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<{ t: "idle"|"uploading"|"ok"|"err"; msg?: string }>({ t: "idle" });

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f); setStatus({ t: "idle" });
    const r = new FileReader(); r.onload = ev => setPreview(ev.target?.result as string); r.readAsDataURL(f);
  };

  const upload = async () => {
    if (!file) return;
    setStatus({ t: "uploading" });
    try {
      const isSvg = file.type === "image/svg+xml";
      const blob = await compress(file);
      const ext = isSvg ? "svg" : "webp";
      const uploadFile = new File([blob], `${img.id}.${ext}`, { type: isSvg ? "image/svg+xml" : "image/webp" });
      const form = new FormData();
      form.append("imageId", img.id);
      form.append("file", uploadFile);
      const res = await fetch("/api/admin/site-images/upload", { method: "POST", body: form });
      const json = await res.json();
      if (res.ok && json.success) {
        onUpdated(img.id, json.url + `?t=${Date.now()}`);
        setFile(null); setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
        setStatus({ t: "ok", msg: "✓ Subida correctamente" });
      } else setStatus({ t: "err", msg: json.error });
    } catch (e: any) { setStatus({ t: "err", msg: e.message }); }
  };

  const displayUrl = preview ?? img.url;

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
      <div style={{ fontSize: "0.9rem", color: "#e5e7eb", fontWeight: 600 }}>{img.label}</div>
      <div style={{ fontSize: "0.72rem", color: "#6b7280", fontFamily: "monospace" }}>{img.id}</div>

      <div style={{ height: "140px", borderRadius: "8px", overflow: "hidden", background: "rgba(0,0,0,0.3)", border: `1px dashed ${displayUrl ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {displayUrl ? (
          <img src={displayUrl} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <span style={{ fontSize: "2rem", color: "#4b5563" }}>📷</span>
        )}
        {preview && <div style={{ position: "absolute", top: 4, right: 4, background: "rgba(245,158,11,0.9)", color: "#000", fontSize: "0.6rem", fontWeight: 700, padding: "2px 5px", borderRadius: "4px" }}>PREVIEW</div>}
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <label style={{ padding: "0.45rem 0.9rem", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", color: "#e5e7eb", cursor: "pointer", fontSize: "0.82rem" }}>
          📁 Elegir
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        </label>
        {file && (
          <button onClick={upload} disabled={status.t === "uploading"} style={{ padding: "0.45rem 0.9rem", background: "linear-gradient(135deg,#10b981,#059669)", border: "none", borderRadius: "6px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}>
            {status.t === "uploading" ? "⏳..." : "⬆️ Subir"}
          </button>
        )}
        {img.url && (
          <a href={img.url.startsWith("/") ? img.url : img.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "#6b7280", textDecoration: "underline" }}>ver actual ↗</a>
        )}
      </div>

      {status.t !== "idle" && status.msg && (
        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: status.t === "ok" ? "#10b981" : "#f87171" }}>{status.msg}</div>
      )}
    </div>
  );
}

export default function ImagenesPage() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/site-images").then(r => r.json()).then(d => { setImages(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleUpdated = (id: string, url: string) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, url } : img));
  };

  const imgMap = Object.fromEntries(images.map(i => [i.id, i]));

  return (
    <div>
      <header className="admin-header">
        <h1 className="admin-title">Imágenes del Sitio</h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.5rem" }}>Las imágenes se actualizan en tiempo real en el sitio al subirlas.</p>
      </header>

      {loading ? <div className="admin-card"><p style={{ color: "#9ca3af" }}>Cargando imágenes...</p></div> : (
        Object.entries(GROUPS).map(([groupName, ids]) => (
          <div key={groupName} className="admin-card" style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.1rem", color: "#e5e7eb", marginBottom: "1.5rem", fontWeight: 700 }}>{groupName}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
              {ids.map(id => imgMap[id] ? (
                <ImageCard key={id} img={imgMap[id]} onUpdated={handleUpdated} />
              ) : null)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
