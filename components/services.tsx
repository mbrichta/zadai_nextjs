import {
  FileText,
  GitBranch,
  LineChart,
  Settings,
  UserIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { dict } from "@/app/[lang]/page";

type ServicesProps = {
  dictionary: dict;
};

const ICONS = [LineChart, FileText, GitBranch, UserIcon, LineChart];

export function Services({ dictionary }: ServicesProps) {
  const { heading, items } = dictionary.services;

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          {heading}
        </h2>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {items.map(
            (item: { title: string; description: string }, index: number) => {
              const Icon = ICONS[index % ICONS.length]; // Rotate through icons
              return (
                <Card
                  key={item.title}
                  className={`bg-primary text-white hover:bg-primary/90 transition-colors ${
                    index === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/80">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
