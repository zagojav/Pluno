"use client";

import { useCallback, useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CAMPI, CURSOS_SUGERIDOS } from "@/lib/constantes";
import TelaSucesso from "./TelaSucesso";
import Turnstile from "./Turnstile";

interface EstadoFormulario {
  nome: string;
  email: string;
  campus: string;
  curso: string;
  semestre: string;
  turma: string;
  consentimento: boolean;
  site: string; // honeypot
}

const ESTADO_INICIAL: EstadoFormulario = {
  nome: "",
  email: "",
  campus: "",
  curso: "",
  semestre: "",
  turma: "",
  consentimento: false,
  site: "",
};

type ErrosFormulario = Partial<Record<keyof EstadoFormulario, string>>;

// Validação no cliente: só pra dar retorno rápido antes de bater no
// servidor. A validação que realmente decide é a do zod na Route Handler.
function validarCampos(campos: EstadoFormulario): ErrosFormulario {
  const erros: ErrosFormulario = {};

  if (!campos.email.trim()) {
    erros.email = "Informe seu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.trim())) {
    erros.email = "Email inválido.";
  }

  if (!campos.campus) {
    erros.campus = "Selecione um campus.";
  }

  if (campos.curso.trim().length < 2) {
    erros.curso = "Informe o curso.";
  }

  const semestreNumero = Number(campos.semestre);
  if (
    !campos.semestre ||
    Number.isNaN(semestreNumero) ||
    semestreNumero < 1 ||
    semestreNumero > 12
  ) {
    erros.semestre = "Semestre deve ser entre 1 e 12.";
  }

  if (!campos.turma.trim()) {
    erros.turma = "Informe a turma.";
  }

  if (!campos.consentimento) {
    erros.consentimento =
      "É necessário aceitar o uso dos dados para continuar.";
  }

  return erros;
}

