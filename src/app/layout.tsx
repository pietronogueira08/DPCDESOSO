import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fisio da Sophia 💚 · Sprint 48h de Fisiologia Médica",
  description:
    "Plataforma interativa kawaii de revisão em 48 horas para a prova de Fisiologia Médica da Sophia: GI, Renal & Ácido-Base e Endócrino.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${plusJakarta.variable}`}
    >
      <body className="font-sans bg-canvas text-ink antialiased overflow-x-clip selection:bg-rose-mimo-soft selection:text-rose-mimo-ink">
        {children}
      </body>
    </html>
  );
}
