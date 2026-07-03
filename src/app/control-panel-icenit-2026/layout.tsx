import { cookies } from "next/headers";
import "./admin.css";
import Link from "next/link";
import LoginForm from "./login-form";
import { logout } from "./auth-actions";

export const runtime = "edge";

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
            Dashboard
          </Link>
          <Link href="/control-panel-icenit-2026/leads" className="admin-nav-item">
            Leads y Formularios
          </Link>

          <div style={{ fontSize: "0.7rem", color: "#4b5563", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.9rem 0.75rem 0.3rem", marginTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            Contenido del Sitio
          </div>
          <Link href="/control-panel-icenit-2026/homepage" className="admin-nav-item">
            📝 Texto del Homepage
          </Link>
          <Link href="/control-panel-icenit-2026/imagenes" className="admin-nav-item">
            🖼 Imágenes del Sitio
          </Link>
          <Link href="/control-panel-icenit-2026/logos" className="admin-nav-item">
            🏢 Logos de Clientes
          </Link>

          <div style={{ fontSize: "0.7rem", color: "#4b5563", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.9rem 0.75rem 0.3rem", marginTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            Plataforma
          </div>
          <Link href="/control-panel-icenit-2026/modules" className="admin-nav-item">
            🧩 Módulos
          </Link>
          <Link href="/control-panel-icenit-2026/use-cases" className="admin-nav-item">
            📋 Casos de Uso
          </Link>
          <Link href="/control-panel-icenit-2026/settings" className="admin-nav-item">
            ⚙️ Configuración
          </Link>
          <Link href="/" className="admin-nav-item" target="_blank" style={{ marginTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1rem" }}>
            🌐 Ver Sitio Público
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
