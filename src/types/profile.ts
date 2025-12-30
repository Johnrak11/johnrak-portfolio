export type LinkItem = { label: string; url: string }

export type Profile = {
  basics: {
    name: string
    headline: string
    location: string
    summary: string
    avatarUrl?: string
    email?: string
    links: LinkItem[]
  }
  highlights: { label: string; value: string }[]
  skills: string[]
  experience: {
    company: string
    title: string
    location?: string
    start: string
    end: string | null
    bullets: string[]
  }[]
  projects: {
    name: string
    tagline: string
    stack: string[]
    links?: LinkItem[]
  }[]
  certifications: {
    name: string
    issuer: string
    issued: string
    expires?: string
    url?: string
  }[]
  education: {
    school: string
    degree: string
    start?: string
    end?: string
    url?: string
  }[]
}
