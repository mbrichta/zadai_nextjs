import { supabase } from "@/lib/supabase";
import ContactFormSmall from "./ui/small-contact-form";

interface Service {
  id: string;
  name: string;
  value: string;
}

const ContactSection = async () => {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    console.error("Error fetching services:", error.message);

    return (
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Contáctanos</h2>
          <p className="text-red-500">
            Hubo un error al cargar los servicios. Por favor, inténtalo de nuevo
            más tarde.
          </p>
        </div>
      </section>
    );
  }

  const services = data || [];

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="text-sm uppercase text-gray-500 block mb-2">
          Eslogan
        </span>
        <h2 className="text-3xl font-bold mb-2">Contáctanos</h2>
        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <ContactFormSmall services={services} />
      </div>
    </section>
  );
};

export default ContactSection;
