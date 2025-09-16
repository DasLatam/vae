// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

// Objeto de metadatos actualizado
export const metadata: Metadata = {
  title: "VAE - Voto Argentino en el Exterior",
  description: "Información y asesoramiento para que los argentinos residentes en el exterior puedan ejercer su derecho al voto.",
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
      </body>
    </html>
  );
}