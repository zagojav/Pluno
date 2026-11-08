"use client";

import { useState } from "react";

interface PropriedadesTelaSucesso {
  totalTurma: number;
  linkIndicacao: string;
}

export default function TelaSucesso({
  totalTurma,
  linkIndicacao,
}: PropriedadesTelaSucesso) {
  const [copiado, setCopiado] = useState(false);

  const mensagemWhatsapp =
    `Entrei na lista do Pluno, um app feito por aluno pra turma receber ` +
    `aviso de prova e entrega na hora. Entra também: ${linkIndicacao}`;
  const linkWhatsapp = `https://wa.me/?text=${encodeURIComponent(mensagemWhatsapp)}`;

  const textoContagem =
    totalTurma <= 1
      ? "Você é a primeira pessoa da sua turma na lista."
      : `Sua turma já tem ${totalTurma} pessoas na lista.`;

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(linkIndicacao);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Se o clipboard falhar (sem permissão, contexto não seguro etc.), o
      // link já está escrito na tela pra copiar manualmente.
    }
  }

  return (
    <div
      className="flex flex-col gap-5 border-2 border-primeiro-plano bg-superficie p-6 sm:p-8"
      role="status"
    >
      <div>
        <h3 className="font-sans text-xl font-bold">
          Você entrou na lista!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-esmaecido">
          {textoContagem} Quanto mais gente, mais útil o Pluno fica pra
          turma toda.
        </p>
      </div>

      <a
        href={linkWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center justify-center border-2 border-primeiro-plano bg-acento px-6 text-center text-base font-bold text-acento-primeiro-plano transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        Chamar minha turma no WhatsApp
      </a>

      <button
        type="button"
        onClick={copiarLink}
        className="inline-flex min-h-[44px] items-center justify-center border-2 border-borda px-6 text-sm font-bold text-primeiro-plano"
      >
        {copiado ? "Link copiado!" : "Copiar link de indicação"}
      </button>

      <p className="font-mono text-xs break-all text-esmaecido">
        {linkIndicacao}
      </p>
    </div>
  );
}
