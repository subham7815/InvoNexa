import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactModal";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact — InvoNexa",
  description: "Talk to the InvoNexa team about pricing, coverage or a partnership.",
};

const details = [
  { label: "Sales", value: "sales@invonexa.example", href: "mailto:sales@invonexa.example" },
  { label: "Support", value: "support@invonexa.example", href: "mailto:support@invonexa.example" },
  { label: "Security", value: "security@invonexa.example", href: "mailto:security@invonexa.example" },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your invoicing."
        text="Tell us where you operate and what you need. A real person on the team replies within one business day."
      />
      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
              <h2 className="mb-5 text-2xl font-medium">Send a message</h2>
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <aside className="space-y-4" aria-label="Contact details">
              <div className="rounded-xl border border-line bg-white p-6">
                <h2 className="text-xl font-medium">Email us</h2>
                <ul className="mt-3 space-y-3">
                  {details.map((d) => (
                    <li key={d.label}>
                      <p className="text-sm text-ink-3">{d.label}</p>
                      <a href={d.href} className="text-lg text-brand underline focus-visible:outline-2 focus-visible:outline-brand">
                        {d.value}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ink-3">Sample addresses on a reserved example domain.</p>
              </div>
              <div className="rounded-xl border border-line bg-white p-6">
                <h2 className="text-xl font-medium">Office hours</h2>
                <p className="mt-2 text-lg text-ink-2">Monday to Friday, 09:00 to 18:00 CET.</p>
              </div>
              <div className="rounded-xl border border-line bg-brand-tint p-6 text-navy">
                <h2 className="text-xl font-medium">Looking for something else?</h2>
                <ul className="mt-2 space-y-1 text-lg">
                  <li><Link href="/status" className="underline">Check platform status</Link></li>
                  <li><Link href="/developers/documentation" className="underline">Read the documentation</Link></li>
                  <li><Link href="/careers" className="underline">Explore careers</Link></li>
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </PageSection>
    </>
  );
}
