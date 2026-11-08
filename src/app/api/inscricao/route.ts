import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { esquemaInscricao } from "@/lib/esquemas";
import { obterFirestore } from "@/lib/firebaseAdmin";
import { excedeuLimite, obterIpRequisicao } from "@/lib/limiteTaxaFirestore";
import { comTimeout } from "@/lib/tempoLimite";
import { verificarTurnstile } from "@/lib/turnstile";
import {
  gerarIdCurto,
  gerarIdDocumento,
  montarChaveTurma,
  normalizarEmail,
  normalizarTurma,
} from "@/lib/turma";

const COLECAO = "lista_espera";
const TEMPO_LIMITE_FIRESTORE_MS = 8000;
const ERRO_SERVIDOR_OCUPADO =
  "O servidor demorou pra responder. Tente de novo em instantes.";

export async function POST(request: NextRequest) {
  try {
    const ip = obterIpRequisicao(request.headers);
    const db = obterFirestore();

    if (await excedeuLimite(db, ip)) {
      return NextResponse.json(
        { erro: "Muitas tentativas. Tente de novo em alguns minutos." },
        { status: 429 },
      );
    }

    let corpo: unknown;
    try {
      corpo = await request.json();
    } catch {
      return NextResponse.json(
        { erro: "Requisição inválida." },
        { status: 400 },
      );
    }

    const resultado = esquemaInscricao.safeParse(corpo);
    if (!resultado.success) {
      // Honeypot preenchido e dado inválido caem no mesmo caminho de erro,
      // de propósito: não damos pista pra bot sobre qual campo reprovou.
      const primeiroErro =
        resultado.error.issues[0]?.message ?? "Dados inválidos.";
      return NextResponse.json({ erro: primeiroErro }, { status: 400 });
    }

    const dados = resultado.data;

    const confirmadoPeloTurnstile = await verificarTurnstile(
      dados.tokenTurnstile,
      ip,
    );
    if (!confirmadoPeloTurnstile) {
      return NextResponse.json(
        {
          erro:
            "Não foi possível confirmar que você não é um robô. Recarregue a página e tente de novo.",
        },
        { status: 400 },
      );
    }

    const emailNormalizado = normalizarEmail(dados.email);
    const turmaNormalizada = normalizarTurma(dados.turma);
    const chaveTurma = montarChaveTurma({
      campus: dados.campus,
      curso: dados.curso,
      semestre: dados.semestre,
      turma: turmaNormalizada,
    });

    const idDocumento = gerarIdDocumento(emailNormalizado);
    const referenciaDoc = db.collection(COLECAO).doc(idDocumento);
    const existente = await comTimeout(
      referenciaDoc.get(),
      TEMPO_LIMITE_FIRESTORE_MS,
      ERRO_SERVIDOR_OCUPADO,
    );

    let idCurto: string;

    if (existente.exists) {
      // Já estava na lista: não duplica, só devolve os dados que já tinha.
      idCurto =
        (existente.data()?.idCurto as string | undefined) ?? gerarIdCurto();
    } else {
      idCurto = gerarIdCurto();
      await comTimeout(
        referenciaDoc.set({
          nome: dados.nome?.trim() || null,
          email: emailNormalizado,
          campus: dados.campus,
          curso: dados.curso.trim(),
          semestre: dados.semestre,
          turma: turmaNormalizada,
          chaveTurma,
          origem: dados.origem?.trim() || null,
          ref: dados.ref?.trim() || null,
          idCurto,
          consentimento: true,
          criadoEm: FieldValue.serverTimestamp(),
          userAgent: request.headers.get("user-agent") ?? null,
        }),
        TEMPO_LIMITE_FIRESTORE_MS,
        ERRO_SERVIDOR_OCUPADO,
      );
    }

    // Contagem por agregação: não precisa baixar os documentos pra saber
    // quantos são, só o número (mais rápido e mais barato no plano Spark).
    const agregacao = await comTimeout(
      db
        .collection(COLECAO)
        .where("chaveTurma", "==", chaveTurma)
        .count()
        .get(),
      TEMPO_LIMITE_FIRESTORE_MS,
      ERRO_SERVIDOR_OCUPADO,
    );

    return NextResponse.json({
      idCurto,
      totalTurma: agregacao.data().count,
    });
  } catch (erro) {
    console.error("Falha ao processar inscrição:", erro);
    return NextResponse.json(
      {
        erro: "Não foi possível completar sua inscrição agora. Tente de novo em instantes.",
      },
      { status: 500 },
    );
  }
}
