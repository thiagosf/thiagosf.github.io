# Milestone 4: Projects Section

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Projects Section — Side projects showcase with descriptions.

## Overview

A premium showcase of side projects and technical experiments. It uses a modern grid layout with immersive hover effects and clear call-to-actions for live demos and source code.

**Key Functionality:**
- Responsive grid of project cards
- High-quality image previews
- Hover effects revealing metadata and action buttons
- Integration of tech tags using the small chip pattern

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/projects-section/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/projects-section/components/`:
- `ProjectGrid.tsx`
- `ProjectCard.tsx`

### Data Layer

The components expect these data shapes:
- `Project[]` (title, description, year, type, techStack, previewUrl, demoUrl, githubUrl)

You'll need to:
- Create API endpoints or data fetching logic
- Connect real data to the components

### Callbacks

Wire up these user actions:
- `onViewDetails`: User clicks to view project details
- `onDemoClick`: User clicks the demo link
- `onSourceClick`: User clicks the GitHub source link

### Empty States

Implement empty state UI for when no records exist yet.

## Files to Reference

- `product-plan/sections/projects-section/README.md` — Feature overview and design intent
- `product-plan/sections/projects-section/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/projects-section/components/` — React components
- `product-plan/sections/projects-section/types.ts` — TypeScript interfaces
- `product-plan/sections/projects-section/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Exploring Projects

1. User scrolls to the Projects section.
2. Grid of project cards is displayed.
3. **Outcome:** User sees a curated list of the developer's side projects.

### Flow 2: Viewing Project Details on Hover

1. User hovers over a project card.
2. Card elevates, description and action buttons animate into view.
3. **Outcome:** User gets more context about a specific project.

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Grid layout is responsive
- [ ] Action links open in new tabs
- [ ] Responsive on mobile
