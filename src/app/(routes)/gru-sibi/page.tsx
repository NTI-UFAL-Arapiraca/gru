import type { Metadata } from "next";
import Image from "next/image";

import { FormCreateGRU } from "@/components/form-create-gru";
import { GRU_DIGITAL_DATA_BY_UNIVERSITY_LOCATION } from "@/constants/gru-digital-data";
import { GRU_SIMPLE_DATA_BY_UNIVERSITY_LOCATION } from "@/constants/gru-simple-data";

export const metadata: Metadata = {
  title: "GRU Biblioteca",
  description:
    "Gere facilmente seu boleto de GRU para pagamento de multas do sistema de bibliotecas da UFAL",
};

export default function GRUSibiPage() {
  const gruSimplesData =
    GRU_SIMPLE_DATA_BY_UNIVERSITY_LOCATION.arapiraca.gruLibrary;
  const gruDigitalData =
    GRU_DIGITAL_DATA_BY_UNIVERSITY_LOCATION.arapiraca.gruLibrary;

  return (
    <section className="w-full max-w-md">
      <Image
        src="/gru/ufal.png"
        width={150}
        height={150}
        alt="GRU Logo"
        className="mx-auto"
        priority
      />
      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-1 text-xl font-bold text-foreground">
            Biblioteca Campus Arapiraca
          </h1>
          <p className="text-sm leading-relaxed">
            Aplicação para simplificar o processo de emissão da GRU para
            pagamento de multas do sistema de bibliotecas da UFAL.
          </p>
        </div>
      </div>
      <FormCreateGRU gruDigital={gruDigitalData} gruSimples={gruSimplesData} />
    </section>
  );
}
