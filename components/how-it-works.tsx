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
import Image from "next/image";
import illustration1 from "public/images/phase1.svg";
import illustration2 from "public/images/phase2.svg";
import illustration3 from "public/images/phase3.svg";
import illustration4 from "public/images/phase4.svg";
import illustration5 from "public/images/phase5.svg";
import illustration6 from "public/images/phase6.svg";

const phases = [
  {
    phase: 0,
    title: "Operaciones Analógicas",
    icon: FileText,
    image: (
      <Image
        src={illustration1}
        alt={`Ilustracion de mujer con papeples`}
        width={250}
      />
    ),
    points: [
      "Procesos completamente manuales.",
      "Uso mínimo o nulo de herramientas digitales.",
    ],
  },
  {
    phase: 1,
    title: "Silos en la Nube",
    icon: Cloud,
    image: (
      <Image
        src={illustration2}
        alt={`Ilustracion de mujer con papeples`}
        width={350}
      />
    ),
    points: [
      "Uso de herramientas digitales básicas (Google Workspace, Excel).",
      "Los datos están distribuidos en múltiples aplicaciones.",
    ],
  },
  {
    phase: 2,
    title: "Nube Integrada",
    icon: Network,
    image: (
      <Image
        src={illustration3}
        alt={`Ilustracion de mujer con papeples`}
        width={300}
      />
    ),
    points: [
      "Las herramientas empiezan a trabajar juntas.",
      "Mejor flujo de datos, pero con procesos semi-manuales.",
    ],
  },
  {
    phase: 3,
    title: "Capa de Datos Unificada",
    icon: Database,
    image: (
      <Image
        src={illustration4}
        alt={`Ilustracion de mujer con papeples`}
        width={300}
      />
    ),
    points: [
      "Todos los datos centralizados en una plataforma única.",
      "Las decisiones se basan en información precisa y en tiempo real.",
    ],
  },
  {
    phase: 4,
    title: "Flujos Automatizados",
    icon: Workflow,
    image: (
      <Image
        src={illustration5}
        alt={`Ilustracion de mujer con papeples`}
        width={300}
      />
    ),
    points: [
      "Uso avanzado de automatizaciones.",
      "Intervención humana limitada a decisiones clave.",
    ],
  },
  {
    phase: 5,
    title: "Automatización con IA",
    icon: Brain,
    image: (
      <Image
        src={illustration6}
        alt={`Ilustracion de mujer con papeples`}
        width={300}
      />
    ),
    points: [
      "Implementación de inteligencia artificial para tareas predictivas.",
      "Procesos optimizados y autoajustables.",
    ],
  },
];

export function HowItWorks() {
  // Create refs for each phase's container to observe both image and content
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref) => {
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
          threshold: 0.3,
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
    <section className="bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold py-20 text-[#0B3B5B] text-center">
          Progresando por fases digitales
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-2 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#0B3B5B]/20" />

          {/* Timeline items */}
          <div className="space-y-40">
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={phase.title}
                  ref={(el) => (observerRefs.current[index] = el)}
                  className={cn(
                    "flex flex-col md:flex-row items-center relative opacity-0 translate-y-8",
                    "transition-all duration-700 ease-out",
                    "is-visible:opacity-100 is-visible:translate-y-0"
                  )}
                >
                  {/* Image */}
                  <div
                    className={cn(
                      "w-full md:w-1/2 px-4",
                      isEven ? "md:order-1" : "md:order-2"
                    )}
                  >
                    <div
                      className={cn(
                        // "opacity-0 transform transition-transform duration-700 ease-out",
                        // "is-visible:opacity-100 is-visible:translate-x-0",
                        isEven ? "translate-x-4" : "translate-x-8"
                      )}
                    >
                      {phase.image}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "w-full md:w-1/2 px-4 mt-8 md:mt-0",
                      isEven ? "md:order-2" : "md:order-1"
                    )}
                  >
                    <div className="flex items-center md:justify-center mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0B3B5B] text-white text-lg font-semibold relative z-10 transition-transform duration-500">
                        {phase.phase}
                      </div>
                    </div>

                    <div
                      className={`${isEven ? "md:text-right" : "md:text-left"}`}
                    >
                      <div
                        className={cn(
                          "flex items-center space-x-4 mb-4",
                          isEven
                            ? "md:justify-end md:flex-row-reverse md:space-x-reverse"
                            : ""
                        )}
                      >
                        <phase.icon className="h-8 w-8 text-[#0B3B5B] transition-transform duration-500" />
                        <h3 className="text-2xl font-semibold text-[#0B3B5B]">
                          {phase.title}
                        </h3>
                      </div>
                      <ul className="space-y-4 text-lg text-muted-foreground">
                        {phase.points.map((point, i) => (
                          <li
                            key={i}
                            className="transition-all duration-500 opacity-0 transform translate-x-[-20px] is-visible:opacity-100 is-visible:translate-x-0"
                            style={{
                              transitionDelay: `${i * 150}ms`,
                            }}
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Connector Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-[#0B3B5B] rounded-full"></div>
                  </div>
                </div>
              );
            })}
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
