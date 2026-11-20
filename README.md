# ShipYard

A product-catalog storefront built with **Next.js 15 + TypeScript** (App Router, no Tailwind).

- 🚀 **Live site:** https://NIGHTFALLwarrior666.github.io/shipyard/
- ⚡ **Lighthouse Performance:** 95+ (Mobile)

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Build & preview the static export

```bash
npm run build
npx serve out
```

## What it does

Browse a product grid of 8 curated items and open a detail page for each product. Optimized with:

- **Static export** (`output: "export"`) for GitHub Pages hosting
- **`generateStaticParams`** – all product pages pre-rendered at build time
- **`loading.tsx`** – friendly loading placeholder while routes load
- **`error.tsx`** – graceful error boundary with a "Try again" retry button
- **`not-found.tsx`** – custom 404 for unknown product IDs
- **Per-page metadata** via `generateMetadata`

## Deploy (GitHub Pages via GitHub Actions)

Pushing to `main` triggers `.github/workflows/deploy.yml` which runs `npm ci`, `npm run build`, and publishes the `out/` folder. No server required — it's pure static HTML/CSS/JS.

> **basePath** is set to `/shipyard` in `next.config.mjs` to match the GitHub Pages sub-path.

## Project structure

```
app/
  page.tsx                 # Home – product grid
  layout.tsx               # Root layout + metadata
  loading.tsx              # Loading state
  error.tsx                # Error boundary (Client Component)
  not-found.tsx            # 404 page
  globals.css              # All styles (single minified file)
  components/
    ProductCard.tsx         # Reusable product card
  data/
    products.ts             # Product data + types
  products/[id]/
    page.tsx                # Dynamic product detail page
.github/workflows/
  deploy.yml               # GitHub Pages CI/CD workflow
next.config.mjs            # Static export config + basePath
```
