const INSTITUTION_CODE = "153037";
const apiUrl="https://pagtesouro.tesouro.gov.br/api/gru/portal/boleto-gru";

export function getGruURL({
  value,
  document,
  name,
  serviceCode,
  referenceNumber,
}: {
  name: string;
  value: number;
  document: string;
  serviceCode: string;
  referenceNumber: string;
}) {
  const today = new Date();
  const currentMonthAndYear = today.toLocaleDateString("pt-BR", {
    month: "2-digit",
    year: "numeric",
  });
  const invoicePastDue = new Date(today.setDate(today.getDate() + 4))
    .toLocaleDateString("pt-BR", {
      month: "2-digit",
      year: "numeric",
      day: "2-digit",
    })
    .toString();

  const searchParams = new URLSearchParams({
    codigoUg: INSTITUTION_CODE,
    codigoRecolhimento: serviceCode,
    numeroReferencia: referenceNumber,
    nomeContribuinte: name,
    valorPrincipal: new Intl.NumberFormat("pt-BR", { currency: "BRL" }).format(
      value
    ),
    cpfCnpjContribuinte: document,
    vencimento: invoicePastDue,
    competencia: currentMonthAndYear,
  });

  return `${apiUrl}?${searchParams.toString()}`;
}
