import React from 'react'
import { HeroSection, ExperienceSection, ProjectsSection, PlaygroundSection } from '../components/sections'
import heroData from '../data/hero-data.json'
import experienceData from '../data/experience.json'
import projectsData from '../data/projects.json'
import playgroundData from '../data/playground.json'

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
    <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-primary-500">Contact Section</h1>
    </div>
)
