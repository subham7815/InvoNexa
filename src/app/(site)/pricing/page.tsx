import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { PlanCards } from "@/components/pricing/PlanCards";
import { comparison, creditCosts, pricingFaqs } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing — InvoNexa",
  description: "Simple plans priced in document credits. Start small, scale to every market.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing that scales with you."
        text="Every plan includes the API, sandbox and delivery to tax authorities. You pay in document credits, so cost follows usage."
        sample
      />

      <PageSection>
        <Reveal>
          <PlanCards />
        </Reveal>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="Document credits" title="What a credit buys." text="Most actions cost one credit. Status checks and webhooks are always free." />
        <Reveal>
          <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-white">
            <table className="w-full min-w-xl text-left text-base">
              <caption className="sr-only">Credit cost per action</caption>
              <thead className="border-b border-line text-ink-3">
                <tr>
                  <th scope="col" className="p-4 font-medium">Action</th>
                  <th scope="col" className="p-4 font-medium">Cost</th>
                  <th scope="col" className="p-4 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {creditCosts.map((c) => (
                  <tr key={c.action} className="border-b border-line last:border-0">
                    <th scope="row" className="p-4 font-medium text-ink">{c.action}</th>
                    <td className="p-4 font-mono text-brand">{c.credits}</td>
                    <td className="p-4 text-ink-2">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Compare plans" title="Everything side by side." />
        <Reveal>
          <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-white">
            <table className="w-full min-w-2xl text-left text-base">
              <caption className="sr-only">Feature comparison across plans</caption>
              <thead className="border-b border-line text-ink">
                <tr>
                  <th scope="col" className="p-4 font-medium text-ink-3">Feature</th>
                  <th scope="col" className="p-4 font-medium">Starter</th>
                  <th scope="col" className="p-4 font-medium">Growth</th>
                  <th scope="col" className="p-4 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((r) => (
                  <tr key={r.feature} className="border-b border-line last:border-0">
                    <th scope="row" className="p-4 font-medium text-ink">{r.feature}</th>
                    <td className="p-4 text-ink-2">{r.starter}</td>
                    <td className="p-4 text-ink-2">{r.growth}</td>
                    <td className="p-4 text-ink-2">{r.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="FAQ" title="Pricing questions." />
        <div className="mt-10 max-w-3xl space-y-3">
          {pricingFaqs.map((f) => (
            <Reveal key={f.q}>
              <details className="group rounded-xl border border-line bg-white p-5 open:border-brand">
                <summary className="cursor-pointer list-none text-xl font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                  {f.q}
                </summary>
                <p className="mt-3 text-lg text-ink-2">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </PageSection>
    </>
  );
}
