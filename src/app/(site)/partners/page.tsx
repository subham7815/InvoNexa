import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { PartnerForm } from "@/components/partners/PartnerForm";
import { benefits, opportunities, paths, steps } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partners — InvoNexa",
  description: "Join the InvoNexa partner program as a technology partner, reseller or embedded partner.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner program"
        title="Grow with the invoicing infrastructure behind your customers."
        text="Whether you build software, advise finance teams or run a platform, there is a way to bring compliant e-invoicing to your customers without building it yourself."
      />

      <PageSection>
        <SectionHeading eyebrow="Three paths" title="Pick the model that fits." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {paths.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <article className="flex h-full flex-col rounded-xl border border-line bg-white p-6">
                <h3 className="text-2xl font-medium text-ink">{p.title}</h3>
                <p className="mt-3 text-lg text-ink-2">{p.text}</p>
                <ul className="mt-5 flex-1 space-y-2 text-base text-ink">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span aria-hidden className="text-ok">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <a href="#apply" className="mt-6 text-base font-medium text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                  Apply as {p.title.toLowerCase()}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="Benefits" title="What partners get." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 60}>
              <div className="h-full rounded-xl border border-line bg-white p-6">
                <h3 className="text-xl font-medium text-ink">{b.title}</h3>
                <p className="mt-2 text-base text-ink-2">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Integration opportunities" title="Where InvoNexa fits in your stack." />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {opportunities.map((o, i) => (
            <Reveal key={o.title} delay={i * 60}>
              <div className="h-full rounded-xl border border-line bg-white p-6">
                <h3 className="text-xl font-medium text-ink">{o.title}</h3>
                <p className="mt-2 text-lg text-ink-2">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="How it works" title="From inquiry to launch in four steps." />
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 80}>
              <div className="h-full rounded-xl border border-line bg-white p-6">
                <span className="font-mono text-sm text-brand">Step {i + 1}</span>
                <h3 className="mt-2 text-xl font-medium text-ink">{s.title}</h3>
                <p className="mt-2 text-base text-ink-2">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </PageSection>

      <PageSection id="apply">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Partner inquiry" title="Tell us how you want to work together." text="We read every inquiry and reply within two business days." />
          </div>
          <Reveal>
            <div className="rounded-xl border border-line bg-white p-6">
              <PartnerForm />
            </div>
          </Reveal>
        </div>
      </PageSection>
    </>
  );
}
