const PASSOS = [
  {
    titulo: "Entra com curso e turma",
    descricao:
      "Você entra na lista com campus, curso, semestre e turma. É só isso, sem senha de nada.",
    icone: (
      <path
        d="M12 3 2 8l10 5 10-5-10-5Zm-7 9.5V17c0 .6 3 2.5 7 2.5s7-1.9 7-2.5v-4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titulo: "Alguém da turma posta o aviso",
    descricao:
      "O professor fala em aula que mudou a prova ou o prazo. Alguém da turma posta no mural do Pluno.",
    icone: (
      <path
        d="M4 4h16v11H9l-5 4V4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titulo: "Todo mundo recebe",
    descricao:
      "A turma inteira recebe a notificação na hora, direto no celular, sem precisar abrir TIA ou Moodle.",
    icone: (
      <path
        d="M12 3a4 4 0 0 0-4 4v2.3c0 .5-.2 1-.5 1.4L6 13v1h12v-1l-1.5-2.3c-.3-.4-.5-.9-.5-1.4V7a4 4 0 0 0-4-4ZM9.5 17a2.5 2.5 0 0 0 5 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function ComoFunciona() {
  return (
    <section className="px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Como funciona
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {PASSOS.map((passo, indice) => (
            <li
              key={passo.titulo}
              className="flex flex-col gap-3 rounded-2xl border border-borda bg-superficie p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-acento/15 text-acento-forte dark:text-acento"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    {passo.icone}
                  </svg>
                </span>
                <span className="font-display text-sm font-medium text-esmaecido">
                  Passo {indice + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold">
                {passo.titulo}
              </h3>
              <p className="text-sm leading-relaxed text-esmaecido">
                {passo.descricao}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
