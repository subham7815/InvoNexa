import type { Metadata } from "next";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WorldMap } from "@/components/WorldMap";
import { ButtonLink } from "@/components/ui";
import { CountryGrid } from "@/components/coverage/CountryGrid";
import { countryList } from "@/data/coverage";

export const metadata: Metadata = {
  title: "Coverage — InvoNexa",
  description: "Countries where InvoNexa handles e-invoicing and e-reporting today, and where we are heading next.",
};

export default function CoveragePage() {
  const live = countryList.filter((c) => c.status === "live").length;
  const soon = countryList.length - live;
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="One API, every mandate you have to meet."
        text={`${live} markets live and ${soon} on the roadmap. Pick a country to see formats, networks and where its mandate is heading.`}
        sample
      >
        <ButtonLink href="/get-started">Get started</ButtonLink>
      </PageHero>
      <PageSection>
        <Reveal variant="fade">
          <div className="rounded-xl border border-line bg-white p-4 sm:p-8">
            <WorldMap />
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base text-ink-2">
              <li className="flex items-center gap-2">
                <span className="size-3 rounded-sm bg-brand" aria-hidden /> Live
              </li>
              <li className="flex items-center gap-2">
                <span className="size-3 rounded-sm bg-brand-tint-2" aria-hidden /> Upcoming
              </li>
            </ul>
          </div>
        </Reveal>
      </PageSection>
      <PageSection className="pt-0">
        <Reveal>
          <CountryGrid />
        </Reveal>
        <p className="mt-8 max-w-3xl text-base text-ink-3">
          Mandate dates shown on country pages are illustrative and change as legislation evolves. Check with your tax advisor before relying on them.
        </p>
      </PageSection>
    </>
  );
}
