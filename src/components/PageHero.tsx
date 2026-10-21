import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Container } from "./ui";

/** Standard page header used by every inner page. */
export function PageHero({
  eyebrow,
  title,
  text,
  children,
  sample = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  children?: ReactNode;
  /** Shows a "sample content" badge for pages with illustrative data. */
  sample?: boolean;
}) {
  return (
    <section className="border-b border-line">
      <Container className="py-16 sm:py-24">
        <Reveal variant="fade">
          <p className="flex items-center gap-3 font-mono text-sm uppercase tracking-wider text-brand">
            {eyebrow}
            {sample && <span className="rounded-full bg-attention-soft px-2.5 py-0.5 text-sm normal-case text-attention">Sample content</span>}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl">{title}</h1>
        </Reveal>
        {text && (
          <Reveal delay={160}>
            <p className="mt-5 max-w-2xl text-xl text-ink-2">{text}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={240}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

/** Vertical rhythm wrapper for page sections. */
export function PageSection({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Long-form text container (legal, blog posts). */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-ink-2 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_a]:text-brand [&_a]:underline">
      {children}
    </div>
  );
}
