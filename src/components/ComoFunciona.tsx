const PASSOS = [
  {
    titulo: "Entra com curso e turma",
    descricao:
      "Você entra na lista com campus, curso, semestre e turma. É só isso, sem senha de nada.",
    rotacao: "-rotate-1",
  },
  {
    titulo: "Alguém da turma posta o aviso",
    descricao:
      "O professor fala em aula que mudou a prova ou o prazo. Alguém da turma posta no mural do Pluno.",
    rotacao: "rotate-0",
  },
  {
    titulo: "Todo mundo recebe",
    descricao:
      "A turma inteira recebe a notificação na hora, direto no celular, sem precisar abrir TIA ou Moodle.",
    rotacao: "rotate-1",
  },
];

export default function ComoFunciona() {
  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-sans text-2xl font-bold sm:text-3xl">
          Como funciona
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
          {PASSOS.map((passo, indice) => (
            <li key={passo.titulo} className={passo.rotacao}>
              <div className="h-full border-2 border-primeiro-plano bg-superficie p-5">
                <span className="font-mono text-xs text-esmaecido">
                  passo 0{indice + 1}
                </span>
                <h3 className="mt-2 font-sans text-lg font-bold">
                  {passo.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-esmaecido">
                  {passo.descricao}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
