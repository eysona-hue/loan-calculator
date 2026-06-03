# LoanFlow v18 Mobile Input Fix

Stable bilingual LoanFlow calculator with corrected mobile number input behavior.

## What changed

- Fixed phone keyboard issue by preventing full page re-render while typing.
- Number inputs now keep focus on mobile until the user finishes editing.
- Matching sliders still sync while typing.
- Full recalculation happens on blur, change, or Enter.
- Keeps scenario comparison, affordability guidance, SEO pages, monthly CSV export, and professional PDF report.

## Build

```bash
npm run build
```

## Contact

loancal@altmail.kr


## v19 update
Mobile sliders are now thumb-only. Touching the track while scrolling will not change values; dragging the circular handle still works with finger, mouse, and trackpad.
