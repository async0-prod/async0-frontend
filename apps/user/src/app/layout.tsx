import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PublicEnvScript } from "next-runtime-env";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "async0 - JavaScript Algorithms & Data Structures",
  description:
    "Solve algorithm challenges with JavaScript. Is it the best tool for the job? Absolutely not. Will we do it anyway? You bet your undefined we will.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="view-transition" content="same-origin" />
        <PublicEnvScript />
      </head>
      <body
        className={` ${urbanist.variable} bg-almond dark:bg-charcoal antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
