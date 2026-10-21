



export const logos = ["Lumora", "Paylio", "Stackry", "Northbeam", "Orbitly", "Finlark"];


export const countries = [
  { name: "Spain", code: "es", standards: ["Veri*Factu", "TicketBAI", "FacturaE"], coords: [-3.7, 40.4] },
  { name: "Germany", code: "de", standards: ["XRechnung", "ZUGFeRD", "Peppol"], coords: [10.4, 51.1] },
  { name: "France", code: "fr", standards: ["Factur-X", "PDP e-reporting"], coords: [2.2, 46.6] },
  { name: "Greece", code: "gr", standards: ["myDATA", "Peppol"], coords: [22.9, 39.1] },
  { name: "Italy", code: "it", standards: ["SDI FatturaPA"], coords: [12.5, 42.8] },
  { name: "Portugal", code: "pt", standards: ["SAF-T", "ATCUD"], coords: [-8.2, 39.6] },
  { name: "Hungary", code: "hu", standards: ["NAV Online Számla"], coords: [19.5, 47.2] },
  { name: "Ireland", code: "ie", standards: ["Peppol BIS"], coords: [-8.0, 53.2] },
];

export const roadmap = [
  { when: "Q4 2026", places: [{ name: "Croatia", code: "hr" }, { name: "Australia", code: "au" }] },
  { when: "Q1 2027", places: [{ name: "Peru", code: "pe" }, { name: "UAE", code: "ae" }] },
  { when: "Q2 2027", places: [{ name: "Chile", code: "cl" }, { name: "Poland", code: "pl" }] },
];

export const customers = [
  { name: "Paylio", metric: "6 → 2 weeks", text: "Integration time cut by two thirds across four markets.", countries: "ES · DE · FR" },
  { name: "Stackry", metric: "99.98%", text: "Delivery success rate on Peppol exchange in the first quarter.", countries: "DE · IE · GR" },
  { name: "Orbitly", metric: "12k entities", text: "Customer entities onboarded for e-reporting with no manual steps.", countries: "FR · IT · PT" },
];

export const faqs = [
  { q: "What is e-invoicing?", a: "E-invoicing is the exchange of structured, machine-readable invoices between systems, often mandated by governments." },
  { q: "What is e-reporting?", a: "E-reporting sends invoice or transaction data to tax authorities, usually in real time or near real time." },
  { q: "What is InvoNexa?", a: "InvoNexa is an invoicing infrastructure that lets you issue, receive and report compliant invoices through one API." },
  { q: "How does the API work?", a: "You send us your invoice data as JSON. We validate, convert, sign, deliver and report it, then notify you of the result." },
  { q: "Which countries do you support?", a: "We support 30+ countries today, with more added every quarter. See the coverage section for the live list." },
  { q: "How do I integrate?", a: "Use our REST API and SDKs, or start with a no-code workflow and connect your billing tool in minutes." },
  { q: "Do you connect with my ERP?", a: "Yes. We offer connectors for popular ERP and billing systems, and a webhook-based API for anything custom." },
  { q: "Can I white-label InvoNexa?", a: "Yes. Embed invoicing in your own product and let your customers onboard their entities under your brand." },
  { q: "How long does implementation take?", a: "Most teams go live in 3 to 6 weeks, depending on the countries and systems involved." },
];


