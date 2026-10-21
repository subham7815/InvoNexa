export type NavItem = { label: string; href: string; description?: string; external?: boolean };
export type NavMenu = { label: string; items: NavItem[] };

/** Top-level links, in header order (after the logo). */
export const navLinks: NavItem[] = [
  { label: "Coverage", href: "/coverage" },
  { label: "Partners", href: "/partners" },
  { label: "Customers", href: "/customers" },
  { label: "Pricing", href: "/pricing" },
];

/** Dropdown menus, rendered after `navLinks`. */
export const navMenus: NavMenu[] = [
  {
    label: "Developers",
    items: [
      { label: "Getting started", href: "/developers/getting-started", description: "Send your first invoice in minutes" },
      { label: "Documentation", href: "/developers/documentation", description: "Guides, concepts and workflows" },
      { label: "API reference", href: "/developers/api-reference", description: "Endpoints, schemas and a live sandbox" },
      { label: "Integrations", href: "/developers/integrations", description: "ERP, billing and accounting connectors" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "How it works", href: "/how-it-works", description: "From your data to a delivered invoice" },
      { label: "Blog", href: "/blog", description: "E-invoicing news and guides" },
      { label: "Network scanner", href: "/network-scanner", description: "Look up Peppol participants" },
      { label: "Invoice generator", href: "/invoice-generator", description: "Create a compliant sample invoice" },
      { label: "Invoice comparator", href: "/invoice-comparator", description: "Diff two invoice documents" },
      { label: "Status", href: "/status", description: "Live platform health" },
    ],
  },
];

/**
 * Social links are PLACEHOLDERS pointing at each platform's homepage — InvoNexa is a demo brand with no
 * real accounts. Swap these URLs for real ones in one place.
 */
const social: NavItem[] = [
  { label: "Community", href: "https://github.com/discussions", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
  { label: "GitHub", href: "https://github.com", external: true },
  { label: "X", href: "https://x.com", external: true },
];

/** Deliberately short: the full site map lives in the header dropdowns. */
export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Coverage", href: "/coverage" },
      { label: "Partners", href: "/partners" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Overview", href: "/developers" },
      { label: "Documentation", href: "/developers/documentation" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Network scanner", href: "/network-scanner" },
      { label: "Invoice generator", href: "/invoice-generator" },
      { label: "Invoice comparator", href: "/invoice-comparator" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Careers", href: "/careers" },
    ],
  },
  { title: "Get in touch", links: [{ label: "Contact us", href: "/contact" }, ...social] },
];

export const legalLinks: NavItem[] = [
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Sub-processors", href: "/legal/sub-processors" },
  { label: "Trust center", href: "/legal/trust-center" },
];

export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
