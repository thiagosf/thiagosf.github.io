# Test Instructions: Projects Section

These test-writing instructions are **framework-agnostic**.

## Overview

Tests should focus on the grid layout, project card hover effects, and correct functioning of demo/source links.

---

## User Flow Tests

### Flow 1: Visual Exploration

**Scenario:** User browses the projects grid.

#### Success Path

**Steps:**

1. Provide a list of `Project` items.
2. Verify all project titles and years are visible.
3. Verify preview images have correct `src` and `alt` tags.

**Expected Results:**

- [ ] Grid layout maintains responsiveness (check different viewport widths if using E2E tests).

---

## Component Interaction Tests

### ProjectCard

**User interactions:**

- [ ] Hovering over a card reveals the description and action buttons (if using visual/E2E testing).
- [ ] Clicking the "Demo" button calls `onDemoClick` or opens the `demoUrl`.
- [ ] Clicking the "GitHub" button calls `onSourceClick` or opens the `githubUrl`.

---

## Empty State Tests

**Scenario:** No projects available.

**Setup:**

- `projects = []`

**Expected Results:**

- [ ] Shows a "No projects to display" message.

---

## Edge Cases

- [ ] Projects without a `demoUrl` or `githubUrl` should hide those buttons.
- [ ] Handles broken image links in `previewUrl` (progressive loading or fallback).
- [ ] Long project titles are truncated or wrapped elegantly.

---

## Accessibility Checks

- [ ] All images have descriptive `alt` text.
- [ ] Action buttons are keyboard navigable.
- [ ] Focus states are clearly visible on card interaction items.

---

## Sample Test Data

```typescript
const mockProject = {
  id: "p-1",
  title: "Test Project",
  description: "A project meant for testing.",
  year: "2024",
  type: "Test Utility",
  techStack: ["Node.js", "Jest"],
  previewUrl: "https://example.com/image.png",
  demoUrl: "https://test.demo",
  githubUrl: "https://github.com/test/repo",
}
```
