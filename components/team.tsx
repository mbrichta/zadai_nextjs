"use client";

import { dict } from "@/app/[lang]/page";
import { Instagram, InstagramIcon, LinkedinIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import me from "public/images/me.png";

type Member = {
  name: string;
  title: string;
  description: string;
};

type TeamDictionary = {
  team: {
    heading: string;
    members: Member[];
  };
};

type TeamProps = {
  dictionary: dict;
};

const TEAM_MEMBERS: (Member & {
  image: StaticImageData;
  socialLinks: {
    linkedin: string;
    instagram: string;
  };
})[] = [
  {
    name: "Mathias Brichta",
    title: "Business Analyst and Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    image: me,
    socialLinks: {
      linkedin: "https://linkedin.com/in/mathias-brichta",
      instagram: "https://intagram.com/mathiasbrichta",
    },
  },
];

function Card({
  member,
  socialLinks,
  image,
}: {
  member: Member;
  socialLinks: { linkedin: string; instagram: string };
  image: StaticImageData;
}) {
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
          src={image}
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
            href={socialLinks.linkedin}
            className="text-gray-600 hover:text-gray-800"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={socialLinks.instagram}
            className="text-gray-600 hover:text-gray-800"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Team({ dictionary }: dict) {
  const { heading, members } = dictionary.team;

  return (
    <section
      id="team"
      className="mx-auto max-w-4xl px-4 py-12 flex flex-col md:flex-row gap-4"
    >
      <h2 className="mb-8 text-3xl font-bold">{heading}</h2>

      <div className="grid gap-8 md:grid-cols-1">
        {TEAM_MEMBERS.map((teamMember, index) => {
          const translatedMember = members.find(
            (m: Member) => m.name === teamMember.name
          );

          return (
            <Card
              key={index}
              member={translatedMember || teamMember} // Use translated text if available
              socialLinks={teamMember.socialLinks}
              image={teamMember.image}
            />
          );
        })}
      </div>
    </section>
  );
}
