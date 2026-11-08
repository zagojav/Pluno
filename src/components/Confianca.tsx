export default function Confianca() {
  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl border-2 border-primeiro-plano bg-superficie p-6 sm:p-10">
        <h2 className="font-sans text-2xl font-bold sm:text-3xl">
          Confiança antes de tudo
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-sans text-lg font-bold">
              Nunca vamos pedir sua senha do TIA ou do Moodle.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-esmaecido">
              O Pluno usa só o link público de calendário do Moodle pra
              importar prazos. Nenhuma senha sua passa pelo app.
            </p>
          </div>
          <div>
            <p className="font-sans text-lg font-bold">
              Projeto independente.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-esmaecido">
              O Pluno é feito por um aluno, não é um produto oficial do
              Mackenzie nem tem qualquer vínculo com a universidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
