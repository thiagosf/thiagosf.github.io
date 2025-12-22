# Test Instructions: Playground Section

These test-writing instructions are **framework-agnostic**.

## Overview

Tests should verify the display of GitHub-specific metadata and the overall typography-driven layout.

---

## User Flow Tests

### Flow 1: Repository Discovery

**Scenario:** User browses experiments.

#### Success Path

**Steps:**

1. Provide a list of `PlaygroundItem` objects.
2. Verify repository names, stars, and primary languages are correctly displayed.
3. Verify year and type (category) are visible.

**Expected Results:**

- [ ] Items are rendered in a clean grid.

---

## Component Interaction Tests

### PlaygroundCard

**User interactions:**

- [ ] Clicking the card or the title calls `onItemClick` or opens the `githubUrl`.
- [ ] Hovering shows subtle interaction states (elevation/scale).

---

## Empty State Tests

**Scenario:** Playground is empty.

**Setup:**

- `items = []`

**Expected Results:**

- [ ] Shows "No experiments found" message.

---

## Edge Cases

- [ ] Handles missing `stars` or `language` fields gracefully.
- [ ] Long descriptions do not break the card layout.
- [ ] Works with very short or very long tech stacks.

---

## Accessibility Checks

- [ ] Repository links are identifiable to screen readers.
- [ ] Star and Language icons have appropriate ARIA labels or are ignored if purely decorative.

---

## Sample Test Data

```typescript
const mockPlaygroundItem = {
  id: 'pg-1',
  title: 'Test experiment',
  description: 'Exploring new testing patterns.',
  year: '2024',
  type: 'Research',
  techStack: ['React'],
  githubUrl: 'https://github.com/test',
  stars: 10,
  language: 'TypeScript',
}
```
