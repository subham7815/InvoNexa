export type Block = { t: "p"; text: string } | { t: "h2"; text: string } | { t: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  author: string;
  body: Block[];
};

/** SAMPLE CONTENT. Illustrative articles; not legal or tax advice. */
export const posts: Post[] = [
  {
    slug: "peppol-basics",
    title: "Peppol basics: how invoices find their way across borders",
    excerpt: "A plain-language tour of access points, participant identifiers and the four-corner model.",
    tags: ["Peppol", "Explainer"],
    date: "2026-09-18",
    author: "Maya Lindqvist (fictional)",
    body: [
      { t: "p", text: "Peppol is an open network for exchanging business documents. Instead of every company agreeing on a private format with every partner, each company connects to one provider and the network handles the rest." },
      { t: "h2", text: "The four-corner model" },
      { t: "p", text: "Corner one is the sender and corner four is the receiver. In between sit two access points: the sender's access point and the receiver's. Your software only ever talks to your own access point, which looks up where the receiver lives and forwards the document." },
      { t: "h2", text: "Participant identifiers" },
      { t: "p", text: "Every participant is registered under an identifier made of a scheme and a value, for example 0192:123456789. The scheme says what kind of number it is (a national business register, a tax number, a GLN) and the value is the number itself. Getting the scheme right is the most common reason first deliveries fail." },
      { t: "h2", text: "What travels on the wire" },
      { t: "ul", items: ["A standardised document, most often a UBL invoice", "A transport envelope with sender and receiver identifiers", "A signed message-level response confirming receipt"] },
      { t: "p", text: "Once you understand those three layers, debugging a failed delivery becomes a short checklist: is the receiver registered, did we use the right scheme, and does the document type match what they accept?" },
    ],
  },
  {
    slug: "e-reporting-vs-e-invoicing",
    title: "E-reporting vs e-invoicing: two ideas that often get mixed up",
    excerpt: "One moves documents between businesses. The other tells a tax authority what happened. Here is how they differ.",
    tags: ["Compliance", "Explainer"],
    date: "2026-08-30",
    author: "Tomas Reyes (fictional)",
    body: [
      { t: "p", text: "People use the two terms interchangeably, but they solve different problems. Knowing which one a country asks for decides what your integration must do." },
      { t: "h2", text: "E-invoicing" },
      { t: "p", text: "E-invoicing means the invoice itself is exchanged as structured data between supplier and customer, usually through a network or a platform. The receiving system can read it without anyone retyping a thing." },
      { t: "h2", text: "E-reporting" },
      { t: "p", text: "E-reporting means a copy or a summary of the transaction is sent to the tax authority, often in near real time. The customer may still receive a PDF by email. The authority simply gets the data." },
      { t: "h2", text: "Why it matters for your stack" },
      { t: "ul", items: ["Exchange regimes need delivery confirmation from the buyer side", "Reporting regimes need a receipt from the authority and often a unique code on the invoice", "Many countries combine both, with different deadlines for each"] },
      { t: "p", text: "A good invoicing layer models both as steps in a workflow, so adding a country means adding steps rather than rewriting your billing code." },
    ],
  },
  {
    slug: "veri-factu-overview",
    title: "An illustrative overview of Spain's Veri*Factu approach",
    excerpt: "A generic look at verifiable invoicing records, hashes and QR codes. Illustrative only; check official sources.",
    tags: ["Spain", "Compliance"],
    date: "2026-08-12",
    author: "Maya Lindqvist (fictional)",
    body: [
      { t: "p", text: "This article is a simplified, illustrative description and not legal advice. Rules, dates and technical details change, so always rely on official publications for your obligations." },
      { t: "h2", text: "The general idea" },
      { t: "p", text: "Verifiable invoicing schemes ask billing software to keep a tamper-evident record of each invoice. Every record includes a fingerprint of the previous one, so removing or editing an old invoice breaks the chain in a way that can be detected." },
      { t: "h2", text: "Typical building blocks" },
      { t: "ul", items: ["A hash chain linking each invoice record to the one before", "A QR code on the invoice that lets a customer check it", "Optional submission of records to the tax authority as they are issued", "Software that cannot silently delete or rewrite history"] },
      { t: "h2", text: "What teams usually do" },
      { t: "p", text: "Most companies do not want to build and certify this themselves. They send invoice data to a provider that creates the record, adds the QR code, submits where required and returns the status. The important design point is idempotency: retrying a request must never create a second record." },
    ],
  },
  {
    slug: "choosing-an-invoicing-api",
    title: "Seven questions to ask before choosing an invoicing API",
    excerpt: "A practical checklist for engineering and finance teams comparing providers.",
    tags: ["Developers", "Buying guide"],
    date: "2026-07-25",
    author: "Priya Anand (fictional)",
    body: [
      { t: "p", text: "Picking an invoicing API is a decision you will live with for years. These are the questions that separate a demo-friendly product from one that survives audit season." },
      { t: "h2", text: "The checklist" },
      { t: "ul", items: ["Which countries and formats are live today, and which are promised?", "What happens when a tax authority is down: queue, retry or fail?", "Are requests idempotent, and how are duplicates detected?", "Can you replay webhooks and fetch the full history of an invoice?", "Who is the legal sender, and can you onboard your own entities?", "How are certificates and keys stored and rotated?", "What does a sandbox cover compared with production?"] },
      { t: "h2", text: "Read the failure modes" },
      { t: "p", text: "Happy paths look identical across vendors. Ask to see what a rejected invoice looks like, how errors are coded, and how long a stuck document sits before anyone is alerted." },
      { t: "p", text: "Finally, test with your ugliest real data: credit notes, mixed VAT rates and customers with missing identifiers. The way a provider handles those tells you most of what you need to know." },
    ],
  },
  {
    slug: "credit-notes-explained",
    title: "Credit notes done right: corrections without chaos",
    excerpt: "Why corrections are the hardest part of e-invoicing, and how to model them cleanly.",
    tags: ["Explainer", "Developers"],
    date: "2026-07-03",
    author: "Tomas Reyes (fictional)",
    body: [
      { t: "p", text: "Issuing an invoice is easy. Fixing one after it has been delivered and reported is where systems show their cracks." },
      { t: "h2", text: "Never edit, always reference" },
      { t: "p", text: "A sent invoice is a fact. To correct it you issue a credit note that points at the original, then issue a new invoice if needed. This keeps the audit trail intact and is accepted nearly everywhere." },
      { t: "h2", text: "Model it explicitly" },
      { t: "ul", items: ["Store the reference to the original invoice number and date", "Use negative or positive amounts consistently, as the format requires", "Keep a reason code so finance can report on corrections", "Send the credit note through the same workflow as the invoice"] },
      { t: "p", text: "When corrections are first-class objects in your data model, month-end reconciliation stops being a spreadsheet exercise." },
    ],
  },
  {
    slug: "vat-rates-in-line-items",
    title: "Line-level VAT: why totals must be computed the same way everywhere",
    excerpt: "Rounding rules quietly cause rejected invoices. A short guide to computing totals you can trust.",
    tags: ["Developers", "Compliance"],
    date: "2026-06-14",
    author: "Priya Anand (fictional)",
    body: [
      { t: "p", text: "A one-cent mismatch between your invoice and a validator can be enough for a rejection. The cause is usually rounding applied at different moments." },
      { t: "h2", text: "Pick a rule and keep it" },
      { t: "p", text: "Compute each line net amount, group lines by VAT rate, calculate tax once per group, then sum the groups. Rounding per line and rounding per group can differ, so use whichever your target format expects and apply it consistently." },
      { t: "h2", text: "Tips" },
      { t: "ul", items: ["Work in integer minor units, such as cents, internally", "Round only when producing a document total", "Test with quantities like 3 and unit prices like 19.99", "Validate before sending, not after the rejection arrives"] },
      { t: "p", text: "Our free invoice generator computes totals this way, so you can experiment with line items and see the effect immediately." },
    ],
  },
];

export const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags))).sort()];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function readingTime(p: Post) {
  const words = p.body
    .map((b) => (b.t === "ul" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
