/** SAMPLE DATA. Nothing here reflects real platform health. */
export type Level = "operational" | "degraded" | "outage";

export type Component = { name: string; note: string; level: Level; seed: number; target: number };

export const components: Component[] = [
  { name: "API", note: "Invoice, party and workflow endpoints", level: "operational", seed: 11, target: 99.99 },
  { name: "Peppol delivery", note: "Outbound and inbound access point", level: "operational", seed: 23, target: 99.95 },
  { name: "Tax reporting: Europe", note: "Spain, Italy, France, Poland and others", level: "degraded", seed: 37, target: 99.9 },
  { name: "Tax reporting: Americas", note: "Mexico, Brazil, Chile and others", level: "operational", seed: 41, target: 99.9 },
  { name: "Tax reporting: Asia-Pacific", note: "Singapore, Malaysia, Australia and others", level: "operational", seed: 53, target: 99.9 },
  { name: "Dashboard", note: "Web application and invoice explorer", level: "operational", seed: 67, target: 99.9 },
  { name: "Webhooks", note: "Event delivery and retries", level: "operational", seed: 79, target: 99.95 },
];

export const levelLabel: Record<Level, string> = {
  operational: "Operational",
  degraded: "Degraded performance",
  outage: "Outage",
};

/** Deterministic pseudo-random generator so server and client always agree. */
function mulberry(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Day = { index: number; level: Level; uptime: number };

/** 90 days, index 0 is the oldest. */
export function uptimeDays(seed: number): Day[] {
  const rnd = mulberry(seed);
  return Array.from({ length: 90 }, (_, index) => {
    const r = rnd();
    if (r > 0.985) return { index, level: "outage", uptime: 96 + rnd() * 2 };
    if (r > 0.94) return { index, level: "degraded", uptime: 99 + rnd() * 0.8 };
    return { index, level: "operational", uptime: 99.9 + rnd() * 0.1 };
  });
}

export function averageUptime(days: Day[]) {
  return days.reduce((s, d) => s + d.uptime, 0) / days.length;
}

export type Incident = {
  title: string;
  date: string;
  status: "Resolved" | "Monitoring";
  impact: Level;
  updates: { time: string; text: string }[];
};

export const incidents: Incident[] = [
  {
    title: "Delayed acknowledgements from a regional tax authority",
    date: "2026-10-19",
    status: "Monitoring",
    impact: "degraded",
    updates: [
      { time: "09:40 UTC", text: "We are monitoring slower acknowledgement times. Invoices are accepted and queued; none are lost." },
      { time: "08:15 UTC", text: "We identified increased response times from an upstream authority endpoint." },
    ],
  },
  {
    title: "Elevated webhook retry latency",
    date: "2026-10-02",
    status: "Resolved",
    impact: "degraded",
    updates: [
      { time: "15:05 UTC", text: "Resolved. Queued events were delivered in order." },
      { time: "14:20 UTC", text: "A worker pool restart left a backlog of retries. We added capacity." },
    ],
  },
  {
    title: "Dashboard sign-in errors for some users",
    date: "2026-09-11",
    status: "Resolved",
    impact: "outage",
    updates: [
      { time: "11:32 UTC", text: "Resolved after rolling back a configuration change." },
      { time: "11:05 UTC", text: "Some users saw errors on sign-in. The API was not affected." },
    ],
  },
  {
    title: "Peppol directory lookups timing out",
    date: "2026-08-04",
    status: "Resolved",
    impact: "degraded",
    updates: [
      { time: "17:50 UTC", text: "Resolved. Lookups are cached for longer to reduce exposure to directory slowness." },
      { time: "17:10 UTC", text: "A subset of directory lookups were timing out; deliveries to cached recipients continued." },
    ],
  },
];
