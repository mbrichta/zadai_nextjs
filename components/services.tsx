import { FileText, GitBranch, LineChart, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const services = [
  {
    title: "Estrategia Digital Integrada",
    description:
      "Te acompaño en la creación de una estrategia digital completa. Desde definir tus objetivos hasta implementar soluciones concretas, trabajo contigo para construir un plan claro y medible que impulse el crecimiento de tu negocio.",
    icon: LineChart,
    isLarge: true,
  },
  {
    title: "Documentación de Procesos (SOPs)",
    description:
      "Creo manuales y procedimientos estándar para que cada tarea y operación de tu negocio esté documentada y sea fácil de replicar.",
    icon: FileText,
  },
  {
    title: "Automatización de Procesos",
    description:
      "Implemento herramientas como chatbots, flujos de trabajo y sistemas personalizados que te ahorran tiempo y dinero.",
    icon: GitBranch,
  },
  {
    title: "Creación de Sistemas Operativos Empresariales",
    description:
      "Construyo soluciones personalizadas como CRMs o sistemas de automatización que centralizan toda la información y los procesos de tu negocio.",
    icon: Settings,
  },
  {
    title: "Optimización de Herramientas Digitales",
    description:
      "Simplifico tus procesos eliminando herramientas innecesarias y reemplazándolas con flujos integrados diseñados para tu empresa.",
    icon: LineChart,
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#0B3B5B]">
          Cómo puedo mejorar tu empresa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`bg-[#0B3B5B] text-white hover:bg-[#0B3B5B]/90 transition-colors ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/80">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
