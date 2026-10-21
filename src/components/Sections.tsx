import { countries, customers, faqs, logos, roadmap } from "@/data/content";
import { EmbedMock, LogoMarquee, RoadmapList, RunMock } from "./Mocks";
import { HeroGlobe } from "./HeroGlobe";
import { Reveal } from "./Reveal";
import { WorkflowShowcase } from "./WorkflowShowcase";
import { WorldMap } from "./WorldMap";
import { ButtonLink, Container, Flag, SectionHeading } from "./ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="grid items-center gap-10 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
        <div>
          <Reveal variant="fade">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-3 py-1 font-mono text-sm text-navy">
              <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand" />
              Live in 30+ countries
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-7xl">
              The invoicing infrastructure for global businesses
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-5 max-w-lg text-xl text-ink-2">
              Send and receive compliant invoices, report to tax authorities and connect your systems through one API.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap gap-2">
              <ButtonLink href="/get-started">Get started</ButtonLink>
              <ButtonLink href="/developers/documentation" variant="secondary">
                Read the docs
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <Reveal variant="pop" delay={200}>
          <HeroGlobe />
        </Reveal>
      </Container>
      <Container className="pb-16">
        <Reveal variant="fade">
          <p className="mb-5 font-mono text-sm uppercase tracking-wider text-ink-3">Trusted by finance teams worldwide</p>
          <LogoMarquee logos={logos} />
        </Reveal>
      </Container>
    </section>
  );
}

export function Workflows() {
  return (
    <section id="workflows" className="py-20">
      <Container>
        <SectionHeading eyebrow="Workflows" title="Run the finance processes you want, with compliance built in." />
        <Reveal className="mt-12">
          <WorkflowShowcase />
        </Reveal>
      </Container>
    </section>
  );
}

export function Integrate() {
  return (
    <section id="integrate" className="border-y border-line bg-fill/50 py-20">
      <Container>
        <SectionHeading eyebrow="Integrate" title="One engine, for you or your customers." />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-xl border border-line bg-white p-6">
              <h3 className="text-xl font-medium">Run your invoicing</h3>
              <p className="mb-5 mt-1.5 text-ink-2">Issue, receive and archive compliant invoices from your own systems.</p>
              <RunMock />
            </article>
          </Reveal>
          <Reveal delay={100}>
            <article className="h-full rounded-xl border border-line bg-white p-6">
              <h3 className="text-xl font-medium">Embed invoicing in your product</h3>
              <p className="mb-5 mt-1.5 text-ink-2">White-label invoicing so your customers never leave your app.</p>
              <EmbedMock />
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function Coverage() {
  return (
    <section id="coverage" className="py-20">
      <Container>
        <SectionHeading eyebrow="Coverage" title="One integration, ready to go in every market." />
        <Reveal variant="fade" className="mt-10">
          <WorldMap />
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {countries.map((c, i) => (
            <Reveal key={c.name} variant="rise-sm" delay={i * 50}>
              <div className="h-full rounded-xl border border-line bg-white p-4 transition-colors hover:border-brand/40">
                <div className="flex items-center gap-2.5">
                  <Flag code={c.code} size={22} />
                  <h3 className="font-medium">{c.name}</h3>
                </div>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {c.standards.map((s) => (
                    <li key={s} className="rounded-md bg-fill px-2 py-0.5 font-mono text-sm text-ink-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <h3 className="mb-3 mt-14 font-mono text-sm uppercase tracking-wider text-ink-3">Coming soon</h3>
        <RoadmapList roadmap={roadmap} />
      </Container>
    </section>
  );
}

export function Customers() {
  return (
    <section id="customers" className="border-y border-line bg-surface py-20">
      <Container>
        <SectionHeading eyebrow="Customers" title="What our clients are achieving." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {customers.map((c, i) => (
            <Reveal key={c.name} delay={i * 100}>
              <article className="group h-full rounded-xl border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_24px_48px_-24px_rgb(17_18_24/0.25)]">
                <p className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-brand">{c.name}</p>
                <p className="mt-4 text-5xl font-bold tracking-[-0.03em] text-ink">{c.metric}</p>
                <p className="mt-3 text-ink-2">{c.text}</p>
                <p className="mt-5 border-t border-line pt-4 font-mono text-sm text-ink-3">{c.countries}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Security() {
  return (
    <section id="security" className="py-20">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <SectionHeading
          eyebrow="Security"
          title="Security and compliance your team can sign off on."
          text="Independently audited controls, encryption in transit and at rest, and full audit trails."
        />
        <div className="flex flex-wrap gap-3 md:justify-end">
          {["GDPR", "ISO 27001", "SOC 2"].map((b, i) => (
            <Reveal key={b} variant="pop" delay={i * 100}>
              <div className="grid h-24 w-32 place-items-center rounded-xl border border-line bg-white font-medium">
                <span className="flex flex-col items-center gap-1.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-brand" strokeWidth="2" aria-hidden>
                    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {b}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-line py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <Reveal>
          <div className="divide-y divide-line rounded-xl border border-line bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium">
                  {f.q}
                  <span aria-hidden className="text-xl leading-none text-brand transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="faq-body mt-2.5 text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
