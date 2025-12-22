# Test Instructions: Experience Section

These test-writing instructions are **framework-agnostic**.

## Overview

Tests should verify the chronological display of roles, the timeline visualization, and interactive tech chips.

---

## User Flow Tests

### Flow 1: Chronological Roles

**Scenario:** User views their career history.

#### Success Path

**Steps:**

1. Provide a list of `Experience` items.
2. Verify items are rendered in the order provided (assumed most recent first).
3. Verify role title, company, and period are shown for each.

**Expected Results:**

- [ ] Timeline nodes (squares) are rendered for each item.
- [ ] Descriptions are visible and accurate.

---

## Component Interaction Tests

### ExperienceItem

**User interactions:**

- [ ] Clicking an item calls `onItemClick` with the correct ID.
- [ ] Clicking a tech chip calls `onFilterTech` with the technology name.

---

## Empty State Tests

**Scenario:** No experiences provided.

**Setup:**

- `experiences = []`

**Expected Results:**

- [ ] Shows a "No experience records found" message or an empty timeline with a placeholder.

---

## Edge Cases

- [ ] Handles very long descriptions with proper spacing.
- [ ] Correctly identifies and styles the "Current" position (isCurrent: true).
- [ ] Works with varying numbers of tech chips.

---

## Accessibility Checks

- [ ] Timeline is purely decorative or properly described for screen readers.
- [ ] Interactive cards/chips have appropriate hover/focus states.
- [ ] Tech chips are keyboard accessible if they are used for filtering.

---

## Sample Test Data

```typescript
const mockExperiences = [
  {
    id: 'exp-1',
    role: 'Lead Developer',
    company: 'Test Corp',
    location: 'Remote',
    period: '2020 - Present',
    description: 'Built the testing infrastructure.',
    technologies: ['React', 'Vitest'],
    isCurrent: true,
  },
]
```
