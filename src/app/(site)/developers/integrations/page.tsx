import type { Metadata } from "next";
import { ConnectorGrid } from "@/components/developers/ConnectorGrid";
import { PageHero, PageSection } from "@/components/PageHero";
import { ButtonLink, SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Integrations — InvoNexa" };

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Connect the tools you already run."
        text="Connectors move documents from your ERP, billing, accounting or shop software into InvoNexa and write receipts back. Names below are illustrative sample content."
        sample
      />
      <PageSection>
        <ConnectorGrid />
      </PageSection>
      <PageSection className="bg-fill">
        <SectionHeading eyebrow="Missing something?" title="Tell us what to connect next." text="Software vendors can build a connector with our partner program. Everyone else can ask us to prioritise one." />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/partners">Become a partner</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </PageSection>
    </>
  );
}
