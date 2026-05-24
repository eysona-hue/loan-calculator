# LoanFlow Calculator

A modern mortgage and car loan calculator built with React, Vite, Tailwind CSS, Framer Motion, and Recharts.

## Features

1. Home loan calculator
2. Car loan calculator
3. Fixed rate amortization formula
4. Extra monthly payment impact
5. PMI estimate for mortgages below 20 percent down
6. Affordability ratios
7. Scenario comparison
8. Amortization table
9. CSV export
10. Google AdSense ready placeholder areas

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

```bash
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
