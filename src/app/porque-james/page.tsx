"use client";

export const runtime = "edge";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import "../public.css";

interface QAItem {
  q: string;
  a: string;
}

export default function PorqueJamesPage() {
  const faqs: QAItem[] = [
    {
      q: "¿Qué hace diferente a la plataforma?",
      a: "La plataforma no solo registra información: analiza datos multicausales, detecta patrones invisibles y anticipa riesgos antes de que ocurran incidentes. Integra modelos propios de inteligencia artificial, librerías técnicas especializadas y experiencia industrial real acumulada. Cada hallazgo es explicable, trazable y accionable, permitiendo decisiones basadas en evidencia. A diferencia de sistemas tradicionales, no reporta el pasado, sino que proyecta escenarios futuros. Es una solución diseñada específicamente para transformar la gestión preventiva desde reactiva a predictiva.",
    },
    {
      q: "¿Cómo se compara con otras plataformas?",
      a: "Opera como una analítica de última milla única en el mercado, que se integra verticalmente sobre sistemas existentes del cliente, potenciando su información con inteligencia predictiva avanzada. Mientras otras soluciones administran procesos o generan reportes descriptivos, la plataforma interpreta causas profundas y anticipa desviaciones complejas. Si una organización no posee base digital estructurada, también puede construirse junto al cliente. Ninguna solución actual combina especialización SSO, IA multivariable y experiencia operacional real. Es una capa de inteligencia estratégica sobre la infraestructura existente.",
    },
    {
      q: "¿Cómo se mide el retorno de la inversión?",
      a: "El retorno se mide tanto en impactos directos como indirectos. Directamente, en reducción de accidentes, costos operacionales, tiempos de análisis, detenciones y primas de seguro. Indirectamente, en protección de vidas humanas, estabilidad laboral y reducción de impactos sociales y reputacionales. Cada incidente evitado representa ahorro financiero y bienestar humano. El ROI combina eficiencia económica con responsabilidad social real.",
    },
    {
      q: "¿Qué riesgos existen al no implementarla?",
      a: "Persisten puntos ciegos operacionales, análisis reactivo y decisiones tardías. La organización continúa dependiendo de reportes descriptivos que explican el pasado pero no anticipan el futuro. Esto aumenta exposición a eventos críticos, pérdidas económicas y deterioro reputacional. También limita la capacidad de priorizar recursos preventivos. En síntesis, se mantiene el riesgo sin inteligencia predictiva.",
    },
    {
      q: "¿Por qué confiar en iCenit?",
      a: "Porque combinamos experiencia industrial real, modelos analíticos propietarios y arquitectura tecnológica robusta. Contamos con librerías técnicas especializadas, datos históricos reales y metodologías probadas en operaciones críticas. Acompañamos técnica y estratégicamente a cada cliente durante la implementación y evolución. Nuestro enfoque integra tecnología, conocimiento y gestión. Eso asegura adopción, impacto y resultados medibles.",
    },
    {
      q: "¿Qué problema concreto resuelve?",
      a: "Las organizaciones suelen gestionar riesgos de forma reactiva, con datos dispersos, análisis manuales y baja capacidad para anticipar eventos críticos. Esto genera pérdidas humanas, operacionales, económicas y reputacionales. La plataforma integra información histórica y actual, estructurada y no estructurada, para identificar patrones multicausales invisibles al análisis tradicional. Permite priorizar acciones preventivas reales, optimizar recursos y reducir incertidumbre. En concreto, convierte grandes volúmenes de datos en decisiones preventivas concretas y medibles.",
    },
    {
      q: "¿Cómo se implementa la plataforma?",
      a: "La implementación es modular, progresiva y basada en una estrategia digital efectiva que facilita la adopción organizacional gradual. Se integra a sistemas existentes, carga datos históricos y comienza a generar análisis en corto plazo. Cada sprint incorpora módulos según madurez digital y prioridades del cliente, combinando despliegue tecnológico con alineamiento operativo y estratégico. El proceso es acompañado por especialistas técnicos y expertos en seguridad industrial. No reemplaza sistemas actuales: los potencia con inteligencia analítica.",
    },
    {
      q: "¿Quiénes usan la plataforma dentro de la organización?",
      a: "La utilizan principalmente áreas de seguridad, operaciones, excelencia operacional y analítica, que lideran la gestión preventiva. También es utilizada por ejecutivos que requieren visibilidad estratégica para decisiones corporativas. El impacto se refleja en mejoras de desempeño que pueden oscilar entre 30% y 65% según madurez digital. Influye tanto en decisiones estratégicas de largo plazo como en acciones operativas inmediatas en terreno.",
    },
    {
      q: "¿Qué resultados se pueden esperar?",
      a: "Los clientes obtienen mejoras medibles en eficiencia preventiva, priorización de riesgos y calidad de decisiones. La plataforma reduce tiempos de análisis, automatiza monitoreo y optimiza recursos preventivos. Permite anticipar incidentes antes de que ocurran y fortalecer la cultura de seguridad organizacional. Su valor crece progresivamente a medida que se incorporan datos y uso operativo.",
    },
    {
      q: "¿Reemplaza sistemas existentes?",
      a: "No reemplaza sistemas actuales; los complementa y potencia. Funciona como una capa analítica que se integra a múltiples fuentes de datos, estructuradas y no estructuradas. Aprovecha información histórica existente y la transforma en inteligencia accionable. Esta integración permite obtener valor inmediato sin alterar la arquitectura tecnológica del cliente.",
    },
    {
      q: "¿Cuánto esfuerzo requiere?",
      a: "El esfuerzo interno es acotado porque el equipo combina especialistas tecnológicos en datos e integración con expertos senior en seguridad industrial. La implementación es integral y abarca tecnología, procesos y estrategia organizacional. El equipo acompaña a gerencias y líderes en distintos niveles, guiando decisiones y asegurando adopción real. No solo se despliega software: se acompaña la transformación preventiva.",
    },
    {
      q: "¿Cómo protegen la privacidad de los datos?",
      a: "La plataforma opera bajo un marco formal de seguridad de la información que protege confidencialidad, integridad y disponibilidad durante todo el ciclo de vida de los datos. Se aplican controles de acceso, clasificación de información y trazabilidad de uso. Solo usuarios autorizados acceden a información según rol y contexto. El tratamiento de datos cumple requisitos regulatorios, contractuales y estándares exigentes de clientes.",
    },
    {
      q: "¿Qué nivel de ciberseguridad tiene?",
      a: "La arquitectura se basa en infraestructura cloud robusta y proveedores que cumplen estándares internacionales de seguridad. El desarrollo incorpora seguridad desde diseño, con pruebas, control de versiones y auditorías periódicas. Las prácticas se alinean con marcos como ISO 27001, NIST y OWASP. Esto garantiza protección de nivel corporativo global.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1 }}>
        <div className="section-header" style={{ marginBottom: "5rem" }}>
          <span className="section-subtitle">Preguntas Frecuentes</span>
          <h1 className="section-title" style={{ fontSize: "3.5rem" }}>
            Por qué James®
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            Resuelve todas tus dudas sobre el asistente de IA, su retorno de inversión, ciberseguridad e implementación en terreno.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: "3rem", maxWidth: "900px", margin: "0 auto" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`accordion-item ${activeIndex === index ? "active" : ""}`}
            >
              <button className="accordion-trigger" onClick={() => toggleAccordion(index)}>
                <span>{faq.q}</span>
                <span style={{ fontSize: "1.5rem", transition: "transform 0.2s" }}>
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              <div className="accordion-content">
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7" }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
