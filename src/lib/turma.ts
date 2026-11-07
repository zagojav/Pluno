import { createHash, randomUUID } from "node:crypto";

// Remove acentos e normaliza espaços/caixa. Usado só para montar a chave de
// agrupamento da turma, não para exibição.
function normalizarTexto(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function normalizarEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizarTurma(turma: string): string {
  return turma.trim().toUpperCase().replace(/\s+/g, "");
}

interface DadosChaveTurma {
  campus: string;
  curso: string;
  semestre: number;
  turma: string;
}

// Chave usada para agrupar inscritos da mesma turma (mesmo campus + curso +
// semestre + turma, tudo normalizado) para não contar duplicado por causa de
// diferença de maiúscula/minúscula, acento ou espaço.
export function montarChaveTurma(dados: DadosChaveTurma): string {
  const campus = normalizarTexto(dados.campus);
  const curso = normalizarTexto(dados.curso);
  const turma = normalizarTexto(dados.turma);
  return `${campus}|${curso}|${dados.semestre}|${turma}`;
}

// ID do documento no Firestore: hash do email normalizado. Garante que a
// mesma pessoa nunca é salva duas vezes, sem precisar de consulta extra.
export function gerarIdDocumento(emailNormalizado: string): string {
  return createHash("sha256").update(emailNormalizado).digest("hex");
}

// Código curto usado no link de indicação (?ref=ID_CURTO).
export function gerarIdCurto(): string {
  return randomUUID().replace(/-/g, "").slice(0, 8);
}
