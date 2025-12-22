// Global Data Model Types for Thiago Silva - Developer Portfolio

export interface TechItem {
  name: string
  category: string
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string
  technologies: string[]
  isCurrent: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  year: string
  type: string
  techStack: string[]
  previewUrl: string
  demoUrl?: string
  githubUrl?: string
}

export interface Repository {
  id: string
  title: string
  description: string
  year: string
  type: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  stars?: number
  language?: string
}

export interface ContactLink {
  id: string
  platform: string
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'twitter' | 'mail' | 'globe'
  type: 'social' | 'contact' | 'other'
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