export default function FormularioListaEspera() {
  const idBase = useId();
  const parametrosBusca = useSearchParams();
  const origem = parametrosBusca.get("origem") ?? "";
  const ref = parametrosBusca.get("ref") ?? "";

  const [campos, setCampos] = useState<EstadoFormulario>(ESTADO_INICIAL);
  const [erros, setErros] = useState<ErrosFormulario>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [tokenTurnstile, setTokenTurnstile] = useState<string | null>(null);
  const [resultado, setResultado] = useState<{
    totalTurma: number;
    linkIndicacao: string;
  } | null>(null);

  const aoObterTokenTurnstile = useCallback((token: string | null) => {
    setTokenTurnstile(token);
  }, []);

  function atualizarCampo<K extends keyof EstadoFormulario>(
    campo: K,
    valor: EstadoFormulario[K],
  ) {
    setCampos((anterior) => ({ ...anterior, [campo]: valor }));
    // Some o erro do campo assim que a pessoa mexe nele, em vez de deixar a
    // mensagem antiga presa na tela até o próximo envio.
    setErros((anterior) => {
      if (!(campo in anterior)) return anterior;
      const resto = { ...anterior };
      delete resto[campo];
      return resto;
    });
  }

  async function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErroGeral(null);

    const errosValidacao = validarCampos(campos);
    if (Object.keys(errosValidacao).length > 0) {
      setErros(errosValidacao);
      return;
    }

    setErros({});
    // UI otimista: o botão já muda de estado na hora, antes mesmo da
    // resposta do servidor chegar. Se der erro, os campos preenchidos
    // continuam todos aí (nada é limpo).
    setEnviando(true);

    try {
      const resposta = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: campos.nome.trim() || undefined,
          email: campos.email.trim(),
          campus: campos.campus,
          curso: campos.curso.trim(),
          semestre: Number(campos.semestre),
          turma: campos.turma.trim(),
          origem: origem || undefined,
          ref: ref || undefined,
          consentimento: campos.consentimento,
          site: campos.site,
          tokenTurnstile: tokenTurnstile ?? undefined,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErroGeral(
          dados?.erro ?? "Não foi possível completar sua inscrição.",
        );
        return;
      }

      const urlBase =
        process.env.NEXT_PUBLIC_URL_SITE || window.location.origin;
      const linkIndicacao = `${urlBase}/?origem=whatsapp&ref=${dados.idCurto}`;

      setResultado({ totalTurma: dados.totalTurma, linkIndicacao });
    } catch {
      setErroGeral("Falha de conexão. Verifique sua internet e tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  if (resultado) {
    return (
      <TelaSucesso
        totalTurma={resultado.totalTurma}
        linkIndicacao={resultado.linkIndicacao}
      />
    );
  }

  return (
    <form
      onSubmit={aoEnviar}
      noValidate
      className="flex flex-col gap-5 border-2 border-primeiro-plano bg-superficie p-6 sm:p-8"
    >
      <div>
        <h3 className="font-sans text-xl font-bold">
          Entrar na lista de espera
        </h3>
        <p className="mt-1 text-sm text-esmaecido">
          Leva menos de um minuto. Só pedimos o essencial.
        </p>
      </div>

      <CampoTexto
        id={`${idBase}-nome`}
        label="Nome (opcional)"
        valor={campos.nome}
        onChange={(valor) => atualizarCampo("nome", valor)}
        autoComplete="name"
        maxLength={80}
      />

      <CampoTexto
        id={`${idBase}-email`}
        label="Email"
        tipo="email"
        obrigatorio
        valor={campos.email}
        onChange={(valor) => atualizarCampo("email", valor)}
        erro={erros.email}
        autoComplete="email"
        maxLength={254}
      />

      <div>
        <label
          htmlFor={`${idBase}-campus`}
          className="mb-1.5 block text-sm font-bold"
        >
          Campus <span aria-hidden="true">*</span>
        </label>
        <select
          id={`${idBase}-campus`}
          value={campos.campus}
          onChange={(evento) => atualizarCampo("campus", evento.target.value)}
          aria-invalid={erros.campus ? true : undefined}
          aria-describedby={erros.campus ? `${idBase}-campus-erro` : undefined}
          className="min-h-[44px] w-full border-2 border-borda bg-background px-3 text-base"
        >
          <option value="">Selecione...</option>
          {CAMPI.map((campus) => (
            <option key={campus} value={campus}>
              {campus}
            </option>
          ))}
        </select>
        {erros.campus && (
          <p
            id={`${idBase}-campus-erro`}
            className="mt-1.5 text-sm text-red-700 dark:text-red-400"
          >
            {erros.campus}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${idBase}-curso`}
          className="mb-1.5 block text-sm font-bold"
        >
          Curso <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${idBase}-curso`}
          list={`${idBase}-cursos`}
          value={campos.curso}
          onChange={(evento) => atualizarCampo("curso", evento.target.value)}
          aria-invalid={erros.curso ? true : undefined}
          aria-describedby={erros.curso ? `${idBase}-curso-erro` : undefined}
          className="min-h-[44px] w-full border-2 border-borda bg-background px-3 text-base"
          placeholder="Ex: Ciência da Computação"
          maxLength={80}
        />
        <datalist id={`${idBase}-cursos`}>
          {CURSOS_SUGERIDOS.map((curso) => (
            <option key={curso} value={curso} />
          ))}
        </datalist>
        {erros.curso && (
          <p
            id={`${idBase}-curso-erro`}
            className="mt-1.5 text-sm text-red-700 dark:text-red-400"
          >
            {erros.curso}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${idBase}-semestre`}
            className="mb-1.5 block text-sm font-bold"
          >
            Semestre <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${idBase}-semestre`}
            type="number"
            inputMode="numeric"
            min={1}
            max={12}
            value={campos.semestre}
            onChange={(evento) =>
              atualizarCampo("semestre", evento.target.value)
            }
            aria-invalid={erros.semestre ? true : undefined}
            aria-describedby={
              erros.semestre ? `${idBase}-semestre-erro` : undefined
            }
            className="min-h-[44px] w-full border-2 border-borda bg-background px-3 text-base"
            placeholder="1 a 12"
          />
          {erros.semestre && (
            <p
              id={`${idBase}-semestre-erro`}
              className="mt-1.5 text-sm text-red-700 dark:text-red-400"
            >
              {erros.semestre}
            </p>
          )}
        </div>

        <CampoTexto
          id={`${idBase}-turma`}
          label="Turma"
          obrigatorio
          valor={campos.turma}
          onChange={(valor) => atualizarCampo("turma", valor)}
          erro={erros.turma}
          placeholder="Ex: 01A"
          maxLength={10}
        />
      </div>

      {/* Honeypot: invisível e fora da ordem de tabulação. Gente real nunca
          preenche isso; se vier preenchido, o servidor rejeita como spam. */}
      <div
        className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${idBase}-site`}>Não preencha este campo</label>
        <input
          id={`${idBase}-site`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={campos.site}
          onChange={(evento) => atualizarCampo("site", evento.target.value)}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id={`${idBase}-consentimento`}
          type="checkbox"
          checked={campos.consentimento}
          onChange={(evento) =>
            atualizarCampo("consentimento", evento.target.checked)
          }
          aria-invalid={erros.consentimento ? true : undefined}
          aria-describedby={
            erros.consentimento ? `${idBase}-consentimento-erro` : undefined
          }
          className="mt-0.5 h-5 w-5 shrink-0 border-2 border-borda"
        />
        <label
          htmlFor={`${idBase}-consentimento`}
          className="text-sm leading-relaxed text-esmaecido"
        >
          Autorizo o uso dos meus dados pra avisar do lançamento do Pluno e
          montar as turmas, conforme a{" "}
          <Link
            href="/privacidade"
            className="font-bold text-primeiro-plano underline underline-offset-4"
          >
            política de privacidade
          </Link>
          .
        </label>
      </div>
      {erros.consentimento && (
        <p
          id={`${idBase}-consentimento-erro`}
          className="text-sm text-red-700 dark:text-red-400"
        >
          {erros.consentimento}
        </p>
      )}

      {erroGeral && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {erroGeral}
        </p>
      )}

      <Turnstile aoObterToken={aoObterTokenTurnstile} />

      <button
        type="submit"
        disabled={enviando}
        className="inline-flex min-h-[44px] items-center justify-center border-2 border-primeiro-plano bg-acento px-6 text-base font-bold text-acento-primeiro-plano transition-transform hover:-translate-y-0.5 disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {enviando ? "Enviando..." : "Entrar na lista"}
      </button>
    </form>
  );
}

interface PropriedadesCampoTexto {
  id: string;
  label: string;
  valor: string;
  onChange: (valor: string) => void;
  tipo?: string;
  obrigatorio?: boolean;
  erro?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
}

// Campo de texto simples e reaproveitável, já com label, erro e alvo de
// toque de pelo menos 44px.
function CampoTexto({
  id,
  label,
  valor,
  onChange,
  tipo = "text",
  obrigatorio,
  erro,
  placeholder,
  autoComplete,
  maxLength,
}: PropriedadesCampoTexto) {
  const idErro = `${id}-erro`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">
        {label} {obrigatorio && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor}
        onChange={(evento) => onChange(evento.target.value)}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? idErro : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className="min-h-[44px] w-full border-2 border-borda bg-background px-3 text-base"
      />
      {erro && (
        <p id={idErro} className="mt-1.5 text-sm text-red-700 dark:text-red-400">
          {erro}
        </p>
      )}
    </div>
  );
}
