import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { InvoiceGenerator } from "@/components/resources/InvoiceGenerator";

export const metadata: Metadata = {
  title: "Invoice generator — InvoNexa",
  description: "Build a sample invoice, see totals update live, then export JSON or print to PDF.",
};

export default function InvoiceGeneratorPage() {
  return (
    <>
      <PageHero
        eyebrow="Invoice generator"
        title="Draft an invoice and watch the totals add up."
        text="Pick a country and format, fill in the parties and line items, then download the JSON or print a PDF. Everything runs in your browser; nothing is sent anywhere."
      />
      <PageSection>
        <InvoiceGenerator />
      </PageSection>
    </>
  );
}
