import { createHash } from "node:crypto";
import { FieldValue, Timestamp, type Firestore } from "firebase-admin/firestore";
import { comTimeout } from "./tempoLimite";

const JANELA_MS = 10 * 60 * 1000; // 10 minutos
const LIMITE_POR_JANELA = 5;
const COLECAO_LIMITE = "limites_ip";

export function obterIpRequisicao(headers: Headers): string {
  const encaminhadoPor = headers.get("x-forwarded-for");
  if (encaminhadoPor) {
    return encaminhadoPor.split(",")[0].trim();
  }
  return headers.get("x-real-ip") ?? "desconhecido";
}

// Limite de envios por IP guardado no Firestore (não em memória), pra valer
// de verdade entre instâncias serverless diferentes — na Vercel cada
// invocação pode cair numa instância diferente, então um Map em memória
// (como na primeira versão) não segura bot nenhum de verdade.
//
// Guardamos só o hash SHA-256 do IP, nunca o IP em texto puro.
export async function excedeuLimite(
  db: Firestore,
  ip: string,
): Promise<boolean> {
  const idHash = createHash("sha256").update(ip).digest("hex");
  const referencia = db.collection(COLECAO_LIMITE).doc(idHash);
  const agora = Date.now();

  return comTimeout(
    db.runTransaction(async (transacao) => {
      const snapshot = await transacao.get(referencia);
      const dados = snapshot.data() as
        | { contagem: number; expiraEm: Timestamp }
        | undefined;

      if (!dados || dados.expiraEm.toMillis() < agora) {
        // Janela nova (ou primeira vez desse IP): reseta a contagem. O
        // campo "expiraEm" é um Timestamp de propósito — dá pra ligar uma
        // política de TTL nele no console do Firebase, se quiser que o
        // Firestore apague essas linhas sozinho depois de um tempo.
        transacao.set(referencia, {
          contagem: 1,
          expiraEm: Timestamp.fromMillis(agora + JANELA_MS),
        });
        return false;
      }

      if (dados.contagem >= LIMITE_POR_JANELA) {
        return true;
      }

      transacao.update(referencia, { contagem: FieldValue.increment(1) });
      return false;
    }),
    8000,
    "Não foi possível verificar o limite de envios agora.",
  );
}
