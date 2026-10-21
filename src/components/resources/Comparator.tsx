"use client";

import { useMemo, useState } from "react";
import { buttonClass } from "@/components/ui";

type Change = { kind: "added" | "removed" | "changed"; path: string; before?: unknown; after?: unknown };

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/** Recursive diff; arrays are compared by index. */
export function diff(a: unknown, b: unknown, path = "$"): Change[] {
  if (Array.isArray(a) && Array.isArray(b)) {
    const out: Change[] = [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const p = `${path}[${i}]`;
      if (i >= a.length) out.push({ kind: "added", path: p, after: b[i] });
      else if (i >= b.length) out.push({ kind: "removed", path: p, before: a[i] });
      else out.push(...diff(a[i], b[i], p));
    }
    return out;
  }
  if (isObj(a) && isObj(b)) {
    const out: Change[] = [];
    const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));
    for (const k of keys) {
      const p = `${path}.${k}`;
      if (!(k in a)) out.push({ kind: "added", path: p, after: b[k] });
      else if (!(k in b)) out.push({ kind: "removed", path: p, before: a[k] });
      else out.push(...diff(a[k], b[k], p));
    }
    return out;
  }
  return Object.is(a, b) ? [] : [{ kind: "changed", path, before: a, after: b }];
}

const sampleA = {
  number: "INV-2026-0042",
  currency: "EUR",
  seller: { name: "Costa Azul Distribuciones SL", taxId: "ESB12345678" },
  buyer: { name: "Acme Trading Ltd", country: "GB" },
  lines: [
    { description: "Consulting", quantity: 10, unitPrice: 95, vatRate: 21 },
    { description: "Travel", quantity: 1, unitPrice: 120, vatRate: 21 },
  ],
  totals: { net: 1070, tax: 224.7, gross: 1294.7 },
};

const sampleB = {
  number: "INV-2026-0042",
  currency: "EUR",
  seller: { name: "Costa Azul Distribuciones SL", taxId: "ESB12345678" },
  buyer: { name: "Acme Trading Limited", country: "GB", email: "ap@acme.example" },
  lines: [{ description: "Consulting", quantity: 12, unitPrice: 95, vatRate: 21 }],
  totals: { net: 1140, tax: 239.4, gross: 1379.4 },
  notes: "Corrected quantity",
};

const style = {
  added: { row: "border-brand/30 bg-brand-tint", tag: "bg-brand text-white", sign: "+", label: "Added" },
  removed: { row: "border-critical/30 bg-critical/5", tag: "bg-critical text-white", sign: "−", label: "Removed" },
  changed: { row: "border-attention/40 bg-attention-soft", tag: "bg-attention text-white", sign: "~", label: "Changed" },
};

const show = (v: unknown) => JSON.stringify(v);

function parse(text: string): { ok: true; value: unknown } | { ok: false; error: string } | { ok: "empty" } {
  if (!text.trim()) return { ok: "empty" };
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

export function Comparator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const pa = useMemo(() => parse(a), [a]);
  const pb = useMemo(() => parse(b), [b]);

  const changes = useMemo(() => (pa.ok === true && pb.ok === true ? diff(pa.value, pb.value) : null), [pa, pb]);
  const counts = changes && {
    added: changes.filter((c) => c.kind === "added").length,
    removed: changes.filter((c) => c.kind === "removed").length,
    changed: changes.filter((c) => c.kind === "changed").length,
  };

  const box = (label: string, id: string, value: string, set: (v: string) => void, p: ReturnType<typeof parse>, sample: unknown) => {
    const bad = p.ok === false;
    return (
      <div>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={id} className="text-lg font-medium text-ink">
            {label}
          </label>
          <button type="button" onClick={() => set(JSON.stringify(sample, null, 2))} className="rounded-md px-2 py-1 text-base font-medium text-brand hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand">
            Load sample
          </button>
        </div>
        <textarea
          id={id}
          value={value}
          onChange={(e) => set(e.target.value)}
          rows={14}
          spellCheck={false}
          aria-invalid={bad}
          aria-describedby={`${id}-msg`}
          placeholder="Paste invoice JSON here"
          className={`mt-2 w-full rounded-lg border bg-white p-3.5 font-mono text-sm leading-relaxed text-ink placeholder:text-ink-3 focus:outline-2 ${bad ? "border-critical focus:outline-critical/30" : "border-line focus:border-brand focus:outline-brand/20"}`}
        />
        <p id={`${id}-msg`} role={bad ? "alert" : undefined} className={`mt-1 min-h-5 text-sm ${bad ? "text-critical" : "text-ink-3"}`}>
          {p.ok === false ? `Invalid JSON: ${p.error}` : p.ok === true ? "Valid JSON" : "Waiting for input"}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        {box("Document A (original)", "cmp-a", a, setA, pa, sampleA)}
        {box("Document B (revised)", "cmp-b", b, setB, pb, sampleB)}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setA(JSON.stringify(sampleA, null, 2));
            setB(JSON.stringify(sampleB, null, 2));
          }}
          className={buttonClass()}
        >
          Load both samples
        </button>
        <button
          type="button"
          onClick={() => {
            setA("");
            setB("");
          }}
          className={buttonClass("secondary")}
        >
          Clear
        </button>
      </div>

      <section aria-live="polite" className="mt-8">
        <h2 className="text-2xl font-medium">Differences</h2>
        {changes === null ? (
          <p className="mt-3 rounded-xl border border-line bg-white p-6 text-lg text-ink-2">
            {pa.ok === false || pb.ok === false
              ? "Fix the JSON errors above to compare the documents."
              : "Paste or load two JSON documents to see what changed."}
          </p>
        ) : changes.length === 0 ? (
          <p className="mt-3 rounded-xl border border-brand/30 bg-brand-tint p-6 text-lg text-navy">The documents are identical.</p>
        ) : (
          <>
            <p className="mt-3 text-lg text-ink-2">
              {changes.length} {changes.length === 1 ? "difference" : "differences"}: {counts?.added} added, {counts?.removed} removed, {counts?.changed} changed.
            </p>
            <ul className="mt-4 space-y-2">
              {changes.map((c) => {
                const s = style[c.kind];
                return (
                  <li key={`${c.kind}-${c.path}`} className={`rounded-lg border p-4 ${s.row}`}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded-md px-2 py-0.5 text-sm font-medium ${s.tag}`}>
                        {s.sign} {s.label}
                      </span>
                      <code className="font-mono text-base text-ink">{c.path}</code>
                    </div>
                    <div className="mt-2 grid gap-1 font-mono text-sm sm:grid-cols-2">
                      {c.kind !== "added" && <p className="break-all text-critical">A: {show(c.before)}</p>}
                      {c.kind !== "removed" && <p className="break-all text-navy">B: {show(c.after)}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
