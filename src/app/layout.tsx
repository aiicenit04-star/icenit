import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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
    icon: "/favicon.ico",
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
        {children}
      </body>
    </html>
  );
}
