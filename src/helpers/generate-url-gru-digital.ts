const gruDigitalBaseURL =
  "https://pagtesouro.tesouro.gov.br/portal-gru/#/pagamento-gru/formulario?";

export type GenerateGruDigitalParams = {
  cpf: string;
  name: string;
  value: number;
  serviceCode: string;
  referenceNumber: string;
};

export const generateGruDigitalURL = ({
  cpf,
  name,
  value,
  serviceCode,
  referenceNumber,
}: GenerateGruDigitalParams): string => {
  const today = new Date();
  const todayMoreSevenDays = new Date(
    new Date(today).setDate(today.getDate() + 7)
  );
  const invoicePastDue = todayMoreSevenDays
    .toLocaleDateString("en-US", {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    })
    .replace(/(\d{2})\/(\d{2})\/(\d{4})/g, "$3-$1-$2");

  const currentMonthAndYear = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-01`; // month is 0-indexed

  const searchParams = new URLSearchParams();
  searchParams.append("servico", serviceCode);
  searchParams.append("cpfCnpjContribuinte", cpf);
  searchParams.append("nomeContribuinte", name);
  searchParams.append("valorPrincipal", value.toString());
  searchParams.append("numeroReferencia", referenceNumber);
  searchParams.append("vencimento", invoicePastDue);
  searchParams.append("competencia", currentMonthAndYear);

  return `${gruDigitalBaseURL}${searchParams.toString()}`;
};
