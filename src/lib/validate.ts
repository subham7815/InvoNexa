export type Rule = { required?: boolean; email?: boolean; max?: number; oneOf?: readonly string[] };
export type Schema = Record<string, Rule>;
export type ValidationResult =
  | { ok: true; data: Record<string, string> }
  | { ok: false; errors: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Small dependency-free validator shared by every form endpoint. */
export function validate(body: unknown, schema: Schema): ValidationResult {
  const src = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const data: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const [key, rule] of Object.entries(schema)) {
    const raw = src[key];
    const value = typeof raw === "string" ? raw.trim() : "";
    data[key] = value;
    if (!value) {
      if (rule.required) errors[key] = "This field is required.";
      continue;
    }
    if (rule.email && !EMAIL.test(value)) errors[key] = "Enter a valid email address.";
    else if (rule.max && value.length > rule.max) errors[key] = `Keep this under ${rule.max} characters.`;
    else if (rule.oneOf && !rule.oneOf.includes(value)) errors[key] = "Choose one of the available options.";
  }
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
