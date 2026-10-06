# Tenqora public website

Audience: infrastructure and data-center teams evaluating the product.
The public site explains inventory, connectivity and accountable field work.

## Light Operations visual language
A new light direction replaces the dark hero and oversized titles. Mineral
neutrals, petroleum actions, fine borders and medium-weight DM Sans follow
the shared application palette. IBM Plex Mono is reserved for utility labels.
The home introduction pairs a concise operational proposition with the existing
product evidence image. Keep real product screenshots; do not invent dashboards.

## Canonical implementation
`packages/design-tokens/tokens.json` owns the shared palette;
`scripts/design-tokens.js` generates `design-tokens.css`. `styles.css` owns
existing domain illustration geometry. `light-operations.css` is the final
presentation owner for site navigation, introduction, sections and forms.
`app.js` owns the header, mobile navigation, footer and shared interactions.
Route HTML owns content and static metadata. `seo.js` supplies breadcrumbs and
only generates JSON-LD when static data is absent.

## Responsive and motion rules
320px is the minimum tested viewport; cards stay inside their parent, technical
tables may scroll locally. Mobile navigation and primary actions are at least
44px high. Keep keyboard focus visible, trap navigation focus, make background
content inert while the mobile drawer is open, and restore focus on close.
Motion is a single reveal, 560ms, using the shared motion tokens. Never hide
content waiting for JavaScript; disable animation and smooth scrolling for
prefers-reduced-motion. No perpetual animation or scroll hijacking.

## Content evidence
Procurement copy follows the documented preview/commit/receipt workflow.
Tenqora Asset is marked in preparation: signing and release validation are not
proof of public App Store availability. Do not invent release dates or prices.
