const PERGUNTAS = [
  {
    pergunta: "O Pluno é de graça?",
    resposta: "Sim. A ideia é manter o app gratuito pra todo aluno.",
  },
  {
    pergunta: "O Pluno é oficial do Mackenzie?",
    resposta:
      "Não. É um projeto independente, feito por um aluno. Não tem vínculo com a Universidade Presbiteriana Mackenzie.",
  },
  {
    pergunta: "Precisa da senha do TIA ou do Moodle?",
    resposta:
      "Não, nunca. Os prazos do Moodle entram pelo link público de calendário, sem login.",
  },
  {
    pergunta: "Quando lança?",
    resposta: "Lançamento previsto para fevereiro de 2027.",
  },
];

export default function Faq() {
  return (
    <section className="px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Perguntas rápidas
        </h2>
        <div className="mt-6 divide-y divide-borda rounded-2xl border border-borda bg-superficie">
          {PERGUNTAS.map((item) => (
            <details key={item.pergunta} className="group p-5">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-medium">
                {item.pergunta}
                <span
                  className="shrink-0 text-esmaecido transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-esmaecido">
                {item.resposta}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
