# LoanFlow Calculator

Modern bilingual loan calculator for home and car loans.

## Features

1. Home loan calculator
2. Car loan calculator
3. English and Spanish selector
4. Fixed rate amortization formula
5. Extra monthly payment impact
6. PMI estimate for mortgages below 20 percent down
7. Affordability ratios
8. Scenario comparison
9. Amortization table
10. CSV export
11. Privacy Policy, Terms of Use, About, and Contact pages
12. Google AdSense ready placeholder areas

## Contact

loancal@altmail.kr

## Local testing

Install Node.js first. Then run:

```bash
npm install
npm run dev
```

## Build test

```bash
npm run build
```

Production files will be created in the `dist` folder.

## Deploy to Vercel

Build Command:

```bash
npm run build
```

Output Directory:

```bash
dist
```

## Google AdSense notes

The app includes placeholder ad slots with `data-ad-slot` attributes:

1. `top-banner`
2. `sidebar-square`
3. `in-content`

After AdSense approval, replace the placeholder content in the `AdSlot` component with the official Google AdSense script and ad unit code.

## Important disclaimer

This calculator provides estimates only. Actual loan quotes can vary based on lender rules, APR, credit score, payment timing, closing costs, taxes, insurance, dealer fees, escrow, and local regulations.
