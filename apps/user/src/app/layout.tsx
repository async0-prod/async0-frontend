import type { Metadata } from "next";
import { Urbanist, Ephesis } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PublicEnvScript } from "next-runtime-env";

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
  description: "Solve algorithm challenges in JavaScript.",
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
        className={` ${urbanist.variable} ${ephesis.variable} bg-almond dark:bg-charcoal font-urbanist antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
