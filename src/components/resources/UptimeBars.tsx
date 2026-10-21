import { averageUptime, levelLabel, uptimeDays, type Component, type Level } from "@/data/status";

const bar: Record<Level, string> = {
  operational: "bg-ok",
  degraded: "bg-attention",
  outage: "bg-critical",
};

export function StatusDot({ level }: { level: Level }) {
  return <span aria-hidden className={`inline-block h-3 w-3 rounded-full ${bar[level]}`} />;
}

/** Deterministic 90-day uptime strip for one component. Server-rendered. */
export function UptimeBars({ component }: { component: Component }) {
  const days = uptimeDays(component.seed);
  const avg = averageUptime(days);
  return (
    <article className="rounded-xl border border-line bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-xl font-medium text-ink">{component.name}</h3>
          <p className="text-base text-ink-2">{component.note}</p>
        </div>
        <p className="flex items-center gap-2 text-base font-medium text-ink">
          <StatusDot level={component.level} />
          {levelLabel[component.level]}
        </p>
      </div>
      <div
        role="img"
        aria-label={`${component.name}: ${avg.toFixed(2)} percent uptime over the last 90 days (sample data)`}
        className="mt-4 flex h-10 items-stretch gap-px"
      >
        {days.map((d) => (
          <span
            key={d.index}
            title={`${90 - d.index} days ago: ${levelLabel[d.level]} (${d.uptime.toFixed(2)}%)`}
            className={`min-w-0 flex-1 rounded-xs ${bar[d.level]}`}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-sm text-ink-3">
        <span>90 days ago</span>
        <span className="font-medium text-ink-2">{avg.toFixed(2)}% uptime</span>
        <span>Today</span>
      </div>
    </article>
  );
}
