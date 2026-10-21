"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Chips } from "@/components/blocks";
import { Flag } from "@/components/ui";
import { countryList, modeLabel } from "@/data/coverage";

const filters = ["All", "Live", "Upcoming"];

export function CountryGrid() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return countryList.filter((c) => {
      if (filter === "Live" && c.status !== "live") return false;
      if (filter === "Upcoming" && c.status !== "upcoming") return false;
      if (!q) return true;
      return [c.name, ...c.formats, ...c.networks].some((t) => t.toLowerCase().includes(q));
    });
  }, [filter, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Chips label="Filter by availability" options={filters} value={filter} onChange={setFilter} />
        <div className="w-full sm:max-w-xs">
          <label htmlFor="country-search" className="sr-only">
            Search countries, formats or networks
          </label>
          <input
            id="country-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country or format"
            className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-ink-3 focus:border-brand focus:outline-2 focus:outline-brand/20"
          />
        </div>
      </div>
      <p className="mt-4 text-base text-ink-3" role="status" aria-live="polite">
        {items.length} {items.length === 1 ? "country" : "countries"}
      </p>
      {items.length === 0 ? (
        <p className="mt-6 rounded-xl border border-line bg-white p-6 text-lg text-ink-2">
          No countries match your search. Try a different name or format.
        </p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/coverage/${c.slug}`}
                className="block h-full rounded-xl border border-line bg-white p-6 transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3 text-xl font-medium text-ink">
                    <Flag code={c.code} size={28} />
                    {c.name}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${c.status === "live" ? "bg-brand-tint text-brand" : "bg-fill text-ink-2"}`}
                  >
                    {c.availability}
                  </span>
                </div>
                <p className="mt-3 text-base text-ink-2">{c.summary}</p>
                <p className="mt-4 font-mono text-sm text-ink-3">{modeLabel[c.mode]}</p>
                <p className="mt-1 text-base text-ink">{c.formats.join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
