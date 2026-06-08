# Check My Payments v24.2.0

Small infrastructure update for Check My Payments.

## Purpose

Version 24.2 confirms and preserves the permanent global Google Analytics installation.

## Google Analytics

Measurement ID: `G-R3GM5FZB6T`

The official Google tag is installed globally in `index.html` inside the document `<head>`, so it loads on every page of the static single-page website, including all routed pages such as `/about`, `/privacy`, `/terms`, `/contact`, and the calculator guide pages.

This Analytics tag should remain a permanent core part of future builds unless it is intentionally removed or replaced.

## Version

Visible site version: `v24.2.0`
Package version: `24.2.0`

## Notes

No calculator logic, design, layout, mobile behavior, colors, typography, or user-facing text was changed, except for the visible version number.

## Checks

Run:

```bash
npm run build
node --check app.js
npm audit --omit=dev
```
