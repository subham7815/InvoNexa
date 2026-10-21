"use client";

import { useState } from "react";
import { buttonClass } from "@/components/ui";

const initial = JSON.stringify({ country: "ES", customer: "Acme S.L.", total: 1210, currency: "EUR" }, null, 2);

export function TryIt() {
  const [body, setBody] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ status: number; ms: number; text: string } | null>(null);

  async function send(method: "POST" | "GET") {
    setLoading(true);
    const t0 = performance.now();
    try {
      const init: RequestInit = method === "POST" ? { method, headers: { "Content-Type": "application/json" }, body } : { method };
      const res = await fetch("/api/demo/invoices", init);
      const raw = await res.text();
      let text = raw;
      try {
        text = JSON.stringify(JSON.parse(raw), null, 2);
      } catch {
        // keep raw text
      }
      setResult({ status: res.status, ms: Math.round(performance.now() - t0), text });
    } catch {
      setResult({ status: 0, ms: Math.round(performance.now() - t0), text: "Network error. Is the demo server reachable?" });
    } finally {
      setLoading(false);
    }
  }

  const ok = result !== null && result.status >= 200 && result.status < 300;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <label htmlFor="try-body" className="block text-base font-medium">
          Request body (JSON)
        </label>
        <textarea
          id="try-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          spellCheck={false}
          rows={9}
          className="mt-2 w-full rounded-xl border border-line bg-white p-4 font-mono text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-brand"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={() => send("POST")} disabled={loading} className={`${buttonClass("primary")} disabled:opacity-60`}>
            {loading ? "Sending…" : "POST /invoices"}
          </button>
          <button onClick={() => send("GET")} disabled={loading} className={`${buttonClass("secondary")} disabled:opacity-60`}>
            GET /invoices
          </button>
          <button onClick={() => setBody(initial)} className={buttonClass("secondary")}>
            Reset body
          </button>
        </div>
        <p className="mt-3 text-base text-ink-3">Try an invalid currency such as XXX to see a 422 error.</p>
      </div>
      <div aria-live="polite">
        <p className="text-base font-medium">Live response</p>
        <div className="mt-2 overflow-hidden rounded-xl bg-navy text-white/90">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-sm">
            {result ? (
              <>
                <span className={ok ? "text-ok-light" : "text-brand-light"}>{result.status === 0 ? "ERROR" : `HTTP ${result.status}`}</span>
                <span className="text-white/60">{result.ms} ms</span>
              </>
            ) : (
              <span className="text-white/60">Waiting for a request</span>
            )}
          </div>
          <pre className="min-h-56 overflow-x-auto p-4 font-mono text-sm leading-relaxed">{result ? result.text : "// The response appears here"}</pre>
        </div>
      </div>
    </div>
  );
}
