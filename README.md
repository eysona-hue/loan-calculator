# LoanFlow Calculator

A bilingual home and car loan calculator built with React, Vite, Tailwind CSS, Framer Motion, Recharts, jsPDF, and jsPDF AutoTable.

## Features

1. Home loan calculator
2. Car loan calculator
3. English and Spanish language selector
4. Fixed rate amortization formula
5. Monthly balance chart with smoother updates
6. Colored monthly payment pie chart
7. Extra monthly payment impact
8. PMI estimate for mortgages below 20 percent down
9. Affordability ratios
10. Scenario comparison
11. Amortization table
12. CSV export
13. Professional PDF loan report export
14. Google AdSense ready placeholder areas
15. Privacy Policy, Terms of Use, About, and Contact pages

## Local testing

Install Node.js first. Then run:

```bash
npm install
npm run dev
```

Open the local link shown in the terminal.

## Build test

```bash
npm run build
```

The production files will be created in the `dist` folder.

## Deploy to Vercel

1. Create a GitHub account.
2. Create a Vercel account.
3. Create a new GitHub repository.
4. Upload all files from this project into the repository.
5. In Vercel, choose Add New Project.
6. Select the GitHub repository.
7. Vercel should detect Vite automatically.
8. Confirm these settings:

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

9. Click Deploy.
10. After deployment, Vercel will give you a public website URL.

## Google AdSense notes

The app includes placeholder ad slots with `data-ad-slot` attributes:

1. `top-banner`
2. `sidebar-square`
3. `in-content`

After AdSense approval, replace the placeholder content in the `AdSlot` component with the official Google AdSense script and ad unit code.

## Important disclaimer

This calculator provides estimates only. Actual loan quotes can vary based on lender rules, APR, credit score, payment timing, closing costs, taxes, insurance, dealer fees, escrow, and local regulations.
