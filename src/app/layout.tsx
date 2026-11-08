import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Fonte única pro corpo e títulos, só 2 pesos (texto e destaque). Fica
// hospedada no próprio site (next/font baixa e serve local, sem pedir nada
// pra fontes.google no runtime).
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  fallback: ["system-ui", "arial"],
});

// Mono só pra detalhes: datas, horários, rótulos tipo "passo 01".
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  fallback: ["ui-monospace", "monospace"],
});

const urlSite = process.env.NEXT_PUBLIC_URL_SITE || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(urlSite),
  title: "Pluno — mural da turma, aviso na hora",
  description:
    "A prova que o professor avisou em sala, no seu celular na hora. Mural da turma, prazos do Moodle sem senha, faltas e cálculo de nota. Projeto independente, feito por aluno.",
  keywords: [
    "Pluno",
    "mural da turma",
    "Mackenzie",
    "faltas",
    "prazos Moodle",
    "lista de espera",
  ],
  openGraph: {
    title: "Pluno — mural da turma, aviso na hora",
    description:
      "A prova que o professor avisou em sala, no seu celular na hora. Entra na lista de espera.",
    url: "/",
    siteName: "Pluno",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pluno — mural da turma, aviso na hora",
    description:
      "A prova que o professor avisou em sala, no seu celular na hora. Entra na lista de espera.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3e9" },
    { media: "(prefers-color-scheme: dark)", color: "#15130f" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-primeiro-plano">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
