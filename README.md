# Tenqora product website

Standalone static product and documentation site for Tenqora.

Author and product owner: **Максим Климко**.

## Local preview

```bash
python3 -m http.server 8080 --directory website
```

Open `http://localhost:8080`.

## Information architecture

- `/` — Operational Command overview
- `/dcim.html` — Sites, Racks, capacity and Power
- `/asset-management.html` — physical Asset identity, inventory and Lifecycle
- `/connectivity.html` — Ports, cables, optics, splitters and patching
- `/monitoring.html` — optional telemetry, environmental and Port-health context
- `/operations-intelligence.html` — discovery, dependency, impact, capacity and controlled-action direction
- `/work-orders.html` — planned and completed field work
- `/platform.html` — shared model, API, integrations and security boundaries
- `/solutions.html` — Data Center, enterprise, colocation, edge and network use cases
- `/resources.html` — product documentation and Change Log entry points
- `/community.html` — product feedback, Catalog evidence, integration proposals and release history
- `/register.html` — review-only Client registration

`app.js` owns shared navigation, search, mobile behavior and the footer. Route files own their narrative only. Current Rack, Connectivity and Equipment screenshots in `assets/` are curated product evidence and are never operational data sources.

The live Connectivity illustration keeps the same Port-card anatomy and physical vocabulary as the product: explicit endpoint terminals, one bounded intermediate component, medium-specific endpoint identity and numbered Splitter boundaries. It remains illustrative and never reads Client operational data.

## Publication contract

- Every public route declares its canonical `https://tenqora.net` URL, social preview metadata and the shared web manifest.
- `robots.txt` points crawlers to `sitemap.xml`; the sitemap contains only public product and reviewed-registration destinations.
- `seo.js` publishes matching `WebSite`, `Organization`, `WebPage` and `BreadcrumbList` JSON-LD plus visible page breadcrumbs. It never invents reviews, prices, addresses or external profiles.
- The Search Console workflow submits the canonical sitemap only after a real verified Domain property and secret-bound service account are configured.
- Mobile layouts are verified at 390 × 844 and 320 × 568. Navigation and form controls remain at least 44 px high, page-level horizontal overflow is prohibited and technical tables retain local scrolling.
- The mobile drawer locks the page behind it, identifies the current destination and restores keyboard focus when closed.
- The site contains no tenant data, credentials or application session state.

## Production deployment

The site contains no secrets, application database or customer runtime data. Production packages this directory in the same immutable image but exposes it only on `tenqora.net`; `app.tenqora.net` remains the authenticated application. The registration page submits a bounded review request to the shared API and never creates a tenant or grants access automatically.
