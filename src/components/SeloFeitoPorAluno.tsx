// Selo curto que reforça a origem do projeto: aluno construindo pra aluno,
// sem parecer um produto oficial da universidade.
export default function SeloFeitoPorAluno() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-borda bg-superficie px-4 py-2 text-sm font-medium text-esmaecido">
      <span className="h-2 w-2 rounded-full bg-acento" aria-hidden="true" />
      Feito por aluno, pra aluno
    </span>
  );
}
