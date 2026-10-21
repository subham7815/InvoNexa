import type { Metadata } from "next";
import { CodeBlock } from "@/components/blocks";
import { DemoBanner, MethodBadge } from "@/components/developers/shared";
import { TryIt } from "@/components/developers/TryIt";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { BASE_URL, resources } from "@/data/developers";

export const metadata: Metadata = { title: "API reference — InvoNexa" };

export default function ApiReferencePage() {
  return (
    <>
      <PageHero eyebrow="API reference" title="Every endpoint, with a live sandbox." text={`Base URL: ${BASE_URL}. All requests use JSON and a bearer key.`}>
        <div className="flex flex-wrap gap-2">
          <DemoBanner />
          {resources.map((r) => (
            <a key={r.name} href={`#${r.name.toLowerCase()}`} className="rounded-full bg-fill px-4 py-1.5 text-sm font-medium text-ink-2 hover:bg-fill-2 focus-visible:outline-2 focus-visible:outline-brand">
              {r.name}
            </a>
          ))}
          <a href="#try-it" className="rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            Try it
          </a>
        </div>
      </PageHero>

      <PageSection id="try-it" className="scroll-mt-16 bg-fill">
        <SectionHeading eyebrow="Try it" title="Send a real request to the demo endpoint." text="This panel calls a mock route on this site, /api/demo/invoices, and shows the raw response." />
        <div className="mt-8">
          <TryIt />
        </div>
      </PageSection>

      {resources.map((r) => (
        <PageSection key={r.name} id={r.name.toLowerCase()} className="scroll-mt-16">
          <SectionHeading eyebrow="Resource" title={r.name} text={r.blurb} />
          <ul className="mt-10 space-y-6">
            {r.endpoints.map((e) => (
              <li key={e.id} id={e.id} className="scroll-mt-24">
                <Reveal>
                  <div className="rounded-xl border border-line bg-white p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <MethodBadge method={e.method} />
                      <code className="font-mono text-lg">{e.path}</code>
                    </div>
                    <p className="mt-3 text-lg text-ink-2">{e.summary}</p>
                    <div className={`mt-5 grid gap-4 ${e.request ? "lg:grid-cols-2" : ""}`}>
                      {e.request && <CodeBlock code={e.request} label="Request body" />}
                      <CodeBlock code={e.response} label="Response" />
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </PageSection>
      ))}

    </>
  );
}
