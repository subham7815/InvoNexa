import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, PageSection, Prose } from "@/components/PageHero";
import { legalDocs } from "@/data/company";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocs.find((d) => d.slug === slug);
  return { title: `${doc?.title ?? "Legal"} — InvoNexa` };
}

async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = legalDocs.find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} text={doc.summary} sample />
      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_16rem]">
          <div>
            <p role="note" className="mb-8 max-w-3xl rounded-xl border border-attention/40 bg-attention-soft p-4 text-base text-ink">
              Sample legal text for demonstration only. Last updated {doc.updated}. Not a binding document.
            </p>
            <Prose>
              {doc.sections.map((s) => (
                <section key={s.h}>
                  <h2>{s.h}</h2>
                  {s.p.map((t) => (
                    <p key={t} className="mt-3">{t}</p>
                  ))}
                </section>
              ))}
            </Prose>
          </div>
          <nav aria-label="Legal documents" className="h-fit rounded-xl border border-line bg-white p-5 lg:sticky lg:top-24">
            <p className="font-mono text-sm uppercase tracking-wider text-brand">Documents</p>
            <ul className="mt-3 space-y-1">
              {legalDocs.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/legal/${d.slug}`}
                    aria-current={d.slug === slug ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-brand ${d.slug === slug ? "bg-brand-tint font-medium text-navy" : "text-ink-2 hover:bg-fill"}`}
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </PageSection>
    </>
  );
}

/** Params are read inside Suspense so the static shell can prerender instantly (Cache Components). */
export default function LegalPagePage(props: Parameters<typeof LegalPage>[0]) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <LegalPage {...props} />
    </Suspense>
  );
}
