import { appendFile, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { NextResponse } from "next/server";
import { validate, type Schema } from "./validate";

/**
 * DEMO BACKEND. Submissions are appended to `.data/submissions.jsonl` (gitignored).
 * On read-only/serverless hosts the write is skipped and only logged.
 * If RESEND_API_KEY and NOTIFY_EMAIL are set, a notification email is also sent.
 * Replace `persist()` with a database or CRM call for production.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_HITS = 8;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

async function persist(kind: string, id: string, data: Record<string, string>) {
  const record = { id, kind, at: new Date().toISOString(), ...data };
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "submissions.jsonl"), JSON.stringify(record) + "\n");
  } catch {
    console.log("[submission:not-persisted]", record);
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (key && to) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM ?? "InvoNexa <onboarding@resend.dev>",
        to,
        subject: `New ${kind} submission (${id})`,
        text: Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n"),
      }),
    }).catch(() => {});
  }
}

export async function handleForm(req: Request, kind: string, schema: Schema) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, errors: { _form: "Too many requests. Try again in a minute." } }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { _form: "Invalid request." } }, { status: 400 });
  }

  // Honeypot: bots fill the hidden `website` field. Pretend success.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true, id: "ok" });
  }

  const result = validate(body, schema);
  if (!result.ok) return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });

  const id = `${kind.slice(0, 3).toUpperCase()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  await persist(kind, id, result.data);
  return NextResponse.json({ ok: true, id });
}
