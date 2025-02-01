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
import { dict } from "@/app/[lang]/page";

type HowItWorksProps = {
  dictionary: dict;
};

const ICONS = [FileText, Cloud, Network, Database, Workflow, Brain];
const IMAGES = [
  illustration1,
  illustration2,
  illustration3,
  illustration4,
  illustration5,
  illustration6,
];

export function HowItWorks({ dictionary }: HowItWorksProps) {
  const { heading, description, phases } = dictionary.howItWorks;

  // Refs for intersection observer
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
    <section className="bg-background relative py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col items-center pb-20 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B3B5B] text-center">
            {heading}
          </h2>
          <p className="text-xs md:text-sm text-center">{description}</p>
        </div>

        <div className="relative">
          <div className="absolute left-2 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#0B3B5B]/20" />

          <div className="space-y-40">
            {phases.map(
              (phase: { title: string; points: string[] }, index: number) => {
                const Icon = ICONS[index % ICONS.length];
                const ImageSrc = IMAGES[index % IMAGES.length];
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={phase.title}
                    ref={(el) => (observerRefs.current[index] = el)}
                    className={cn(
                      "flex flex-col md:flex-row relative opacity-0 translate-y-8",
                      "transition-all duration-700 ease-out",
                      "is-visible:opacity-100 is-visible:translate-y-0"
                    )}
                  >
                    {/* Image Section */}
                    <div
                      className={cn(
                        "w-full md:w-1/2 px-4",
                        isEven ? "md:order-1" : "md:order-2"
                      )}
                    >
                      <div
                        className={cn(
                          isEven ? "translate-x-4" : "translate-x-8"
                        )}
                      >
                        <Image
                          src={ImageSrc}
                          alt={phase.title}
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div
                      className={cn(
                        "w-full md:w-1/2 px-4 mt-8 md:mt-0",
                        isEven ? "md:order-2" : "md:order-1"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center mb-4",
                          !isEven ? "md:justify-end" : "md:justify-start"
                        )}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0B3B5B] text-white text-lg font-semibold relative z-10 transition-transform duration-500">
                          {index}
                        </div>
                      </div>

                      <div>
                        <div className={cn("flex items-start space-x-4 mb-4")}>
                          <Icon className="h-8 w-8 text-[#0B3B5B] transition-transform duration-500" />
                          <h3 className="text-xl font-semibold text-[#0B3B5B]">
                            {phase.title}
                          </h3>
                        </div>
                        <ul className="space-y-4 text-muted-foreground">
                          {phase.points.map((point: string, i: number) => (
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
                      <div className="w-4 h-4 bg-[#0B3B5B] rounded-full hidden md:block"></div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
