"use client";

import Image from "next/image";

type Member = {
  name: string;
  title: string;
  image: string;
  description: string;
  socialLinks: {
    linkedin: string;
    x: string;
    dribbble: string;
  };
};

const members: Member[] = [
  {
    name: "Mathias Brichta",
    title: "Analista de Negocios y Desarrollador",
    image: "/images/me.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    socialLinks: {
      linkedin: "#",
      x: "#",
      dribbble: "#",
    },
  },
  // Add more members as needed
];

function Card({ member }: { member: Member }) {
  return (
    <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
      <div className="relative w-64 h-80 flex-shrink-0">
        <div
          className="absolute inset-0 bg-primary"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 70%)",
          }}
        />
        <Image
          src={member.image}
          alt={member.name}
          fill
          style={{ objectFit: "contain" }}
          className="relative p-4 pb-0"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="mt-4 sm:ml-6 sm:mt-0">
        <h3 className="text-xl font-semibold">{member.name}</h3>
        <p className="text-sm text-gray-600">{member.title}</p>
        <p className="mt-2 text-sm text-gray-500">{member.description}</p>
        <div className="mt-3 flex justify-center space-x-4 sm:justify-start">
          <a
            href={member.socialLinks.linkedin}
            className="text-gray-600 hover:text-gray-800"
          >
            LinkedIn
          </a>
          <a
            href={member.socialLinks.x}
            className="text-gray-600 hover:text-gray-800"
          >
            X
          </a>
          <a
            href={member.socialLinks.dribbble}
            className="text-gray-600 hover:text-gray-800"
          >
            Dribbble
          </a>
        </div>
      </div>
    </div>
  );
}

export function Team() {
  return (
    <section
      id="team"
      className="mx-auto max-w-4xl px-4 py-12 flex flex-col md:flex-row"
    >
      <h2 className="mb-8 text-3xl font-bold">
        ¿Quién está detrás de Zadai.ai?
      </h2>
      <div className="grid gap-8 md:grid-cols-1">
        {members.map((member, index) => (
          <Card key={index} member={member} />
        ))}
      </div>
    </section>
  );
}
