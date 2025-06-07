import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
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
      </head>
      <body
        className={`${nunito.className} ${inter.className} antialiased bg-almond dark:bg-charcoal`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
