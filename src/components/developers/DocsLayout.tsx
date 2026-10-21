"use client";

import { useMemo, useState } from "react";
import { CodeBlock } from "@/components/blocks";
import { docSections } from "@/data/developers";

export function DocsLayout() {
  const [q, setQ] = useState("");
  const matches = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return docSections;
    return docSections.filter((s) => `${s.title} ${s.summary} ${s.keywords}`.toLowerCase().includes(t));
  }, [q]);

  const nav = (idSuffix: string) => (
    <>
      <label htmlFor={`doc-search-${idSuffix}`} className="block text-sm font-medium text-ink-2">
        Filter topics
      </label>
      <input
        id={`doc-search-${idSuffix}`}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="e.g. webhook, 429"
        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-brand"
      />
      <nav aria-label="Documentation topics" className="mt-4">
        {matches.length === 0 ? (
          <p className="text-base text-ink-3" role="status">
            No topics match this search.
          </p>
        ) : (
          <ul className="space-y-1">
            {matches.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="block rounded-lg px-3 py-2 text-base text-ink-2 hover:bg-fill hover:text-ink focus-visible:outline-2 focus-visible:outline-brand">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)_14rem]">
      <details className="rounded-xl border border-line bg-white p-4 lg:hidden">
        <summary className="cursor-pointer text-base font-medium focus-visible:outline-2 focus-visible:outline-brand">Browse topics</summary>
        <div className="mt-4">{nav("m")}</div>
      </details>
      <aside className="hidden lg:block">
        <div className="sticky top-24">{nav("d")}</div>
      </aside>

      <article className="min-w-0 space-y-14">
        {docSections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-3xl font-medium tracking-tight">{s.title}</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-2">
              {s.blocks.map((b, i) => (
                <div key={i}>
                  {b.p && <p>{b.p}</p>}
                  {b.list && (
                    <ul className="ml-5 list-disc space-y-1.5">
                      {b.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                  {b.code && <CodeBlock code={b.code.body} label={b.code.label} />}
                </div>
              ))}
            </div>
          </section>
        ))}
      </article>

      <aside className="hidden lg:block" aria-label="On this page">
        <div className="sticky top-24">
          <p className="font-mono text-sm uppercase tracking-wider text-brand">On this page</p>
          <ul className="mt-3 space-y-2 border-l border-line">
            {docSections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-base text-ink-2 hover:border-brand hover:text-ink focus-visible:outline-2 focus-visible:outline-brand">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
