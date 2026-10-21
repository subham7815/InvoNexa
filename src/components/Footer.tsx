import Link from "next/link";
import { footerColumns, legalLinks } from "@/data/nav";
import { CookiePreferences } from "./CookiePreferences";
import { Reveal } from "./Reveal";
import { Container, Logo } from "./ui";

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden className="ml-1.5 inline opacity-60">
    <path d="M3.5 8.5 8.5 3.5M4 3.5h4.5V8" />
  </svg>
);

// DexAI footer palette: soft red tint background, crimson accents, ink text.
const dashed = "border-dashed border-brand/25";
const linkClass = "whitespace-nowrap transition-colors hover:text-brand";

export function Footer() {
  return (
    <footer className="grid-bg border-t border-brand bg-brand-tint text-ink">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <h2 className="text-5xl font-bold tracking-[-0.03em] text-ink sm:text-7xl">
            Start invoicing <span className="text-brand">today.</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-xl text-ink-2 sm:text-2xl">
            Send and receive compliant e-invoices in{" "}
            <span className="border-b border-dashed border-brand/50">30+ countries</span>.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/get-started" className="rounded-lg bg-brand px-5 py-3 text-lg font-medium text-white transition-colors hover:bg-brand-hover">
              Get started
            </Link>
            <Link href="/developers/documentation" className="rounded-lg border border-brand/40 px-5 py-3 text-lg font-medium text-brand transition-colors hover:bg-brand hover:text-white">
              Read the docs
              <Arrow />
            </Link>
          </div>
        </Reveal>
      </Container>

      <div className={`border-t ${dashed}`}>
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[150px_repeat(5,1fr)]">
            <div className={`dot-grid col-span-2 border-b ${dashed} py-8 sm:col-span-3 lg:col-span-1 lg:border-b-0 lg:border-r lg:py-10 lg:pr-4`}>
              <Logo />
            </div>
            {footerColumns.map((c) => (
              <nav key={c.title} aria-label={c.title} className={`border-b ${dashed} py-8 pr-4 last:border-b-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-10 lg:last:border-r-0`}>
                <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-brand">{c.title}</h3>
                <ul className="mt-5 space-y-3 text-lg text-ink-2">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          {l.label}
                          <Arrow />
                        </a>
                      ) : (
                        <Link href={l.href} className={linkClass}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </Container>
      </div>

      <div className={`border-t ${dashed}`}>
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 text-base text-ink-3">
          <p>© 2026 InvoNexa Ltd</p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href} className="flex items-center gap-3">
                <Link href={l.href} className="transition-colors hover:text-brand">
                  {l.label}
                </Link>
                <span aria-hidden className="text-ink-3/50">
                  /
                </span>
              </li>
            ))}
            <li className="flex items-center gap-3">
              <CookiePreferences className="transition-colors hover:text-brand" />
              <span aria-hidden className="text-ink-3/50">
                /
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
              </svg>
              English
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
