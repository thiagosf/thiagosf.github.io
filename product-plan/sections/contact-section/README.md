# Contact Section

## Overview

A minimalist, high-end directory of social links and contact information, designed with the same premium, typography-driven aesthetic as the rest of the site.

## User Flows

- Users can view a list of social platforms and contact methods.
- Users can click on links to visit external profiles.
- Users can click on the email link to initiate a new message.

## Design Decisions

- Extremely minimalist layout to focus on the primary action: connectivity.
- Use of icons (Lucide-React) for quick visual identification of platforms.
- Consistent typography (Sora and IBM Plex Mono).
- Subtle background patterns to tie the section into the overall landing page.

## Data Used

**Entities:**
- `ContactLink`
  - `platform`
  - `label`
  - `url`
  - `icon`
  - `type`

## Visual Reference

See `screenshot.png` (if available) for the target UI design.

## Components Provided

- `ContactSection` — Main container for contact information.
- `ContactLinkCard` — Interactive item for a single social or contact link.

## Callback Props

| Callback | Description |
|----------|-------------|
| `onLinkClick` | Called when a user clicks on a contact link |
