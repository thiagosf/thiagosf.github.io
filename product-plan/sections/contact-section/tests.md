# Test Instructions: Contact Section

These test-writing instructions are **framework-agnostic**.

## Overview

Tests should focus on the display and functionality of social and contact links.

---

## User Flow Tests

### Flow 1: Accessing Social Links

**Scenario:** User wants to connect on LinkedIn.

#### Success Path

**Steps:**

1. Provide a list of `ContactLink` items.
2. Verify platform names and labels are rendered.
3. Verify icons are displayed for each platform.

**Expected Results:**

- [ ] Links lead to the correct destination URLs.

---

## Component Interaction Tests

### ContactLinkCard

**User interactions:**

- [ ] Clicking a link calls `onLinkClick` or navigates the browser.
- [ ] Email links (`type: 'contact'`) use the `mailto:` protocol.

---

## Empty State Tests

**Scenario:** No contact links available.

**Setup:**

- `contactLinks = []`

**Expected Results:**

- [ ] Shows "No contact information provided" message.

---

## Edge Cases

- [ ] Handles unknown icon identifiers with a fallback icon.
- [ ] Works with a large number of links (wraps or grids correctly).

---

## Accessibility Checks

- [ ] Every contact item has a unique, descriptive label.
- [ ] Links have distinct focus indicators.
- [ ] SVG icons are hidden from screen readers if a label is present.

---

## Sample Test Data

```typescript
const mockContactLink = {
  id: "cl-1",
  platform: "GitHub",
  label: "github.com/tester",
  url: "https://github.com/tester",
  icon: "github",
  type: "social",
}
```
