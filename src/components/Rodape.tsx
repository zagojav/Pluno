import Link from "next/link";

export default function Rodape() {
  return (
    <footer className="mt-auto border-t border-borda px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 text-sm text-esmaecido">
        <p>
          Projeto independente, feito por aluno. Sem vínculo com a
          Universidade Presbiteriana Mackenzie.
        </p>
        <Link
          href="/privacidade"
          className="inline-flex min-h-[44px] w-fit items-center font-medium text-primeiro-plano underline underline-offset-4"
        >
          Política de privacidade
        </Link>
      </div>
    </footer>
  );
}
