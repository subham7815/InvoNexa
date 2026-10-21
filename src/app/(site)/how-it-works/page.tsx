import type { Metadata } from "next";
import { Tabs } from "@/components/blocks";
import { EmbedMock, RunMock } from "@/components/Mocks";
import { PageHero, PageSection } from "@/components/PageHero";
import { Pipeline, type Stage } from "@/components/resources/Pipeline";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "How it works — InvoNexa",
  description: "Follow an invoice from your system to the customer and the tax authority.",
};

const stages: Stage[] = [
  {
    title: "Issue",
    text: "Your system sends one JSON payload. We create the invoice, assign a sequence number and store the original request.",
    detail: ["Idempotency keys prevent duplicates", "Parties and tax IDs are resolved", "Draft or issue in a single call"],
  },
  {
    title: "Validate",
    text: "Country rules run before anything leaves our platform, so errors reach you in seconds rather than after a rejection.",
    detail: ["Schema and business rule checks", "VAT and rounding verification", "Clear, coded error messages"],
  },
  {
    title: "Convert and sign",
    text: "The payload becomes the format the destination expects, then gets a digital signature or authority-issued code where required.",
    detail: ["UBL, CII and local formats", "Certificates managed for you", "QR codes and legal references added"],
  },
  {
    title: "Deliver",
    text: "The document goes to the customer through the right channel: a network, a government portal, an ERP connector or plain email.",
    detail: ["Recipient lookup and routing", "Automatic retries with backoff", "Delivery receipts captured"],
  },
  {
    title: "Report",
    text: "Where the law asks for it, we report to the tax authority and attach its receipt to the invoice record.",
    detail: ["Near real time or periodic", "Authority responses stored", "Webhook when status changes"],
  },
];

const flows = [
  {
    id: "exchange",
    label: "Exchange",
    title: "Exchange: invoice moves between businesses",
    text: "Used for networks and mandates where the customer receives structured data. We look up the recipient, convert, sign and deliver, then report back whether it was accepted.",
    steps: ["Issue the invoice", "Look up the recipient", "Convert and sign", "Deliver and await acknowledgement"],
  },
  {
    id: "report",
    label: "Report",
    title: "Report: the tax authority receives the data",
    text: "Used where each invoice, or a summary, must be reported. You still send your customer a PDF or email if you like. We submit the record and keep the authority receipt.",
    steps: ["Issue the invoice", "Build the report record", "Submit to the authority", "Store the receipt"],
  },
  {
    id: "connect",
    label: "Connect",
    title: "Connect: invoices flow into your tools",
    text: "Incoming documents arrive through a webhook or a connector and are mapped into your ERP or accounting system, so nobody retypes data.",
    steps: ["Receive the document", "Validate and parse", "Map to your schema", "Push to your system"],
  },
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From your data to a delivered, reported invoice."
        text="One request in. Everything country-specific handled for you. Watch the five stages below, or click any of them."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/get-started">Get started</ButtonLink>
          <ButtonLink href="/developers/documentation" variant="secondary">Read the docs</ButtonLink>
        </div>
      </PageHero>

      <PageSection>
        <SectionHeading eyebrow="The pipeline" title="Five stages, one API call." />
        <div className="mt-10">
          <Reveal>
            <Pipeline stages={stages} />
          </Reveal>
        </div>
      </PageSection>

      <PageSection className="bg-fill/50">
        <SectionHeading eyebrow="See it run" title="What your integration looks like." text="A request goes in, the stages complete, and a receipt comes back." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-xl border border-line bg-white p-6">
              <h3 className="text-xl font-medium">API call</h3>
              <p className="mb-4 mt-1 text-base text-ink-2">Send the invoice and watch each stage complete.</p>
              <RunMock />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-xl border border-line bg-white p-6">
              <h3 className="text-xl font-medium">Embedded in your product</h3>
              <p className="mb-4 mt-1 text-base text-ink-2">Or white-label invoice screens inside your own app.</p>
              <EmbedMock />
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Three flows" title="Pick the flow your country needs." text="Most countries use one of these patterns, and some combine two." />
        <Reveal>
          <div className="mt-10">
            <Tabs
              label="Invoice flows"
              tabs={flows.map((f) => ({
                id: f.id,
                label: f.label,
                content: (
                  <div className="rounded-xl border border-line bg-white p-6">
                    <h3 className="text-2xl font-medium">{f.title}</h3>
                    <p className="mt-2 max-w-3xl text-lg text-ink-2">{f.text}</p>
                    <ol className="mt-6 grid gap-3 sm:grid-cols-4">
                      {f.steps.map((s, i) => (
                        <li key={s} className="rounded-lg bg-brand-tint p-4 text-navy">
                          <span className="font-mono text-sm text-brand">Step {i + 1}</span>
                          <span className="mt-1 block text-lg font-medium">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ),
              }))}
            />
          </div>
        </Reveal>
      </PageSection>

    </>
  );
}
