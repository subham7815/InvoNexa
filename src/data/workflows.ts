export type IconName = "flag" | "hash" | "sign" | "doc" | "send" | "check" | "plug" | "map" | "user" | "pdf" | "bolt" | "globe";

export type Step = {
  icon: IconName;
  name: string;
  detail?: string;
  chip?: { label: string; tone: "warn" | "ok" | "info" };
};

export type RailItem = { label: string; code?: string };

export type Workflow = {
  id: string;
  title: string;
  text: string;
  mockName: string;
  version: string;
  steps: Step[];
  rail: RailItem[];
};

const countries: RailItem[] = [
  { label: "Argentina", code: "ar" },
  { label: "Belgium", code: "be" },
  { label: "Brazil (NFS-e)", code: "br" },
  { label: "Croatia", code: "hr" },
  { label: "Colombia (DIAN)", code: "co" },
  { label: "France", code: "fr" },
  { label: "Germany", code: "de" },
  { label: "Greece (myDATA)", code: "gr" },
  { label: "Italy (SDI)", code: "it" },
  { label: "Spain", code: "es" },
];

export const showcase: Workflow[] = [
  {
    id: "exchange",
    title: "Exchange documents",
    text: "Send and receive invoices over Peppol and national networks, with every delivery tracked.",
    mockName: "Peppol send invoice",
    version: "V2 · Jul 9, 2026, 09:12",
    steps: [
      { icon: "flag", name: "Set State", detail: "Set state to", chip: { label: "Processing", tone: "warn" } },
      { icon: "check", name: "Validate Document", detail: "EN 16931" },
      { icon: "map", name: "Resolve Participant", detail: "Network lookup" },
      { icon: "sign", name: "Sign Envelope" },
      { icon: "send", name: "Deliver via Peppol", detail: "AS4" },
      { icon: "pdf", name: "Generate PDF", detail: "English · A4" },
      { icon: "flag", name: "Set State", detail: "Set state to", chip: { label: "Delivered", tone: "info" } },
    ],
    rail: [
      { label: "Peppol network" },
      { label: "Belgium", code: "be" },
      { label: "Germany", code: "de" },
      { label: "France (PDP)", code: "fr" },
      { label: "Ireland", code: "ie" },
      { label: "Netherlands", code: "nl" },
      { label: "Norway", code: "no" },
      { label: "Sweden", code: "se" },
    ],
  },
  {
    id: "report",
    title: "Report to tax authorities",
    text: "Send to each tax authority in the format and timing they require.",
    mockName: "Veri*Factu issue invoice",
    version: "V3 · Jul 2, 2026, 15:41",
    steps: [
      { icon: "flag", name: "Set State", detail: "Set state to", chip: { label: "Processing", tone: "warn" } },
      { icon: "hash", name: "Add Sequential Code", detail: "Dynamic" },
      { icon: "sign", name: "Sign Envelope" },
      { icon: "doc", name: "Generate Veri*Factu", detail: "Spain" },
      { icon: "send", name: "Send Veri*Factu", detail: "Spain" },
      { icon: "pdf", name: "Generate PDF", detail: "Spanish · A4" },
      { icon: "flag", name: "Set State", detail: "Set state to", chip: { label: "Sent", tone: "info" } },
    ],
    rail: countries,
  },
  {
    id: "connect",
    title: "Connect your ERP and billing",
    text: "Plug into the systems you already use — no custom glue code to maintain.",
    mockName: "Sync billing to ERP",
    version: "V5 · Jun 24, 2026, 11:03",
    steps: [
      { icon: "bolt", name: "Receive Webhook", detail: "invoice.created", chip: { label: "Listening", tone: "warn" } },
      { icon: "plug", name: "Map Fields", detail: "Billing → Document" },
      { icon: "check", name: "Validate Document" },
      { icon: "doc", name: "Create Invoice", detail: "Draft" },
      { icon: "sign", name: "Sign Envelope" },
      { icon: "send", name: "Push to ERP", detail: "Ledger entry" },
      { icon: "flag", name: "Set State", detail: "Set state to", chip: { label: "Synced", tone: "ok" } },
    ],
    rail: [
      { label: "Ledgerline ERP" },
      { label: "BillFlow" },
      { label: "Paystream" },
      { label: "Northbook" },
      { label: "Cartwheel Shop" },
      { label: "Quanta Books" },
      { label: "Custom webhook" },
      { label: "CSV import" },
    ],
  },
  {
    id: "onboard",
    title: "Onboard entities at scale",
    text: "Register thousands of customer entities with tax authorities, programmatically.",
    mockName: "Register entity",
    version: "V1 · Jun 12, 2026, 17:25",
    steps: [
      { icon: "user", name: "Collect Details", detail: "Company & tax ID", chip: { label: "Pending", tone: "warn" } },
      { icon: "check", name: "Verify Tax ID", detail: "Registry lookup" },
      { icon: "globe", name: "Select Markets", detail: "Per entity" },
      { icon: "sign", name: "Collect Certificate" },
      { icon: "send", name: "Register with Authority" },
      { icon: "bolt", name: "Notify Webhook", detail: "entity.active" },
      { icon: "flag", name: "Set State", detail: "Set state to", chip: { label: "Active", tone: "ok" } },
    ],
    rail: countries.slice(2).concat(countries.slice(0, 2)),
  },
];
