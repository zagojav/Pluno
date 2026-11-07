import type { Metadata } from "next";
import Rodape from "@/components/Rodape";

export const metadata: Metadata = {
  title: "Privacidade — Pluno",
  description: "Política de privacidade da lista de espera do Pluno.",
};

export default function Privacidade() {
  const emailContato = process.env.CONTATO_EMAIL;

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-semibold">
            Política de privacidade
          </h1>
          <p className="mt-2 text-sm text-esmaecido">
            Esta página explica, em linguagem simples, o que fazemos com os
            dados que você preenche na lista de espera do Pluno.
          </p>

          <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-esmaecido">
            <section>
              <h2 className="font-display text-lg font-semibold text-primeiro-plano">
                Quais dados coletamos
              </h2>
              <p className="mt-2">
                Nome (opcional), email, campus, curso, semestre e turma. Se
                você chegou pelo link de um colega, também guardamos de qual
                origem e de quem veio a indicação, só pra entender como as
                pessoas estão chegando até a lista.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold text-primeiro-plano">
                Para que usamos
              </h2>
              <p className="mt-2">
                Só pra duas coisas: avisar você quando o Pluno lançar e
                organizar as turmas dentro do app (juntar quem é da mesma
                turma pra o mural fazer sentido). Não vendemos nem
                compartilhamos seus dados com ninguém.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold text-primeiro-plano">
                Base legal
              </h2>
              <p className="mt-2">
                Seu consentimento, dado explicitamente ao marcar a caixinha
                do formulário antes de enviar. Sem isso, a inscrição não é
                enviada.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold text-primeiro-plano">
                Onde os dados ficam
              </h2>
              <p className="mt-2">
                No Firebase (Firestore), serviço do Google. O acesso é feito
                só pelo servidor do Pluno, com uma credencial própria; o
                navegador nunca fala direto com o banco de dados.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold text-primeiro-plano">
                Por quanto tempo guardamos
              </h2>
              <p className="mt-2">
                Enquanto a validação da ideia estiver rolando e até o
                eventual lançamento do app. Se o projeto não for pra frente,
                os dados são apagados.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold text-primeiro-plano">
                Como pedir exclusão
              </h2>
              <p className="mt-2">
                Manda um email{" "}
                {emailContato ? (
                  <>
                    para{" "}
                    <a
                      href={`mailto:${emailContato}`}
                      className="font-medium text-primeiro-plano underline underline-offset-4"
                    >
                      {emailContato}
                    </a>
                  </>
                ) : (
                  "pra quem mantém o Pluno"
                )}{" "}
                pedindo a remoção, com o email que você usou no cadastro.
                Removemos em até alguns dias.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold text-primeiro-plano">
                Controlador dos dados
              </h2>
              <p className="mt-2">Guilherme Rezende Zago.</p>
            </section>
          </div>
        </div>
      </main>
      <Rodape />
    </div>
  );
}
