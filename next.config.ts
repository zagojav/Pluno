import type { NextConfig } from "next";

// Content-Security-Policy numa linha só, sem nonce. Nonce exigiria renderizar
// toda página de forma dinâmica (o Next precisa de um valor novo por
// requisição pra isso), o que vai contra a meta de manter as páginas
// estáticas — só o formulário precisa ser dinâmico aqui. "unsafe-inline" no
// script-src é necessário pelos scripts inline que o próprio Next injeta
// pra hidratar os componentes de servidor; os domínios do Cloudflare são só
// pro Turnstile (verificação de "não sou um robô" no formulário).
// Em desenvolvimento o React usa eval() pra recriar call stacks de debug;
// em produção ele nunca usa eval(), então essa permissão some sozinha no
// build final.
const ehDesenvolvimento = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${ehDesenvolvimento ? " 'unsafe-eval'" : ""}`,
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
