# Hero Section

## Overview

Animated hero section with introduction text and tech stack showcase. Features micro-animations for text reveal and skill badges.

## User Flows

- User lands on page and sees animated hero section
- Text animates in with staggered timing
- Tech stack skills appear with micro-animations

## Design Decisions

- Use of absolute positioning and z-indexing to layer text and animations.
- Gradient background from stone-50 to stone-100 (light) or stone-950 (dark) for a premium feel.
- Letter-by-letter animation for the user's name to create a strong first impression.
- Cycling tech stack display to showcase broad expertise without cluttering the UI.

## Data Used

**Entities:**
- `HeroSectionData`
  - `introduction`
  - `mainSkill`
  - `socialLinks`
  - `techStack`

## Visual Reference

See `screenshot.png` (if available) for the target UI design.

## Components Provided

- `HeroSection` — Main component containing the introduction and tech stack animation.

## Callback Props

| Callback | Description |
|----------|-------------|
| None | Currently uses static links for social profiles |
