import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import WaveBackground from "@/components/WaveBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-title",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "iCenit.ai — JAMES AI ASSISTANT®",
  description: "Transformamos datos en decisiones que anticipan riesgos en seguridad y medio ambiente. Inteligencia validada por expertos para proteger vidas y operaciones.",
  icons: {
    icon: "/favicon-icenit.png",
  },
  openGraph: {
    title: "iCenit.ai — JAMES AI ASSISTANT®",
    description: "Transformamos datos en decisiones que anticipan riesgos en seguridad y medio ambiente. Inteligencia validada por expertos para proteger vidas y operaciones.",
    url: "https://www.icenit.ai",
    siteName: "iCenit",
    images: [
      {
        url: "https://www.icenit.ai/james-share.jpg",
        width: 800,
        height: 800,
        alt: "James - Asistente de IA de iCenit",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iCenit.ai — JAMES AI ASSISTANT®",
    description: "Transformamos datos en decisiones que anticipan riesgos en seguridad y medio ambiente. Inteligencia validada por expertos para proteger vidas y operaciones.",
    images: ["https://www.icenit.ai/james-share.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <WaveBackground />
        {children}
      </body>
    </html>
  );
}
