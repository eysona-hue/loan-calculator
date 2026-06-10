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


## Version 24.5 SEO content quality update

Adds educational guide pages for loan payment calculation, amortization, interest rates, extra payments, PMI, loan term tradeoffs, principal versus interest, loan offer comparison, and total loan cost. Preserves Google Analytics G-R3GM5FZB6T, robots.txt, sitemap.xml, canonical www domain, calculator logic, favicon, and previous mobile/desktop behavior.


## Version 25 Federal Student Loan Calculator

Version 25 adds a Version 1 Federal Student Loan Calculator at `/student-loan-calculator`. It estimates monthly payment, daily interest, interest before repayment, total repayment interest, total repaid, number of payments, and savings from extra payments. It preserves Google Analytics G-R3GM5FZB6T, robots.txt, sitemap.xml, canonical www URLs, existing calculator logic, mobile behavior, and SEO pages. Federal student loan defaults are stored in `studentLoanRates.json` and mirrored in the app configuration. Rates last checked: 2026-06-08.

Recommended monitoring: use a weekly GitHub Action or Vercel Cron job to check official StudentAid.gov source pages for changes and create a review note rather than silently changing core calculations.


### Student loan monitoring files

Version 25 also includes `studentLoanSourceMonitor.json`, `scripts/check-student-loan-sources.js`, and `.github/workflows/check-student-loan-sources.yml`. These are monitor-only helpers. They check official StudentAid.gov pages weekly and should prompt human review before changing rates or formulas.


## Version 25.1 student loan navigation, report and visual polish

Version 25.1 improves discoverability and presentation of the Federal Student Loan Calculator without changing the original home, car, mortgage, or student loan calculation formulas.

Changes:
- Added a Student Loan option to the main homepage calculator selection area.
- Kept the student loan calculator listed in the calculator directory and footer guide links.
- Reorganized the student loan calculator inputs into Loan details, Repayment setup, and Payoff strategy groups.
- Improved alignment, spacing, label readability, dropdown spacing, and mobile stacking in the student loan form.
- Added a printable PDF report for federal student loan estimates.
- Preserved Google Analytics G-R3GM5FZB6T, robots.txt, sitemap.xml, favicon, canonical URL structure, and existing calculator logic.
