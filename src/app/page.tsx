import { Suspense } from "react";
import Hero from "@/components/Hero";
import ComoFunciona from "@/components/ComoFunciona";
import Funcionalidades from "@/components/Funcionalidades";
import Confianca from "@/components/Confianca";
import FormularioListaEspera from "@/components/FormularioListaEspera";
import Faq from "@/components/Faq";
import Rodape from "@/components/Rodape";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1">
        <Hero />
        <ComoFunciona />
        <Funcionalidades />
        <Confianca />
        <section id="inscricao" className="px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-lg">
            <Suspense fallback={null}>
              <FormularioListaEspera />
            </Suspense>
          </div>
        </section>
        <Faq />
      </main>
      <Rodape />
    </div>
  );
}
