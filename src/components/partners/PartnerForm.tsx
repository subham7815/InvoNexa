"use client";

import { Field, FormShell } from "@/components/forms";

export function PartnerForm({ defaultPath = "technology" }: { defaultPath?: string }) {
  return (
    <FormShell
      endpoint="/api/partners"
      submitLabel="Send inquiry"
      success={(id) => (
        <div>
          <p className="text-xl font-medium">Thanks, we have your inquiry.</p>
          <p className="mt-2 text-base">
            Our partnerships team will reply within two business days.
            {id && <> Reference: <span className="font-mono">{id}</span></>}
          </p>
        </div>
      )}
      fields={(errors) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Name" required error={errors.name} />
            <Field name="email" label="Work email" type="email" required error={errors.email} />
          </div>
          <Field name="company" label="Company" required error={errors.company} />
          <Field
            name="path"
            label="Partner path"
            required
            defaultValue={defaultPath}
            error={errors.path}
            options={[
              { value: "technology", label: "Technology partner" },
              { value: "reseller", label: "Reseller" },
              { value: "embedded", label: "Embedded partner" },
            ]}
          />
          <Field name="message" label="Tell us about your product or clients" rows={4} error={errors.message} />
        </>
      )}
    />
  );
}
