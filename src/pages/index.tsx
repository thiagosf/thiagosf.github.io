import React from 'react'
import { HeroSection } from '../components/sections'
import heroData from '../data/hero-data.json'

export const HeroPage = () => (
    <HeroSection data={heroData} />
)

export const ExperiencePage = () => (
    <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-primary-500">Experience Section</h1>
    </div>
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
