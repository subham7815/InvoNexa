import { NextResponse, type NextRequest } from "next/server";

const COUNTRIES = ["ES", "IT", "FR", "DE", "PT", "PL", "MX", "BR", "IN", "SG", "BE", "GR"];
const CURRENCIES = ["EUR", "USD", "GBP", "MXN", "BRL", "INR", "SGD", "PLN"];

type Field = "country" | "customer" | "total" | "currency";

function invoice(input: { country: string; customer: string; total: number; currency: string }, offsetMin = 0) {
  const now = Date.now() - offsetMin * 60_000;
  const rand = Math.random().toString(36).slice(2, 10);
  return {
    id: `inv_${rand}`,
    object: "invoice",
    status: "reported",
    sandbox: true,
    country: input.country,
    customer: input.customer,
    total: input.total,
    currency: input.currency,
    created_at: new Date(now).toISOString(),
    reported_at: new Date(now + 1800).toISOString(),
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_json", message: "Request body must be valid JSON." } },
      { status: 422 },
    );
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json(
      { error: { code: "invalid_body", message: "Request body must be a JSON object." } },
      { status: 422 },
    );
  }
  const b = body as Record<string, unknown>;
  const fields: Partial<Record<Field, string>> = {};

  const country = typeof b.country === "string" ? b.country.trim().toUpperCase() : "";
  if (!/^[A-Z]{2}$/.test(country)) fields.country = "Use a two-letter ISO country code, e.g. ES.";
  else if (!COUNTRIES.includes(country)) fields.country = `Unsupported in sandbox. Try one of: ${COUNTRIES.join(", ")}.`;

  const customer = typeof b.customer === "string" ? b.customer.trim() : "";
  if (customer.length < 2 || customer.length > 120) fields.customer = "Customer name must be 2 to 120 characters.";

  if (typeof b.total !== "number" || !Number.isFinite(b.total) || b.total <= 0 || b.total > 10_000_000)
    fields.total = "Total must be a positive number up to 10,000,000.";

  const currency = typeof b.currency === "string" ? b.currency.trim().toUpperCase() : "";
  if (!CURRENCIES.includes(currency)) fields.currency = `Use one of: ${CURRENCIES.join(", ")}.`;

  if (Object.keys(fields).length > 0) {
    return NextResponse.json(
      { error: { code: "validation_failed", message: "The request body failed validation.", fields } },
      { status: 422 },
    );
  }
  return NextResponse.json(
    invoice({ country, customer, total: Math.round((b.total as number) * 100) / 100, currency }),
    { status: 201 },
  );
}

export async function GET(request: NextRequest) {
  const limit = Math.min(10, Math.max(1, Number(request.nextUrl.searchParams.get("limit")) || 3));
  const samples = [
    { country: "ES", customer: "Acme S.L.", total: 1210, currency: "EUR" },
    { country: "IT", customer: "Rossi Forniture S.r.l.", total: 845.5, currency: "EUR" },
    { country: "MX", customer: "Casa Verde S.A. de C.V.", total: 15200, currency: "MXN" },
    { country: "DE", customer: "Nordlicht GmbH", total: 399, currency: "EUR" },
    { country: "FR", customer: "Atelier Lumière SAS", total: 2750, currency: "EUR" },
    { country: "BR", customer: "Cafeteria Sol Ltda", total: 980, currency: "BRL" },
    { country: "PL", customer: "Wisła Logistics sp. z o.o.", total: 6400, currency: "PLN" },
    { country: "SG", customer: "Harbour Tech Pte Ltd", total: 3120, currency: "SGD" },
    { country: "PT", customer: "Lusa Têxteis Lda", total: 512.75, currency: "EUR" },
    { country: "BE", customer: "Brasserie Delvaux BV", total: 1875, currency: "EUR" },
  ];
  const data = samples.slice(0, limit).map((s, i) => invoice(s, i * 17 + 3));
  return NextResponse.json({ object: "list", sandbox: true, has_more: limit < samples.length, data });
}
