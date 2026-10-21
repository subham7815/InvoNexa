export type PathId = "technology" | "reseller" | "embedded";

export const paths: { id: PathId; title: string; text: string; points: string[] }[] = [
  { id: "technology", title: "Technology partner", text: "Connect your ERP, billing or accounting product so shared customers can turn on e-invoicing in a few clicks.", points: ["Co-built connector", "Joint listing and docs", "Sandbox access"] },
  { id: "reseller", title: "Reseller", text: "Advise clients on compliance and bring InvoNexa into your implementations, with margin on every account.", points: ["Partner pricing", "Training and certification", "Shared pipeline"] },
  { id: "embedded", title: "Embedded partner", text: "Offer invoicing inside your own product, under your brand, and onboard your customers' entities by API.", points: ["White-label experience", "Entity onboarding API", "Dedicated engineering help"] },
];

export const benefits = [
  { title: "Revenue share", text: "Earn on every account you bring or enable." },
  { title: "Fast enablement", text: "Sandbox, sample payloads and an engineer to unblock you." },
  { title: "Co-marketing", text: "Launch content, listings and events planned together." },
  { title: "Roadmap input", text: "Tell us which countries and formats your customers need." },
];

export const opportunities = [
  { title: "ERP and accounting", text: "Add compliant output to finance suites and country-specific accounting tools." },
  { title: "Billing and payments", text: "Turn subscription and payment events into legal invoices automatically." },
  { title: "Marketplaces and platforms", text: "Let sellers invoice and report without leaving your platform." },
  { title: "Consultancies", text: "Package InvoNexa in compliance and transformation projects." },
];

export const steps = [
  { title: "Tell us about you", text: "Send the inquiry below with your product or client base." },
  { title: "Intro call", text: "We align on the path, markets and a pilot." },
  { title: "Build or onboard", text: "Get sandbox access and, if needed, an integration plan." },
  { title: "Launch together", text: "Go live with a first customer and plan co-marketing." },
];
