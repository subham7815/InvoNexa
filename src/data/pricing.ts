export type PlanId = "starter" | "growth" | "enterprise";
export type Billing = "monthly" | "annual";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /** Monthly price in EUR, or null for custom. */
  monthly: number | null;
  credits: string;
  highlights: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  { id: "starter", name: "Starter", tagline: "For teams validating their first market.", monthly: 99, credits: "1,000 credits / month", highlights: ["3 countries", "REST API and sandbox", "Email support"] },
  { id: "growth", name: "Growth", tagline: "For products invoicing across Europe.", monthly: 499, credits: "20,000 credits / month", highlights: ["All live countries", "ERP and billing connectors", "Priority support"], featured: true },
  { id: "enterprise", name: "Enterprise", tagline: "For platforms embedding invoicing.", monthly: null, credits: "Volume commitments", highlights: ["White-label and entity onboarding", "SLA and dedicated manager", "Custom security review"] },
];

/** Annual billing discount (fraction). */
export const ANNUAL_DISCOUNT = 0.2;

export const planPrice = (p: Plan, billing: Billing) =>
  p.monthly === null ? null : Math.round(billing === "annual" ? p.monthly * (1 - ANNUAL_DISCOUNT) : p.monthly);

export const isPlanId = (v: string | null): v is PlanId => v === "starter" || v === "growth" || v === "enterprise";
export const isBilling = (v: string | null): v is Billing => v === "monthly" || v === "annual";

export const creditCosts = [
  { action: "Issue and deliver an invoice", credits: "1 credit", note: "Validation, conversion, signing and delivery included." },
  { action: "Receive an invoice", credits: "1 credit", note: "Parsed into structured JSON." },
  { action: "Report to a tax authority", credits: "1 credit", note: "Real-time or periodic, depending on the country." },
  { action: "Credit note or correction", credits: "1 credit", note: "Same as a new document." },
  { action: "Register a customer entity", credits: "5 credits", note: "One-time per entity." },
  { action: "Status lookups and webhooks", credits: "Free", note: "Never metered." },
];

export const comparison: { feature: string; starter: string; growth: string; enterprise: string }[] = [
  { feature: "Document credits", starter: "1,000 / mo", growth: "20,000 / mo", enterprise: "Custom" },
  { feature: "Countries", starter: "3", growth: "All live", enterprise: "All live + early access" },
  { feature: "REST API and SDKs", starter: "Yes", growth: "Yes", enterprise: "Yes" },
  { feature: "Sandbox environment", starter: "Yes", growth: "Yes", enterprise: "Yes" },
  { feature: "ERP and billing connectors", starter: "No", growth: "Yes", enterprise: "Yes" },
  { feature: "Entity onboarding", starter: "No", growth: "Up to 50", enterprise: "Unlimited" },
  { feature: "White-label", starter: "No", growth: "No", enterprise: "Yes" },
  { feature: "Support", starter: "Email", growth: "Priority", enterprise: "Dedicated manager" },
  { feature: "Uptime SLA", starter: "No", growth: "99.9%", enterprise: "99.99%" },
];

export const pricingFaqs = [
  { q: "What is a document credit?", a: "A credit is the unit we meter. Most actions, such as issuing, receiving or reporting a document, use one credit." },
  { q: "What happens if I run out of credits?", a: "We notify you at 80% and 100%. You can add a top-up pack or upgrade; documents are never silently dropped." },
  { q: "Do unused credits roll over?", a: "Unused monthly credits roll over for one month. Annual plans pool credits across the year." },
  { q: "Can I switch plans later?", a: "Yes. Upgrades apply immediately and downgrades at the end of the billing period." },
  { q: "How does annual billing work?", a: "You pay for the year up front and save 20% compared to monthly billing." },
  { q: "Is there a free sandbox?", a: "Every plan includes a sandbox with test credentials, so you can integrate before going live." },
];
