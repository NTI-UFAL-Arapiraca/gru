import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <section className="grid place-items-center">
        <div className="relative mb-8 h-40 w-40">
          <Image
            src="/ufal.png"
            alt="Brasão da UFAL"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-lg font-bold">Qual serviço deseja usar?</h1>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/gru-ru"
            className="flex h-20 flex-1 items-center justify-center whitespace-nowrap rounded-md border bg-background px-10  font-medium transition-colors hover:bg-muted"
          >
            GRU - RU
          </Link>
          <Link
            href="/gru-sibi"
            className="flex h-20 flex-1 items-center justify-center whitespace-nowrap rounded-md border bg-background px-10  font-medium transition-colors hover:bg-muted"
          >
            GRU - SIBI
          </Link>
        </div>
      </section>
    </>
  );
}
