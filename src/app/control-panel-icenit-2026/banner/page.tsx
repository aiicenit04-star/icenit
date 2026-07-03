"use client";

import { useEffect, useState, useRef } from "react";

interface TextField { id: string; label: string; value: string; }

const HERO_TEXT_IDS = ["hero_tag","hero_h1","hero_sub","hero_cta1","hero_cta2"];
const STATS_IDS = ["stats_title","stats_sub","stats_companies","stats_countries","stats_sectors"];
const MULTILINE = ["hero_h1","hero_sub","stats_title","stats_sub"];

function compress(file: File, maxW = 1400, q = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (file.type === "image/svg+xml") { resolve(file); return; }
    const img = new Image();
    const u = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(u);
      let { width, height } = img;
      if (width > maxW) { height = Math.round(height * maxW / width); width = maxW; }
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas error"));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error("fail")), "image/webp", q);
    };
    img.onerror = () => reject(new Error("load error"));
    img.src = u;
  });
}

interface ImageUploadCardProps {
  label: string;
  imageId: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
}

function ImageUploadCard({ label, imageId, currentUrl, onUploaded }: ImageUploadCardProps) {
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
      const uploadFile = new File([blob], `${imageId}.${ext}`, { type: isSvg ? "image/svg+xml" : "image/webp" });
      const form = new FormData();
      form.append("imageId", imageId);
      form.append("file", uploadFile);
      const res = await fetch("/api/admin/site-images/upload", { method: "POST", body: form });
      const json = await res.json();
      if (res.ok && json.success) {
        onUploaded(json.url + `?t=${Date.now()}`);
        setFile(null); setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
        setStatus({ t: "ok", msg: "✓ Imagen actualizada" });
      } else {
        setStatus({ t: "err", msg: json.error });
      }
    } catch (e: any) { setStatus({ t: "err", msg: e.message }); }
  };

  const displayUrl = preview ?? currentUrl;

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
      <div style={{ fontWeight: 700, color: "#e5e7eb", fontSize: "0.95rem" }}>{label}</div>
      <div style={{ aspectRatio: "4/3", maxHeight: "200px", borderRadius: "8px", overflow: "hidden", background: "rgba(0,0,0,0.4)", border: `2px dashed ${displayUrl ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {displayUrl ? (
          <img src={displayUrl} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <span style={{ color: "#6b7280", fontSize: "2rem" }}>📷</span>
        )}
        {preview && <div style={{ position: "absolute", top: 6, right: 6, background: "rgba(245,158,11,0.9)", color: "#000", fontSize: "0.65rem", fontWeight: 700, padding: "2px 6px", borderRadius: "4px" }}>PREVIEW</div>}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <label style={{ padding: "0.5rem 0.9rem", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", color: "#e5e7eb", cursor: "pointer", fontSize: "0.82rem" }}>
          📁 Elegir
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        </label>
        {file && (
          <button onClick={upload} disabled={status.t === "uploading"} style={{ padding: "0.5rem 0.9rem", background: "linear-gradient(135deg,#10b981,#059669)", border: "none", borderRadius: "6px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}>
            {status.t === "uploading" ? "⏳..." : "⬆️ Subir"}
          </button>
        )}
      </div>
      {status.t !== "idle" && status.msg && (
        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: status.t === "ok" ? "#10b981" : "#f87171" }}>{status.msg}</div>
      )}
    </div>
  );
}

export default function BannerPage() {
  const [texts, setTexts] = useState<TextField[]>([]);
  const [dirty, setDirty] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<{ t: "idle"|"saving"|"ok"|"err"; msg?: string }>({ t: "idle" });

  // Site images
  const [heroRobotUrl, setHeroRobotUrl] = useState("");
  const [heroRobotCtaUrl, setHeroRobotCtaUrl] = useState("");
  const [footerRobotUrl, setFooterRobotUrl] = useState("");
  const [grupAnaliticaUrl, setGrupAnaliticaUrl] = useState("");
  const [grupAplicUrl, setGrupAplicUrl] = useState("");
  const [grupApoyoUrl, setGrupApoyoUrl] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/homepage-text").then(r => r.json()).catch(() => []),
      fetch("/api/admin/site-images").then(r => r.json()).catch(() => []),
    ]).then(([textData, imgData]) => {
      setTexts(Array.isArray(textData) ? textData : []);
      if (Array.isArray(imgData)) {
        const imgMap: Record<string, string> = Object.fromEntries(imgData.map((i: any) => [i.id, i.url]));
        setHeroRobotUrl(imgMap["hero-robot"] || "/james-robot.webp");
        setHeroRobotCtaUrl(imgMap["hero-robot-cta"] || "/james-robot-v3.webp");
        setFooterRobotUrl(imgMap["footer-robot"] || "/james-clean-footer.webp");
        setGrupAnaliticaUrl(imgMap["grupo-analitica"] || "/grupo-analitica-avanzada-v3.webp");
        setGrupAplicUrl(imgMap["grupo-aplicaciones"] || "/grupo-aplicaciones-v3.webp");
        setGrupApoyoUrl(imgMap["grupo-apoyo"] || "/grupo-apoyo-a-la-gestion-v3.webp");
      }
      setLoading(false);
    });
  }, []);

  const onChange = (id: string, val: string) => {
    setTexts(prev => prev.map(t => t.id === id ? { ...t, value: val } : t));
    setDirty(d => ({ ...d, [id]: val }));
    setSaveStatus({ t: "idle" });
  };

  const save = async () => {
    if (Object.keys(dirty).length === 0) { setSaveStatus({ t: "ok", msg: "✓ Sin cambios que guardar" }); return; }
    setSaveStatus({ t: "saving" });
    const items = texts.filter(t => dirty[t.id] !== undefined).map(t => ({ id: t.id, value: t.value }));
    const res = await fetch("/api/admin/homepage-text", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items }) });
    const json = await res.json();
    if (res.ok && json.success) { setDirty({}); setSaveStatus({ t: "ok", msg: `✓ ${items.length} textos guardados` }); }
    else setSaveStatus({ t: "err", msg: json.error });
  };

  const textMap = Object.fromEntries(texts.map(t => [t.id, t]));
  const hasDirty = Object.keys(dirty).length > 0;

  const renderField = (id: string) => {
    const item = textMap[id];
    if (!item) return null;
    const isMulti = MULTILINE.includes(id);
    const isDirty = dirty[id] !== undefined;
    return (
      <div key={id} className="admin-form-group">
        <label style={{ fontSize: "0.82rem", color: "#9ca3af", marginBottom: "0.4rem", display: "flex", justifyContent: "space-between" }}>
          {item.label}
          {isDirty && <span style={{ color: "#f59e0b", fontSize: "0.75rem", fontWeight: 600 }}>● Modificado</span>}
        </label>
        {isMulti ? (
          <textarea className="admin-textarea" value={item.value} onChange={e => onChange(id, e.target.value)} rows={item.value.length > 100 ? 4 : 2} style={{ width: "100%", resize: "vertical" }} />
        ) : (
          <input className="admin-input" value={item.value} onChange={e => onChange(id, e.target.value)} style={{ width: "100%" }} />
        )}
      </div>
    );
  };

  return (
    <div>
      <header className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="admin-title">🏠 Banner Principal & Contenido</h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            Edita imágenes y textos del banner, las categorías y el footer. Cambios en tiempo real.
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {saveStatus.t !== "idle" && saveStatus.msg && (
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: saveStatus.t === "ok" ? "#10b981" : saveStatus.t === "err" ? "#f87171" : "#f59e0b" }}>{saveStatus.msg}</span>
          )}
          <button onClick={save} disabled={saveStatus.t === "saving"} style={{ padding: "0.65rem 1.5rem", background: hasDirty ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "rgba(255,255,255,0.06)", border: hasDirty ? "none" : "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: hasDirty ? "#fff" : "#9ca3af", fontWeight: 700, cursor: hasDirty ? "pointer" : "not-allowed", fontSize: "0.9rem" }}>
            {saveStatus.t === "saving" ? "⏳ Guardando..." : "💾 Guardar Textos"}
          </button>
        </div>
      </header>

      {loading ? (
        <div className="admin-card"><p style={{ color: "#9ca3af" }}>Cargando...</p></div>
      ) : (
        <>
          {/* HERO SECTION */}
          <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "1.5rem" }}>
              🦸 Banner Hero — Textos
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {HERO_TEXT_IDS.map(id => renderField(id))}
            </div>
          </div>

          {/* HERO IMAGES */}
          <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "1.5rem" }}>
              🤖 Imágenes del Hero y Robot
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
              <ImageUploadCard label="Robot Hero (banner principal)" imageId="hero-robot" currentUrl={heroRobotUrl} onUploaded={setHeroRobotUrl} />
              <ImageUploadCard label="Robot CTA (sección intermedia)" imageId="hero-robot-cta" currentUrl={heroRobotCtaUrl} onUploaded={setHeroRobotCtaUrl} />
              <ImageUploadCard label="Robot Footer" imageId="footer-robot" currentUrl={footerRobotUrl} onUploaded={setFooterRobotUrl} />
            </div>
          </div>

          {/* CATEGORY IMAGES */}
          <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "1.5rem" }}>
              📂 Imágenes de Categorías de Módulos
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
              <ImageUploadCard label="Analítica Avanzada" imageId="grupo-analitica" currentUrl={grupAnaliticaUrl} onUploaded={setGrupAnaliticaUrl} />
              <ImageUploadCard label="Aplicaciones" imageId="grupo-aplicaciones" currentUrl={grupAplicUrl} onUploaded={setGrupAplicUrl} />
              <ImageUploadCard label="Apoyo a la Gestión" imageId="grupo-apoyo" currentUrl={grupApoyoUrl} onUploaded={setGrupApoyoUrl} />
            </div>
          </div>

          {/* STATS */}
          <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e5e7eb", marginBottom: "1.5rem" }}>
              📊 Estadísticas y Social Proof
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {STATS_IDS.map(id => renderField(id))}
            </div>
          </div>

          {/* SAVE BUTTON BOTTOM */}
          <div style={{ position: "sticky", bottom: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
            <button onClick={save} disabled={saveStatus.t === "saving"} style={{ padding: "0.8rem 2rem", background: "linear-gradient(135deg,#3b82f6,#2563eb)", border: "none", borderRadius: "10px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "1rem", boxShadow: "0 4px 20px rgba(59,130,246,0.4)" }}>
              {saveStatus.t === "saving" ? "⏳ Guardando..." : "💾 Guardar Todos los Textos"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
