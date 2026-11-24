import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cantinho de Estudos • DPC (FMC) — Aulas 13 e 14",
  description:
    "Plataforma interativa e acolhedora para revisão de Delineamento da Pesquisa Científica (DPC • FMC): Publicações Científicas, Estrutura do Projeto, Formatação e Declaração de Uso de IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-screen bg-canvas bg-kawaii-dots text-ink antialiased selection:bg-blush-soft selection:text-blush-ink">
        <a
          href="#conteudo-principal"
          className="visually-hidden fixed left-4 top-4 z-50 rounded-xl bg-lavender px-4 py-2 text-sm font-bold text-white shadow-lg"
        >
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
