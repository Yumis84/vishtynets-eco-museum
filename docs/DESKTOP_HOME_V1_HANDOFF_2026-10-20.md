# Desktop Homepage V1 — handoff and acceptance checklist

Reference: owner-approved screenshot, forest panorama + cream header + four main cards.
Branch: `feature/desktop-home-reference-final-20261020`.
Base: `feature/desktop-home-polish-v2-20261018` (diverged from main; rebase/conflict review required before PR merge).

## Implemented in this branch
- Desktop-only reference alignment CSS loaded after existing desktop stylesheet.
- Cream header and horizontal navigation, wide landscape banner, heading below photo.
- Four equal navigation cards; desktop grids for places and topics.
- Navigation spacing, keyboard focus, responsive refinements for 1024–1150 px.
- All changes gated behind `@media(min-width:1024px)`; mobile layouts not intentionally modified.

## Not yet verified / must not be represented as PASS
- Browser screenshots at 1024, 1280, 1440, 1920 px.
- Visual comparison with screenshot, especially hero crop and card layout.
- Real link/navigation behavior; hero and recommendation image loads.
- No horizontal overflow; accessibility keyboard/screen reader checks.
- Regression check at 390 px and 768 px (CSS is desktop-only but shared markup/scripts remain).
- Factual accuracy of hours, open-now indicator, address and contact information.
- Compatibility with latest main, CI, deployment preview and user acceptance.

## Release gates
1. Create preview URL or browser-tested local build.
2. Attach screenshots for desktop widths and 390px mobile.
3. Fix visual discrepancies and any runtime failures.
4. Confirm operational information against authoritative museum source; if unknown, show 'Уточните перед визитом'.
5. Owner approves visual result. Only then prepare merge/deploy separately.

## Constraints
No changes to main, production, DNS, booking, audioguide, map filters, or original historic article images.
