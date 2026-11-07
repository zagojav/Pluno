const FUNCIONALIDADES = [
  {
    titulo: "Mural da turma",
    descricao:
      "O aviso que o professor deu em sala, postado por alguém da turma e visível pra todo mundo na hora.",
    icone: (
      <path
        d="M4 4h16v11H9l-5 4V4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titulo: "Prazos do Moodle, sem senha",
    descricao:
      "Importa os prazos pelo link de calendário do Moodle. Sem precisar digitar sua senha em lugar nenhum.",
    icone: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 9h16M8 3v4M16 3v4" strokeLinecap="round" />
      </>
    ),
  },
  {
    titulo: "Faltas por matéria",
    descricao:
      "Marca as faltas de cada matéria e acompanha quanto ainda pode faltar sem passar do limite.",
    icone: (
      <path
        d="M9 12.5 11 14.5l4.5-5M12 3l8 3.5v5c0 5-3.5 8.3-8 9.5-4.5-1.2-8-4.5-8-9.5v-5L12 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titulo: "Quanto preciso tirar pra passar",
    descricao:
      "Calculadora simples: joga as notas que já tem e vê quanto falta pra ficar de boa na matéria.",
    icone: (
      <path
        d="M6 3h12v18H6V3Zm2 4h8M8 11h2m3 0h2m-7 3h2m3 0h2m-7 3h2m3 0h2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function Funcionalidades() {
  return (
    <section className="px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          O que vem no app
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FUNCIONALIDADES.map((item) => (
            <div
              key={item.titulo}
              className="flex gap-4 rounded-2xl border border-borda bg-superficie p-5"
            >
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
                  {item.icone}
                </svg>
              </span>
              <div>
                <h3 className="font-display text-base font-semibold">
                  {item.titulo}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-esmaecido">
                  {item.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
