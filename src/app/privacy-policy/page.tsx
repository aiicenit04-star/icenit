export const runtime = "edge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../public.css";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main className="page-section" style={{ flexGrow: 1, maxWidth: "800px" }}>
        <h1 className="section-title" style={{ textAlign: "left", fontSize: "2.5rem", marginBottom: "2rem" }}>
          Política de Privacidad
        </h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1rem" }}>
          <p>
            En <strong>iCenit</strong>, nos tomamos muy en serio la privacidad y seguridad de la información de nuestros clientes, socios y postulantes. Esta política de privacidad detalla cómo recopilamos, utilizamos y protegemos los datos personales proporcionados a través de nuestro sitio web <strong>https://icenit.ai</strong>.
          </p>

          <h2 style={{ color: "#fff", fontFamily: "var(--font-title)", fontSize: "1.5rem", marginTop: "1rem" }}>
            1. Información que Recopilamos
          </h2>
          <p>
            Recopilamos información únicamente cuando interactúas de forma voluntaria con nuestros formularios de contacto, solicitudes de demostración o vacantes de empleo:
          </p>
          <ul style={{ paddingLeft: "1.5rem" }}>
            <li><strong>Formulario de Demo:</strong> Nombre completo, nombre de la empresa, correo electrónico y número de teléfono.</li>
            <li><strong>Formulario de Contacto:</strong> Nombre, empresa, correo electrónico, teléfono, asunto y el mensaje escrito.</li>
            <li><strong>Formulario de Carreras:</strong> Nombre completo, correo electrónico, teléfono, vacante de interés, mensaje de presentación y tu archivo adjunto de currículum (PDF).</li>
          </ul>

          <h2 style={{ color: "#fff", fontFamily: "var(--font-title)", fontSize: "1.5rem", marginTop: "1rem" }}>
            2. Uso de la Información
          </h2>
          <p>
            La información recopilada se utiliza exclusivamente para:
          </p>
          <ul style={{ paddingLeft: "1.5rem" }}>
            <li>Responder a tus consultas comerciales y preguntas generales.</li>
            <li>Agendar, coordinar y realizar demostraciones en vivo de la plataforma James Cloud.</li>
            <li>Evaluar tu perfil profesional y gestionar los procesos de selección de candidatos para vacantes internas.</li>
          </ul>

          <h2 style={{ color: "#fff", fontFamily: "var(--font-title)", fontSize: "1.5rem", marginTop: "1rem" }}>
            3. Almacenamiento y Protección de Datos
          </h2>
          <p>
            Toda la información capturada se almacena en bases de datos cifradas y protegidas con los estándares recomendados de la industria (a través de infraestructura cloud segura en Supabase y Cloudflare). No vendemos, alquilamos ni divulgamos tu información personal a terceros bajo ninguna circunstancia.
          </p>

          <h2 style={{ color: "#fff", fontFamily: "var(--font-title)", fontSize: "1.5rem", marginTop: "1rem" }}>
            4. Tus Derechos (Derechos ARCO)
          </h2>
          <p>
            Tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos personales. Si deseas que eliminemos tu registro de currículum o cualquier dato comercial de nuestra base de datos, puedes escribirnos un correo electrónico directamente a: <strong>contacto@icenit.ai</strong>.
          </p>

          <h2 style={{ color: "#fff", fontFamily: "var(--font-title)", fontSize: "1.5rem", marginTop: "1rem" }}>
            5. Actualizaciones de esta Política
          </h2>
          <p>
            Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento para adaptarla a novedades legislativas o corporativas. La fecha de última actualización siempre estará indicada al final del documento.
          </p>

          <p style={{ marginTop: "2rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Última actualización: 26 de junio de 2026.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
