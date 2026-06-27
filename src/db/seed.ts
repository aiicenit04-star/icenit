import { db, siteSettings, modules, moduleFeatures, useCases } from "./client";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Seeding database...");

  // 1. Seed site settings
  const settingsCount = await db.select().from(siteSettings);
  if (settingsCount.length === 0) {
    await db.insert(siteSettings).values({
      phone: "(+562) 284 09 598",
      email: "contacto@icenit.ai",
      address: "Santiago de Chile, Estoril 200, Piso 10",
      linkedin: "https://www.linkedin.com/company/icenit",
      metaTitle: "iCenit.ai — JAMES AI ASSISTANT®",
      metaDescription:
        "Transformamos datos en decisiones que anticipan riesgos en seguridad y medio ambiente. Inteligencia validada por expertos para proteger vidas y operaciones.",
    });
    console.log("Site settings seeded.");
  }

  // 2. Seed modules
  const modulesList = [
    {
      id: "hallazgos",
      category: "analitica-avanzada",
      title: "Hallazgos",
      subtitle: "Descubre patrones ocultos",
      metaDescription:
        "Identifica desviaciones multicausales integrando datos de diversas fuentes operacionales.",
      description:
        "El módulo Hallazgos Identifica desviaciones multicausales integrando datos de diversas fuentes operacionales. Utiliza inteligencia artificial supervisada, algoritmos propios y librerías técnicas para revelar relaciones complejas invisibles al ojo humano. Cada hallazgo se clasifica, se valida y se traza hasta su origen, permitiendo decisiones precisas y basadas en evidencia.",
      features: [
        "Identificación de desviaciones multicausales",
        "Análisis avanzado con IA supervisada",
        "Integración de múltiples fuentes de datos",
        "Enriquecimiento con librerías técnicas propias",
        "Detección de patrones invisibles al ojo humano",
        "Clasificación y trazabilidad total de hallazgos",
        "Análisis estadístico de comportamiento y tendencias",
        "Base sólida para acciones correctivas y predictivas",
      ],
    },
    {
      id: "riesgo-dinamico",
      category: "analitica-avanzada",
      title: "Riesgo Dinámico",
      subtitle: "Gestión viva del riesgo",
      metaDescription:
        "Transforma la evaluación tradicional del riesgo en un proceso activo y conectado.",
      description:
        "El módulo Riesgo Dinámico transforma la evaluación tradicional del riesgo en un proceso activo y conectado. Para cada cliente, integra resultados, desviaciones y desempeño diario en matrices ISO 31000, vinculando riesgos con actividades operacionales y estrategias, anticipando decisiones efectivas basadas en impacto y probabilidad actualizadas.",
      features: [
        "Matrices ISO 31000 configurables",
        "Actualización diaria de riesgos",
        "Integración de desempeño y resultados",
        "Enlace directo a actividades operacionales",
        "Evaluación por impacto y probabilidad",
        "Visualización dinámica y analítica",
        "Conexión continua con la estrategia",
        "Anticipación de decisiones críticas",
      ],
    },
    {
      id: "inspecciones",
      category: "analitica-avanzada",
      title: "Inspecciones",
      subtitle: "Prevención focalizada",
      metaDescription:
        "Optimiza el uso de recursos preventivos mediante inteligencia analítica.",
      description:
        "El módulo Inspecciones optimiza el uso de recursos preventivos mediante inteligencia analítica. Prioriza actividades, áreas y controles según desviaciones reales y contexto operativo, orientando la gestión hacia los focos de mayor impacto. James guía la asignación de inspecciones y herramientas preventivas donde los riesgos requieren mayor atención.",
      features: [
        "Focalización inteligente de inspecciones",
        "Priorización por riesgo y contexto operativo",
        "Optimización del uso de recursos preventivos",
        "Integración con analítica avanzada",
        "Asistencia digital de James",
        "Orientación hacia riesgos críticos",
        "Mejora continua del control preventivo",
        "Mayor eficiencia en terreno",
      ],
    },
    {
      id: "predictor",
      category: "analitica-avanzada",
      title: "Predictor",
      subtitle: "Descubre patrones ocultos",
      metaDescription:
        "Habilita tácticas predictivas mediante analítica avanzada e inteligencia artificial supervisada.",
      description:
        "El módulo Predictor habilita tácticas predictivas mediante analítica avanzada e inteligencia artificial supervisada. Asigna índices de potencial de ocurrencia a actividades programadas, integrando contexto operacional e histórico. Permite anticipar escenarios de riesgo y priorizar acciones preventivas basadas en evidencia, fortaleciendo la toma de decisiones proactivas.",
      features: [
        "Anticipación de riesgos futuros",
        "Índices de potencial de ocurrencia",
        "Integración de contexto e historia",
        "Priorización proactiva de acciones",
        "Soporte predictivo a la gestión",
        "Análisis basado en evidencia",
        "Decisiones preventivas fortalecidas",
      ],
    },
    {
      id: "estrategia",
      category: "analitica-avanzada",
      title: "Estrategia",
      subtitle: "Monitoreo del desempeño de estrategias",
      metaDescription:
        "Evalúa el desempeño de las estrategias de seguridad y salud ocupacional.",
      description:
        "Evalúa el desempeño de las estrategias de seguridad y salud ocupacional, identificando brechas entre los riesgos definidos, la implementación y los resultados obtenidos. Integra información de toda la plataforma para fortalecer la coherencia entre planificación, ejecución y control, impulsando la mejora continua y la optimización de los resultados estratégicos.",
      features: [
        "Evaluación integral de estrategias",
        "Identificación de brechas de desempeño",
        "Análisis de coherencia y efectividad",
        "Integración con analítica avanzada",
        "Control estratégico basado en datos",
        "Fortalecimiento de resultados operacionales",
      ],
    },
    {
      id: "acciones",
      category: "analitica-avanzada",
      title: "Acciones",
      subtitle: "Del análisis a la acción",
      metaDescription:
        "Transforma los hallazgos y análisis en recomendaciones de acciones concretas.",
      description:
        "Transforma los hallazgos y análisis en recomendaciones de acciones concretas. Clasifica, prioriza y consolida las acciones derivadas de los modelos analíticos. Garantiza trazabilidad, verificación y evidencia de cada acción, dentro de una gestión integrada que conecta diagnóstico, ejecución y mejora continua.",
      features: [
        "Acciones derivadas de la analítica",
        "Priorización según riesgo e impacto",
        "Clasificación por tipo y causa",
        "Evidencia trazable y verificable",
        "Consolidación integrada en la plataforma",
        "Conexión entre diagnóstico y mejora",
      ],
    },
    {
      id: "investigaciones",
      category: "aplicaciones",
      title: "Investigaciones",
      subtitle: "Evidencia que impulsa el aprendizaje",
      metaDescription: "Estandariza y optimiza la investigación de incidentes.",
      description:
        "Aplicación que estandariza y optimiza la investigación de incidentes, identificando causas raíz y factores contribuyentes con evidencia concreta. Utiliza metodologías reconocidas para análisis objetivos, asegurando trazabilidad, consistencia y calidad. Cada investigación se integra automáticamente al modelo iCenit, fortaleciendo el aprendizaje organizacional y la mejora continua.",
      features: [
        "Definiciones basadas en evidencia",
        "Uso de elementos de la estrategia organizacional",
        "Soporte de asistente digital",
        "Optimiza productividad en las investigaciones",
        "Asegura calidad en investigaciones",
        "Integración automática al modelo iCenit",
        "Causas raíz objetivas y comparables",
      ],
    },
    {
      id: "gestor-de-matrices",
      category: "aplicaciones",
      title: "Gestor de Matrices",
      subtitle: "Matrices vivas y conectadas",
      metaDescription: "Desarrolla, actualiza y gestiona matrices IPER.",
      description:
        "Aplicación diseñada para desarrollar, actualizar y gestionar matrices IPER de forma digital, ágil y con total adherencia metodológica. Permite registrar actividades operacionales, vincular riesgos y definir controles bajo estándares ISO 31000 y procedimientos específicos de cada cliente. Las matrices permanecen vivas e integradas al modelo iCenit, garantizando trazabilidad y mejora continua.",
      features: [
        "Registro digital de actividades y riesgos",
        "Evaluación estructurada según ISO 31000",
        "Integración inmediata al modelo iCenit",
        "Asistencia digital en talleres IPER",
        "Adherencia metodológica y trazabilidad total",
        "Matrices internas y externas de proveedores",
        "Matrices conectadas a la operación diaria",
        "Mejora continua y colaboración ágil",
      ],
    },
    {
      id: "indicadores",
      category: "apoyo-a-la-gestion",
      title: "Indicadores",
      subtitle: "Datos integrados, KPIs conectados",
      metaDescription:
        "Centraliza y consolida los resultados de la gestión de seguridad y salud ocupacional.",
      description:
        "Centraliza y consolida los resultados de la gestión de seguridad y salud ocupacional, integrando datos desde el nivel más granular hasta los indicadores clave de desempeño. Permite monitorear la evolución de la gestión mediante métricas comparativas y trazables, fortaleciendo la toma de decisiones basadas en evidencia dentro de un entorno unificado.",
      features: [
        "Integración completa desde dato a KPI",
        "Consolidación global de resultados",
        "Indicadores comparativos y descriptivos",
        "Actualización periódica de métricas",
        "Trazabilidad de causas y desviaciones",
        "Transparencia en el desempeño global",
        "Soporte para decisiones basadas en evidencia",
        "Visualización clara y conectada del resultado",
      ],
    },
    {
      id: "casos",
      category: "apoyo-a-la-gestion",
      title: "Casos",
      subtitle: "Acciones completadas, beneficios reales",
      metaDescription:
        "Consolida las acciones derivadas de las analíticas y hallazgos, asegurando su seguimiento, verificación y trazabilidad.",
      description:
        "El módulo de Gestión de Casos consolida las acciones derivadas de las analíticas y hallazgos, asegurando su seguimiento, verificación y trazabilidad. Genera un histórico consultable de casos que permite aprovechar la experiencia acumulada mediante búsquedas ágiles y sencillas. Facilita evaluar el impacto y el beneficio de las acciones ejecutadas sobre la estrategia y los resultados.",
      features: [
        "Integración directa con los módulos analíticos",
        "Seguimiento y trazabilidad de acciones",
        "Priorización según impacto y criticidad",
        "Histórico de casos fácilmente consultable",
        "Vinculación con evidencia y resultados",
        "Soporte a la ejecución y cierre de acciones",
      ],
    },
  ];

  for (const m of modulesList) {
    const existing = await db.select().from(modules).where(eq(modules.id, m.id));
    if (existing.length === 0) {
      await db.insert(modules).values({
        id: m.id,
        category: m.category,
        title: m.title,
        subtitle: m.subtitle,
        metaDescription: m.metaDescription,
        description: m.description,
      });

      for (const feat of m.features) {
        await db.insert(moduleFeatures).values({
          moduleId: m.id,
          feature: feat,
        });
      }
      console.log(`Module ${m.title} seeded.`);
    }
  }

  // 3. Seed use cases
  const cases = [
    {
      id: "investigacion-de-accidente",
      title: "Investigación de Accidente",
      context:
        "Incidente de alto potencial en faena minera, sin lesionados: Camión abastece combustible, sobrepasa pretil y casi cae en banco donde opera pala.",
      challenge:
        "1. Incidente de alto potencial en faena minera, sin lesionados.\n2. Investigación realizada por equipo de 8 personas, incluyendo altos ejecutivos, durante 3 semanas, con un costo de US$ 45K, donde se recopilaron y analizaron 84 documentos.\n3. Investigación no concluyente, basada en juicio experto y sin identificar causas raíz.\n4. Se tomó la decisión de repetir la investigación.",
      strategy:
        "5. Investigación realizada por un facilitador más James.\n6. Analizando los mismos antecedentes, aplicando método PEEPO, se detectaron causas raíz concretas:\n7. — Conductor apto pero con restricción visual de 220 lúmenes. Sin embargo, camión posee focos con 180 lúmenes.\n8. — Desconocimiento de riesgos del fondo mina por parte de la empresa.\n9. — Falta de identificación del riesgo de Condición Dinámica del Terreno en fondo Mina en la actividad de \"conducción con camión tanque\".",
      results:
        "10. Investigación concluyente, concreta y concisa.\n11. Resultados validados a nivel corporativo.\n12. Se identificaron factores que no eran evidentes a simple vista, basados en datos y no en juicio experto.\n13. Se llegó a resultados concluyentes luego de 3 días de análisis por parte de un facilitador asistido por James.",
    },
    {
      id: "analisis-multivariable",
      title: "Análisis Multivariable",
      context:
        "Empresa de transporte de combustible que enfrentaba un promedio de 30 incidentes anuales por derrames causados por volcamientos y otros accidentes.",
      challenge:
        "14. Empresa de transporte de combustible con promedio de 30 incidentes anuales a pesar de medidas preventivas implementadas:\n15. — Verificación de salud compatible de conductores\n16. — Reentrenamiento y medidas administrativas\n17. — Uso de geocercas, control de velocidad y somnolencia (Guardian) a nivel nacional.\n18. Se requería identificar patrones de incidentes y recomendación de controles.",
      strategy:
        "19. James procesó 15 años de información histórica y analizó más de 800 mil combinaciones posibles considerando cerca de 50 variables. Identificó 8 como las más relevantes.\n20. Velocidad inadecuada para contexto operacional: Guardian tenía umbral de 50 Km/h pero el 90% de la ruta se conduce bajo 40 Km/h. Recomendación: Ajustar umbral a 30 Km/h.\n21. Fatiga y somnolencia no detectada clínicamente: conductores presentaban somnolencia postprandial en casos de diabetes tipo 2. Recomendación: Incorporar al Plan Nacional de Vigilancia Médica.",
      results:
        "22. Cero nuevos volcamientos en la ruta intervenida.\n23. 30% menos incidentes similares en otras empresas del grupo y en otras rutas.\n24. Ajustes de controles en base a contexto operacional.\n25. Incorporación al Plan Nacional de Vigilancia de Salud Ocupacional.",
    },
    {
      id: "gestion-1-3-10",
      title: "Gestión 1-3-10",
      context:
        "Analizar la pertinencia de los KPIs existentes de monitoreo y control de riesgos.",
      challenge:
        "26. Analizar la pertinencia de los KPIs existentes de monitoreo y control de riesgos.\n27. Aplicar KPIs para monitoreo y control en tiempo real de la operación.",
      strategy:
        "28. Integración de fuentes de información a James: registro de incidentes, reglas SST, principales procesos, actividades, matrices IPER, controles.\n29. Diseño de KPIs que cumplan con los objetivos de trazabilidad de riesgos.\n30. Diseño de tableros de control que permitan tomar decisiones en tiempo real.\n31. Instalación de prácticas de gestión para toma de decisiones basadas en información.",
      results:
        "32. Tableros de control que implementan el método 1-3-10:\n33. — 1 segundo: ver qué está pasando;\n34. — 3 segundos: entender por qué;\n35. — 10 segundos: saber qué hacer.\n36. Permite analizar cómo pequeñas señales llevan a eventos severos si no se gestionan.\n37. Mejora en la trazabilidad de incidentes y eficiencia en la respuesta preventiva.",
    },
  ];

  for (const c of cases) {
    const existing = await db.select().from(useCases).where(eq(useCases.id, c.id));
    if (existing.length === 0) {
      await db.insert(useCases).values(c);
      console.log(`Use Case ${c.title} seeded.`);
    }
  }

  console.log("Database seeding completed successfully.");
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
