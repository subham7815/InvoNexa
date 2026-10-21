/** SAMPLE CONTENT. All people, dates and roles are fictional. */
export const values = [
  { title: "Make the hard part boring", text: "Tax rules are complicated. Our job is to absorb that complexity so your team never has to think about it." },
  { title: "Be exact, then be fast", text: "An invoice that is almost right is wrong. We sweat the details, then ship small and often." },
  { title: "Say what is true", text: "We document limits, publish incidents and tell customers early when something is off." },
  { title: "Build for the long haul", text: "Invoices are records people rely on for years. We choose designs that still make sense in ten." },
];

export const timeline = [
  { year: "2021", title: "A spreadsheet and a problem", text: "Three engineers tired of rebuilding invoicing for every country start a shared library." },
  { year: "2022", title: "First live country", text: "The first customers send compliant invoices through a single endpoint." },
  { year: "2023", title: "Network access", text: "We connect to a cross-border delivery network and add inbound documents." },
  { year: "2024", title: "Tax reporting engine", text: "Reporting workflows become a first-class building block alongside exchange." },
  { year: "2025", title: "Partner program", text: "Software vendors embed InvoNexa and onboard their own customers." },
  { year: "2026", title: "30+ countries", text: "A growing team across three time zones, and a roadmap shaped by customers." },
];

export const team = [
  { name: "Maya Lindqvist", role: "Co-founder, CEO", bio: "Former finance systems lead. Fictional." },
  { name: "Tomas Reyes", role: "Co-founder, CTO", bio: "Spent a decade on payment infrastructure. Fictional." },
  { name: "Priya Anand", role: "Head of Compliance", bio: "Reads regulations so that nobody else has to. Fictional." },
  { name: "Jonas Weber", role: "Head of Partnerships", bio: "Connects vendors with the countries they need. Fictional." },
  { name: "Amara Okafor", role: "Lead Designer", bio: "Believes forms can be pleasant. Fictional." },
  { name: "Kenji Watanabe", role: "Staff Engineer", bio: "Owns the delivery pipeline. Fictional." },
];

export const roles = [
  {
    id: "senior-backend",
    title: "Senior Backend Engineer",
    team: "Engineering",
    location: "Remote (Europe)",
    summary: "Build the workflow engine that signs, reports and delivers invoices.",
    details: [
      "Design reliable, idempotent services in a queue-driven architecture.",
      "Integrate with tax authority and network endpoints, including their quirks.",
      "Own on-call for the systems you build, with good tooling and a healthy rotation.",
    ],
  },
  {
    id: "compliance-analyst",
    title: "Compliance Analyst",
    team: "Compliance",
    location: "Madrid or remote",
    summary: "Turn regulatory changes into clear product requirements.",
    details: [
      "Track upcoming e-invoicing mandates and summarise their impact.",
      "Work with engineers to specify validation rules and test cases.",
      "Write plain-language guides for customers.",
    ],
  },
  {
    id: "developer-advocate",
    title: "Developer Advocate",
    team: "Developer experience",
    location: "Remote (Americas)",
    summary: "Help developers succeed with our API through docs, samples and talks.",
    details: [
      "Write tutorials and maintain sample apps in popular languages.",
      "Collect feedback from the community and bring it to product.",
      "Represent the company at meetups and conferences.",
    ],
  },
  {
    id: "customer-success",
    title: "Customer Success Manager",
    team: "Customer success",
    location: "Lisbon or remote",
    summary: "Guide customers from first test invoice to full production rollout.",
    details: [
      "Run onboarding for new countries and entities.",
      "Spot problems early in delivery metrics and reach out proactively.",
      "Partner with support and engineering on escalations.",
    ],
  },
];

export const benefits = ["Remote-first with quarterly meetups", "Equity for every employee", "Learning budget and paid conference time", "Generous parental leave", "Home-office stipend", "Four-week annual leave plus public holidays"];

export type LegalDoc = { slug: string; title: string; summary: string; updated: string; sections: { h: string; p: string[] }[] };

