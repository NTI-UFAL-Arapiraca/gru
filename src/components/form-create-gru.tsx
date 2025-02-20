"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { LoadingIndicator } from "@/components/loading-indicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useGenerateGRU } from "@/hooks/useGenerateGRU";

import {
  GRU_DIGITAL_DATA_BY_UNIVERSITY_LOCATION,
  GruDigitalLocale,
} from "@/constants/gru-digital-data";
import { generateGruDigitalURL } from "@/helpers/generate-url-gru-digital";
import { validateCPF } from "@/helpers/validate-cpf";
import { Card, CardContent } from "./ui/card";

const createGRUSchema = z.object({
  name: z.string().trim().min(5, "Nome deve ter no mínimo 5 caracteres"),
  document: z.string().refine((cpf) => validateCPF(cpf), {
    message: "CPF inválido",
  }),
  value: z.coerce.number().min(1, "Valor deve ser maior que 0"),
});

export type GRUFormValue = z.infer<typeof createGRUSchema>;

const makeMaskCpf = (cpf: string) => {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

type FormCreateGRUProps = {
  type: "sibi" | "ru";
  locale: GruDigitalLocale;
};

export function FormCreateGRU({ type, locale }: FormCreateGRUProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GRUFormValue>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      document: "",
      value: 3,
    },
    resolver: zodResolver(createGRUSchema),
  });

  const { mutation, loading } = useGenerateGRU();

  const onSubmit = handleSubmit((data: GRUFormValue) =>
    mutation({ ...data, type }).then(() => reset())
  );

  const handlePayWithPixOrCard = async () => {
    handleSubmit((data) => {
      const gruData =
        GRU_DIGITAL_DATA_BY_UNIVERSITY_LOCATION[locale][
          type === "ru" ? "gruRestaurant" : "gruLibrary"
        ];
      const url = generateGruDigitalURL({
        cpf: data.document.replace(/\D/g, ""),
        name: data.name,
        value: data.value,
        serviceCode: gruData.serviceCode,
        referenceNumber: gruData.referenceNumber,
      });

      const anchor = Object.assign(document.createElement("a"), {
        target: "_blank",
        rel: "noopener noreferrer",
        href: url,
      });

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    })();
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              {...register("name")}
              id="name"
              type="text"
              placeholder="Digite seu nome"
            />
            {errors.name && (
              <span className="text-sm text-destructive">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">CPF *</Label>
            <Controller
              name="document"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="000.000.000-00"
                  value={field.value}
                  onChange={(e) => field.onChange(makeMaskCpf(e.target.value))}
                />
              )}
            />
            {errors.document && (
              <span className="text-sm text-destructive">
                {errors.document.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Valor *</Label>
            <Input {...register("value")} id="name" type="number" />
            {errors.value && (
              <span className="text-sm text-destructive">
                {errors.value.message}
              </span>
            )}
          </div>
          <Button
            type="button"
            size="lg"
            aria-label="Pagar com pix ou cartão"
            className="mb-2 mt-3 bg-blue-500 font-medium hover:bg-blue-600"
            onClick={handlePayWithPixOrCard}
          >
            Pagar com pix ou cartão
          </Button>
          <Button
            type="submit"
            size="lg"
            aria-label="Gerar boleto de GRU"
            className="gap-2 bg-[#06956A] font-medium hover:bg-[#06945A]"
            aria-disabled={loading}
            disabled={loading}
          >
            {loading ? <LoadingIndicator /> : "Gerar boleto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
