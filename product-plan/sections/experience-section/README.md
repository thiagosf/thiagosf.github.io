# Experience Section

## Overview

A high-impact, editorial-style showcase of professional milestones. It uses a clean vertical timeline and grid layout to present career growth with premium typography and subtle animations.

## User Flows

- **Smooth Scrolling**: Content reveals with subtle fade-in and slide-up animations as the user scrolls.
- **Interactive Details**: Hovering over an experience item highlights the role's primary tech stack and slightly shifts the layout for emphasis.
- **Content Exploration**: Users can see a chronological journey from present to past, with a clear distinction between current and previous roles.

## Design Decisions

- Minimalist vertical timeline with geometric nodes (squares) for a modern, architectural look.
- Sora typeface for headers to maintain consistency with the Hero section.
- Sharp-cornered (rounded-none) chips for technology tags to align with the neo-brutalist/editorial aesthetic.
- Use of accent color (Lime) for company names to guide the eye.

## Data Used

**Entities:**
- `Experience`
  - `role`
  - `company`
  - `location`
  - `period`
  - `description`
  - `technologies`
  - `isCurrent`

## Visual Reference

See `screenshot.png` (if available) for the target UI design.

## Components Provided

- `ExperienceSection` — Main container for the experience list.
- `ExperienceItem` — Individual card for each professional role.

## Callback Props

| Callback | Description |
|----------|-------------|
| `onItemClick` | Called when a user interacts with a specific experience item |
| `onFilterTech` | Called when a user filters experiences by technology |
