/** DEMO DATA ONLY. All participants are fictional. */
export type Participant = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  scheme: string;
  documentTypes: string[];
  certificateExpiry: string;
  status: "active" | "expiring" | "inactive";
};

const INVOICE = "Invoice (BIS Billing 3.0)";
const CREDIT = "Credit note";
const ORDER = "Order";
const DESPATCH = "Despatch advice";
const RESPONSE = "Invoice response";

export const documentTypeCatalog: { name: string; text: string }[] = [
  { name: INVOICE, text: "The standard billing document for goods and services." },
  { name: CREDIT, text: "Corrects or cancels a previously issued invoice." },
  { name: ORDER, text: "A purchase order sent from buyer to supplier." },
  { name: DESPATCH, text: "Tells the buyer what has been shipped." },
  { name: RESPONSE, text: "A business-level accept, reject or paid status for an invoice." },
];

export const participants: Participant[] = [
  { id: "0192:123456789", name: "Fjordline Logistikk AS", country: "Norway", countryCode: "no", scheme: "0192", documentTypes: [INVOICE, CREDIT, ORDER], certificateExpiry: "2027-03-14", status: "active" },
  { id: "0192:987654321", name: "Nordhavn Bygg AS", country: "Norway", countryCode: "no", scheme: "0192", documentTypes: [INVOICE, CREDIT], certificateExpiry: "2026-11-02", status: "expiring" },
  { id: "0007:5561234567", name: "Lindgren Kaffe AB", country: "Sweden", countryCode: "se", scheme: "0007", documentTypes: [INVOICE, CREDIT, RESPONSE], certificateExpiry: "2027-06-30", status: "active" },
  { id: "0088:5790000123456", name: "Havnegade Fiskeri ApS", country: "Denmark", countryCode: "dk", scheme: "0088", documentTypes: [INVOICE, CREDIT, ORDER, DESPATCH], certificateExpiry: "2027-01-21", status: "active" },
  { id: "0208:0123456789", name: "Brasserie Lumiere NV", country: "Belgium", countryCode: "be", scheme: "0208", documentTypes: [INVOICE, CREDIT], certificateExpiry: "2027-08-09", status: "active" },
  { id: "0106:12345678", name: "Windmolen Techniek BV", country: "Netherlands", countryCode: "nl", scheme: "0106", documentTypes: [INVOICE, CREDIT, ORDER], certificateExpiry: "2026-12-05", status: "expiring" },
  { id: "9930:DE123456789", name: "Schwarzwald Werkzeug GmbH", country: "Germany", countryCode: "de", scheme: "9930", documentTypes: [INVOICE, CREDIT, RESPONSE], certificateExpiry: "2027-04-17", status: "active" },
  { id: "9925:BE0987654321", name: "Atelier Verde SRL", country: "Belgium", countryCode: "be", scheme: "9925", documentTypes: [INVOICE], certificateExpiry: "2026-09-01", status: "inactive" },
  { id: "9920:ESB12345678", name: "Costa Azul Distribuciones SL", country: "Spain", countryCode: "es", scheme: "9920", documentTypes: [INVOICE, CREDIT], certificateExpiry: "2027-05-25", status: "active" },
  { id: "0211:IT01234567890", name: "Bottega Aurora SRL", country: "Italy", countryCode: "it", scheme: "0211", documentTypes: [INVOICE, CREDIT, ORDER], certificateExpiry: "2027-02-11", status: "active" },
  { id: "0009:12345678901234", name: "Maison Pivoine SAS", country: "France", countryCode: "fr", scheme: "0009", documentTypes: [INVOICE, CREDIT, DESPATCH], certificateExpiry: "2027-07-19", status: "active" },
  { id: "0060:123456789", name: "Evergreen Supply Co", country: "United States", countryCode: "us", scheme: "0060", documentTypes: [INVOICE, ORDER], certificateExpiry: "2026-10-30", status: "expiring" },
  { id: "0151:12345678901", name: "Kookaburra Freight Pty Ltd", country: "Australia", countryCode: "au", scheme: "0151", documentTypes: [INVOICE, CREDIT], certificateExpiry: "2027-09-12", status: "active" },
  { id: "0195:SGUEN201234567A", name: "Merlion Trading Pte Ltd", country: "Singapore", countryCode: "sg", scheme: "0195", documentTypes: [INVOICE, CREDIT, RESPONSE], certificateExpiry: "2027-10-03", status: "active" },
];

export const schemes: { code: string; name: string }[] = [
  { code: "0007", name: "Swedish organisation number" },
  { code: "0009", name: "French SIRET" },
  { code: "0060", name: "DUNS number" },
  { code: "0088", name: "GLN (EAN location code)" },
  { code: "0106", name: "Dutch chamber of commerce number" },
  { code: "0151", name: "Australian business number" },
  { code: "0192", name: "Norwegian organisation number" },
  { code: "0195", name: "Singapore UEN" },
  { code: "0208", name: "Belgian enterprise number" },
  { code: "0211", name: "Italian VAT number" },
  { code: "9920", name: "Spanish tax identifier" },
  { code: "9925", name: "Belgian VAT number" },
  { code: "9930", name: "German VAT number" },
];

/** Scheme (4 digits) + colon + value (1-50 letters/digits/-._). */
export const ID_FORMAT = /^\d{4}:[A-Za-z0-9._-]{1,50}$/;

export function lookup(id: string): Participant | undefined {
  const key = id.trim().toLowerCase();
  return participants.find((p) => p.id.toLowerCase() === key);
}
