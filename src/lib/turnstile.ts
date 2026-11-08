// Confirma no servidor que quem enviou o formulário passou no Cloudflare
// Turnstile (modo invisível). Precisa ser checado aqui: confiar só no
// resultado que o navegador manda seria fácil de forjar.
export async function verificarTurnstile(
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  const chaveSecreta = process.env.TURNSTILE_SECRET_KEY;

  if (!chaveSecreta) {
    // Turnstile não configurado (ex: rodando local sem as chaves do
    // Cloudflare) — não trava o formulário, só não verifica nada.
    return true;
  }

  if (!token) {
    return false;
  }

  const corpo = new URLSearchParams();
  corpo.set("secret", chaveSecreta);
  corpo.set("response", token);
  corpo.set("remoteip", ip);

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), 5000);

  try {
    const resposta = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: corpo, signal: controlador.signal },
    );
    const dados = (await resposta.json()) as { success: boolean };
    return dados.success === true;
  } catch {
    // Falha de rede ao validar com o Cloudflare: trata como não verificado
    // (falha fechada, por segurança).
    return false;
  } finally {
    clearTimeout(temporizador);
  }
}
