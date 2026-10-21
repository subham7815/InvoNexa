import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { Comparator } from "@/components/resources/Comparator";

export const metadata: Metadata = {
  title: "Invoice comparator — InvoNexa",
  description: "Paste two invoice JSON documents and see exactly which fields were added, removed or changed.",
};

export default function InvoiceComparator() {
  return (
    <>
      <PageHero
        eyebrow="Invoice comparator"
        title="See exactly what changed between two invoices."
        text="Paste two JSON documents, such as an original and a corrected version, and get a field-by-field diff. Comparison happens in your browser."
      />
      <PageSection>
        <Comparator />
      </PageSection>
    </>
  );
}
