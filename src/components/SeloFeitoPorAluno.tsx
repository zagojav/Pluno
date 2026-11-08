// Etiqueta que lembra um post-it colado no caderno, sem exagerar (sem
// sombra pesada, sem rotação caricata).
export default function SeloFeitoPorAluno() {
  return (
    <span className="inline-flex -rotate-2 items-center gap-2 border border-borda bg-acento px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-acento-primeiro-plano">
      Feito por aluno, pra aluno
    </span>
  );
}
