export const BASE_URL = "https://api.invonexa.example/v1";

export const quickSample = `curl ${BASE_URL}/invoices \\
  -H "Authorization: Bearer sk_sandbox_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "country": "ES",
    "customer": "Acme S.L.",
    "total": 1210.00,
    "currency": "EUR"
  }'`;

export const integrationPaths = [
  { title: "API", tag: "For engineers", text: "Send a JSON document, get a compliant invoice back. Full control over the request, retries and webhooks.", href: "/developers/api-reference", cta: "Open the API reference" },
  { title: "No-code workflows", tag: "For ops teams", text: "Chain validation, signing and reporting steps visually, then trigger them from a form, a file drop or a schedule.", href: "/developers/documentation#workflows", cta: "Read about workflows" },
  { title: "Connectors", tag: "For existing stacks", text: "Plug into the ERP, billing or shop software you already run. Mapping and credentials are handled for you.", href: "/developers/integrations", cta: "Browse connectors" },
];

export const modelSteps = [
  { name: "Document", text: "Your invoice data in one neutral JSON shape, whatever the source system looks like." },
  { name: "Workflow", text: "A chain of steps for the destination country: validate, sign, report, deliver." },
  { name: "Receipt", text: "A final status and an archived, tamper-evident copy you can fetch any time." },
];

export type Lang = "curl" | "node" | "python";

export const gettingStartedSteps: {
  title: string;
  text: string;
  snippets: Record<Lang, string>;
}[] = [
  {
    title: "Get an API key",
    text: "Create a sandbox key from your dashboard. Keys starting with sk_sandbox_ never touch a real tax authority. Keep the key in an environment variable, never in source control.",
    snippets: {
      curl: `export INVONEXA_KEY="sk_sandbox_..."\n\ncurl ${BASE_URL}/ping \\\n  -H "Authorization: Bearer $INVONEXA_KEY"`,
      node: `// npm install @invonexa/sdk   (illustrative package)\nimport { InvoNexa } from "@invonexa/sdk";\n\nconst client = new InvoNexa(process.env.INVONEXA_KEY);\nconsole.log(await client.ping());`,
      python: `# pip install invonexa   (illustrative package)\nimport os\nfrom invonexa import Client\n\nclient = Client(os.environ["INVONEXA_KEY"])\nprint(client.ping())`,
    },
  },
  {
    title: "Create a company (entity)",
    text: "An entity is the legal issuer of invoices. Register its tax ID and country once, and every invoice you send for it is routed through the right rules.",
    snippets: {
      curl: `curl ${BASE_URL}/entities \\\n  -H "Authorization: Bearer $INVONEXA_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{ "name": "Acme S.L.", "tax_id": "ESB12345678", "country": "ES" }'`,
      node: `const entity = await client.entities.create({\n  name: "Acme S.L.",\n  taxId: "ESB12345678",\n  country: "ES",\n});\nconsole.log(entity.id); // ent_...`,
      python: `entity = client.entities.create(\n    name="Acme S.L.",\n    tax_id="ESB12345678",\n    country="ES",\n)\nprint(entity.id)  # ent_...`,
    },
  },
  {
    title: "Issue your first invoice",
    text: "Post a document. The sandbox validates it, signs it and reports it in about two seconds. You can run the same call live in the API reference.",
    snippets: {
      curl: `curl ${BASE_URL}/invoices \\\n  -H "Authorization: Bearer $INVONEXA_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "entity": "ent_8f2k1a",\n    "country": "ES",\n    "customer": "Globex GmbH",\n    "total": 1210.00,\n    "currency": "EUR"\n  }'`,
      node: `const invoice = await client.invoices.create({\n  entity: "ent_8f2k1a",\n  country: "ES",\n  customer: "Globex GmbH",\n  total: 1210.0,\n  currency: "EUR",\n});\nconsole.log(invoice.status); // "reported"`,
      python: `invoice = client.invoices.create(\n    entity="ent_8f2k1a",\n    country="ES",\n    customer="Globex GmbH",\n    total=1210.00,\n    currency="EUR",\n)\nprint(invoice.status)  # "reported"`,
    },
  },
  {
    title: "Track status with a webhook",
    text: "Register an HTTPS endpoint and we call it whenever an invoice changes state. Verify the signature header before trusting the payload.",
    snippets: {
      curl: `curl ${BASE_URL}/webhooks \\\n  -H "Authorization: Bearer $INVONEXA_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{ "url": "https://example.com/hooks/invonexa", "events": ["invoice.reported", "invoice.rejected"] }'`,
      node: `import express from "express";\nconst app = express();\n\napp.post("/hooks/invonexa", express.raw({ type: "*/*" }), (req, res) => {\n  const event = client.webhooks.verify(req.body, req.header("InvoNexa-Signature"));\n  if (event.type === "invoice.reported") console.log("Done:", event.data.id);\n  res.sendStatus(200);\n});`,
      python: `from flask import Flask, request\napp = Flask(__name__)\n\n@app.post("/hooks/invonexa")\ndef hook():\n    event = client.webhooks.verify(request.data, request.headers["InvoNexa-Signature"])\n    if event.type == "invoice.reported":\n        print("Done:", event.data["id"])\n    return "", 200`,
    },
  },
];

