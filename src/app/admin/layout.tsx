import { cookies } from "next/headers";
import "./admin.css";
import Link from "next/link";
import LoginForm from "./login-form";
import { logout } from "./actions";

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
        <div className="admin-logo">iCenit Admin</div>
        <nav className="admin-nav">
          <Link href="/admin" className="admin-nav-item">
            Dashboard
          </Link>
          <Link href="/admin/leads" className="admin-nav-item">
            Leads y Formularios
          </Link>
          <Link href="/" className="admin-nav-item" target="_blank">
            Ver Sitio Público
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
