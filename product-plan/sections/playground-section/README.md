# Playground Section

## Overview

A curated showcase of GitHub repositories, code experiments, and open-source contributions. It shares the same premium, editorial design language as the Projects section.

## User Flows

- Users can browse a grid of repositories/experiments.
- Users can view repository details (stars, language, description).
- Users can click to view the source code on GitHub.

## Design Decisions

- Typography-driven layout focusing on the repository names and descriptions.
- Use of mono fonts for language and star count to emphasize the technical nature.
- Consistent background patterns with other sections for visual flow.
- Micro-animations on entry and hover to maintain a "living" feel.

## Data Used

**Entities:**
- `PlaygroundItem`
  - `title`
  - `description`
  - `year`
  - `type`
  - `techStack`
  - `githubUrl`
  - `stars`
  - `language`

## Visual Reference

See `screenshot.png` (if available) for the target UI design.

## Components Provided

- `PlaygroundGrid` — Container for playground items.
- `PlaygroundCard` — Individual card for a repository or experiment.

## Callback Props

| Callback | Description |
|----------|-------------|
| `onItemClick` | Called when a user clicks on a playground item |
