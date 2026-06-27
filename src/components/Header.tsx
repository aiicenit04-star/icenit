import Link from "next/link";
import "./components.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="logo-link">
          iCenit
          <span className="logo-sub">JAMES AI ASSISTANT</span>
        </Link>

        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <span className="nav-link">Producto ▾</span>
              <div className="dropdown-menu" style={{ minWidth: "400px", gridTemplateColumns: "1fr" }}>
                <div className="dropdown-section">
                  <div className="dropdown-section-title">Analítica Avanzada</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    <Link href="/modulos/hallazgos" className="dropdown-item">
                      <span className="dropdown-item-title">Hallazgos</span>
                    </Link>
                    <Link href="/modulos/riesgo-dinamico" className="dropdown-item">
                      <span className="dropdown-item-title">Riesgo Dinámico</span>
                    </Link>
                    <Link href="/modulos/inspecciones" className="dropdown-item">
                      <span className="dropdown-item-title">Inspecciones</span>
                    </Link>
                    <Link href="/modulos/predictor" className="dropdown-item">
                      <span className="dropdown-item-title">Predictor</span>
                    </Link>
                    <Link href="/modulos/estrategia" className="dropdown-item">
                      <span className="dropdown-item-title">Estrategia</span>
                    </Link>
                    <Link href="/modulos/acciones" className="dropdown-item">
                      <span className="dropdown-item-title">Acciones</span>
                    </Link>
                  </div>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-section-title">Aplicaciones</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    <Link href="/modulos/investigaciones" className="dropdown-item">
                      <span className="dropdown-item-title">Investigaciones</span>
                    </Link>
                    <Link href="/modulos/gestor-de-matrices" className="dropdown-item">
                      <span className="dropdown-item-title">Gestor de Matrices</span>
                    </Link>
                  </div>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-section-title">Apoyo a la Gestión</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    <Link href="/modulos/indicadores" className="dropdown-item">
                      <span className="dropdown-item-title">Indicadores</span>
                    </Link>
                    <Link href="/modulos/casos" className="dropdown-item">
                      <span className="dropdown-item-title">Casos</span>
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <span className="nav-link">Soluciones ▾</span>
              <div className="dropdown-menu">
                <Link href="/soluciones#detectar" className="dropdown-item">
                  <span className="dropdown-item-title">Detectar</span>
                  <span className="dropdown-item-desc">Desviaciones en tiempo real</span>
                </Link>
                <Link href="/soluciones#entender" className="dropdown-item">
                  <span className="dropdown-item-title">Entender</span>
                  <span className="dropdown-item-desc">Causas raíz explicadas</span>
                </Link>
                <Link href="/soluciones#actuar" className="dropdown-item">
                  <span className="dropdown-item-title">Actuar</span>
                  <span className="dropdown-item-desc">Recomendaciones accionables</span>
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <span className="nav-link">Casos de Uso ▾</span>
              <div className="dropdown-menu" style={{ minWidth: "260px" }}>
                <Link href="/casos-de-uso/investigacion-de-accidente" className="dropdown-item">
                  <span className="dropdown-item-title">Investigación de Accidente</span>
                </Link>
                <Link href="/casos-de-uso/analisis-multivariable" className="dropdown-item">
                  <span className="dropdown-item-title">Análisis Multivariable</span>
                </Link>
                <Link href="/casos-de-uso/gestion-1-3-10" className="dropdown-item">
                  <span className="dropdown-item-title">Gestión 1-3-10</span>
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <span className="nav-link">Por qué James ▾</span>
              <div className="dropdown-menu" style={{ minWidth: "260px" }}>
                <Link href="/porque-james" className="dropdown-item">
                  <span className="dropdown-item-title">¿Qué hace diferente?</span>
                </Link>
                <Link href="/porque-james/business-initiatives" className="dropdown-item">
                  <span className="dropdown-item-title">Business Initiatives</span>
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link href="/precios" className="nav-link">
                Precios
              </Link>
            </li>

            <li className="nav-item">
              <span className="nav-link">Empresa ▾</span>
              <div className="dropdown-menu" style={{ minWidth: "200px" }}>
                <Link href="/empresa" className="dropdown-item">
                  <span className="dropdown-item-title">Nosotros</span>
                </Link>
                <Link href="/empresa/carreras" className="dropdown-item">
                  <span className="dropdown-item-title">Carreras</span>
                </Link>
                <Link href="/empresa/contacto" className="dropdown-item">
                  <span className="dropdown-item-title">Contacto</span>
                </Link>
              </div>
            </li>
          </ul>
        </nav>

        <Link href="/solicita-una-demo" className="btn-cta">
          Solicita una Demo
        </Link>
      </div>
    </header>
  );
}
