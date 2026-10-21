import type { Method } from "@/data/developers";

export function DemoBanner() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-4 py-1.5 text-sm font-medium text-navy">
      <span aria-hidden className="h-2 w-2 rounded-full bg-brand" />
      Sandbox only — demo API
    </p>
  );
}

const colors: Record<Method, string> = {
  GET: "bg-brand-tint text-navy",
  POST: "bg-navy text-white",
  PUT: "bg-fill-2 text-ink",
  DELETE: "bg-critical-soft text-critical",
};

export function MethodBadge({ method }: { method: Method }) {
  return <span className={`inline-block min-w-16 rounded-md px-2 py-0.5 text-center font-mono text-sm font-semibold ${colors[method]}`}>{method}</span>;
}
