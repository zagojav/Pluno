// Força qualquer chamada externa (Firestore, Turnstile) a não travar a
// resposta indefinidamente. Não cancela a chamada original de verdade
// (o SDK do Firestore não dá essa opção fácil), só para de esperar por ela
// e segue com um erro amigável pro usuário.
export async function comTimeout<T>(
  promessa: Promise<T>,
  ms: number,
  mensagemErro: string,
): Promise<T> {
  let temporizador: ReturnType<typeof setTimeout>;

  const tempoEsgotado = new Promise<never>((_, reject) => {
    temporizador = setTimeout(() => reject(new Error(mensagemErro)), ms);
  });

  try {
    return await Promise.race([promessa, tempoEsgotado]);
  } finally {
    clearTimeout(temporizador!);
  }
}
