import Link from "next/link";
import "./components.css";

const SUPA_URL = 'https://qksigxubxkecqffdcgcu.supabase.co';
const SUPA_KEY = 'sb_publishable_0hf41d14bVkcmpI8brc5og_jCWm-d5Z';

async function supaFetch(table: string, params: Record<string, string> = {}) {
  const url = new URL(`${SUPA_URL}/rest/v1/${table}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

interface SiteSetting {
  key: string;
  value: string;
}

export default async function Footer() {
  const [settingsRows, siteImagesRows] = await Promise.all([
    supaFetch('site_settings', { select: 'key,value' }),
    supaFetch('site_images', { select: 'id,url' }),
  ]);
  const settings: Record<string, string> = Object.fromEntries(
    (settingsRows as SiteSetting[]).map((s) => [s.key, s.value])
  );
  const siteImages: Record<string, string> = Object.fromEntries(
    (siteImagesRows as { id: string; url: string }[]).map((s) => [s.id, s.url])
  );

  const address = settings.address ?? 'Estoril 200, Piso 10, Santiago de Chile';
  const email = settings.email ?? 'contacto@icenit.ai';
  const phone = settings.phone ?? '(+562) 284 09 598';
  const linkedin = settings.linkedin ?? 'https://www.linkedin.com/company/82856989/';
  const footerRobotUrl = siteImages['footer-robot'] || '/james-clean-footer.webp';

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link href="/" className="logo-link" style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo.svg" alt="iCenit Logo" width="92" height="35" style={{ display: "block" }} />
          </Link>
          <p className="footer-slogan">
            Inteligencia aplicada al riesgo.<br />
            Ética aplicada a las decisiones.
          </p>
        </div>

        <div className="footer-column">
          <span className="footer-title">Producto</span>
          <ul className="footer-links">
            <li>
              <Link href="/modulos" className="footer-link">
                Módulos de Plataforma
              </Link>
            </li>
            <li>
              <Link href="/soluciones" className="footer-link">
                Soluciones Integrales
              </Link>
            </li>
            <li>
              <Link href="/porque-james" className="footer-link">
                Por qué James®
              </Link>
            </li>
            <li>
              <Link href="/precios" className="footer-link">
                Modelo de Precios
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <span className="footer-title">Empresa</span>
          <ul className="footer-links">
            <li>
              <Link href="/empresa" className="footer-link">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link href="/empresa/carreras" className="footer-link">
                Carreras / Empleos
              </Link>
            </li>
            <li>
              <Link href="/empresa/contacto" className="footer-link">
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="footer-link">
                Política de Privacidad
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <span className="footer-title">Contacto</span>
          <div className="footer-info">
            <p>Dirección: {address}</p>
            <p>Email: {email}</p>
            <p>Teléfono: {phone}</p>
            <p style={{ marginTop: "1rem" }}>
              <a 
                href={linkedin}
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "18px", height: "18px" }}>
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} iCenit. Todos los derechos reservados.</p>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href="/privacy-policy" className="footer-link" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Política de Privacidad
          </Link>
          <span>Santiago, Chile</span>
        </div>
      </div>

      <img src={footerRobotUrl} alt="James Waving" className="footer-robot" />
    </footer>
  );
}
