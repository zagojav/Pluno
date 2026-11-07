import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Fonte base pro corpo do texto: moderna e bem legível em telas pequenas.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
});

// Fonte de destaque pros títulos: dá a identidade mais jovem/técnica.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
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
    { media: "(prefers-color-scheme: light)", color: "#f6f9f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b120c" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-primeiro-plano">
        {children}
      </body>
    </html>
  );
}
