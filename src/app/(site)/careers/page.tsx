import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { CareersBoard } from "@/components/resources/CareersBoard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { benefits, roles, values } from "@/data/company";

export const metadata: Metadata = {
  title: "Careers — InvoNexa",
  description: "Join a team making cross-border invoicing boring in the best way.",
};

export default function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Help us make invoicing the easy part."
        text="We are a small, remote-first team solving a problem every business has. The roles below are sample listings."
        sample
      />

      <PageSection>
        <SectionHeading eyebrow="How we work" title="Values we hire for." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <article className="h-full rounded-xl border border-line bg-white p-6">
                <h3 className="text-xl font-medium">{v.title}</h3>
                <p className="mt-2 text-lg text-ink-2">{v.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="Benefits" title="Looking after the people who build this." />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b} delay={i * 50} className="rounded-xl border border-line bg-white p-5 text-lg text-ink">
              {b}
            </Reveal>
          ))}
        </ul>
      </PageSection>

      <PageSection id="roles">
        <SectionHeading eyebrow="Open roles" title="Where you could fit." text="Select a role to read more, then apply right here." />
        <div className="mt-10">
          <CareersBoard roles={roles} />
        </div>
      </PageSection>
    </>
  );
}
