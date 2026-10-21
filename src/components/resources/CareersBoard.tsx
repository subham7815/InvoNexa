"use client";

import { useState } from "react";
import { Field, FormShell } from "@/components/forms";
import { buttonClass } from "@/components/ui";

type Role = { id: string; title: string; team: string; location: string; summary: string; details: string[] };

/** Expandable role list plus an inline application form posting to /api/contact. */
export function CareersBoard({ roles }: { roles: Role[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [role, setRole] = useState(roles[0].title);
  const [message, setMessage] = useState("");

  function apply(title: string) {
    setRole(title);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <ul className="space-y-3" aria-label="Open roles (sample)">
        {roles.map((r) => {
          const isOpen = open === r.id;
          return (
            <li key={r.id} className="rounded-xl border border-line bg-white">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`role-${r.id}`}
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  className="flex w-full items-center justify-between gap-4 rounded-xl p-6 text-left focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <span>
                    <span className="block text-xl font-medium text-ink">{r.title}</span>
                    <span className="mt-1 block text-base text-ink-2">
                      {r.team} · {r.location}
                    </span>
                  </span>
                  <span aria-hidden className={`text-2xl text-brand transition-transform ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
              </h3>
              {isOpen && (
                <div id={`role-${r.id}`} className="border-t border-line px-6 pb-6 pt-4">
                  <p className="text-lg text-ink-2">{r.summary}</p>
                  <ul className="mt-3 space-y-2 text-lg text-ink-2">
                    {r.details.map((d) => (
                      <li key={d} className="ml-5 list-disc">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => apply(r.title)} className={`${buttonClass()} mt-5`}>
                    Apply for this role
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div id="apply" className="h-fit scroll-mt-24 rounded-xl border border-line bg-white p-6 lg:sticky lg:top-24">
        <h3 className="text-2xl font-medium">Apply</h3>
        <p className="mb-5 mt-1 text-base text-ink-2">Sample form. Applications go to our demo inbox.</p>
        <label htmlFor="apply-role" className="mb-4 block text-[15px] font-medium text-ink">
          Role
          <select
            id="apply-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-base font-normal text-ink focus:border-brand focus:outline-2 focus:outline-brand/20"
          >
            {roles.map((r) => (
              <option key={r.id}>{r.title}</option>
            ))}
          </select>
        </label>
        <FormShell
          endpoint="/api/contact"
          submitLabel="Send application"
          extra={{ message: `[Application: ${role}] ${message}`.slice(0, 2000) }}
          success={(id) => (
            <>
              <p className="text-lg font-medium">Thanks for applying.</p>
              <p className="mt-1">We read every application. Reference: {id}</p>
            </>
          )}
          fields={(e) => (
            <>
              <Field name="name" label="Full name" required error={e.name} />
              <Field name="email" label="Email" type="email" required error={e.email} />
              <Field name="company" label="Current company or school" required error={e.company} />
              <Field name="note" label="Why this role? (links welcome)" rows={4} value={message} onChange={setMessage} error={e.message} />
            </>
          )}
        />
      </div>
    </div>
  );
}
