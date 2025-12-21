# Milestone 2: Hero Section

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Hero Section — Animated hero section with introduction text and tech stack showcase.

## Overview

Animated hero section with introduction text and tech stack showcase. Features micro-animations for text reveal and skill badges.

**Key Functionality:**
- Animated text reveal for introduction
- Tech stack showcase categorized by frontend, backend, and tools
- Social links integration
- Micro-animations for skill badges

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/hero-section/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/hero-section/components/`:
- `HeroSection.tsx`

### Data Layer

The components expect these data shapes:
- `HeroSectionData` (Introduction, mainSkill, socialLinks, techStack)

You'll need to:
- Create API endpoints or data fetching logic
- Connect real data to the components

### Callbacks

Wire up these user actions:
- Social link clicks (external navigation)

### Empty States

Implement empty state UI for when no records exist yet.

## Files to Reference

- `product-plan/sections/hero-section/README.md` — Feature overview and design intent
- `product-plan/sections/hero-section/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/hero-section/components/` — React components
- `product-plan/sections/hero-section/types.ts` — TypeScript interfaces
- `product-plan/sections/hero-section/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Landing and Viewing Introduction

1. User lands on the page.
2. Introduction text animates in (name, title, description).
3. **Outcome:** User sees a visually engaging introduction to the developer.

### Flow 2: Exploring Tech Stack

1. User scrolls to the tech stack part of the hero section.
2. Skill badges appear with micro-animations.
3. **Outcome:** User understands the developer's technical expertise.

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Social links work correctly
- [ ] Matches the visual design and animations
- [ ] Responsive on mobile
