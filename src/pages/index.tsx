import {
  ContactSection,
  ExperienceSection,
  HeroSection,
  PlaygroundSection,
  ProjectsSection,
} from '../components/sections'
import type { ContactLink } from '../components/sections/contact/types'
import contactData from '../data/contact.json'
import experienceData from '../data/experience.json'
import heroData from '../data/hero-data.json'
import playgroundData from '../data/playground.json'
import projectsData from '../data/projects.json'

const handleContactLinkClick = (id: string, url: string) => {
  const link = contactData.contactLinks.find((entry) => entry.id === id)
  if (link?.type === 'contact' && url.startsWith('mailto:')) {
    window.location.href = url
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

export function LandingPage() {
  return (
    <>
      <HeroSection data={heroData} />
      <ExperienceSection experiences={experienceData} />
      <ProjectsSection projects={projectsData} />
      <PlaygroundSection items={playgroundData} />
      <ContactSection
        contactLinks={(contactData as { contactLinks: ContactLink[] }).contactLinks}
        onLinkClick={handleContactLinkClick}
      />
    </>
  )
}

export default LandingPage
