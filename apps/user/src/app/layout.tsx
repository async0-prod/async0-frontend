import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
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
      </head>
      <body
        className={`${nunito.variable}  ${inter.variable} antialiased bg-almond dark:bg-charcoal relative`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
