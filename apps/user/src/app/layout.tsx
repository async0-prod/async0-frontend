import type { Metadata } from "next";
import { Nunito, Inter, Urbanist, Birthstone, Ephesis } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const ephesis = Ephesis({
  variable: "--font-ephesis",
  subsets: ["latin"],
  weight: ["400"],
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
        className={` ${urbanist.variable} bg-almond dark:bg-charcoal antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
