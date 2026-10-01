# Tenqora public website

Audience: infrastructure and data-center teams evaluating the product.
The public site explains inventory, connectivity and accountable field work.

## Existing visual language
Preserve the rack photography and actual product screenshots, navy surfaces,
blue actions, DM Sans headings/body and IBM Plex Mono utility labels.
The hero remains the visual signature. Do not substitute generated dashboards.

## Canonical implementation
`styles.css` owns shared tokens in `:root`, spacing, layout and responsive behavior.
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
