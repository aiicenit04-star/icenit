import Link from "next/link";
import "./components.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link href="/" className="logo-link">
            iCenit
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
            <p>Dirección: Estoril 200, Piso 10, Santiago de Chile</p>
            <p>Email: contacto@icenit.ai</p>
            <p>Teléfono: (+562) 284 09 598</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} iCenit. Todos los derechos reservados.</p>
        <p>Santiago, Chile</p>
      </div>
    </footer>
  );
}
