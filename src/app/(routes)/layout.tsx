import React from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "fixed top-6 right-5",
        })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="mr-2 h-4 w-4 stroke-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 19l-7-7 7-7M19 12H5"></path>
        </svg>
        Voltar
      </Link>
      {children}
    </>
  );
}
