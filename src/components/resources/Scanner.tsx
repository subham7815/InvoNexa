"use client";

import { useState } from "react";
import { buttonClass } from "@/components/ui";
import type { Participant } from "@/lib/peppol-sample";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "found"; p: Participant }
  | { kind: "error"; status: number; message: string };

const statusStyle: Record<Participant["status"], string> = {
  active: "bg-ok-soft text-ok",
  expiring: "bg-attention-soft text-attention",
  inactive: "bg-critical-soft text-critical",
};

export function Scanner({ samples }: { samples: string[] }) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function scan(id: string) {
    const trimmed = id.trim();
    if (!trimmed) {
      setState({ kind: "error", status: 0, message: "Enter a participant identifier first." });
      return;
    }
    setState({ kind: "loading" });
    try {
      const res = await fetch(`/api/scanner?id=${encodeURIComponent(trimmed)}`);
      const json = (await res.json()) as { ok: boolean; participant?: Participant; message?: string };
      if (res.ok && json.participant) setState({ kind: "found", p: json.participant });
      else setState({ kind: "error", status: res.status, message: json.message ?? "Lookup failed." });
    } catch {
      setState({ kind: "error", status: 0, message: "Network error. Please try again." });
    }
  }

  return (
    <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void scan(value);
        }}
      >
        <label htmlFor="scan-id" className="block text-[15px] font-medium text-ink">
          Participant identifier
        </label>
        <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
          <input
            id="scan-id"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0192:123456789"
            autoComplete="off"
            spellCheck={false}
            aria-describedby="scan-hint"
            aria-invalid={state.kind === "error"}
            className="w-full rounded-lg border border-line bg-white px-3.5 py-3 font-mono text-lg text-ink placeholder:text-ink-3 focus:border-brand focus:outline-2 focus:outline-brand/20"
          />
          <button type="submit" disabled={state.kind === "loading"} className={`${buttonClass()} shrink-0 disabled:opacity-60`}>
            {state.kind === "loading" ? "Scanning…" : "Scan network"}
          </button>
        </div>
        <p id="scan-hint" className="mt-2 text-sm text-ink-3">
          Format: four-digit scheme, a colon, then the identifier value.
        </p>
      </form>

      <div className="mt-5">
        <p className="text-base text-ink-2">Try a sample:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {samples.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setValue(s);
                void scan(s);
              }}
              className="rounded-full bg-fill px-3.5 py-1.5 font-mono text-sm text-ink hover:bg-fill-2 focus-visible:outline-2 focus-visible:outline-brand"
            >
              {s}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setValue("0192:000000000");
              void scan("0192:000000000");
            }}
            className="rounded-full bg-fill px-3.5 py-1.5 font-mono text-sm text-ink-2 hover:bg-fill-2 focus-visible:outline-2 focus-visible:outline-brand"
          >
            unknown id
          </button>
        </div>
      </div>

      <div aria-live="polite" className="mt-6">
        {state.kind === "error" && (
          <div role="alert" className="rounded-xl border border-critical/30 bg-critical/5 p-5">
            <p className="text-lg font-medium text-critical">
              {state.status === 404 ? "Not found" : state.status === 422 ? "Invalid identifier" : "Lookup problem"}
            </p>
            <p className="mt-1 text-base text-ink-2">{state.message}</p>
          </div>
        )}
        {state.kind === "found" && <Result p={state.p} />}
      </div>
    </div>
  );
}

function Result({ p }: { p: Participant }) {
  return (
    <div className="rounded-xl border border-brand/30 bg-brand-tint/40 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-white font-mono text-sm uppercase text-navy">{p.countryCode}</span>
          <div>
            <h3 className="text-2xl font-medium text-ink">{p.name}</h3>
            <p className="font-mono text-sm text-ink-2">{p.id}</p>
          </div>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${statusStyle[p.status]}`}>{p.status}</span>
      </div>
      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-ink-3">Country</dt>
          <dd className="text-lg text-ink">{p.country}</dd>
        </div>
        <div>
          <dt className="text-sm text-ink-3">Scheme</dt>
          <dd className="font-mono text-lg text-ink">{p.scheme}</dd>
        </div>
        <div>
          <dt className="text-sm text-ink-3">Certificate expires</dt>
          <dd className="text-lg text-ink">{p.certificateExpiry}</dd>
        </div>
      </dl>
      <div className="mt-5">
        <p className="text-sm text-ink-3">Accepted document types</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {p.documentTypes.map((d) => (
            <li key={d} className="rounded-full bg-white px-3 py-1 text-base text-ink">
              {d}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-sm text-ink-3">Demo data from a fictional registry.</p>
    </div>
  );
}
