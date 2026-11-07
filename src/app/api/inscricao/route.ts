import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { esquemaInscricao } from "@/lib/esquemas";
import { obterFirestore } from "@/lib/firebaseAdmin";
import { excedeuLimite, obterIpRequisicao } from "@/lib/limiteTaxa";
import {
  gerarIdCurto,
  gerarIdDocumento,
  montarChaveTurma,
  normalizarEmail,
  normalizarTurma,
} from "@/lib/turma";

const COLECAO = "lista_espera";

export async function POST(request: NextRequest) {
  const ip = obterIpRequisicao(request.headers);

  if (excedeuLimite(ip)) {
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
    // Honeypot preenchido e dado inválido caem no mesmo caminho de erro, de
    // propósito: não damos pista pra bot sobre qual campo reprovou.
    const primeiroErro =
      resultado.error.issues[0]?.message ?? "Dados inválidos.";
    return NextResponse.json({ erro: primeiroErro }, { status: 400 });
  }

  const dados = resultado.data;
  const emailNormalizado = normalizarEmail(dados.email);
  const turmaNormalizada = normalizarTurma(dados.turma);
  const chaveTurma = montarChaveTurma({
    campus: dados.campus,
    curso: dados.curso,
    semestre: dados.semestre,
    turma: turmaNormalizada,
  });

  const db = obterFirestore();
  const idDocumento = gerarIdDocumento(emailNormalizado);
  const referenciaDoc = db.collection(COLECAO).doc(idDocumento);
  const existente = await referenciaDoc.get();

  let idCurto: string;

  if (existente.exists) {
    // Já estava na lista: não duplica, só devolve os dados que já tinha.
    idCurto = (existente.data()?.idCurto as string | undefined) ?? gerarIdCurto();
  } else {
    idCurto = gerarIdCurto();
    await referenciaDoc.set({
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
    });
  }

  // Contagem por agregação: não precisa baixar os documentos pra saber
  // quantos são, só o número (mais rápido e mais barato no plano Spark).
  const agregacao = await db
    .collection(COLECAO)
    .where("chaveTurma", "==", chaveTurma)
    .count()
    .get();

  return NextResponse.json({
    idCurto,
    totalTurma: agregacao.data().count,
  });
}
