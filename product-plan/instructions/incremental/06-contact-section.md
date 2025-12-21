# Milestone 6: Contact Section

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Contact Section — Social links and contact information.

## Overview

A minimalist, high-end directory of social links and contact information, designed with the same premium, typography-driven aesthetic as the rest of the site.

**Key Functionality:**
- List of social platforms and contact methods
- Animated section title
- Hover effects on social links
- Icons for each platform

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/contact-section/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/contact-section/components/`:
- `ContactSection.tsx`
- `ContactLinkCard.tsx`

### Data Layer

The components expect these data shapes:
- `ContactLink[]` (platform, label, url, icon, type)

You'll need to:
- Create API endpoints or data fetching logic
- Connect real data to the components

### Callbacks

Wire up these user actions:
- `onLinkClick`: Called when a user clicks on a contact link

### Empty States

Implement empty state UI for when no records exist yet.

## Files to Reference

- `product-plan/sections/contact-section/README.md` — Feature overview and design intent
- `product-plan/sections/contact-section/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/contact-section/components/` — React components
- `product-plan/sections/contact-section/types.ts` — TypeScript interfaces
- `product-plan/sections/contact-section/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Navigating to Social Profiles

1. User scrolls to the Contact section.
2. User clicks a social link (e.g., GitHub, LinkedIn).
3. **Outcome:** User is taken to the developer's external profile.

### Flow 2: Initiating Email

1. User clicks the email contact link.
2. Default mail client opens with a new message draft.
3. **Outcome:** User can easily send an inquiry to the developer.

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Links open correctly (mailto for email, new tab for others)
- [ ] Responsive on mobile
