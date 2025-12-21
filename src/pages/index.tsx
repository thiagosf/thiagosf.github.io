import React from 'react'
import { ContactSection, HeroSection, ExperienceSection, ProjectsSection, PlaygroundSection } from '../components/sections'
import heroData from '../data/hero-data.json'
import experienceData from '../data/experience.json'
import projectsData from '../data/projects.json'
import playgroundData from '../data/playground.json'
import contactData from '../data/contact.json'

export const HeroPage = () => (
    <HeroSection data={heroData} />
)

export const ExperiencePage = () => (
    <ExperienceSection experiences={experienceData} />
)

export const ProjectsPage = () => (
    <ProjectsSection projects={projectsData} />
)

export const PlaygroundPage = () => {
    const handleItemClick = (id: string) => {
        const item = playgroundData.find(p => p.id === id)
        if (item?.githubUrl) {
            window.open(item.githubUrl, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <PlaygroundSection
            items={playgroundData}
            onItemClick={handleItemClick}
        />
    )
}

export const ContactPage = () => (
    <ContactSection
        contactLinks={contactData.contactLinks}
        onLinkClick={(id, url) => {
            const link = contactData.contactLinks.find((item) => item.id === id)
            if (link?.type === 'contact' && url.startsWith('mailto:')) {
                window.location.href = url
                return
            }
            window.open(url, '_blank', 'noopener,noreferrer')
        }}
    />
)
