"use client";

import { Field, FormShell } from "@/components/forms";

/** Newsletter / status subscription posting to /api/subscribe. */
export function SubscribeForm({ topic, title, text }: { topic: "blog" | "status"; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-medium text-ink">{title}</h2>
      <p className="mb-5 mt-2 text-lg text-ink-2">{text}</p>
      <FormShell
        endpoint="/api/subscribe"
        submitLabel="Subscribe"
        extra={{ topic }}
        success={() => (
          <>
            <p className="text-lg font-medium">You are subscribed.</p>
            <p className="mt-1">We will email you when there is something worth reading.</p>
          </>
        )}
        fields={(e) => <Field name="email" label="Email address" type="email" required error={e.email} placeholder="you@company.com" />}
      />
    </div>
  );
}
