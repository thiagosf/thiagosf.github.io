# Test Instructions: Hero Section

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, React Testing Library, etc.).

## Overview

The Hero section is the first thing users see. Tests should focus on the correct rendering of introduction text, the tech stack cycling animation, and social links.

---

## User Flow Tests

### Flow 1: Rendering Introduction

**Scenario:** User lands on the page and sees their info.

#### Success Path

**Setup:**

- Provide standard `HeroSectionData` from `sample-data.json`.

**Steps:**

1. User navigates to the home page.
2. Verify the name "Thiago" appears (animated letters).
3. Verify the title "Creative Developer" is visible.
4. Verify the description text matches the sample data.

**Expected Results:**

- [ ] Name elements are present in the DOM.
- [ ] Title and subtitle are correctly rendered.
- [ ] Social icons (GitHub, LinkedIn, Twitter) are visible.

---

## Animation Tests

### Tech Stack Cycling

**Scenario:** The tech stack category and items change over time.

**Steps:**

1. Wait for the initial animation delay.
2. Verify "Frontend" category is shown first.
3. Wait for the cycling duration (approx 5-7 seconds).
4. Verify the category changes to "Backend" or "Tools".

**Expected Results:**

- [ ] Technology names (e.g., "React", "Node.js") are rendered as animated letters.
- [ ] Category labels update correctly.

---

## Component Interaction Tests

### Social Icons

**Renders correctly:**

- [ ] Each social link has the correct `href`.
- [ ] Each icon renders the appropriate Lucide component.

**User interactions:**

- [ ] Clicking a social icon opens the correct URL in a new tab (`target="_blank"`).

---

## Edge Cases

- [ ] Handles missing social links gracefully.
- [ ] Works correctly if one of the tech stack categories is empty.
- [ ] Animation restarts correctly if the component is unmounted and remounted.

---

## Accessibility Checks

- [ ] Social links have `aria-label` for screen readers.
- [ ] Color contrast for text against the gradient background meets WCAG AA.
- [ ] Animated letters do not interfere with screen reader text content (use `aria-hidden` or visually hidden text if necessary).

---

## Sample Test Data

```typescript
const mockHeroData = {
  introduction: {
    name: 'Test User',
    title: 'Testing Engineer',
    subtitle: 'Verification at scale',
    description: 'This is a test description.',
    tagline: 'Test • Verify • Deploy',
  },
  mainSkill: {
    label: 'Automated Testing',
    description: 'Ensuring quality',
  },
  socialLinks: {
    github: 'https://github.com/test',
    linkedin: 'https://linkedin.com/in/test',
    twitter: 'https://twitter.com/test',
  },
  techStack: {
    frontend: [{ name: 'Jest', category: 'Test Framework' }],
    backend: [{ name: 'Supertest', category: 'API Testing' }],
    tools: [{ name: 'Docker', category: 'DevOps' }],
  },
}
```
