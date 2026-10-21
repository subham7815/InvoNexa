import type { Metadata } from "next";
import { DemoBanner } from "@/components/developers/shared";
import { StepCode } from "@/components/developers/StepCode";
import { PageHero, PageSection } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui";
import { BASE_URL, gettingStartedSteps } from "@/data/developers";

export const metadata: Metadata = { title: "Getting started — InvoNexa" };

export default function GettingStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Getting started"
        title="From zero to a reported invoice in four steps."
        text={`Every example targets ${BASE_URL}. Pick your language once per step and copy the snippet.`}
      >
        <DemoBanner />
      </PageHero>

      <PageSection>
        <ol className="space-y-12">
          {gettingStartedSteps.map((s, i) => (
            <li key={s.title} className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
              <Reveal>
                <div className="flex gap-4">
                  <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand font-mono text-lg font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h2 className="text-3xl font-medium tracking-tight">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h2>
                    <p className="mt-3 text-lg text-ink-2">{s.text}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <StepCode stepId={`step${i + 1}`} snippets={s.snippets} />
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap gap-3">
          <ButtonLink href="/developers/api-reference">Try it live in the API reference</ButtonLink>
          <ButtonLink href="/developers/documentation" variant="secondary">
            Read the full docs
          </ButtonLink>
        </div>
      </PageSection>

    </>
  );
}
