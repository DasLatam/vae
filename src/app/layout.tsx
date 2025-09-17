// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics"; // 1. Importar el componente

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  // ... (el resto de tus metadatos no cambia)
  title: "VAE - Voto Argentino en el Exterior",
  description: "Información y asesoramiento para que los argentinos residentes en el exterior puedan ejercer su derecho al voto.",
  openGraph: {
    title: "VAE - Voto Argentino en el Exterior",
    description: "La guía completa para el votante argentino en el extranjero.",
    url: "https://voto-argentino-exterior.vercel.app",
    siteName: "VAE - Voto Argentino en el Exterior",
    images: [{
      url: "/logo-share.png",
      width: 300,
      height: 300,
      alt: "Logo de VAE",
    }],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-700`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics /> {/* 2. Añadir el componente aquí */}
      </body>
    </html>
  );
}