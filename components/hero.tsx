import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-[#8BA793] font-bold mb-2">
                Impulsa tu negocio con
              </span>
              <span className="text-[#0B3B5B] block">
                soluciones digitales de
                <br />
                alto impacto
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Nuestro objetivo es llevar la transformación digital de tu empresa
              al siguiente nivel. Desde sitios web cautivadores hasta chatbots
              inteligentes y procesos automatizados, te ofrezco soluciones a
              medida para que destaques en un mundo cada vez más digital.
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-[#0B3B5B] hover:bg-[#0B3B5B]/90">
                Agenda una llamada
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative lg:ml-auto">
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              <div className="relative aspect-[4/3]">
                <div className="absolute inset-0">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#E8ECF1] transform translate-y-12"></div>
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#E8ECF1]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
