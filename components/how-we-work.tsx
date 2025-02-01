import { dict } from "@/app/[lang]/page";
interface Step {
  title: string;
  content: string;
  dotPosition: "top" | "bottom";
}

function StepCard({ title, content, dotPosition }: Step) {
  const largeScreenDotPositionClasses =
    dotPosition === "bottom"
      ? "bottom-0 translate-y-6"
      : "top-0 -translate-y-6";

  return (
    <div className="relative p-4 border bg-white rounded shadow h-full ml-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{content}</p>

      {/* Dot for mobile */}
      <div
        className="
          block lg:hidden
          absolute
          w-4 h-4
          bg-primary
          rounded-full
          -left-6 
          top-1/2
          -translate-y-1/2
        "
      />

      {/* Dot for large screens */}
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

export default function HowWeWork({ dictionary }: dict) {
  const { heading, subheading, steps, ctaLabel } = dictionary.howWeWork;

  return (
    <section id="how-we-work" className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        <p className="text-gray-600 max-w-3xl mb-6">{subheading}</p>
      </div>

      <div className="relative mt-12 max-w-5xl mx-auto px-4">
        {/* Vertical timeline for mobile */}
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

        {/* Horizontal timeline for desktop */}
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:grid-rows-2 relative z-10">
          {steps.map((step: Step, index: number) => (
            <div
              key={index}
              className={`lg:row-start-${
                step.dotPosition === "top" ? 2 : 1
              } lg:col-start-${index + 1}`}
            >
              <StepCard {...step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
