import React from "react";

interface Step {
  title: string;
  content: string;
  dotPosition: "top" | "bottom";
}

interface StepCardProps extends Step {}

function StepCard({ title, content, dotPosition }: StepCardProps) {
  /*
    We'll have TWO dots in each card:
      1) A dot for large screens (the horizontal timeline)
      2) A dot for small screens (the vertical timeline)

    That way, each dot can be individually positioned and shown/hidden
    at the correct breakpoint.
  */

  // For the horizontal timeline (large screens), dot is at top or bottom.
  const largeScreenDotPositionClasses =
    dotPosition === "bottom"
      ? "bottom-0 translate-y-6" // half out at bottom
      : "top-0 -translate-y-6"; // half out at top

  return (
    <div className="relative p-4 border bg-white rounded shadow lg:pl-8 h-full">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{content}</p>

      {/* 
        Dot for mobile (vertical timeline):
        - Visible on <lg, hidden on lg+ 
        - We place it in the middle of the card (vertically)
          and near the left edge where the vertical line is. 
      */}
      <div
        className="
          block lg:hidden
          absolute
          w-4 h-4
          bg-primary
          rounded-full
          -left-8  
          top-1/2
          -translate-y-1/2
        "
      />

      {/*
        Dot for large screens (horizontal timeline):
        - Hidden on mobile (<lg), visible on lg+
        - Position depends on dotPosition (top or bottom).
      */}
      <div
        className={`
          hidden lg:block 
          absolute 
          w-4 h-4 
          bg-primary 
          rounded-full 
          left-1/2 
          -translate-x-1/2
          ${largeScreenDotPositionClasses}
        `}
      />
    </div>
  );
}

export default function HowWeWork() {
  const steps: Step[] = [
    {
      title: "1. Alinear y Priorizar",
      content:
        "Entendemos tus necesidades y cuellos de botella para definir prioridades.",
      dotPosition: "bottom", // (Top row in desktop view)
    },
    {
      title: "2. Documentar y Unificar",
      content:
        "Mapeamos procesos y centralizamos info para una sola fuente de verdad.",
      dotPosition: "top", // (Bottom row in desktop view)
    },
    {
      title: "3. Automatizar, Delegar, Eliminar",
      content:
        "Identificamos tareas automatizables o delegables para mayor eficiencia.",
      dotPosition: "bottom",
    },
    {
      title: "4. ¡Implementar y Crecer!",
      content:
        "Capacitamos al equipo y supervisamos el arranque para crecimiento sostenible.",
      dotPosition: "top",
    },
  ];

  return (
    <section id="how-we-work" className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo trabajamos</h2>
        <p className="text-gray-600 max-w-3xl mb-6">
          En Buzo Digital, combinamos estrategia y tecnología para optimizar tus
          procesos.
        </p>
        <button className="border border-gray-700 px-4 py-2 rounded hover:bg-gray-700 hover:text-white transition">
          Agenda una llamada
        </button>
      </div>

      <div className="relative mt-12 max-w-5xl mx-auto px-4">
        {/*
          VERTICAL TIMELINE for mobile:
          ----------------------------------
          - Visible on <lg, hidden on lg
          - A thin line along the left side, filling the container height
        */}
        <div
          className="
            absolute
            left-4
            top-0
            bottom-0
            w-[2px]
            bg-gray-300
            block
            lg:hidden
            z-0
          "
        />

        {/*
          HORIZONTAL TIMELINE for desktop:
          ----------------------------------
          - Hidden on mobile, visible on lg+
          - Placed at 50% vertical height
        */}
        <div
          className="
            hidden
            lg:block
            absolute
            left-0
            w-full
            h-[2px]
            bg-gray-300
            top-1/2
            z-0
          "
        />

        {/*
          GRID LAYOUT (2 rows x 4 columns on lg, single column on mobile)
        */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:grid-rows-2 relative z-10 px-6">
          {/* Step 1: Top row, col 1 (desktop) */}
          <div className="lg:row-start-1 lg:col-start-1">
            <StepCard {...steps[0]} />
          </div>

          {/* Step 2: Bottom row, col 2 (desktop) */}
          <div className="lg:row-start-2 lg:col-start-2">
            <StepCard {...steps[1]} />
          </div>

          {/* Step 3: Top row, col 3 (desktop) */}
          <div className="lg:row-start-1 lg:col-start-3">
            <StepCard {...steps[2]} />
          </div>

          {/* Step 4: Bottom row, col 4 (desktop) */}
          <div className="lg:row-start-2 lg:col-start-4">
            <StepCard {...steps[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
