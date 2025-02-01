import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import HowWeWork from "@/components/how-we-work";
import { Services } from "@/components/services";
import { Team } from "@/components/team";
import { getDictionary } from "./dictionaries";

export interface dict {
  [key: string]: any;
}

export default async function ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  const dict: dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-background">
      <Hero dictionary={dict} />
      <Services dictionary={dict} />
      <HowItWorks dictionary={dict} />
      <Team dictionary={dict} />
      <HowWeWork dictionary={dict} />
      <ContactSection dictionary={dict} />
      <Footer dictionary={dict} />
    </div>
  );
}
