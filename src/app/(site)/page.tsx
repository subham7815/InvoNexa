import { Coverage, Customers, Faq, Hero, Integrate, Security, Workflows } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Workflows />
      <Integrate />
      <Coverage />
      <Customers />
      <Security />
      <Faq />
    </>
  );
}
