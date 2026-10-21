import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { team, timeline, values } from "@/data/company";

export const metadata: Metadata = {
  title: "About — InvoNexa",
  description: "Our mission, values, history and the people behind InvoNexa.",
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We turn tax complexity into a single API."
        text="InvoNexa exists so that a business can sell anywhere without learning every country's invoicing rules first. The team and timeline below are fictional sample content."
        sample
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/careers">See open roles</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>
        </div>
      </PageHero>

      <PageSection>
        <SectionHeading eyebrow="Mission" title="Make compliant invoicing a solved problem." text="Every mandate, format and portal is different. We carry that burden once, so every customer and partner benefits from it." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <article className="h-full rounded-xl border border-line bg-white p-6">
                <p className="font-mono text-sm uppercase tracking-wider text-brand">Value {i + 1}</p>
                <h3 className="mt-2 text-xl font-medium">{v.title}</h3>
                <p className="mt-2 text-lg text-ink-2">{v.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="Timeline" title="How we got here." />
        <ol className="mt-10 space-y-4 border-l-2 border-brand/30 pl-6">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 60} className="relative">
              <span aria-hidden className="absolute -left-8.25 top-2 h-3 w-3 rounded-full bg-brand" />
              <p className="font-mono text-sm uppercase tracking-wider text-brand">{t.year}</p>
              <h3 className="text-xl font-medium">{t.title}</h3>
              <p className="mt-1 max-w-2xl text-lg text-ink-2">{t.text}</p>
            </Reveal>
          ))}
        </ol>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Team" title="The people (fictional) behind it." text="Names and bios are invented for this demo." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 60}>
              <div className="h-full rounded-xl border border-line bg-white p-6">
                <span aria-hidden className="grid h-14 w-14 place-items-center rounded-full bg-brand-tint text-xl font-medium text-navy">
                  {m.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <h3 className="mt-4 text-xl font-medium">{m.name}</h3>
                <p className="text-base text-brand">{m.role}</p>
                <p className="mt-2 text-base text-ink-2">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </PageSection>

    </>
  );
}
