# Check My Payments v24.3

Stable static website for https://www.checkmypayments.com.

## Permanent core infrastructure

Do not remove or replace these unless intentionally decided:

- Google Analytics Measurement ID: `G-R3GM5FZB6T`
- `robots.txt`
- `sitemap.xml`
- Canonical domain: `https://www.checkmypayments.com`

## Version 24.4 SEO improvements

- Expanded calculator pages with unique titles, meta descriptions, H1s, visible helpful introductions, formula explanations and FAQs.
- Added visible FAQ content to support compliant FAQPage structured data.
- Added BreadcrumbList structured data and improved WebPage, WebSite, Organization and SoftwareApplication structured data.
- Added internal links between related calculators and guides.
- Added new focused pages for monthly payment calculator, personal loan calculator and APR vs interest rate.
- Preserved Google Analytics, robots.txt, sitemap.xml and canonical www domain.

## Build

```bash
npm run build
```

The build copies the static site files into `dist` for Vercel.


## Version 24.4 visual polish

This release improves the Open Calculator button contrast, centers the brand calculator icon, adds a branded favicon, preserves Google Analytics G-R3GM5FZB6T, and keeps robots.txt and sitemap.xml as permanent core files.


## Version 24.4.1 logo centering fix

This follow-up patch tightens the brand icon alignment so the small calculator icon is mathematically centered inside its rounded container on desktop and mobile.
