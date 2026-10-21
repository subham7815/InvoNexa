"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Field, useFormSubmit } from "@/components/forms";
import { buttonClass } from "@/components/ui";
import { ANNUAL_DISCOUNT, isBilling, isPlanId, planPrice, plans, type Billing, type PlanId } from "@/data/pricing";

const stepNames = ["Plan", "Company", "Confirm"];

const volumes = [
  { value: "", label: "Select volume" },
  { value: "<1k", label: "Under 1,000 / month" },
  { value: "1k-20k", label: "1,000 – 20,000 / month" },
  { value: "20k+", label: "Over 20,000 / month" },
];

export function GetStartedFlow() {
  const sp = useSearchParams();
  const qPlan = sp.get("plan");
  const qBilling = sp.get("billing");
  const [plan, setPlan] = useState<PlanId>(isPlanId(qPlan) ? qPlan : "growth");
  const [billing, setBilling] = useState<Billing>(isBilling(qBilling) ? qBilling : "monthly");
  const [step, setStep] = useState(isPlanId(qPlan) ? 2 : 1);
  const [form, setForm] = useState({ name: "", email: "", company: "", country: "", volume: "" });
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const { status, errors, id, submit } = useFormSubmit("/api/get-started");

  const selected = plans.find((p) => p.id === plan)!;
  const price = planPrice(selected, billing);
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const allErrors = { ...localErrors, ...errors };

  function next() {
    if (step === 2) {
      const e: Record<string, string> = {};
      if (!form.name.trim()) e.name = "Enter your name.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
      if (!form.company.trim()) e.company = "Enter your company.";
      if (!form.country.trim()) e.country = "Enter your country.";
      setLocalErrors(e);
      if (Object.keys(e).length) return;
    }
    setStep((s) => s + 1);
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-xl border border-ok/30 bg-ok-soft p-8 text-ok">
        <p className="text-3xl font-medium">You are all set.</p>
        <p className="mt-3 text-lg">
          We have registered your {selected.name} ({billing}) request. Check {form.email} for next steps.
        </p>
        {id && (
          <p className="mt-4 text-lg">
            Reference id: <span className="font-mono font-medium">{id}</span>
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/developers/getting-started" className={buttonClass()}>
            Read the quickstart
          </Link>
          <Link href="/" className={buttonClass("secondary")}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ol className="flex gap-2" aria-label="Progress">
        {stepNames.map((n, i) => (
          <li
            key={n}
            aria-current={step === i + 1 ? "step" : undefined}
            className={`flex-1 rounded-lg px-3 py-2 text-base font-medium ${step === i + 1 ? "bg-brand text-white" : step > i + 1 ? "bg-brand-tint text-brand" : "bg-fill text-ink-3"}`}
          >
            {i + 1}. {n}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl border border-line bg-white p-6">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium text-ink">Choose your plan</h2>
              <div role="group" aria-label="Billing period" className="mt-4 inline-flex rounded-lg bg-fill p-1">
                {(["monthly", "annual"] as const).map((b) => (
                  <button
                    key={b}
                    type="button"
                    aria-pressed={billing === b}
                    onClick={() => setBilling(b)}
                    className={`rounded-md px-4 py-2 text-base font-medium capitalize focus-visible:outline-2 focus-visible:outline-brand ${billing === b ? "bg-white text-ink shadow-sm" : "text-ink-2"}`}
                  >
                    {b}
                    {b === "annual" && <span className="ml-2 text-sm text-brand">Save {ANNUAL_DISCOUNT * 100}%</span>}
                  </button>
                ))}
              </div>
            </div>
            <div role="radiogroup" aria-label="Plan" className="grid gap-3">
              {plans.map((p) => {
                const pr = planPrice(p, billing);
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={plan === p.id}
                    onClick={() => setPlan(p.id)}
                    className={`flex items-center justify-between gap-4 rounded-xl border p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${plan === p.id ? "border-brand bg-brand-tint" : "border-line hover:border-ink-3"}`}
                  >
                    <span>
                      <span className="block text-xl font-medium text-ink">{p.name}</span>
                      <span className="block text-base text-ink-2">{p.tagline}</span>
                    </span>
                    <span className="shrink-0 text-xl font-medium text-ink">{pr === null ? "Custom" : `€${pr}/mo`}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-ink">Your company</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Name" required value={form.name} onChange={set("name")} error={allErrors.name} />
              <Field name="email" label="Work email" type="email" required value={form.email} onChange={set("email")} error={allErrors.email} />
            </div>
            <Field name="company" label="Company" required value={form.company} onChange={set("company")} error={allErrors.company} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="country" label="Country" required value={form.country} onChange={set("country")} error={allErrors.country} />
              <Field name="volume" label="Expected invoice volume" options={volumes} value={form.volume} onChange={set("volume")} error={allErrors.volume} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-medium text-ink">Confirm your request</h2>
            <dl className="mt-5 grid gap-x-8 gap-y-3 text-lg sm:grid-cols-2">
              <Row k="Plan" v={selected.name} />
              <Row k="Billing" v={billing === "annual" ? "Annual" : "Monthly"} />
              <Row k="Price" v={price === null ? "Custom quote" : `€${price}/mo${billing === "annual" ? `, billed €${price * 12} yearly` : ""}`} />
              <Row k="Name" v={form.name} />
              <Row k="Email" v={form.email} />
              <Row k="Company" v={form.company} />
              <Row k="Country" v={form.country} />
              <Row k="Volume" v={volumes.find((v) => v.value === form.volume)?.label ?? "Not specified"} />
            </dl>
            {allErrors._form && (
              <p role="alert" className="mt-4 text-sm text-critical">
                {allErrors._form}
              </p>
            )}
            {Object.keys(errors).some((k) => k !== "_form") && (
              <p role="alert" className="mt-4 text-sm text-critical">
                Some details need fixing. Go back and review: {Object.values(errors).join(" ")}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between gap-3">
        {step > 1 ? (
          <button type="button" onClick={() => setStep(step - 1)} className={buttonClass("secondary")}>
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button type="button" onClick={next} className={buttonClass()}>
            Continue
          </button>
        ) : (
          <button
            type="button"
            disabled={status === "sending"}
            onClick={() => void submit({ plan, billing, ...form })}
            className={`${buttonClass()} disabled:opacity-60`}
          >
            {status === "sending" ? "Submitting…" : "Confirm and get started"}
          </button>
        )}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-base text-ink-3">{k}</dt>
      <dd className="text-ink">{v}</dd>
    </div>
  );
}
