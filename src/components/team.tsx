import type { dict } from '@/types/dictionary'
import { Instagram, LinkedinIcon } from 'lucide-react'

type Member = {
  name: string
  title: string
  description: string
}

type TeamProps = {
  dictionary: dict
}

const TEAM_MEMBERS = [
  {
    name: 'Mathias Brichta',
    title: 'Business Analyst and Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    image: '/images/me.png',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mathias-brichta',
      instagram: 'https://intagram.com/mathiasbrichta',
    },
  },
]

function MemberCard({
  member,
  socialLinks,
  image,
}: {
  member: Member
  socialLinks: { linkedin: string; instagram: string }
  image: string
}) {
  return (
    <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
      <div className="relative w-64 h-80 flex-shrink-0">
        <div
          className="absolute inset-0 bg-primary"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 70%)',
          }}
        />
        <img
          src={image}
          alt={member.name}
          className="relative p-4 pb-0 w-full h-full object-contain"
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
  )
}

export function Team({ dictionary }: TeamProps) {
  const team = dictionary.team as { heading: string; members: Member[] }
  const { heading, members } = team

  return (
    <section
      id="team"
      className="mx-auto max-w-4xl px-4 py-12 flex flex-col md:flex-row gap-4"
    >
      <h2 className="mb-8 text-3xl font-bold">{heading}</h2>

      <div className="grid gap-8 md:grid-cols-1">
        {TEAM_MEMBERS.map((teamMember, index) => {
          const translatedMember = members.find(
            (m) => m.name === teamMember.name,
          )

          return (
            <MemberCard
              key={index}
              member={translatedMember || teamMember}
              socialLinks={teamMember.socialLinks}
              image={teamMember.image}
            />
          )
        })}
      </div>
    </section>
  )
}
