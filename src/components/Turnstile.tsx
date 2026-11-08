"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        opcoes: Record<string, unknown>,
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

interface PropriedadesTurnstile {
  aoObterToken: (token: string | null) => void;
}

// Widget invisível do Cloudflare Turnstile. Some sozinho se não tiver
// NEXT_PUBLIC_TURNSTILE_SITE_KEY configurada (ex: ambiente local), pra não
// travar quem só quer testar o formulário sem montar conta no Cloudflare.
export default function Turnstile({ aoObterToken }: PropriedadesTurnstile) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptPronto, setScriptPronto] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!scriptPronto || !siteKey || !containerRef.current) return;
    if (!window.turnstile) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      size: "invisible",
      callback: (token: string) => aoObterToken(token),
      "expired-callback": () => aoObterToken(null),
      "error-callback": () => aoObterToken(null),
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
    // aoObterToken vem do componente pai a cada render; não precisa disparar
    // o efeito de novo por causa dele.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptPronto, siteKey]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setScriptPronto(true)}
      />
      <div ref={containerRef} />
    </>
  );
}
