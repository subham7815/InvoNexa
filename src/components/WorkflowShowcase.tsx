"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { showcase, type IconName, type Step, type Workflow } from "@/data/workflows";
import { useInView, useLoop } from "@/hooks/useInView";
import { Flag } from "./ui";

const ICONS: Record<IconName, string> = {
  flag: "M5 21V4m0 0h11l-2 4 2 4H5",
  hash: "M5 9h14M5 15h14M10 4 8 20m8-16-2 16",
  sign: "M4 20h16M6 16c3-1 4-9 7-9 2 0 0 6 2 6 1 0 2-1 3-2",
  doc: "M7 3h7l4 4v14H7V3Zm7 0v4h4M10 12h5M10 16h5",
  send: "m21 3-9 18-2-8-8-2 19-8Z",
  check: "M5 12l4 4 10-10",
  plug: "M9 3v5m6-5v5M7 8h10v3a5 5 0 0 1-10 0V8Zm5 8v5",
  map: "M12 21s-6-5.5-6-11a6 6 0 1 1 12 0c0 5.5-6 11-6 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0",
  pdf: "M7 3h7l4 4v14H7V3Zm7 0v4h4M9 16h6",
  bolt: "M13 3 5 14h6l-1 7 8-11h-6l1-7Z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICONS[name]} />
    </svg>
  );
}

const sidebar: IconName[] = ["doc", "plug", "pdf", "send", "user", "map", "globe", "bolt", "flag", "check"];
const chipTone = {
  warn: "bg-attention-soft text-attention",
  ok: "bg-ok-soft text-ok",
  info: "bg-navy/10 text-navy",
} as const;

function StepRow({ step, index, state }: { step: Step; index: number; state: "idle" | "active" | "done" }) {
  return (
    <li className="flex items-center gap-4">
      <span className="w-5 text-right font-mono text-sm text-ink-3">{index + 1}</span>
      <div
        className={`flex min-w-0 flex-1 items-center gap-3 rounded-lg border bg-white px-3 py-2.5 transition-all duration-300 ${
          state === "active" ? "border-brand ring-4 ring-brand/15" : "border-line"
        } ${state === "idle" ? "opacity-60" : "opacity-100"}`}
      >
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line ${state === "done" ? "bg-ok-soft text-ok" : "bg-fill text-ink-2"}`}>
          <Icon name={state === "done" ? "check" : step.icon} />
        </span>
        <span className="truncate text-base font-medium text-ink">{step.name}</span>
        {step.detail && <span className="hidden truncate text-sm text-ink-3 2xl:inline">· {step.detail}</span>}
        {step.chip && (
          <span className={`ml-1 shrink-0 rounded-md px-2 py-0.5 text-sm font-medium ${chipTone[step.chip.tone]}`}>{step.chip.label}</span>
        )}
        {state === "active" && <i className="pulse-dot ml-auto h-2 w-2 shrink-0 rounded-full bg-brand" />}
      </div>
    </li>
  );
}

function Mock({ wf, running }: { wf: Workflow; running: boolean }) {
  const tick = useLoop(wf.steps.length + 2, 1000, running);
  return (
    <div className="flex min-h-[28rem] min-w-0 flex-1 bg-white">
      <div className="hidden w-14 shrink-0 flex-col items-center gap-3 bg-navy py-4 text-white/70 sm:flex" aria-hidden>
        <span className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white">
          <Icon name="bolt" />
        </span>
        {sidebar.map((n, i) => (
          <span key={n + i} className={`grid h-9 w-9 place-items-center rounded-lg ${i === 8 ? "bg-white/15 text-white" : ""}`}>
            <Icon name={n} size={17} />
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-4 border-b border-line px-5 py-4 text-lg">
          <span className="text-ink-3">Workflows</span>
          <span className="truncate font-medium text-ink">{wf.mockName}</span>
        </div>
        <div className="flex items-center gap-2 px-5 py-4 text-base text-ink-2">
          <i className={`h-2.5 w-2.5 rounded-full border-2 border-brand ${running ? "pulse-dot" : ""}`} />
          <b className="text-ink">{wf.version.split(" · ")[0]}</b>
          <span className="text-ink-3">· {wf.version.split(" · ")[1]}</span>
        </div>
        <ol className="space-y-2.5 px-5 pb-6">
          {wf.steps.map((s, i) => (
            <StepRow key={`${s.name}-${i}`} step={s} index={i} state={i < tick ? "done" : i === tick ? "active" : "idle"} />
          ))}
        </ol>
      </div>
    </div>
  );
}

function Rail({ wf }: { wf: Workflow }) {
  const items = [...wf.rail, ...wf.rail];
  return (
    <div className="hatch relative hidden w-60 shrink-0 border-l border-dashed border-line xl:block" aria-hidden>
      {/* Absolutely positioned so the (duplicated) scrolling list never stretches the panel height. */}
      <div className="mask-y absolute inset-0 overflow-hidden">
        <ul className="rail-track space-y-4 p-4">
          {items.map((r, i) => (
            <li key={`${r.label}-${i}`} className="flex items-center gap-3 rounded-lg border border-line bg-white px-3 py-3 text-base font-medium">
              {r.code ? (
                <Flag code={r.code} size={24} />
              ) : (
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-tint text-sm font-semibold text-navy">{r.label[0]}</span>
              )}
              <span className="truncate">{r.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const INTERVAL = 7000;

/** Tabbed workflow explorer: left selectable titles, right animated run mock + scrolling rail. */
export function WorkflowShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, margin: "0px" });
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const running = inView && !paused;
  const wf = showcase[active];

  const go = (i: number, focus = false) => {
    const n = (i + showcase.length) % showcase.length;
    setActive(n);
    if (focus) tabs.current[n]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1, true);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1, true);
    }
  };

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-line bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="flex flex-col border-b border-line lg:border-b-0 lg:border-r" role="tablist" aria-label="Workflows" onKeyDown={onKey}>
          {showcase.map((w, i) => {
            const on = i === active;
            return (
              <button
                key={w.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`wf-tab-${w.id}`}
                aria-selected={on}
                aria-controls="wf-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => go(i)}
                className="relative border-b border-dashed border-line px-6 py-6 text-left transition-colors last:border-b-0 hover:bg-fill/60 sm:px-10 sm:py-8 lg:px-8 lg:py-6 xl:px-10"
              >
                <span className={`block text-3xl font-medium tracking-tight transition-colors sm:text-4xl lg:text-3xl xl:text-4xl ${on ? "text-ink" : "text-ink/35"}`}>{w.title}</span>
                {on && <span className="reveal-rise-sm reveal is-visible mt-3 block max-w-md text-xl text-ink-2">{w.text}</span>}
                {on && (
                  <span className="absolute bottom-0 left-0 h-px w-full bg-transparent">
                    <span
                      key={`${w.id}-bar`}
                      className="wf-progress block h-px bg-ink"
                      style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: running ? "running" : "paused" }}
                      onAnimationEnd={() => go(active + 1)}
                    />
                  </span>
                )}
              </button>
            );
          })}
          <div className="hatch hidden min-h-12 flex-1 lg:block" aria-hidden />
        </div>

        <div id="wf-panel" role="tabpanel" aria-labelledby={`wf-tab-${wf.id}`} className="flex min-w-0">
          <Mock key={wf.id} wf={wf} running={running} />
          <Rail key={`rail-${wf.id}`} wf={wf} />
        </div>
      </div>
    </div>
  );
}
