"use client";

import { useEffect, useState } from "react";
import { useInView, useLoop } from "@/hooks/useInView";

/* ---------- Logo marquee ---------- */

export function LogoMarquee({ logos }: { logos: string[] }) {
  const row = [...logos, ...logos];
  return (
    <div className="marquee mask-x overflow-hidden" aria-label="Customers">
      <ul className="marquee-track flex w-max gap-14 pr-14 text-2xl font-semibold tracking-tight text-ink-3">
        {row.map((l, i) => (
          <li key={`${l}-${i}`} aria-hidden={i >= logos.length}>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Integrate: run mock ---------- */

const requestLines = [
  'POST /v1/invoices',
  '{ "country": "ES",',
  '  "customer": "Acme S.L.",',
  '  "total": 1210.00 }',
];
const pipeline = ["Validated", "Signed", "Reported to AEAT", "Delivered"];

export function RunMock() {
  const [ref, visible] = useInView<HTMLDivElement>({ once: false });
  const [tick, setTick] = useState(0);
  const total = requestLines.length + pipeline.length + 3;

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setTick((v) => (v + 1) % total), 700);
    return () => clearInterval(t);
  }, [visible, total]);

  const lines = Math.min(tick, requestLines.length);
  const done = Math.max(0, Math.min(tick - requestLines.length, pipeline.length));
  const receipt = tick >= requestLines.length + pipeline.length;

  return (
    <div ref={ref} className="grid gap-3 sm:grid-cols-2">
      <pre className="min-h-36 overflow-hidden rounded-lg bg-navy p-4 font-mono text-sm leading-relaxed text-white/90">
        {requestLines.slice(0, lines).join("\n")}
        <span className="caret">▍</span>
      </pre>
      <div className="rounded-lg border border-line bg-white p-4">
        <ul className="space-y-1.5 text-sm">
          {pipeline.map((p, i) => (
            <li key={p} className={`flex items-center gap-2 transition-opacity duration-300 ${i < done ? "opacity-100" : "opacity-30"}`}>
              <span className={`grid h-5 w-5 place-items-center rounded-full text-sm text-white ${i < done ? "bg-ok" : "bg-ink-3"}`}>✓</span>
              {p}
            </li>
          ))}
        </ul>
        <div className={`mt-3 rounded-md border border-dashed border-brand/40 bg-brand-tint p-2 text-sm text-navy transition-all duration-300 ${receipt ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
          Receipt #0042 · €1,210.00 · <b>Reported</b>
        </div>
      </div>
    </div>
  );
}

/* ---------- Integrate: embed mock ---------- */

const items = [
  ["3 nights · Deluxe room", "€540.00"],
  ["Breakfast", "€45.00"],
  ["City tax", "€12.00"],
];

export function EmbedMock() {
  const [ref, visible] = useInView<HTMLDivElement>({ once: false });
  const n = useLoop(items.length + 2, 1100, visible);
  return (
    <div ref={ref} className="rounded-lg border border-line bg-white p-4 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Harbor Hotel</span>
        <span className="rounded-md bg-brand-tint px-2 py-0.5 font-mono text-sm text-navy">Invoice #0042</span>
      </div>
      <div className="mt-3 space-y-1.5">
        {items.map(([a, b], i) => (
          <div key={a} className={`flex justify-between text-ink-2 transition-all duration-300 ${i < n ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
            <span>{a}</span>
            <span>{b}</span>
          </div>
        ))}
        <div className={`flex justify-between border-t border-line pt-2 font-semibold text-ink transition-opacity duration-300 ${n > items.length ? "opacity-100" : "opacity-0"}`}>
          <span>Total</span>
          <span>€597.00</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-3">Powered by InvoNexa · white-labeled</p>
    </div>
  );
}

/* ---------- Coverage: roadmap toggle ---------- */

export function RoadmapList({ roadmap }: { roadmap: { when: string; places: { name: string; code: string }[] }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {roadmap.map((r, i) => (
        <button
          key={r.when}
          onClick={() => setOpen(i)}
          aria-expanded={open === i}
          className={`rounded-xl border p-4 text-left transition-colors ${open === i ? "border-brand/40 bg-brand-tint" : "border-line bg-white hover:bg-fill"}`}
        >
          <span className="font-mono text-sm text-navy">{r.when}</span>
          {open === i && (
            <ul className="roadmap-in mt-3 space-y-2">
              {r.places.map((p) => (
                <li key={p.code} className="flex items-center gap-2 text-base">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://cdn.jsdelivr.net/gh/HatScripts/circle-flags/flags/${p.code}.svg`} alt="" width={18} height={18} className="rounded-full" />
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </button>
      ))}
    </div>
  );
}
