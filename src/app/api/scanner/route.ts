import { NextResponse } from "next/server";
import { ID_FORMAT, lookup } from "@/lib/peppol-sample";

/** DEMO endpoint: GET /api/scanner?id=0192:123456789 against a fictional registry. */
export function GET(req: Request) {
  const id = (new URL(req.url).searchParams.get("id") ?? "").trim();
  if (!ID_FORMAT.test(id)) {
    return NextResponse.json(
      { ok: false, error: "invalid_format", message: "Use the format <scheme>:<value>, for example 0192:123456789." },
      { status: 422 },
    );
  }
  const found = lookup(id);
  if (!found) {
    return NextResponse.json(
      { ok: false, error: "not_found", message: `No participant registered for ${id} in the demo registry.` },
      { status: 404 },
    );
  }
  return NextResponse.json({ ok: true, demo: true, participant: found });
}
