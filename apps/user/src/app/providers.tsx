"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        {children}
        <Toaster
          richColors
          swipeDirections={["right"]}
          offset={{ bottom: 80 }}
        />
      </QueryProvider>
    </ThemeProvider>
  );
};
