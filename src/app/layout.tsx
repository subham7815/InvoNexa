import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ContactProvider } from "@/components/ContactModal";
import { CookieBanner } from "@/components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvoNexa — Invoicing infrastructure for global businesses",
  description: "Send and receive compliant e-invoices in 30+ countries with one API.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ContactProvider>{children}</ContactProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
