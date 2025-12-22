# Projects Section

## Overview

A premium showcase of side projects and technical experiments. It uses a modern grid layout with immersive hover effects and clear call-to-actions for live demos and source code.

## User Flows

- **Visual Exploration**: User scrolls to the section and sees a curated grid of projects with high-quality previews.
- **Interactive Engagement**: Hovering over a project card reveals metadata (description, full tech stack) and primary action buttons.
- **Deep Dive**: Clicking a project's demo or source link opens the respective destination in a new tab.

## Design Decisions

- High-contrast borders and sharp corners for project cards.
- Immersive hover state that reveals hidden metadata and actions using GSAP transitions.
- IBM Plex Mono for technical tags to provide a "developer" aesthetic.
- Subtle card scaling on hover to give tactile feedback.

## Data Used

**Entities:**

- `Project`
  - `title`
  - `description`
  - `year`
  - `type`
  - `techStack`
  - `previewUrl`
  - `demoUrl`
  - `githubUrl`

## Visual Reference

See `screenshot.png` (if available) for the target UI design.

## Components Provided

- `ProjectGrid` — Container for the projects showcase.
- `ProjectCard` — Interactive card for a single project.

## Callback Props

| Callback        | Description                                     |
| --------------- | ----------------------------------------------- |
| `onViewDetails` | Called when user clicks to view project details |
| `onDemoClick`   | Called when user clicks the demo link           |
| `onSourceClick` | Called when user clicks the GitHub source link  |
