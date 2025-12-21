# Milestone 3: Experience Section

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Experience Section — Professional roles and achievements showcase.

## Overview

A high-impact, editorial-style showcase of professional milestones. It uses a clean vertical timeline and grid layout to present career growth with premium typography and subtle animations.

**Key Functionality:**
- Chronological timeline of professional roles
- Detailed achievements for each role
- Tech chips for primary technologies used
- Vertical timeline with geometric nodes

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/experience-section/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/experience-section/components/`:
- `ExperienceSection.tsx`
- `ExperienceItem.tsx`

### Data Layer

The components expect these data shapes:
- `Experience[]` (role, company, location, period, description, technologies, isCurrent)

You'll need to:
- Create API endpoints or data fetching logic
- Connect real data to the components

### Callbacks

Wire up these user actions:
- `onItemClick`: Called when a user interacts with a specific experience item
- `onFilterTech`: Called when a user filters experiences by technology

### Empty States

Implement empty state UI for when no records exist yet.

## Files to Reference

- `product-plan/sections/experience-section/README.md` — Feature overview and design intent
- `product-plan/sections/experience-section/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/experience-section/components/` — React components
- `product-plan/sections/experience-section/types.ts` — TypeScript interfaces
- `product-plan/sections/experience-section/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Browsing Professional History

1. User scrolls to the Experience section.
2. Experience items fade in and slide up as the user scrolls.
3. **Outcome:** User can chronologically browse the developer's career journey.

### Flow 2: Filtering by Technology

1. User clicks on a technology chip (if implemented).
2. List filters or highlights related roles.
3. **Outcome:** User can see specific roles where a technology was applied.

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Timeline renders correctly with nodes
- [ ] Empty states display properly
- [ ] Responsive on mobile
