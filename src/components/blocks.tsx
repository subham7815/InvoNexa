"use client";

import { useState, type ReactNode } from "react";

/** Copyable code block. */
export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl bg-navy text-white/90">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-sm text-white/60">
        <span>{label ?? "code"}</span>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              // clipboard unavailable
            }
          }}
          className="rounded-md px-2 py-0.5 hover:bg-white/10"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">{code}</pre>
    </div>
  );
}

/** Accessible tab list. `tabs[i].content` renders only for the active tab. */
export function Tabs({ tabs, label }: { tabs: { id: string; label: string; content: ReactNode }[]; label: string }) {
  const [active, setActive] = useState(tabs[0].id);
  return (
    <div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-1 rounded-lg bg-fill p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`rounded-md px-3.5 py-1.5 text-base font-medium transition-colors ${active === t.id ? "bg-white text-ink shadow-sm" : "text-ink-2 hover:text-ink"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) =>
        t.id === active ? (
          <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} className="mt-4">
            {t.content}
          </div>
        ) : null,
      )}
    </div>
  );
}

/** Filter chips; controlled. */
export function Chips({ options, value, onChange, label }: { options: string[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={`rounded-full px-4 py-1.5 text-base font-medium transition-colors ${value === o ? "bg-brand text-white" : "bg-fill text-ink-2 hover:bg-fill-2"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
