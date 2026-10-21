import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Container, ButtonLink } from "@/components/ui";

export const metadata = { title: "Page not found — InvoNexa" };

export default function NotFound() {
  return (
    <>
      <Suspense fallback={<div className="h-16" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">
        <Container className="py-24 sm:py-32">
          <p className="font-mono text-sm uppercase tracking-wider text-brand">Error 404</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-medium leading-tight tracking-tight sm:text-6xl">We could not find that page.</h1>
          <p className="mt-5 max-w-xl text-xl text-ink-2">The link may be broken or the page may have moved. Try one of these instead.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/developers/documentation" variant="secondary">Read the docs</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
