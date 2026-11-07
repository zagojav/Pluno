import SeloFeitoPorAluno from "./SeloFeitoPorAluno";

export default function Hero() {
  return (
    <section className="px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-6">
        <SeloFeitoPorAluno />
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          A prova que o professor avisou em sala, no seu celular{" "}
          <span className="text-acento-forte dark:text-acento">
            na hora
          </span>
          .
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-esmaecido">
          Pluno é o mural da sua turma: alguém posta o que o professor falou
          em aula e todo mundo recebe a notificação na hora, sem esperar o
          TIA ou o Moodle atualizar.
        </p>
        <a
          href="#inscricao"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-acento px-7 text-base font-semibold text-acento-primeiro-plano transition-transform hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          Entrar na lista
        </a>
      </div>
    </section>
  );
}
