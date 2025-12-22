# Milestone 5: Playground Section

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Playground Section — GitHub repositories integration and display.

## Overview

A curated showcase of GitHub repositories, code experiments, and open-source contributions. It shares the same premium, editorial design language as the Projects section.

**Key Functionality:**

- Grid of repository cards
- Repository metadata (stars, language, description)
- Direct links to source code on GitHub
- Clean, typography-driven minimalist aesthetic

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/playground-section/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/playground-section/components/`:

- `PlaygroundGrid.tsx`
- `PlaygroundCard.tsx`

### Data Layer

The components expect these data shapes:

- `PlaygroundItem[]` (title, description, year, type, techStack, githubUrl, stars, language)

You'll need to:

- Create API endpoints or data fetching logic
- Connect real data to the components

### Callbacks

Wire up these user actions:

- `onItemClick`: User clicks a playground item

### Empty States

Implement empty state UI for when no records exist yet.

## Files to Reference

- `product-plan/sections/playground-section/README.md` — Feature overview and design intent
- `product-plan/sections/playground-section/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/playground-section/components/` — React components
- `product-plan/sections/playground-section/types.ts` — TypeScript interfaces
- `product-plan/sections/playground-section/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Browsing Repository Grid

1. User scrolls to the Playground section.
2. Grid of repository items is displayed.
3. **Outcome:** User can see the developer's open-source contributions and experiments.

### Flow 2: Viewing Source on GitHub

1. User clicks on a playground item title or its "Source" link.
2. User is redirected to the GitHub repository.
3. **Outcome:** User can inspect the actual code for an experiment.

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Metadata (stars, language) is displayed correctly
- [ ] Empty states display properly
- [ ] Responsive on mobile
