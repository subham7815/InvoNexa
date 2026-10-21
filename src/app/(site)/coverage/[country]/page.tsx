import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Flag, SectionHeading } from "@/components/ui";
import { countryList, getCountry, modeLabel } from "@/data/coverage";

export function generateStaticParams() {
  return countryList.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const c = getCountry(country);
  return { title: c ? `${c.name} e-invoicing — InvoNexa` : "Coverage — InvoNexa", description: c?.summary };
}

async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const c = getCountry(country);
  if (!c) notFound();
  const related = c.related.map(getCountry).filter((r) => !!r);

  return (
    <>
      <PageHero eyebrow={`Coverage · ${c.region}`} title={`E-invoicing in ${c.name}`} text={c.summary} sample>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full bg-fill px-4 py-1.5 text-base font-medium text-ink">
            <Flag code={c.code} size={22} /> {c.name}
          </span>
          <span
            className={`rounded-full px-4 py-1.5 text-base font-medium ${c.status === "live" ? "bg-brand-tint text-brand" : "bg-fill text-ink-2"}`}
          >
            {c.status === "live" ? "Live now" : `Planned ${c.availability}`}
          </span>
          <span className="rounded-full bg-fill px-4 py-1.5 text-base text-ink-2">{modeLabel[c.mode]}</span>
        </div>
      </PageHero>

      <PageSection>
        <SectionHeading eyebrow="Formats and networks" title="What we speak and where we deliver." />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-line bg-white p-6">
              <h3 className="font-mono text-sm uppercase tracking-wider text-brand">Formats</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.formats.map((f) => (
                  <li key={f} className="rounded-lg bg-fill px-3 py-1.5 text-base text-ink">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-xl border border-line bg-white p-6">
              <h3 className="font-mono text-sm uppercase tracking-wider text-brand">Networks</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.networks.map((n) => (
                  <li key={n} className="rounded-lg bg-fill px-3 py-1.5 text-base text-ink">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="E-invoicing vs e-reporting" title="Two obligations, handled separately." />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-line bg-white p-6">
              <h3 className="text-xl font-medium text-ink">E-invoicing</h3>
              <p className="mt-3 text-lg text-ink-2">{c.invoicing}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-xl border border-line bg-white p-6">
              <h3 className="text-xl font-medium text-ink">E-reporting</h3>
              <p className="mt-3 text-lg text-ink-2">{c.reporting}</p>
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Mandate timeline" title="Illustrative dates." text="Dates are indicative and may change as legislation evolves." />
        <ol className="mt-10 max-w-2xl space-y-4">
          {c.mandate.map((m) => (
            <Reveal key={m.date + m.text} as="li">
              <div className="flex gap-5 rounded-xl border border-line bg-white p-5">
                <span className="w-24 shrink-0 font-mono text-base text-brand">{m.date}</span>
                <span className="text-lg text-ink-2">{m.text}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="Availability" title={c.status === "live" ? `${c.name} is live.` : `${c.name} is coming ${c.availability}.`} />
        <Reveal>
          <p className="mt-4 max-w-2xl text-lg text-ink-2">
            {c.status === "live"
              ? "You can issue, receive and report documents for this country today, in the sandbox or in production."
              : "Talk to us to join the early-access list and influence what we build first."}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <ButtonLink href={`/get-started`}>{c.status === "live" ? "Get started" : "Join early access"}</ButtonLink>
            <ButtonLink href="/coverage" variant="secondary">
              All countries
            </ButtonLink>
          </div>
        </Reveal>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Related countries" title="Often launched together." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/coverage/${r.slug}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-white p-5 text-xl font-medium text-ink transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Flag code={r.code} size={28} />
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}

/** Params are read inside Suspense so the static shell can prerender instantly (Cache Components). */
export default function CountryPagePage(props: Parameters<typeof CountryPage>[0]) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CountryPage {...props} />
    </Suspense>
  );
}