/* ---------------- Documentation ---------------- */

export type DocBlock = { p?: string; list?: string[]; code?: { label: string; body: string } };
export type DocSection = { id: string; title: string; summary: string; keywords: string; blocks: DocBlock[] };

export const docSections: DocSection[] = [
  {
    id: "concepts",
    title: "Concepts",
    summary: "Documents, entities, workflows and receipts.",
    keywords: "document entity workflow receipt model overview",
    blocks: [
      { p: "InvoNexa turns one neutral invoice document into a compliant invoice for the destination country. Four objects do the work." },
      { list: ["Entity: the legal company that issues invoices, with a tax ID and home country.", "Document: the invoice data you send, in JSON.", "Workflow: the ordered steps (validate, sign, report, deliver) applied to a document.", "Receipt: the final status plus an archived copy of what was sent."] },
      { p: "Every object has a prefixed id such as ent_, inv_ or wh_, and every response includes a created_at timestamp in ISO 8601 UTC." },
    ],
  },
  {
    id: "authentication",
    title: "Authentication",
    summary: "Bearer keys for sandbox and live modes.",
    keywords: "api key bearer token secret header auth",
    blocks: [
      { p: "Send your secret key in the Authorization header. Sandbox keys start with sk_sandbox_; live keys would start with sk_live_. Requests without a valid key return 401." },
      { code: { label: "Header", body: "Authorization: Bearer sk_sandbox_..." } },
      { p: "Rotate keys from the dashboard at any time. A rotated key keeps working for one hour so you can deploy without downtime." },
    ],
  },
  {
    id: "invoices",
    title: "Invoices",
    summary: "Create, list and retrieve invoices.",
    keywords: "invoice create list retrieve status lifecycle",
    blocks: [
      { p: "Create an invoice by posting a document. An invoice moves through these statuses:" },
      { list: ["queued: accepted and waiting for a worker.", "processing: being validated and signed.", "reported: accepted by the tax authority or network.", "rejected: refused, with a reason you can fix and resend."] },
      { code: { label: "Response", body: `{\n  "id": "inv_k29dm1xq",\n  "status": "reported",\n  "country": "ES",\n  "total": 1210.0,\n  "currency": "EUR",\n  "created_at": "2026-03-04T09:12:41.220Z"\n}` } },
    ],
  },
  {
    id: "workflows",
    title: "Workflows",
    summary: "Chain steps without writing glue code.",
    keywords: "workflow steps no-code pipeline trigger automation",
    blocks: [
      { p: "A workflow is a named list of steps. Each country ships with a default workflow, and you can clone it to add steps such as an approval hold or a PDF render." },
      { list: ["Triggers: an API call, an uploaded file or a schedule.", "Steps run in order and stop on the first failure.", "Failed runs can be retried from the failed step, not from the start."] },
      { code: { label: "Workflow definition", body: `{\n  "name": "es-standard",\n  "steps": ["validate", "sign", "report:aeat", "deliver:email"]\n}` } },
    ],
  },
  {
    id: "webhooks",
    title: "Webhooks",
    summary: "Be told when an invoice changes state.",
    keywords: "webhook event signature retry callback endpoint",
    blocks: [
      { p: "We POST a JSON event to your endpoint when something changes. Respond with any 2xx status within 10 seconds. Otherwise we retry with exponential backoff for up to 24 hours." },
      { p: "Each request carries an InvoNexa-Signature header, an HMAC-SHA256 of the raw body using your webhook secret. Always verify it and reject mismatches." },
      { code: { label: "Event payload", body: `{\n  "id": "evt_91ac",\n  "type": "invoice.reported",\n  "data": { "id": "inv_k29dm1xq", "status": "reported" }\n}` } },
    ],
  },
  {
    id: "errors",
    title: "Errors",
    summary: "Status codes and the error object.",
    keywords: "error status code 422 400 401 404 validation",
    blocks: [
      { p: "We use conventional HTTP codes: 2xx success, 400 malformed request, 401 bad key, 404 not found, 422 validation failed, 429 rate limited and 5xx on our side. Errors share one shape." },
      { code: { label: "422 response", body: `{\n  "error": {\n    "code": "validation_failed",\n    "message": "The request body failed validation.",\n    "fields": { "currency": "Use one of: EUR, USD, GBP." }\n  }\n}` } },
    ],
  },
  {
    id: "rate-limits",
    title: "Rate limits",
    summary: "Request budgets and how to back off.",
    keywords: "rate limit throttle 429 retry backoff quota",
    blocks: [
      { p: "Sandbox keys allow 60 requests per minute. When you exceed that you receive 429 with a Retry-After header in seconds. Use exponential backoff with jitter and honour that header." },
      { list: ["Batch work using the bulk endpoint where possible.", "Send an Idempotency-Key header on POSTs so retries never create duplicates."] },
    ],
  },
  {
    id: "sandbox",
    title: "Sandbox",
    summary: "Safe testing with fake tax authorities.",
    keywords: "sandbox test fake demo environment magic values",
    blocks: [
      { p: "The sandbox mimics each country without contacting a real authority. Nothing you send is filed, and data is wiped every 30 days. This documentation describes a demo API for illustration only." },
      { p: "To force a rejection, send a customer name ending in \"-REJECT\". To test slow responses, end it with \"-SLOW\"." },
    ],
  },
];

