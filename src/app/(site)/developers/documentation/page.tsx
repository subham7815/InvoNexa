import type { Metadata } from "next";
import { DocsLayout } from "@/components/developers/DocsLayout";
import { DemoBanner } from "@/components/developers/shared";
import { PageHero, PageSection } from "@/components/PageHero";
import { BASE_URL } from "@/data/developers";

export const metadata: Metadata = { title: "Documentation — InvoNexa" };

export default function DocumentationPage() {
  return (
    <>
      <PageHero eyebrow="Documentation" title="Guides and concepts for the InvoNexa API." text={`Base URL: ${BASE_URL}. The content below is illustrative.`}>
        <DemoBanner />
      </PageHero>
      <PageSection>
        <DocsLayout />
      </PageSection>
    </>
  );
}
