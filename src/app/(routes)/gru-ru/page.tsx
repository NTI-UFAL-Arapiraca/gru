import type { Metadata } from "next";
import Image from "next/image";

import { FormCreateGRU } from "@/components/form-create-gru";

export const metadata: Metadata = {
  title: "GRU Restaurante Universitário",
  description:
    "Gere facilmente seu boleto de GRU para o Restaurante Universitário da UFAL",
};

export default function GRURuPage() {
  return (
    <section className="w-full max-w-md">
      <Image
        src="/ufal.png"
        width={150}
        height={150}
        alt="GRU Logo"
        priority
        className="mx-auto"
      />
      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-1 text-xl font-bold text-foreground">
            Restaurante Universitário
          </h1>
          <p className="text-sm leading-relaxed">
            Aplicação para simplificar o processo de emissão da GRU dos RUs da
            UFAL.
          </p>
        </div>
      </div>
      <FormCreateGRU type="ru" locale="arapiraca" />
    </section>
  );
}
