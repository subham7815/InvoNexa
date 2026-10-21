import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { StatusDot, UptimeBars } from "@/components/resources/UptimeBars";
import { SubscribeForm } from "@/components/resources/SubscribeForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { components, incidents, levelLabel, type Level } from "@/data/status";

export const metadata: Metadata = {
  title: "Status — InvoNexa",
  description: "Sample platform status, 90-day uptime and incident history.",
};

export default function Status() {
  const worst: Level = components.some((c) => c.level === "outage") ? "outage" : components.some((c) => c.level === "degraded") ? "degraded" : "operational";
  const banner = {
    operational: "bg-ok-soft text-ok border-ok/30",
    degraded: "bg-attention-soft text-ink border-attention/40",
    outage: "bg-critical-soft text-ink border-critical/40",
  }[worst];

  return (
    <>
      <PageHero eyebrow="Status" title="Platform status." text="Current health, 90-day uptime and recent incidents. All figures on this page are generated sample data." sample />

      <PageSection className="pb-6 sm:pb-8">
        <div role="status" className={`flex items-center gap-3 rounded-xl border p-6 text-2xl font-medium ${banner}`}>
          <StatusDot level={worst} />
          {worst === "operational" ? "All systems operational" : "Some systems are experiencing issues"}
        </div>
      </PageSection>

      <PageSection className="pt-6 sm:pt-6">
        <SectionHeading eyebrow="Components" title="Uptime, last 90 days." />
        <div className="mt-8 space-y-4">
          {components.map((c, i) => (
            <Reveal key={c.name} delay={Math.min(i, 3) * 50}>
              <UptimeBars component={c} />
            </Reveal>
          ))}
        </div>
        <ul className="mt-5 flex flex-wrap gap-5 text-base text-ink-2" aria-label="Legend">
          {(["operational", "degraded", "outage"] as Level[]).map((l) => (
            <li key={l} className="flex items-center gap-2">
              <StatusDot level={l} />
              {levelLabel[l]}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="Incident history" title="Recent incidents (sample)." />
        <ol className="mt-8 space-y-4">
          {incidents.map((inc) => (
            <Reveal as="li" key={inc.title}>
              <article className="rounded-xl border border-line bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-medium">{inc.title}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${inc.status === "Resolved" ? "bg-ok-soft text-ok" : "bg-attention-soft text-attention"}`}
                  >
                    {inc.status}
                  </span>
                </div>
                <p className="mt-1 font-mono text-sm text-ink-3">{inc.date}</p>
                <ul className="mt-4 space-y-2">
                  {inc.updates.map((u) => (
                    <li key={u.time} className="text-lg text-ink-2">
                      <span className="font-mono text-sm text-ink-3">{u.time}</span> {u.text}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </PageSection>

      <PageSection>
        <div className="mx-auto max-w-xl">
          <Reveal>
            <SubscribeForm topic="status" title="Subscribe to updates" text="Get an email when an incident starts and when it is resolved." />
          </Reveal>
        </div>
      </PageSection>
    </>
  );
}