/* ---------------- API reference ---------------- */

export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type Endpoint = { id: string; method: Method; path: string; summary: string; request?: string; response: string };
export type Resource = { name: string; blurb: string; endpoints: Endpoint[] };

export const resources: Resource[] = [
  {
    name: "Invoices",
    blurb: "Issue invoices and follow them to a final status.",
    endpoints: [
      { id: "invoices-create", method: "POST", path: "/invoices", summary: "Create and send an invoice.", request: `{\n  "country": "ES",\n  "customer": "Acme S.L.",\n  "total": 1210.00,\n  "currency": "EUR"\n}`, response: `{\n  "id": "inv_k29dm1xq",\n  "status": "reported",\n  "created_at": "2026-03-04T09:12:41.220Z"\n}` },
      { id: "invoices-list", method: "GET", path: "/invoices", summary: "List recent invoices, newest first.", response: `{\n  "object": "list",\n  "data": [{ "id": "inv_k29dm1xq", "status": "reported" }],\n  "has_more": false\n}` },
      { id: "invoices-get", method: "GET", path: "/invoices/{id}", summary: "Retrieve one invoice with its receipt.", response: `{\n  "id": "inv_k29dm1xq",\n  "status": "reported",\n  "receipt_url": "https://api.invonexa.example/v1/receipts/rcp_88"\n}` },
      { id: "invoices-void", method: "DELETE", path: "/invoices/{id}", summary: "Void an invoice that was not yet reported.", response: `{ "id": "inv_k29dm1xq", "status": "voided" }` },
    ],
  },
  {
    name: "Entities",
    blurb: "The companies that issue invoices.",
    endpoints: [
      { id: "entities-create", method: "POST", path: "/entities", summary: "Register an issuing company.", request: `{\n  "name": "Acme S.L.",\n  "tax_id": "ESB12345678",\n  "country": "ES"\n}`, response: `{ "id": "ent_8f2k1a", "name": "Acme S.L.", "country": "ES" }` },
      { id: "entities-get", method: "GET", path: "/entities/{id}", summary: "Retrieve an entity and its registrations.", response: `{ "id": "ent_8f2k1a", "registrations": ["ES"] }` },
      { id: "entities-update", method: "PUT", path: "/entities/{id}", summary: "Update an entity's details.", request: `{ "name": "Acme Iberia S.L." }`, response: `{ "id": "ent_8f2k1a", "name": "Acme Iberia S.L." }` },
    ],
  },
  {
    name: "Workflows",
    blurb: "Define and run the steps applied to documents.",
    endpoints: [
      { id: "workflows-list", method: "GET", path: "/workflows", summary: "List available workflows.", response: `{ "data": [{ "id": "wf_es", "name": "es-standard" }] }` },
      { id: "workflows-run", method: "POST", path: "/workflows/{id}/runs", summary: "Start a run for a document.", request: `{ "document": { "total": 99, "currency": "EUR" } }`, response: `{ "id": "run_2p9", "status": "processing" }` },
    ],
  },
  {
    name: "Webhooks",
    blurb: "Subscribe to events instead of polling.",
    endpoints: [
      { id: "webhooks-create", method: "POST", path: "/webhooks", summary: "Register an endpoint.", request: `{\n  "url": "https://example.com/hooks/invonexa",\n  "events": ["invoice.reported"]\n}`, response: `{ "id": "wh_71", "secret": "whsec_..." }` },
      { id: "webhooks-delete", method: "DELETE", path: "/webhooks/{id}", summary: "Remove an endpoint.", response: `{ "id": "wh_71", "deleted": true }` },
    ],
  },
];

