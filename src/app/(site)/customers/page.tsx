import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { StoryGrid } from "@/components/customers/StoryGrid";
import { testimonials } from "@/data/customers";

export const metadata: Metadata = {
  title: "Customers — InvoNexa",
  description: "Sample customer stories showing how teams ship compliant invoicing with InvoNexa.",
};

export default function CustomersPage() {
  return (
    <>
      <PageHero
        eyebrow="Customers"
        title="Teams that ship invoicing without the country plumbing."
        text="The companies below are fictional and the figures illustrative. They show the kind of outcomes we design InvoNexa for."
        sample
      />
      <PageSection>
        <Reveal>
          <StoryGrid />
        </Reveal>
      </PageSection>
      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="In their words" title="What teams say." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.company} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-xl border border-line bg-white p-6">
                <blockquote className="flex-1 text-xl text-ink">“{t.text}”</blockquote>
                <figcaption className="mt-5 text-base text-ink-3">{t.who}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </PageSection>
    </>
  );
}
