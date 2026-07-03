import { cookies } from "next/headers";
import "./admin.css";
import Link from "next/link";
import LoginForm from "./login-form";
import { logout } from "./auth-actions";

// SVG icon components — clean, monochrome, professional
const Icon = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.7 }}>
    <path d={d} />
  </svg>
);

const icons = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  leads: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 8 8-8",
  banner: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  logos: "M4 6h16M4 12h16M4 18h16",
  images: "M21 15l-5-5L5 20M14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  text: "M3 6h18M3 12h18M3 18h12",
  modules: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  cases: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  globe: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== "authenticated") {
    return (
      <div className="login-overlay">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-logo" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/logo-admin.png" alt="iCenit Logo" style={{ height: "28px", width: "auto", display: "block" }} />
          <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff" }}>Admin</span>
        </div>
        <nav className="admin-nav">
          <Link href="/control-panel-icenit-2026" className="admin-nav-item">
            <Icon d={icons.dashboard} /> Dashboard
          </Link>
          <Link href="/control-panel-icenit-2026/leads" className="admin-nav-item">
            <Icon d={icons.leads} /> Leads y Formularios
          </Link>

          <div style={{ fontSize: "0.7rem", color: "#4b5563", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.9rem 0.75rem 0.3rem", marginTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            Contenido del Sitio
          </div>
          <Link href="/control-panel-icenit-2026/banner" className="admin-nav-item">
            <Icon d={icons.banner} /> Banner Principal
          </Link>
          <Link href="/control-panel-icenit-2026/logos" className="admin-nav-item">
            <Icon d={icons.logos} /> Logos de Clientes
          </Link>
          <Link href="/control-panel-icenit-2026/imagenes" className="admin-nav-item">
            <Icon d={icons.images} /> Todas las Imágenes
          </Link>
          <Link href="/control-panel-icenit-2026/homepage" className="admin-nav-item">
            <Icon d={icons.text} /> Textos del Sitio
          </Link>

          <div style={{ fontSize: "0.7rem", color: "#4b5563", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.9rem 0.75rem 0.3rem", marginTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            Plataforma James
          </div>
          <Link href="/control-panel-icenit-2026/modules" className="admin-nav-item">
            <Icon d={icons.modules} /> Módulos
          </Link>
          <Link href="/control-panel-icenit-2026/use-cases" className="admin-nav-item">
            <Icon d={icons.cases} /> Casos de Uso
          </Link>
          <Link href="/control-panel-icenit-2026/settings" className="admin-nav-item">
            <Icon d={icons.settings} /> Configuración
          </Link>
          <Link href="/" className="admin-nav-item" target="_blank" style={{ marginTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1rem" }}>
            <Icon d={icons.globe} /> Ver Sitio Público ↗
          </Link>
        </nav>
        <form action={logout}>
          <button type="submit" className="admin-logout">
            Cerrar Sesión
          </button>
        </form>
      </aside>
      <main className="admin-content">{children}</main>
    </div>
  );
}
