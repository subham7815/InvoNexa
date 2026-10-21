"use client";

import { useState, type ReactNode } from "react";
import { buttonClass } from "./ui";

export type FormStatus = "idle" | "sending" | "done" | "error";

/** POSTs JSON to a demo API route and tracks status, field errors and the returned reference id. */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [id, setId] = useState<string | null>(null);

  async function submit(values: Record<string, string>) {
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json()) as { ok: boolean; id?: string; errors?: Record<string, string> };
      if (json.ok) {
        setId(json.id ?? null);
        setStatus("done");
        return true;
      }
      setErrors(json.errors ?? { _form: "Something went wrong." });
    } catch {
      setErrors({ _form: "Network error. Please try again." });
    }
    setStatus("error");
    return false;
  }

  const reset = () => {
    setStatus("idle");
    setErrors({});
    setId(null);
  };

  return { status, errors, id, submit, reset };
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-base font-normal text-ink placeholder:text-ink-3 focus:border-brand focus:outline-2 focus:outline-brand/20";

type FieldProps = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: (v: string) => void;
};

export function Field({ name, label, error, hint, required, type = "text", rows, options, defaultValue, placeholder, value, onChange }: FieldProps) {
  const id = `f-${name}`;
  const common = {
    id,
    name,
    required,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-err` : hint ? `${id}-hint` : undefined,
    className: inputClass,
    placeholder,
    ...(value !== undefined ? { value, onChange: (e: { target: { value: string } }) => onChange?.(e.target.value) } : { defaultValue }),
  };
  return (
    <div>
      <label htmlFor={id} className="block text-base font-medium text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      {options ? (
        <select {...common}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : rows ? (
        <textarea {...common} rows={rows} />
      ) : (
        <input {...common} type={type} />
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-ink-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-critical">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden field that real users never see; bots fill it and the API silently drops the request. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export const formValues = (form: HTMLFormElement) =>
  Object.fromEntries(Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)]));

/**
 * Ready-made form shell: renders children fields, submit button, form-level error and a success panel.
 * `fields` receives per-field errors from the server.
 */
export function FormShell({
  endpoint,
  submitLabel,
  success,
  fields,
  extra,
}: {
  endpoint: string;
  submitLabel: string;
  success: (id: string | null) => ReactNode;
  fields: (errors: Record<string, string>) => ReactNode;
  extra?: Record<string, string>;
}) {
  const { status, errors, id, submit } = useFormSubmit(endpoint);
  if (status === "done") {
    return (
      <div role="status" className="rounded-xl border border-ok/30 bg-ok-soft p-6 text-ok">
        {success(id)}
      </div>
    );
  }
  return (
    <form
      noValidate
      className="relative space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        void submit({ ...formValues(e.currentTarget), ...extra });
      }}
    >
      <Honeypot />
      {fields(errors)}
      {errors._form && (
        <p role="alert" className="text-sm text-critical">
          {errors._form}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className={`${buttonClass()} w-full disabled:opacity-60`}>
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
