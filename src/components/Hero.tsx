import SeloFeitoPorAluno from "./SeloFeitoPorAluno";
import DemoMural from "./DemoMural";

export default function Hero() {
  return (
    <section className="px-6 pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-10">
        <div className="flex flex-col items-start gap-6 lg:max-w-md">
          <SeloFeitoPorAluno />
          <h1 className="font-sans text-[2.1rem] leading-[1.08] font-bold tracking-tight sm:text-5xl">
            A prova que o professor avisou em sala, no seu celular{" "}
            <span className="marca-texto">na hora</span>.
          </h1>
          <p className="max-w-sm text-lg leading-relaxed text-esmaecido">
            Pluno é o mural da sua turma: alguém posta o que o professor
            falou em aula e todo mundo recebe a notificação na hora, sem
            esperar o TIA ou o Moodle atualizar.
          </p>
          <a
            href="#inscricao"
            className="inline-flex min-h-[44px] items-center justify-center border-2 border-primeiro-plano bg-acento px-7 text-base font-bold text-acento-primeiro-plano transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            Entrar na lista
          </a>
        </div>

        <div className="flex justify-center lg:flex-1">
          <DemoMural />
        </div>
      </div>
    </section>
  );
}
