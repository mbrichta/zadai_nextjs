import ContactForm from "@/components/large-contact-form";
import { getDictionary } from "../dictionaries";

interface PageProps {
  params: {
    lang: string;
  };
}

export default async function Page({ params }: PageProps) {
  const lang = params.lang;
  console.log({ lang });

  const dict = await getDictionary(lang);
  console.log({ dict });

  return <ContactForm dict={dict} />;
}