const sampleNote = "This is sample legal text for demonstration purposes only. It is not a binding agreement and must be replaced by reviewed documents before production use.";

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    summary: "The sample agreement that would govern use of the platform.",
    updated: "2026-09-01",
    sections: [
      { h: "1. About these terms", p: [sampleNote, "These sample terms describe how a customer may use the InvoNexa services, including the API, dashboard and delivery network access."] },
      { h: "2. Accounts and access", p: ["You are responsible for activity under your account and for keeping credentials secure. Rotate API keys if you suspect they were exposed."] },
      { h: "3. Acceptable use", p: ["You agree not to send unlawful content, attempt to disrupt the service, or issue invoices on behalf of entities you are not authorised to represent."] },
      { h: "4. Fees", p: ["Fees are set out in your order form or plan. Taxes are added where applicable. Unpaid invoices may result in suspension after notice."] },
      { h: "5. Availability", p: ["We aim for the availability described on our status page, which is not a guarantee. Planned maintenance is announced in advance where practical."] },
      { h: "6. Liability", p: ["To the extent allowed by law, liability under this sample agreement is limited as stated in your order form. Nothing excludes liability that cannot be excluded by law."] },
      { h: "7. Changes", p: ["We may update these terms and will notify account owners of material changes before they take effect."] },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "A sample description of how personal data is handled.",
    updated: "2026-09-01",
    sections: [
      { h: "1. Overview", p: [sampleNote, "This sample policy explains what information a service like InvoNexa could collect and why."] },
      { h: "2. Data we process", p: ["Account details such as name and work email; invoice content you submit, which can include personal data of your customers; and technical logs such as IP address and request metadata."] },
      { h: "3. Why we process it", p: ["To provide the service, secure it, meet legal obligations such as record keeping, and communicate with you about your account."] },
      { h: "4. Retention", p: ["Invoice records are kept for the period required by the relevant tax rules and then deleted or anonymised. Logs are kept for a shorter, fixed period."] },
      { h: "5. Your rights", p: ["Depending on where you live, you may have rights to access, correct, delete or export your data. Contact us using the details on the contact page."] },
      { h: "6. Contact", p: ["Questions about this sample policy can be sent through the contact page."] },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    summary: "Sample information about cookies and similar technologies.",
    updated: "2026-09-01",
    sections: [
      { h: "1. What are cookies", p: [sampleNote, "Cookies are small files stored in your browser. Similar technologies include local storage."] },
      { h: "2. Essential storage", p: ["Used to remember your cookie choice and keep you signed in. These are required for the site to work."] },
      { h: "3. Optional analytics", p: ["If you accept, we may measure page views in aggregate to improve the site. You can change your choice at any time by clearing site data."] },
      { h: "4. Managing preferences", p: ["Most browsers let you block or delete cookies. Doing so may affect parts of the site."] },
    ],
  },
  {
    slug: "sub-processors",
    title: "Sub-processors",
    summary: "A sample list of third parties that could process customer data.",
    updated: "2026-09-01",
    sections: [
      { h: "1. About this list", p: [sampleNote, "The providers below are fictional examples of the categories a vendor would typically disclose."] },
      { h: "2. Hosting", p: ["Example Cloud Hosting Ltd: infrastructure and storage, EU regions."] },
      { h: "3. Email delivery", p: ["Example Mail Services Inc: transactional email for notifications and receipts."] },
      { h: "4. Monitoring", p: ["Example Observability GmbH: logs and performance metrics, with personal data minimised."] },
      { h: "5. Notifications of changes", p: ["Customers on paid plans would be notified before a new sub-processor is added and could object during the notice period."] },
    ],
  },
  {
    slug: "trust-center",
    title: "Trust Center",
    summary: "A sample overview of security and compliance practices.",
    updated: "2026-09-01",
    sections: [
      { h: "1. Overview", p: [sampleNote, "This page illustrates the sort of information a trust center presents. No certifications are claimed here."] },
      { h: "2. Data protection", p: ["Encryption in transit and at rest, scoped access to production data and audit logs of administrative actions."] },
      { h: "3. Application security", p: ["Code review for every change, automated dependency scanning and regular third-party penetration tests."] },
      { h: "4. Reliability", p: ["Redundant infrastructure, tested backups and a public incident history on the status page."] },
      { h: "5. Reporting a vulnerability", p: ["Send a description of the issue through the contact page. We acknowledge reports promptly and do not pursue researchers acting in good faith."] },
    ],
  },
];
