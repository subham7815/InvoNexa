import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero, PageSection } from "@/components/PageHero";
import { GetStartedFlow } from "@/components/get-started/GetStartedFlow";

export const metadata: Metadata = {
  title: "Get started — InvoNexa",
  description: "Choose a plan and tell us about your company to start invoicing with InvoNexa.",
};

export default function GetStartedPage() {
  return (
    <>
      <PageHero eyebrow="Get started" title="Start invoicing in three steps." text="Pick a plan, tell us about your company and confirm. You get sandbox access straight away." />
      <PageSection>
        <div className="max-w-2xl">
          <Suspense fallback={<p className="text-lg text-ink-3">Loading…</p>}>
            <GetStartedFlow />
          </Suspense>
        </div>
      </PageSection>
    </>
  );
}
