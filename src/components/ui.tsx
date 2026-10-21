import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-300 px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** DexAI-style section heading: red rule + mono eyebrow, bold tightly-tracked title. */
export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <Reveal variant="fade">
        <p className="rule-brand inline-flex items-center font-mono text-sm font-medium uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl">{title}</h2>
      </Reveal>
      {text && (
        <Reveal delay={160}>
          <p className="mt-4 text-balance text-xl text-ink-2">{text}</p>
        </Reveal>
      )}
    </div>
  );
}

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-base font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const variants = {
  primary: "bg-brand text-white hover:bg-brand-hover active:bg-brand-press",
  secondary: "bg-fill text-ink hover:bg-fill-2",
  inverse: "bg-white text-navy hover:bg-white/90",
  ghostInverse: "bg-white/10 text-white hover:bg-white/20",
};
export type Variant = keyof typeof variants;

export const buttonClass = (variant: Variant = "primary") => `${base} ${variants[variant]}`;

export function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant)}>
      {children}
    </Link>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-xl font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <rect width="24" height="24" rx="6" className={light ? "fill-white" : "fill-brand"} />
        <path d="M7 17V7l10 10V7" className={light ? "stroke-navy" : "stroke-white"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      InvoNexa
    </Link>
  );
}

export function Flag({ code, size = 20 }: { code: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.jsdelivr.net/gh/HatScripts/circle-flags/flags/${code}.svg`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className="shrink-0 rounded-full"
    />
  );
}
