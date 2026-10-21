"use client";

import { useState } from "react";
import { buttonClass } from "@/components/ui";
import Link from "next/link";
import { ANNUAL_DISCOUNT, planPrice, plans, type Billing } from "@/data/pricing";

export function PlanCards() {
  const [billing, setBilling] = useState<Billing>("monthly");
  return (
    <div>
      <div role="group" aria-label="Billing period" className="inline-flex rounded-lg bg-fill p-1">
        {(["monthly", "annual"] as const).map((b) => (
          <button
            key={b}
            type="button"
            aria-pressed={billing === b}
            onClick={() => setBilling(b)}
            className={`rounded-md px-4 py-2 text-base font-medium capitalize transition-colors focus-visible:outline-2 focus-visible:outline-brand ${billing === b ? "bg-white text-ink shadow-sm" : "text-ink-2 hover:text-ink"}`}
          >
            {b}
            {b === "annual" && <span className="ml-2 text-sm text-brand">Save {ANNUAL_DISCOUNT * 100}%</span>}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const price = planPrice(p, billing);
          return (
            <article
              key={p.id}
              className={`flex flex-col rounded-xl border bg-white p-6 ${p.featured ? "border-brand ring-1 ring-brand" : "border-line"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium text-ink">{p.name}</h3>
                {p.featured && <span className="rounded-full bg-brand-tint px-2.5 py-0.5 text-sm font-medium text-brand">Most popular</span>}
              </div>
              <p className="mt-2 text-base text-ink-2">{p.tagline}</p>
              <p className="mt-5 text-5xl font-medium tracking-tight text-ink">
                {price === null ? "Custom" : `€${price}`}
                {price !== null && <span className="text-lg font-normal text-ink-3"> /mo</span>}
              </p>
              <p className="mt-1 text-base text-ink-3">
                {price !== null && billing === "annual" ? `Billed €${price * 12} yearly` : price !== null ? "Billed monthly" : "Tailored to your volume"}
              </p>
              <p className="mt-4 font-mono text-sm text-brand">{p.credits}</p>
              <ul className="mt-4 flex-1 space-y-2 text-lg text-ink-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden className="text-ok">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                href={`/get-started?plan=${p.id}&billing=${billing}`}
                className={`${buttonClass(p.featured ? "primary" : "secondary")} mt-6`}
                aria-label={`Choose ${p.name} plan, billed ${billing}`}
              >
                Choose plan
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