/* ---------------- Integrations ---------------- */

export type Status = "Available" | "Beta" | "Planned";
export type Connector = { name: string; category: "ERP" | "Billing" | "Accounting" | "E-commerce"; status: Status; how: string };

export const connectorCategories = ["All", "ERP", "Billing", "Accounting", "E-commerce"];

export const connectors: Connector[] = [
  { name: "Northwind ERP", category: "ERP", status: "Available", how: "Reads posted sales documents from a scheduled export and writes the receipt back to a custom field." },
  { name: "Ledgerline Suite", category: "ERP", status: "Available", how: "Uses the vendor's REST API to pull invoices on approval and post status updates." },
  { name: "Obsidian Planner", category: "ERP", status: "Beta", how: "Listens to a document-posted event and responds with the signed invoice reference." },
  { name: "Atlas Enterprise", category: "ERP", status: "Planned", how: "Planned file-based integration through a secure SFTP drop folder." },
  { name: "Cadence Billing", category: "Billing", status: "Available", how: "Subscribes to invoice-finalised webhooks and files each one automatically." },
  { name: "Metered Pay", category: "Billing", status: "Available", how: "Maps usage-based invoice lines to our document model, including tax breakdowns." },
  { name: "Recurring Plans", category: "Billing", status: "Beta", how: "Polls finalised subscription invoices and reports them in the customer's country." },
  { name: "Pulse Subscriptions", category: "Billing", status: "Planned", how: "Planned webhook bridge for renewal and credit-note events." },
  { name: "Quill Books", category: "Accounting", status: "Available", how: "Pushes reported invoices into the ledger as sales entries with the receipt attached." },
  { name: "Ledgerly Cloud", category: "Accounting", status: "Available", how: "Two-way sync: imports contacts, exports reported invoices and payment status." },
  { name: "Tallyhouse", category: "Accounting", status: "Beta", how: "Exports a daily batch of reported invoices in the vendor's import format." },
  { name: "Abacus Online", category: "Accounting", status: "Planned", how: "Planned OAuth connection to create sales invoices directly in the ledger." },
  { name: "Shopfront Commerce", category: "E-commerce", status: "Available", how: "Hooks the order-paid event, builds the document and emails the invoice to the shopper." },
  { name: "Bazaar Engine", category: "E-commerce", status: "Available", how: "Installs as an extension that issues an invoice per fulfilled order." },
  { name: "Marketly", category: "E-commerce", status: "Beta", how: "Pulls marketplace settlement reports and invoices each seller sale." },
  { name: "Cartwheel", category: "E-commerce", status: "Planned", how: "Planned storefront plugin with per-country tax mapping." },
];
