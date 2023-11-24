"use client";

import React from "react";
import { Toaster } from "./ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
