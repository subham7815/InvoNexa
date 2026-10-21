import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { BlogList } from "@/components/resources/BlogList";
import { SubscribeForm } from "@/components/resources/SubscribeForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog — InvoNexa",
  description: "Plain-language guides to e-invoicing, e-reporting and invoicing APIs.",
};

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Guides for teams who send invoices."
        text="Explainers on networks, tax reporting and building invoicing into your product. Articles are sample content, not legal advice."
        sample
      />
      <PageSection>
        <BlogList />
      </PageSection>
      <PageSection className="bg-fill/50">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <SubscribeForm topic="blog" title="Get new articles by email" text="One short email when we publish. No spam, unsubscribe any time." />
          </Reveal>
        </div>
      </PageSection>
    </>
  );
}
