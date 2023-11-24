"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingIndicator } from "@/components/loading-indicator";

import { useGenerateGRU } from "@/hooks/useGenerateGRU";

import { validateCPF } from "@/helpers/validate-cpf";

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
  type?: "sibi" | "ru";
};

export function FormCreateGRU({ type }: FormCreateGRUProps) {
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

  const onSubmit = handleSubmit((data: GRUFormValue) =>
    mutation({ ...data, type }).then(() => reset())
  );

  const { mutation, loading } = useGenerateGRU();

  return (
    <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
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
        type="submit"
        size="lg"
        aria-label="Gerar GRU"
        className="mt-3 bg-[#06956A] font-medium hover:bg-[#06945A]"
        aria-disabled={loading}
        disabled={loading}
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect width="12" height="8" x="6" y="14" />
            </svg>
            Gerar
          </>
        )}
      </Button>
    </form>
  );
}
