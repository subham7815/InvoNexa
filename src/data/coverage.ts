export type CountryStatus = "live" | "upcoming";
export type CountryMode = "e-invoicing" | "e-reporting" | "both";

export type CountryInfo = {
  slug: string;
  name: string;
  code: string;
  status: CountryStatus;
  /** Availability label, e.g. "Live" or "Q4 2026". */
  availability: string;
  mode: CountryMode;
  region: string;
  summary: string;
  formats: string[];
  networks: string[];
  invoicing: string;
  reporting: string;
  /** Illustrative mandate timeline. */
  mandate: { date: string; text: string }[];
  related: string[];
};

export const countryList: CountryInfo[] = [
  {
    slug: "spain", name: "Spain", code: "es", status: "live", availability: "Live", mode: "both", region: "Europe",
    summary: "Real-time invoice reporting through Veri*Factu and regional systems, plus structured B2G invoicing.",
    formats: ["Veri*Factu", "TicketBAI", "FacturaE"], networks: ["AEAT Veri*Factu", "FACe (B2G)", "Basque tax agencies"],
    invoicing: "Structured invoices to public bodies go through FACe in FacturaE format. B2B structured exchange is being phased in.",
    reporting: "Invoicing software must produce tamper-evident records and send them to the tax agency or keep them ready for inspection.",
    mandate: [
      { date: "2025", text: "Billing-software requirements enter their rollout window." },
      { date: "2026", text: "Businesses move to compliant software on a staggered calendar." },
      { date: "2027", text: "Wider B2B structured invoicing expected to follow." },
    ],
    related: ["portugal", "france", "italy"],
  },
  {
    slug: "germany", name: "Germany", code: "de", status: "live", availability: "Live", mode: "e-invoicing", region: "Europe",
    summary: "Mandatory receipt of structured B2B invoices, with a phased obligation to issue them.",
    formats: ["XRechnung", "ZUGFeRD", "Peppol BIS"], networks: ["Peppol", "Email (structured attachment)"],
    invoicing: "Businesses must be able to receive structured invoices; issuing obligations apply by revenue band over several years.",
    reporting: "No transaction-level real-time reporting today; invoice data stays with the parties and is available for audit.",
    mandate: [
      { date: "2025", text: "Receiving structured B2B invoices becomes standard practice." },
      { date: "2027", text: "Larger companies expected to issue structured invoices." },
      { date: "2028", text: "Obligation expected to extend to all domestic B2B issuers." },
    ],
    related: ["france", "ireland", "poland"],
  },
  {
    slug: "france", name: "France", code: "fr", status: "live", availability: "Live", mode: "both", region: "Europe",
    summary: "Mandatory e-invoicing and e-reporting through certified platforms, rolled out by company size.",
    formats: ["Factur-X", "UBL", "CII"], networks: ["Certified platforms (PDP)", "Public portal directory"],
    invoicing: "Domestic B2B invoices are exchanged between certified platforms using approved structured formats.",
    reporting: "Transaction data for B2C and cross-border sales is reported to the tax authority on a regular cadence.",
    mandate: [
      { date: "2026", text: "Receiving obligation for all companies; issuing for the largest." },
      { date: "2027", text: "Issuing obligation expected for mid-size and small companies." },
      { date: "2027+", text: "Reporting scope continues to be refined." },
    ],
    related: ["spain", "italy", "germany"],
  },
  {
    slug: "greece", name: "Greece", code: "gr", status: "live", availability: "Live", mode: "both", region: "Europe",
    summary: "Invoice data transmitted to the myDATA platform, with growing B2B and B2G e-invoicing.",
    formats: ["myDATA XML", "Peppol BIS"], networks: ["myDATA (AADE)", "Peppol"],
    invoicing: "Structured B2G invoices travel over Peppol; B2B exchange is moving toward mandatory use.",
    reporting: "Issuers transmit invoice and expense data to myDATA, close to the time of issue.",
    mandate: [
      { date: "2024", text: "Wider myDATA transmission obligations in effect." },
      { date: "2026", text: "Structured B2B e-invoicing phased in by segment." },
    ],
    related: ["italy", "hungary", "croatia"],
  },
  {
    slug: "italy", name: "Italy", code: "it", status: "live", availability: "Live", mode: "both", region: "Europe",
    summary: "Every invoice flows through the national exchange system, SDI, in FatturaPA format.",
    formats: ["FatturaPA"], networks: ["SDI (Sistema di Interscambio)"],
    invoicing: "B2B, B2C and B2G invoices are cleared by SDI before they reach the recipient.",
    reporting: "Clearance doubles as reporting: the tax authority receives each invoice as it is issued.",
    mandate: [
      { date: "2019", text: "Clearance model extended to all domestic invoices." },
      { date: "2024", text: "Cross-border data reporting aligned with SDI." },
    ],
    related: ["france", "greece", "croatia"],
  },
  {
    slug: "portugal", name: "Portugal", code: "pt", status: "live", availability: "Live", mode: "both", region: "Europe",
    summary: "Certified software, ATCUD codes and SAF-T files, with structured B2G invoicing.",
    formats: ["SAF-T (PT)", "ATCUD", "UBL"], networks: ["AT Portal", "eSPap (B2G)"],
    invoicing: "Public sector invoices must be structured; private-sector use is expanding.",
    reporting: "Invoice series are communicated to the tax authority and SAF-T files submitted periodically.",
    mandate: [
      { date: "2023", text: "ATCUD code on all invoices." },
      { date: "2027", text: "Broader structured B2B invoicing expected." },
    ],
    related: ["spain", "france", "italy"],
  },
  {
    slug: "hungary", name: "Hungary", code: "hu", status: "live", availability: "Live", mode: "e-reporting", region: "Europe",
    summary: "Near real-time invoice data reporting through the NAV Online Számla interface.",
    formats: ["NAV Online Számla XML"], networks: ["NAV Online Számla"],
    invoicing: "Invoices themselves are free-form; structured delivery is by agreement between parties.",
    reporting: "Invoice data is sent to NAV at the moment of issue for all domestic taxable transactions.",
    mandate: [
      { date: "2018", text: "Real-time reporting for all domestic invoices." },
      { date: "2026", text: "Further clearance-style requirements under discussion." },
    ],
    related: ["greece", "poland", "croatia"],
  },
  {
    slug: "ireland", name: "Ireland", code: "ie", status: "live", availability: "Live", mode: "e-invoicing", region: "Europe",
    summary: "Peppol-based e-invoicing for public bodies, with broader adoption on the horizon.",
    formats: ["Peppol BIS Billing 3.0", "EN 16931"], networks: ["Peppol"],
    invoicing: "Contracting authorities receive structured invoices over Peppol.",
    reporting: "Domestic transaction reporting is planned as part of a broader digital reporting programme.",
    mandate: [
      { date: "2020", text: "Public bodies able to receive EN 16931 invoices." },
      { date: "2028", text: "Wider digital reporting expected." },
    ],
    related: ["germany", "france", "poland"],
  },
  {
    slug: "croatia", name: "Croatia", code: "hr", status: "upcoming", availability: "Q4 2026", mode: "both", region: "Europe",
    summary: "Fiscalisation of B2B and B2C invoices with structured exchange through a national hub.",
    formats: ["UBL 2.1", "EN 16931"], networks: ["Fiscalisation hub", "Peppol access point"],
    invoicing: "Domestic B2B invoices will move to structured exchange.",
    reporting: "Invoice data is fiscalised in near real time.",
    mandate: [
      { date: "2026", text: "Fiscalisation rules take effect." },
      { date: "Q4 2026", text: "InvoNexa support planned." },
    ],
    related: ["italy", "hungary", "greece"],
  },
  {
    slug: "australia", name: "Australia", code: "au", status: "upcoming", availability: "Q4 2026", mode: "e-invoicing", region: "Asia-Pacific",
    summary: "Peppol-based e-invoicing through the ANZ framework, driven by government adoption.",
    formats: ["Peppol BIS Billing 3.0 A-NZ"], networks: ["Peppol (A-NZ)"],
    invoicing: "Government agencies pay e-invoices quickly; private adoption is encouraged.",
    reporting: "No real-time transaction reporting.",
    mandate: [
      { date: "2022", text: "Federal agencies prioritise e-invoice payment." },
      { date: "Q4 2026", text: "InvoNexa support planned." },
    ],
    related: ["ireland", "germany", "united-arab-emirates"],
  },
  {
    slug: "peru", name: "Peru", code: "pe", status: "upcoming", availability: "Q1 2027", mode: "both", region: "Latin America",
    summary: "Electronic invoices signed and validated through SUNAT, in UBL format.",
    formats: ["UBL 2.1"], networks: ["SUNAT", "Authorised OSE providers"],
    invoicing: "Issuers sign invoices and obtain a validation receipt.",
    reporting: "Validation by SUNAT acts as reporting.",
    mandate: [
      { date: "Ongoing", text: "Phased inclusion of remaining taxpayers." },
      { date: "Q1 2027", text: "InvoNexa support planned." },
    ],
    related: ["chile", "spain", "portugal"],
  },
  {
    slug: "united-arab-emirates", name: "United Arab Emirates", code: "ae", status: "upcoming", availability: "Q1 2027", mode: "e-invoicing", region: "Middle East",
    summary: "A decentralised exchange model with accredited service providers.",
    formats: ["Peppol-based UBL"], networks: ["Accredited service providers", "Central data platform"],
    invoicing: "Businesses exchange structured invoices via accredited providers.",
    reporting: "Invoice data is shared with a central platform operated by the authority.",
    mandate: [
      { date: "2026", text: "Pilot phase for selected taxpayers." },
      { date: "Q1 2027", text: "InvoNexa support planned." },
    ],
    related: ["australia", "greece", "poland"],
  },
  {
    slug: "chile", name: "Chile", code: "cl", status: "upcoming", availability: "Q2 2027", mode: "both", region: "Latin America",
    summary: "Clearance-style electronic tax documents issued with SII-issued folios.",
    formats: ["DTE XML"], networks: ["SII"],
    invoicing: "Electronic tax documents are signed and sent to the SII.",
    reporting: "Submission to the SII is the reporting step.",
    mandate: [
      { date: "Ongoing", text: "All taxpayers expected to use electronic documents." },
      { date: "Q2 2027", text: "InvoNexa support planned." },
    ],
    related: ["peru", "spain", "italy"],
  },
  {
    slug: "poland", name: "Poland", code: "pl", status: "upcoming", availability: "Q2 2027", mode: "both", region: "Europe",
    summary: "National e-invoicing through KSeF, with structured invoices stored centrally.",
    formats: ["FA(3) XML"], networks: ["KSeF"],
    invoicing: "Invoices are issued into KSeF and made available to the buyer.",
    reporting: "Clearance in KSeF replaces separate reporting for covered invoices.",
    mandate: [
      { date: "2026", text: "Mandatory use starts for larger taxpayers." },
      { date: "Q2 2027", text: "InvoNexa support planned." },
    ],
    related: ["germany", "hungary", "ireland"],
  },
];

export const getCountry = (slug: string) => countryList.find((c) => c.slug === slug);

export const modeLabel: Record<CountryMode, string> = {
  "e-invoicing": "E-invoicing",
  "e-reporting": "E-reporting",
  both: "E-invoicing + e-reporting",
};
