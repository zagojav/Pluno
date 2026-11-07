import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Inicializa o firebase-admin uma única vez por processo. Em ambiente
// serverless (Vercel) o módulo costuma ser reaproveitado entre invocações da
// mesma instância, então reinicializar o app de novo causaria erro.
function obterApp(): App {
  const appsExistentes = getApps();
  if (appsExistentes.length > 0) {
    return appsExistentes[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Na Vercel a chave privada é salva com "\n" escapado, então precisamos
  // converter de volta para quebras de linha reais antes de usar.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Variáveis de ambiente do Firebase Admin não configuradas (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).",
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

let instanciaDb: Firestore | null = null;

// Função em vez de instância no topo do módulo: assim, se faltar variável de
// ambiente, o erro só aparece quando a rota é chamada (não trava o build).
export function obterFirestore(): Firestore {
  if (!instanciaDb) {
    instanciaDb = getFirestore(obterApp());
  }
  return instanciaDb;
}
