import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { HowItWorks } from "@/components/how-it-works";
import { Team } from "@/components/team";
import HowWeWork from "@/components/how-we-work";
import ContactForm from "@/components/contact-us";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Services />
      <HowItWorks />
      <Team />
      <HowWeWork />
      <ContactForm />
    </div>
  );
}
