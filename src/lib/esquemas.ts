import { z } from "zod";
import { CAMPI } from "./constantes";

// Validação do formulário de lista de espera, aplicada no servidor (o
// cliente nunca deveria confiar só na validação do próprio formulário).
export const esquemaInscricao = z.object({
  nome: z.string().trim().max(80, "Nome muito longo.").optional(),
  email: z.email("Email inválido.").max(254, "Email muito longo."),
  campus: z.enum(CAMPI, "Selecione um campus."),
  curso: z
    .string()
    .trim()
    .min(2, "Informe o curso.")
    .max(80, "Nome do curso muito longo."),
  semestre: z.coerce
    .number("Semestre inválido.")
    .int("Semestre inválido.")
    .min(1, "Semestre deve ser entre 1 e 12.")
    .max(12, "Semestre deve ser entre 1 e 12."),
  turma: z
    .string()
    .trim()
    .min(1, "Informe a turma.")
    .max(10, "Turma muito curta ou muito longa."),
  origem: z.string().trim().max(60).optional(),
  ref: z.string().trim().max(20).optional(),
  consentimento: z.literal(
    true,
    "É necessário aceitar o uso dos dados para continuar.",
  ),
  // Campo-armadilha: fica invisível na tela para gente real. Se vier
  // preenchido, é quase certeza que foi um bot.
  site: z.string().max(0, "Falha na validação.").optional(),
  // Token do Cloudflare Turnstile. Opcional aqui no zod porque a checagem
  // de verdade (incluindo "token ausente") acontece em verificarTurnstile,
  // que também sabe lidar com o Turnstile não estar configurado (ambiente
  // local sem as chaves do Cloudflare).
  tokenTurnstile: z.string().max(2048).optional(),
});

export type DadosInscricao = z.infer<typeof esquemaInscricao>;
