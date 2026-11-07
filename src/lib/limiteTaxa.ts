// Limite de requisições por IP, simples e em memória.
//
// Não é à prova de múltiplas instâncias serverless rodando ao mesmo tempo
// (cada instância tem seu próprio mapa), mas já freia bots óbvios sem
// precisar de infraestrutura paga como Redis. Combinado com o honeypot e a
// deduplicação por email no Firestore, é suficiente para o tamanho desta
// validação (dezenas de inscritos).
const JANELA_MS = 10 * 60 * 1000; // 10 minutos
const LIMITE_POR_JANELA = 5;

const registros = new Map<string, { contagem: number; expiraEm: number }>();

export function excedeuLimite(ip: string): boolean {
  const agora = Date.now();
  const registro = registros.get(ip);

  if (!registro || registro.expiraEm < agora) {
    registros.set(ip, { contagem: 1, expiraEm: agora + JANELA_MS });
    return false;
  }

  registro.contagem += 1;
  return registro.contagem > LIMITE_POR_JANELA;
}

export function obterIpRequisicao(headers: Headers): string {
  const encaminhadoPor = headers.get("x-forwarded-for");
  if (encaminhadoPor) {
    return encaminhadoPor.split(",")[0].trim();
  }
  return headers.get("x-real-ip") ?? "desconhecido";
}
