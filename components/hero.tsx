import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight overflow-visible">
              <span className="block text-[#8BA793] font-bold mb-2 whitespace-nowrap">
                Impulsa tu negocio con
              </span>
              <span className="text-primary block text-4xl lg:text-5xl">
                soluciones digitales de
                <br />
                alto impacto
              </span>
            </h1>
            <p className="mt-6  text-muted-foreground max-w-xl">
              Nuestro objetivo es llevar la transformación digital de tu empresa
              al siguiente nivel. Desde sitios web cautivadores hasta chatbots
              inteligentes y procesos automatizados, te ofrezco soluciones a
              medida para que destaques en un mundo cada vez más digital.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href="https://calendly.com/28mathias23/llamada-60min">
                  Agenda una llamada
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <Image src="/images/hero.png" alt="Hero" width={500} height={500} />
        </div>
      </div>
    </section>
  );
}
