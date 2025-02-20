import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { getGruURL } from "@/helpers/generate-urls";

const createGRUSchema = z.object({
  serviceCode: z.string().min(1),
  referenceNumber: z.string().min(1),
  name: z.string(),
  value: z.number(),
  document: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length === 11),
});

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { searchParams } = new URL(request.url);
  const typeSearchParam = searchParams.get("type");

  try {
    const { name, value, document, serviceCode, referenceNumber } =
      createGRUSchema.parse({
        ...requestBody,
        type: typeSearchParam,
      });

    const url = getGruURL({
      name,
      value,
      document,
      serviceCode,
      referenceNumber,
    });
    const pdf = await fetch(url).then((response) => response.blob());

    return new NextResponse(pdf, {
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename="boleto.pdf"`,
      },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos.", details: error.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Não foi possível gerar o boleto." },
      { status: 500 }
    );
  }
}
