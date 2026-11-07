// Fica aqui (e não em esquemas.ts) pra componente cliente poder importar só
// a constante, sem precisar carregar o zod no bundle do navegador.
export const CAMPI = ["Alphaville", "Higienópolis"] as const;
export type Campus = (typeof CAMPI)[number];

// Lista só de sugestão pro campo de curso (datalist). Não é uma lista
// oficial de cursos do Mackenzie, é só pra agilizar o preenchimento — o
// campo continua sendo texto livre.
export const CURSOS_SUGERIDOS = [
  "Ciência da Computação",
  "Engenharia de Computação",
  "Sistemas de Informação",
  "Engenharia de Software",
  "Administração",
  "Direito",
  "Engenharia de Produção",
  "Engenharia Civil",
  "Engenharia Elétrica",
  "Engenharia Mecânica",
  "Arquitetura e Urbanismo",
  "Design",
  "Psicologia",
  "Publicidade e Propaganda",
  "Relações Internacionais",
  "Medicina",
];
