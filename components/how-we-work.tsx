"use client";

function StepCard({ title, content }) {
  return (
    <div className="bg-white">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{content}</p>
    </div>
  );
}

export default function HowWeWork() {
  const steps = [
    {
      title: "1. Alinear y Priorizar",
      content:
        "Entendemos tus necesidades, objetivos y cuellos de botella para definir prioridades y un plan de acción sólido.",
    },
    {
      title: "2. Documentar y Unificar",
      content:
        "Mapeamos procesos y centralizamos la información, creando una única fuente de verdad.",
    },
    {
      title: "3. Automatizar, Delegar, Eliminar",
      content:
        "Identificamos tareas que se pueden automatizar o delegar para mejorar la eficiencia.",
    },
    {
      title: "4. ¡Implementar y Crecer!",
      content:
        "Con todo listo, capacitamos a tu equipo y supervisamos el arranque para un crecimiento sostenible.",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 mb-12">
        {/* Heading & Intro */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo trabajamos</h2>
        <p className="text-gray-600 max-w-3xl mb-6">
          En Buzo Digital, combinamos estrategia y tecnología para optimizar tus
          procesos. Nuestro enfoque se apoya en cuatro fases clave...
        </p>
        <button className="border border-gray-700 px-4 py-2 rounded hover:bg-gray-700 hover:text-white transition">
          Agenda una llamada
        </button>
      </div>

      <div className="relative mt-12 max-w-5xl mx-auto px-4">
        {/* 
          On large screens (lg): 2 rows × 4 columns → 8 total cells.
          Each row is: [Card, Empty, Card, Empty].
          On small screens, the empty columns are hidden.
        */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:grid-rows-2">
          {/* Row 1, Col 1: Step 1 */}
          <div className="lg:row-start-1 lg:col-start-1">
            <StepCard title={steps[0].title} content={steps[0].content} />
          </div>

          {/* Row 1, Col 2: empty (only appears on lg) */}
          <div className="hidden lg:block lg:row-start-1 lg:col-start-2" />

          {/* Row 1, Col 3: Step 2 */}
          <div className="lg:row-start-2 lg:col-start-2">
            <StepCard title={steps[1].title} content={steps[1].content} />
          </div>

          {/* Row 1, Col 4: empty (only appears on lg) */}
          <div className="hidden lg:block lg:row-start-1 lg:col-start-4" />

          {/* Row 2, Col 1: Step 3 */}
          <div className="lg:row-start-1 lg:col-start-3">
            <StepCard title={steps[2].title} content={steps[2].content} />
          </div>

          {/* Row 2, Col 2: empty (only appears on lg) */}
          <div className="hidden lg:block lg:row-start-2 lg:col-start-2" />

          {/* Row 2, Col 3: Step 4 */}
          <div className="lg:row-start-2 lg:col-start-4">
            <StepCard title={steps[3].title} content={steps[3].content} />
          </div>

          {/* Row 2, Col 4: empty (only appears on lg) */}
          <div className="hidden lg:block lg:row-start-2 lg:col-start-4" />
        </div>
      </div>
    </section>
  );
}
