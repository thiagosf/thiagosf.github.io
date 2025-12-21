# Thiago Silva - Developer Portfolio — Complete Implementation Instructions

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

# Product Overview

## Summary

A personal landing page showcasing Thiago Silva Ferreira's work as a full-stack developer. Features an animated hero section with GSAP geometric background animations, structured sections for experience, side projects, and a playground of GitHub repositories. Highlights both creative front-end work and full-stack capability.

## Planned Sections

1. **Hero Section** — Animated hero section with GSAP geometric background animations, introduction, and tech stack showcase.
2. **Experience Section** — Professional roles and achievements showcase.
3. **Projects Section** — Side projects showcase with descriptions.
4. **Playground Section** — GitHub repositories integration and display.
5. **Contact Section** — Social links (GitHub, Twitter, LinkedIn) and contact information.

---

# Milestone 1: Foundation

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

### 1. Design Tokens

Configure your styling system with these tokens:
- Primary: lime
- Secondary: emerald
- Neutral: stone
- Heading: Sora
- Body: Sora
- Mono: IBM Plex Mono

### 2. Data Model Types

Create TypeScript interfaces for your core entities:
- Experience
- Project
- Repository
- ContactLink
- TechStackItem

### 3. Routing Structure

Create placeholder routes for each section:
- `/` — Hero Section
- `/experience` — Experience Section
- `/projects` — Projects Section
- `/playground` — Playground Section
- `/contact` — Contact Section

---

# Milestone 2: Hero Section

Implement the Hero Section — Animated hero section with introduction text and tech stack showcase.

**Key Functionality:**
- Animated text reveal for introduction
- Tech stack showcase categorized by frontend, backend, and tools
- Social links integration
- Micro-animations for skill badges

---

# Milestone 3: Experience Section

Implement the Experience Section — Professional roles and achievements showcase.

**Key Functionality:**
- Chronological timeline of professional roles
- Detailed achievements for each role
- Tech chips for primary technologies used
- Vertical timeline with geometric nodes

---

# Milestone 4: Projects Section

Implement the Projects Section — Side projects showcase with descriptions.

**Key Functionality:**
- Responsive grid of project cards
- High-quality image previews
- Hover effects revealing metadata and action buttons
- Integration of tech tags using the small chip pattern

---

# Milestone 5: Playground Section

Implement the Playground Section — GitHub repositories integration and display.

**Key Functionality:**
- Grid of repository cards
- Repository metadata (stars, language, description)
- Direct links to source code on GitHub
- Clean, typography-driven minimalist aesthetic

---

# Milestone 6: Contact Section

Implement the Contact Section — Social links and contact information.

**Key Functionality:**
- List of social platforms and contact methods
- Animated section title
- Hover effects on social links
- Icons for each platform
