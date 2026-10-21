import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Scanner } from "@/components/resources/Scanner";
import { SectionHeading } from "@/components/ui";
import { documentTypeCatalog, participants, schemes } from "@/lib/peppol-sample";

export const metadata: Metadata = {
  title: "Network scanner — InvoNexa",
  description: "Look up whether a business can receive e-invoices on the network. Demo data.",
};

export default function NetworkScanner() {
  const countries = new Set(participants.map((p) => p.country)).size;
  const active = participants.filter((p) => p.status === "active").length;
  const stats = [
    { label: "Participants in demo registry", value: participants.length },
    { label: "Countries", value: countries },
    { label: "Active", value: active },
    { label: "Identifier schemes", value: schemes.length },
  ];
  const samples = participants.slice(0, 5).map((p) => p.id);

  return (
    <>
      <PageHero
        eyebrow="Network scanner"
        title="Can your customer receive e-invoices?"
        text="Enter a participant identifier to see where it is registered, which documents it accepts and when its certificate expires. Results come from a small fictional registry."
      >
        <span className="rounded-full bg-attention-soft px-3 py-1 text-sm font-medium text-attention">Demo data</span>
      </PageHero>

      <PageSection>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Scanner samples={samples} />
          </Reveal>
        </div>
      </PageSection>

      <PageSection className="bg-fill/50 py-12 sm:py-12">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div className="rounded-xl border border-line bg-white p-6">
                <dd className="text-4xl font-medium text-navy">{s.value}</dd>
                <dt className="mt-1 text-base text-ink-2">{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Identifier schemes" title="What the prefix means." text="Every identifier starts with a four-digit scheme code that says which register the number comes from." />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {schemes.map((s, i) => (
            <Reveal as="li" key={s.code} delay={Math.min(i, 5) * 40}>
              <div className="flex h-full items-center gap-4 rounded-xl border border-line bg-white p-5">
                <span className="rounded-lg bg-brand-tint px-3 py-1.5 font-mono text-lg text-navy">{s.code}</span>
                <span className="text-lg text-ink-2">{s.name}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="Document types" title="What a participant can receive." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documentTypeCatalog.map((d, i) => (
            <Reveal as="li" key={d.name} delay={i * 50}>
              <div className="h-full rounded-xl border border-line bg-white p-6">
                <h3 className="text-xl font-medium">{d.name}</h3>
                <p className="mt-2 text-lg text-ink-2">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </PageSection>

    </>
  );
}
