const COMMON = {
  INSTITUTION_CODE: "153037",
  COMPETENCE: new Date()
    .toLocaleDateString("pt-BR", {
      month: "2-digit",
      year: "numeric",
    })
    .toString(),
} as const;

const SIBI_DEFAULTS = {
  RECOLLECTION_CODE: "28830-6",
  REFERENCE_NUMBER: "1530371522210296",
} as const;

const GRU_DEFAULTS = {
  RECOLLECTION_CODE: "28837-3",
  REFERENCE_NUMBER: "15303715222100",
} as const;

export function getGruURL({
  value,
  document,
  name,
  sibi = false,
}: {
  name: string;
  value: number;
  document: string;
  sibi?: boolean;
}) {
  const today = new Date();
  const invoicePastDue = new Date(today.setDate(today.getDate() + 4))
    .toLocaleDateString("pt-BR", {
      month: "2-digit",
      year: "numeric",
      day: "2-digit",
    })
    .toString();

  const searchParams = new URLSearchParams({
    nomeContribuinte: name,
    valorPrincipal: new Intl.NumberFormat("pt-BR", { currency: "BRL" }).format(
      value
    ),
    cpfCnpjContribuinte: document,
    vencimento: invoicePastDue,
    competencia: COMMON.COMPETENCE,
    codigoUg: COMMON.INSTITUTION_CODE,
    numeroReferencia: sibi
      ? SIBI_DEFAULTS.REFERENCE_NUMBER
      : GRU_DEFAULTS.REFERENCE_NUMBER,
    codigoRecolhimento: sibi
      ? SIBI_DEFAULTS.RECOLLECTION_CODE
      : GRU_DEFAULTS.RECOLLECTION_CODE,
  });

  return `${process.env.API_URL}?${searchParams.toString()}`;
}
