export interface TechItem {
  name: string
  category: string
}

export interface HeroSectionData {
  introduction: {
    name: string
    title: string
    subtitle: string
    description: string
    tagline: string
  }
  mainSkill: {
    label: string
    description: string
  }
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
  }
  techStack: {
    frontend: TechItem[]
    backend: TechItem[]
    tools: TechItem[]
  }
}

export interface HeroSectionProps {
  data: HeroSectionData
}
