"use client";

import Link from "next/link";
import { useState } from "react";
import { Chips } from "@/components/blocks";
import { industries, stories } from "@/data/customers";

export function StoryGrid() {
  const [industry, setIndustry] = useState("All");
  const items = stories.filter((s) => industry === "All" || s.industry === industry);
  return (
    <div>
      <Chips label="Filter by industry" options={industries} value={industry} onChange={setIndustry} />
      {items.length === 0 ? (
        <p className="mt-6 rounded-xl border border-line bg-white p-6 text-lg text-ink-2">No stories in this industry yet.</p>
      ) : (
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/customers/${s.slug}`}
                className="flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="font-mono text-sm uppercase tracking-wider text-brand">{s.industry}</span>
                <span className="mt-3 text-2xl font-medium text-ink">{s.name}</span>
                <span className="mt-4 text-4xl font-medium tracking-tight text-navy">{s.metric}</span>
                <span className="text-base text-ink-3">{s.metricLabel}</span>
                <span className="mt-4 flex-1 text-lg text-ink-2">{s.short}</span>
                <span className="mt-5 flex items-center justify-between text-base">
                  <span className="font-mono text-ink-3">{s.countries}</span>
                  <span className="font-medium text-brand">Read story →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
