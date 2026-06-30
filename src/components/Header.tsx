"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import "./components.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    if (window.innerWidth <= 900) {
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  const isProductoActive = pathname.startsWith("/modulos") || pathname.startsWith("/categoria");
  const isSolucionesActive = pathname.startsWith("/soluciones");
  const isCasosActive = pathname.startsWith("/casos-de-uso");
  const isPorqueActive = pathname.startsWith("/porque-james");
  const isPreciosActive = pathname === "/precios";
  const isEmpresaActive = pathname.startsWith("/empresa");

  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="logo-link" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.svg" alt="iCenit Logo" width="92" height="35" style={{ display: "block" }} />
        </Link>

        <button 
          className={`mobile-nav-toggle ${isMenuOpen ? "active" : ""}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <nav className={`nav-wrapper ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-menu">
            <li className={`nav-item ${activeDropdown === "producto" ? "active-mobile" : ""}`}>
              <span className={`nav-link ${isProductoActive ? "active" : ""}`} onClick={() => toggleDropdown("producto")}>
                Producto <span className="dropdown-arrow">▾</span>
              </span>
              <div className="dropdown-menu dropdown-large" style={{ minWidth: "400px" }}>
                <div className="dropdown-section">
                  <div className="dropdown-section-title">Analítica Avanzada</div>
                  <div className="dropdown-grid-two-col">
                    <Link href="/modulos/hallazgos" className={`dropdown-item ${pathname === "/modulos/hallazgos" ? "active" : ""}`} onClick={toggleMenu}>
                      <span className="dropdown-item-title">Hallazgos</span>
                    </Link>
                    <Link href="/modulos/riesgo-dinamico" className={`dropdown-item ${pathname === "/modulos/riesgo-dinamico" ? "active" : ""}`} onClick={toggleMenu}>
                      <span className="dropdown-item-title">Riesgo Dinámico</span>
                    </Link>
                    <Link href="/modulos/inspecciones" className={`dropdown-item ${pathname === "/modulos/inspecciones" ? "active" : ""}`} onClick={toggleMenu}>
                      <span className="dropdown-item-title">Inspecciones</span>
                    </Link>
                    <Link href="/modulos/predictor" className={`dropdown-item ${pathname === "/modulos/predictor" ? "active" : ""}`} onClick={toggleMenu}>
                      <span className="dropdown-item-title">Predictor</span>
                    </Link>
                    <Link href="/modulos/estrategia" className={`dropdown-item ${pathname === "/modulos/estrategia" ? "active" : ""}`} onClick={toggleMenu}>
                      <span className="dropdown-item-title">Estrategia</span>
                    </Link>
                    <Link href="/modulos/acciones" className={`dropdown-item ${pathname === "/modulos/acciones" ? "active" : ""}`} onClick={toggleMenu}>
                      <span className="dropdown-item-title">Acciones</span>
                    </Link>
                  </div>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-section-title">Aplicaciones</div>
                  <div className="dropdown-grid-two-col">
                    <Link href="/modulos/investigaciones" className={`dropdown-item ${pathname === "/modulos/investigaciones" ? "active" : ""}`} onClick={toggleMenu}>
                      <span className="dropdown-item-title">Investigaciones</span>
                    </Link>
                    <Link href="/modulos/gestor-de-matrices" className={`dropdown-item ${pathname === "/modulos/gestor-de-matrices" ? "active" : ""}`} onClick={toggleMenu}>
                      <span className="dropdown-item-title">Gestor de Matrices</span>
                    </Link>
                  </div>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-section-title">Apoyo a la Gestión</div>
                  <div className="dropdown-grid-two-col">
                    <Link href="/modulos/indicadores" className={`dropdown-item ${pathname === "/modulos/indicadores" ? "active" : ""}`} onClick={toggleMenu}>
                      <span className="dropdown-item-title">Indicadores</span>
                    </Link>
                    <Link href="/modulos/casos" className={`dropdown-item ${pathname === "/modulos/casos" ? "active" : ""}`} onClick={toggleMenu}>
                      <span className="dropdown-item-title">Casos</span>
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <Link href="/soluciones" className={`nav-link ${isSolucionesActive ? "active" : ""}`} onClick={toggleMenu}>
                Soluciones
              </Link>
            </li>

            <li className={`nav-item ${activeDropdown === "casos" ? "active-mobile" : ""}`}>
              <span className={`nav-link ${isCasosActive ? "active" : ""}`} onClick={() => toggleDropdown("casos")}>
                Casos de Uso <span className="dropdown-arrow">▾</span>
              </span>
              <div className="dropdown-menu" style={{ minWidth: "260px" }}>
                <Link href="/casos-de-uso/investigacion-de-accidente" className={`dropdown-item ${pathname === "/casos-de-uso/investigacion-de-accidente" ? "active" : ""}`} onClick={toggleMenu}>
                  <span className="dropdown-item-title">Investigación de Accidente</span>
                </Link>
                <Link href="/casos-de-uso/analisis-multivariable" className={`dropdown-item ${pathname === "/casos-de-uso/analisis-multivariable" ? "active" : ""}`} onClick={toggleMenu}>
                  <span className="dropdown-item-title">Análisis Multivariable</span>
                </Link>
                <Link href="/casos-de-uso/gestion-1-3-10" className={`dropdown-item ${pathname === "/casos-de-uso/gestion-1-3-10" ? "active" : ""}`} onClick={toggleMenu}>
                  <span className="dropdown-item-title">Gestión 1-3-10</span>
                </Link>
              </div>
            </li>

             <li className={`nav-item ${activeDropdown === "porque" ? "active-mobile" : ""}`}>
               <span className={`nav-link ${isPorqueActive ? "active" : ""}`} onClick={() => toggleDropdown("porque")}>
                 Por qué James® <span className="dropdown-arrow">▾</span>
               </span>
              <div className="dropdown-menu" style={{ minWidth: "260px" }}>
                <Link href="/porque-james" className={`dropdown-item ${pathname === "/porque-james" ? "active" : ""}`} onClick={toggleMenu}>
                  <span className="dropdown-item-title">¿Qué hace diferente?</span>
                </Link>
                <Link href="/porque-james/business-initiatives" className={`dropdown-item ${pathname === "/porque-james/business-initiatives" ? "active" : ""}`} onClick={toggleMenu}>
                  <span className="dropdown-item-title">Business Initiatives</span>
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link href="/precios" className={`nav-link ${isPreciosActive ? "active" : ""}`} onClick={toggleMenu}>
                Precios
              </Link>
            </li>

            <li className={`nav-item ${activeDropdown === "empresa" ? "active-mobile" : ""}`}>
              <span className={`nav-link ${isEmpresaActive ? "active" : ""}`} onClick={() => toggleDropdown("empresa")}>
                Empresa <span className="dropdown-arrow">▾</span>
              </span>
              <div className="dropdown-menu" style={{ minWidth: "200px" }}>
                <Link href="/empresa" className={`dropdown-item ${pathname === "/empresa" ? "active" : ""}`} onClick={toggleMenu}>
                  <span className="dropdown-item-title">Nosotros</span>
                </Link>
                <Link href="/empresa/carreras" className={`dropdown-item ${pathname === "/empresa/carreras" ? "active" : ""}`} onClick={toggleMenu}>
                  <span className="dropdown-item-title">Carreras</span>
                </Link>
                <Link href="/empresa/contacto" className={`dropdown-item ${pathname === "/empresa/contacto" ? "active" : ""}`} onClick={toggleMenu}>
                  <span className="dropdown-item-title">Contacto</span>
                </Link>
              </div>
            </li>
          </ul>
        </nav>

        <Link href="/solicita-una-demo" className="btn-cta header-cta-btn">
          Solicita una Demo
        </Link>
      </div>
    </header>
  );
}
