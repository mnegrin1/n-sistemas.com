import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "N Sistemas | Plataformas Tecnológicas Inmobiliarias a Medida",
  description: "Desarrollamos portales web de alta gama, CRMs inteligentes y automatizaciones a medida para inmobiliarias líderes. Sin suscripciones infinitas. Todo bajo tu marca y control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
