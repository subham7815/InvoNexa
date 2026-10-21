import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { getStory, stories } from "@/data/customers";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  return { title: s ? `${s.name} — InvoNexa customer story` : "Customers — InvoNexa", description: s?.short };
}

async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) notFound();
  const others = stories.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero eyebrow={`Customer story · ${s.industry}`} title={s.name} text={s.tagline} sample />

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <h2 className="font-mono text-sm uppercase tracking-wider text-brand">In short</h2>
            <p className="mt-3 text-xl text-ink">{s.short}</p>
            <dl className="mt-6 space-y-3 text-base">
              <div>
                <dt className="text-ink-3">Industry</dt>
                <dd className="text-lg text-ink">{s.industry}</dd>
              </div>
              <div>
                <dt className="text-ink-3">Markets</dt>
                <dd className="font-mono text-lg text-ink">{s.countries}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-mono text-sm uppercase tracking-wider text-brand">The case</h2>
            <div className="mt-3 space-y-4 text-lg text-ink-2">
              {s.caseText.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="Results" title="What changed." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {s.results.map((r, i) => (
            <Reveal key={r.label} delay={i * 80}>
              <div className="h-full rounded-xl border border-line bg-white p-6">
                <p className="text-4xl font-medium tracking-tight text-navy">{r.value}</p>
                <p className="mt-2 text-lg text-ink-2">{r.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <figure className="mt-10 rounded-xl border border-line bg-white p-8">
            <blockquote className="text-2xl text-ink">“{s.quote.text}”</blockquote>
            <figcaption className="mt-4 text-base text-ink-3">{s.quote.who}</figcaption>
          </figure>
        </Reveal>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="More stories" title="Keep reading." />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/customers/${o.slug}`}
                className="block h-full rounded-xl border border-line bg-white p-6 transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="text-2xl font-medium text-ink">{o.name}</span>
                <span className="mt-2 block text-lg text-ink-2">{o.short}</span>
                <span className="mt-4 block text-base font-medium text-brand">Read story →</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/customers" className="text-base font-medium text-brand underline-offset-4 hover:underline">
            ← All customers
          </Link>
        </p>
      </PageSection>
    </>
  );
}

/** Params are read inside Suspense so the static shell can prerender instantly (Cache Components). */
export default function StoryPagePage(props: Parameters<typeof StoryPage>[0]) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <StoryPage {...props} />
    </Suspense>
  );
}
