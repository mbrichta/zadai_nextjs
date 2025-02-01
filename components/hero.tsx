import { dict } from "@/app/[lang]/page";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroPng from "public/images/hero.png";

type HeroProps = {
  dictionary: dict;
};

export function Hero({ dictionary }: HeroProps) {
  const { headingPart1, headingPart2, subheading, ctaLabel } = dictionary.hero;

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="block text-[#8BA793] font-bold mb-2 sm:whitespace-nowrap">
                {headingPart1}
              </span>
              <span className="text-primary block text-4xl lg:text-5xl">
                {headingPart2}
              </span>
            </h1>

            <p className="mt-6 text-muted-foreground max-w-xl">{subheading}</p>

            <div className="mt-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href="https://calendly.com/28mathias23/llamada-60min">
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <Image src={heroPng} alt="Hero" width={500} height={500} />
        </div>
      </div>
    </section>
  );
}
