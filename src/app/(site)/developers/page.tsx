import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/blocks";
import { DemoBanner } from "@/components/developers/shared";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { integrationPaths, modelSteps, quickSample } from "@/data/developers";

export const metadata: Metadata = { title: "Developers — InvoNexa" };

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="One API. Every country's invoicing rules."
        text="Send InvoNexa a single document and we handle validation, signing, reporting and delivery for the destination country."
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/developers/getting-started">Get started</ButtonLink>
          <ButtonLink href="/developers/api-reference" variant="secondary">
            API reference
          </ButtonLink>
          <DemoBanner />
        </div>
      </PageHero>

      <PageSection>
        <SectionHeading eyebrow="The model" title="Documents in, receipts out." text="Three ideas are all you need to reason about an integration." />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {modelSteps.map((s, i) => (
            <li key={s.name}>
              <Reveal delay={i * 80}>
                <div className="h-full rounded-xl border border-line bg-white p-6">
                  <span className="font-mono text-sm text-brand">0{i + 1}</span>
                  <h3 className="mt-2 text-2xl font-medium">{s.name}</h3>
                  <p className="mt-2 text-lg text-ink-2">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection className="bg-fill">
        <SectionHeading eyebrow="Integrate" title="Choose your way to integrate." text="Start with whichever fits your team. You can mix all three later." />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {integrationPaths.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 80}>
                <div className="flex h-full flex-col rounded-xl border border-line bg-white p-6">
                  <p className="font-mono text-sm uppercase tracking-wider text-brand">{p.tag}</p>
                  <h3 className="mt-2 text-2xl font-medium">{p.title}</h3>
                  <p className="mt-2 flex-1 text-lg text-ink-2">{p.text}</p>
                  <Link href={p.href} className="mt-5 text-base font-medium text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand">
                    {p.cta} →
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Quick look" title="Your first invoice in one request." text="Post a document and the response tells you where it stands. Run this exact call from the live panel in the API reference." />
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/developers/getting-started">Follow the guide</ButtonLink>
              <ButtonLink href="/developers/documentation" variant="secondary">
                Read the docs
              </ButtonLink>
            </div>
          </div>
          <Reveal variant="pop">
            <CodeBlock code={quickSample} label="shell" />
          </Reveal>
        </div>
      </PageSection>

    </>
  );
}
