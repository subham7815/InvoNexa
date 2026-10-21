"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

export type Stage = { title: string; text: string; detail: string[] };

/** Animated horizontal pipeline. Auto-advances while visible; stages are also clickable. */
export function Pipeline({ stages }: { stages: Stage[] }) {
  const [ref, visible] = useInView<HTMLDivElement>({ once: false });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!visible || paused) return;
    const t = setInterval(() => setActive((v) => (v + 1) % stages.length), 2400);
    return () => clearInterval(t);
  }, [visible, paused, stages.length]);

  const stage = stages[active];
  return (
    <div ref={ref}>
      <ol className="grid gap-3 md:grid-cols-5" aria-label="Invoice pipeline stages">
        {stages.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              aria-pressed={i === active}
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              className={`relative h-full w-full rounded-xl border p-4 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                i === active ? "border-brand bg-brand-tint" : i < active ? "border-brand/30 bg-white" : "border-line bg-white"
              }`}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full font-mono text-sm text-white transition-colors duration-300 ${
                  i <= active ? "bg-brand" : "bg-ink-3"
                }`}
              >
                {i < active ? "✓" : i + 1}
              </span>
              <span className="mt-3 block text-lg font-medium text-ink">{s.title}</span>
              <span className="mt-2 block h-1 overflow-hidden rounded-full bg-fill">
                <span
                  className="block h-full rounded-full bg-brand transition-all duration-500"
                  style={{ width: i < active ? "100%" : i === active ? "60%" : "0%" }}
                />
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div aria-live="polite" className="mt-4 rounded-xl border border-line bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-medium text-ink">
            {active + 1}. {stage.title}
          </h3>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="rounded-lg bg-fill px-3.5 py-1.5 text-sm font-medium text-ink hover:bg-fill-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {paused ? "Resume animation" : "Pause animation"}
          </button>
        </div>
        <p className="mt-2 text-lg text-ink-2">{stage.text}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {stage.detail.map((d) => (
            <li key={d} className="rounded-lg bg-fill px-4 py-3 text-base text-ink-2">
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
