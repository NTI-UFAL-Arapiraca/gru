import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/components/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | NTI - UFAL",
    default: "Gerador de GRU | NTI - UFAL",
  },
  description: "Gere facilmente seu boleto de GRU para a UFAL",
  keywords: "GRU, UFAL, Arapiraca, NTI, Gerador de GRU",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} flex min-h-screen flex-col antialiased`}
      >
        <Providers>
          <main className="container grid h-full flex-1 place-items-center py-6">
            {children}
          </main>
          <footer>
            <p className="py-6 text-center text-xs font-medium">
              Desenvolvido por{" "}
              <abbr
                title="Núcleo de Tecnologia da Informação"
                className="font-bold no-underline"
              >
                NTI
              </abbr>{" "}
              Campus Arapiraca - {new Date().getFullYear()}
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
