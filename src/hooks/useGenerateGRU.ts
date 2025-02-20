import { useEffect, useState } from "react";

import { GRUFormValue } from "@/components/form-create-gru";
import { useToast } from "@/components/ui/use-toast";

export function useGenerateGRU() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: error,
      });
      setError(null);
    }
  }, [error, toast]);

  const mutation = async (
    values: GRUFormValue & { serviceCode: string; referenceNumber: string }
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`/gru/api/gru`, {
        method: "POST",
        headers: {
          Accept: "application/pdf",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw response.statusText;

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const today = new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const link = Object.assign(document.createElement("a"), {
        href: url,
        download: `gru-${today}-${Date.now()}.pdf`,
      } satisfies Partial<HTMLAnchorElement>);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError("Não foi possível gerar o GRU nesse momento.");
    } finally {
      setLoading(false);
    }
  };

  return { mutation, loading, error };
}
