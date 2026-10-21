export type Story = {
  slug: string;
  name: string;
  industry: "Fintech" | "SaaS" | "Marketplaces";
  tagline: string;
  metric: string;
  metricLabel: string;
  countries: string;
  short: string;
  caseText: string[];
  results: { value: string; label: string }[];
  quote: { text: string; who: string };
};

export const industries = ["All", "Fintech", "SaaS", "Marketplaces"];

export const stories: Story[] = [
  {
    slug: "paylio", name: "Paylio", industry: "Fintech", tagline: "A payments platform that stopped building country plumbing.",
    metric: "6 → 2 weeks", metricLabel: "Integration time", countries: "ES · DE · FR",
    short: "Paylio launched compliant invoicing in four markets by replacing separate local builds with a single integration.",
    caseText: [
      "Paylio issues thousands of invoices a day on behalf of merchants. Each new market meant another local integration, another format and another tax authority to learn.",
      "The team connected their billing events to InvoNexa once, then switched on Spain, Germany and France by configuration. Validation, signing and delivery moved out of their codebase.",
      "Engineers who had been maintaining country adapters returned to product work, and finance gained a single place to follow every document's status.",
    ],
    results: [{ value: "6 → 2 weeks", label: "To launch in a new market" }, { value: "-70%", label: "Compliance-related support tickets" }, { value: "4", label: "Markets live on one integration" }],
    quote: { text: "We expected to maintain a compliance team. We maintain one webhook instead.", who: "Head of Platform, Paylio (fictional)" },
  },
  {
    slug: "stackry", name: "Stackry", industry: "SaaS", tagline: "Reliable invoice delivery for a B2B software suite.",
    metric: "99.98%", metricLabel: "Delivery success", countries: "DE · IE · GR",
    short: "Stackry reached near-perfect Peppol delivery in its first quarter, with clear retry and status tracking.",
    caseText: [
      "Stackry sells subscriptions to businesses that increasingly demand invoices over Peppol. Failures were silent and hard to trace.",
      "With InvoNexa, every document gets a status timeline and automatic retries. Customer success can see exactly where an invoice is without asking engineering.",
      "Rollout covered Germany, Ireland and Greece within one quarter, starting with the largest accounts.",
    ],
    results: [{ value: "99.98%", label: "Delivery success on Peppol" }, { value: "< 1 min", label: "Median time to deliver" }, { value: "0", label: "Manual re-sends in the quarter" }],
    quote: { text: "Now when a customer asks where their invoice is, we answer in seconds.", who: "VP Customer Success, Stackry (fictional)" },
  },
  {
    slug: "orbitly", name: "Orbitly", industry: "Marketplaces", tagline: "Onboarding thousands of sellers for e-reporting.",
    metric: "12k entities", metricLabel: "Sellers onboarded", countries: "FR · IT · PT",
    short: "Orbitly registered its seller base with tax authorities programmatically, without manual back-and-forth.",
    caseText: [
      "Orbitly's marketplace needed each seller registered for e-reporting before it could trade in new markets. Spreadsheets and email threads did not scale.",
      "Using entity onboarding in InvoNexa, Orbitly collects details in its own seller flow and registers entities through the API, under its own brand.",
      "Sellers see their registration state in the dashboard they already use, and failed registrations come back with actionable reasons.",
    ],
    results: [{ value: "12,000", label: "Entities onboarded" }, { value: "0", label: "Manual onboarding steps" }, { value: "3", label: "Markets covered" }],
    quote: { text: "Onboarding used to be a project. It is now a field in our signup form.", who: "Director of Operations, Orbitly (fictional)" },
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);

export const testimonials = stories.map((s) => ({ ...s.quote, company: s.name }));
