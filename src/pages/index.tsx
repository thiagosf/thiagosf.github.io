import React from 'react'
import { HeroSection, ExperienceSection } from '../components/sections'
import heroData from '../data/hero-data.json'
import experienceData from '../data/experience.json'

export const HeroPage = () => (
    <HeroSection data={heroData} />
)

export const ExperiencePage = () => (
    <ExperienceSection experiences={experienceData} />
)

export const ProjectsPage = () => (
    <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-primary-500">Projects Section</h1>
    </div>
)

export const PlaygroundPage = () => (
    <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-primary-500">Playground Section</h1>
    </div>
)

export const ContactPage = () => (
    <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-primary-500">Contact Section</h1>
    </div>
)
