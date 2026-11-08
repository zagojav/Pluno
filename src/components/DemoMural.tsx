"use client";

import { useRef, useState } from "react";

type Etapa = "inicial" | "postando" | "postado" | "recebido";

// Nomes só ilustrativos pra demo; nunca é apresentado como gente real (por
// isso o rótulo "Demonstração" fica sempre visível, aqui e no texto).
const COLEGAS = ["Ana", "Bruno", "Clara"];

export default function DemoMural() {
  const [etapa, setEtapa] = useState<Etapa>("inicial");
  // Lido só quando a pessoa clica, não precisa de estado/efeito pra isso.
  const prefereMenosMovimento = useRef<boolean | null>(null);

  function simular() {
    if (etapa !== "inicial") {
      setEtapa("inicial");
      return;
    }

    if (prefereMenosMovimento.current === null) {
      prefereMenosMovimento.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }

    if (prefereMenosMovimento.current) {
      // Pula direto pro estado final, sem passar pelas etapas intermediárias.
      setEtapa("recebido");
      return;
    }

    setEtapa("postando");
    window.setTimeout(() => setEtapa("postado"), 550);
    window.setTimeout(() => setEtapa("recebido"), 1250);
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <span className="inline-flex items-center gap-2 self-center rounded-sm border border-borda bg-superficie px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-esmaecido">
        Demonstração
      </span>

      {/* Mockup de celular desenhado só com HTML/CSS, sem nenhuma imagem. */}
      <div className="relative w-[250px] rounded-[2.25rem] border-[6px] border-primeiro-plano bg-primeiro-plano p-2">
        <div
          className="absolute top-3.5 left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-primeiro-plano opacity-60"
          aria-hidden="true"
        />
        <div className="flex h-[430px] flex-col overflow-hidden rounded-[1.6rem] bg-superficie px-3.5 pt-7 pb-3.5">
          <div className="flex items-center justify-between border-b border-borda pb-2">
            <span className="text-sm font-bold">Mural · Cálculo A</span>
            <span className="font-mono text-[10px] text-esmaecido">
              simulação
            </span>
          </div>

          <div className="mt-3 flex-1" aria-live="polite">
            {etapa === "inicial" && (
              <p className="text-sm text-esmaecido">
                Toca em &ldquo;Simular aviso&rdquo; pra ver como funciona.
              </p>
            )}

            {etapa === "postando" && (
              <div className="flex items-center gap-2 text-sm text-esmaecido">
                <span>um colega está digitando</span>
                <span className="flex gap-0.5" aria-hidden="true">
                  <span className="h-1 w-1 animate-bounce rounded-full bg-esmaecido [animation-delay:-0.3s]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-esmaecido [animation-delay:-0.15s]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-esmaecido" />
                </span>
              </div>
            )}

            {(etapa === "postado" || etapa === "recebido") && (
              <div className="animate-[aparecer_0.25s_ease-out] rounded-lg border border-borda bg-background p-3">
                <p className="font-mono text-[10px] text-esmaecido">
                  colega da turma
                </p>
                <p className="mt-1 text-sm leading-snug">
                  Prova de Cálculo dia 18, o professor avisou agora em sala.
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-borda pt-3">
            <span className="text-[11px] text-esmaecido">
              {etapa === "recebido" ? "Notificados" : "Turma"}
            </span>
            <div className="flex -space-x-2" aria-hidden="true">
              {COLEGAS.map((nome) => (
                <span
                  key={nome}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-superficie bg-acento text-[11px] font-bold text-acento-primeiro-plano transition-transform duration-300 motion-reduce:transition-none ${
                    etapa === "recebido" ? "scale-110" : "scale-100"
                  }`}
                >
                  {nome[0]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={simular}
        className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-primeiro-plano bg-superficie px-6 text-sm font-bold transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {etapa === "inicial" ? "Simular aviso" : "Simular de novo"}
      </button>

      {/* Anúncio pra leitor de tela: o aria-live acima já cobre o essencial,
          isso só reforça o resultado final de forma mais clara. */}
      <p className="sr-only" role="status">
        {etapa === "recebido"
          ? "Aviso postado no mural da simulação. Os três colegas simulados foram notificados na hora."
          : ""}
      </p>
    </div>
  );
}
