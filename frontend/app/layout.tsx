import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pham Thi Van Anh — Digital Marketing Leader & Campaign Strategist",
  description:
    "Portfolio of Pham Thi Van Anh — digital marketing leader, campaign strategist, and creative storyteller. Experience at Dell, DarkHorseStocks, UNIQLO, Ferrero.",
  openGraph: {
    title: "Pham Thi Van Anh — Digital Marketing Leader",
    description: "Creative. Data-Driven. Results-Focused.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
