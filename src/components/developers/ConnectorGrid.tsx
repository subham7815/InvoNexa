"use client";

import { useMemo, useState } from "react";
import { Chips } from "@/components/blocks";
import { connectorCategories, connectors, type Status } from "@/data/developers";

const statusStyle: Record<Status, string> = {
  Available: "bg-ok-soft text-ok",
  Beta: "bg-attention-soft text-attention",
  Planned: "bg-fill-2 text-ink-2",
};

export function ConnectorGrid() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return connectors.filter((c) => (cat === "All" || c.category === cat) && (!t || `${c.name} ${c.how} ${c.category}`.toLowerCase().includes(t)));
  }, [cat, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <Chips label="Filter by category" options={connectorCategories} value={cat} onChange={setCat} />
        <div className="w-full lg:max-w-xs">
          <label htmlFor="conn-search" className="block text-sm font-medium text-ink-2">
            Search connectors
          </label>
          <input
            id="conn-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name or keyword"
            className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-brand"
          />
        </div>
      </div>
      <p className="mt-4 text-base text-ink-3" role="status">
        {list.length} connector{list.length === 1 ? "" : "s"}
      </p>
      {list.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-line p-8 text-center text-lg text-ink-2">No connectors match. Clear the search or choose another category.</p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <li key={c.name} className="flex flex-col rounded-xl border border-line bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <span aria-hidden className="grid h-11 w-11 place-items-center rounded-lg bg-brand-tint font-mono text-base font-semibold text-navy">
                  {c.name.slice(0, 2).toUpperCase()}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${statusStyle[c.status]}`}>{c.status}</span>
              </div>
              <h3 className="mt-4 text-xl font-medium">{c.name}</h3>
              <p className="font-mono text-sm uppercase tracking-wider text-ink-3">{c.category}</p>
              <p className="mt-3 text-base text-ink-2">
                <span className="font-medium text-ink">How it connects: </span>
                {c.how}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
