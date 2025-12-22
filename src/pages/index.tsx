import { ContactSection, HeroSection, ExperienceSection, ProjectsSection, PlaygroundSection } from '../components/sections'
import heroData from '../data/hero-data.json'
import experienceData from '../data/experience.json'
import projectsData from '../data/projects.json'
import playgroundData from '../data/playground.json'
import contactData from '../data/contact.json'

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
            <ContactSection contactLinks={contactData.contactLinks} onLinkClick={handleContactLinkClick} />
        </>
    )
}

export default LandingPage
