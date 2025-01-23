"use client";

import {
  FileText,
  Cloud,
  Network,
  Database,
  Workflow,
  Brain,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const phases = [
  {
    phase: 0,
    title: "Operaciones Analógicas",
    icon: FileText,
    points: [
      "Procesos completamente manuales.",
      "Uso mínimo o nulo de herramientas digitales.",
    ],
  },
  {
    phase: 1,
    title: "Silos en la Nube",
    icon: Cloud,
    points: [
      "Uso de herramientas digitales básicas (Google Workspace, Excel).",
      "Los datos están distribuidos en múltiples aplicaciones.",
    ],
  },
  {
    phase: 2,
    title: "Nube Integrada",
    icon: Network,
    points: [
      "Las herramientas empiezan a trabajar juntas.",
      "Mejor flujo de datos, pero con procesos semi-manuales.",
    ],
  },
  {
    phase: 3,
    title: "Capa de Datos Unificada",
    icon: Database,
    points: [
      "Todos los datos centralizados en una plataforma única.",
      "Las decisiones se basan en información precisa y en tiempo real.",
    ],
  },
  {
    phase: 4,
    title: "Flujos Automatizados",
    icon: Workflow,
    points: [
      "Uso avanzado de automatizaciones.",
      "Intervención humana limitada a decisiones clave.",
    ],
  },
  {
    phase: 5,
    title: "Automatización con IA",
    icon: Brain,
    points: [
      "Implementación de inteligencia artificial para tareas predictivas.",
      "Procesos optimizados y autoajustables.",
    ],
  },
];

export function HowItWorks() {
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ref.classList.add("is-visible");
          } else {
            ref.classList.remove("is-visible");
          }
        },
        {
          threshold: 0.5,
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold py-20 text-[#0B3B5B] text-center">
          Progresando por fases digitales
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-[#0B3B5B]/20 -translate-x-1/2" />

          {/* Timeline items */}
          <div>
            {phases.map((phase, index) => (
              <div
                key={phase.title}
                ref={(el) => (observerRefs.current[index] = el)}
                className={cn(
                  "min-h-[65vh] flex items-center relative opacity-0 translate-y-8",
                  "transition-all duration-700 ease-out",
                  "is-visible:opacity-100 is-visible:translate-y-0"
                )}
              >
                <div className="w-full py-12">
                  <div className="flex items-center md:justify-center mb-8">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0B3B5B] text-white text-lg font-semibold relative z-10 transition-all duration-500 is-visible:scale-125 is-visible:shadow-lg">
                      {phase.phase}
                    </div>
                  </div>

                  <div
                    className={`md:grid md:grid-cols-2 md:gap-16 ${
                      index % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    <div
                      className={`space-y-6 ${
                        index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"
                      }`}
                    >
                      <div
                        className={cn(
                          "flex items-center space-x-4",
                          index % 2 === 0
                            ? "md:justify-end md:flex-row-reverse md:space-x-reverse"
                            : ""
                        )}
                      >
                        <phase.icon className="h-8 w-8 text-[#0B3B5B] transition-all duration-500 is-visible:scale-110 is-visible:rotate-3" />
                        <h3 className="text-2xl font-semibold text-[#0B3B5B] transition-colors duration-500">
                          {phase.title}
                        </h3>
                      </div>
                      <ul className="space-y-4 text-lg text-muted-foreground">
                        {phase.points.map((point, i) => (
                          <li
                            key={i}
                            className="transition-all duration-500 is-visible:text-foreground"
                            style={{
                              transitionDelay: `${i * 150}ms`,
                              opacity: 0,
                              transform: "translateX(-20px)",
                            }}
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-20 text-center max-w-3xl mx-auto text-muted-foreground">
          <p className="text-lg">
            Cada empresa tiene su propio camino hacia la transformación digital.
            Mi objetivo es ayudarte a identificar en qué fase te encuentras y
            guiarte hacia un modelo más eficiente, automatizado y alineado con
            las demandas del mercado actual. Juntos, podemos construir sistemas
            que optimicen tu tiempo, reduzcan costos y preparen a tu negocio
            para el futuro.
          </p>
        </div>
      </div>
    </section>
  );
}
