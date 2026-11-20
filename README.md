# ShipYard — Catalog Setup

A responsive 8-product storefront built with **Next.js 15 App Router + TypeScript** as required by Kalvium 5.13 (Part 1). Every product card opens its own statically pre-rendered detail route.

## Requirements delivered

- New TypeScript App Router project, without Tailwind.
- `app/data/products.ts`: exported `Product` interface, eight typed products, and `getProduct(id)`.
- `app/components/ProductCard.tsx`: reusable typed component with `next/link`.
- `app/page.tsx`: `products.map(...)`, stable `key={product.id}`, and responsive CSS grid using `repeat(auto-fill, minmax(..., 1fr))` (on desktop and tablets).
- `app/products/[id]/page.tsx`: typed dynamic route, `generateStaticParams()`, `getProduct`, and `notFound()`.
- `app/not-found.tsx`: friendly 404 page.
- Two Git commits on two branches: initial scaffold on `main`, feature implementation on `feature/shipyard-catalog`.

## Run and verify

Make sure Node.js 20.9+ is installed (Node.js 22 LTS recommended).

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

Open `http://localhost:3000`, click different products, and check `http://localhost:3000/products/does-not-exist` for the not-found page.

## Submit your GitHub Pull Request (Windows PowerShell)

1. On GitHub, create a **public EMPTY** repository named `shipyard` under your account. **Do not** initialize it with README or .gitignore, since those are already in this project.
2. Extract the supplied ZIP, including the hidden `.git` folder, and open a terminal inside the extracted `shipyard` directory.
3. Run the following commands:

```powershell
git remote add origin https://github.com/NIGHTFALLwarrior666/shipyard.git
git checkout main
git push -u origin main
git checkout feature/shipyard-catalog
git push -u origin feature/shipyard-catalog
```

4. Visit: `https://github.com/NIGHTFALLwarrior666/shipyard/compare/main...feature/shipyard-catalog?expand=1`
5. Click **Create pull request**. Suggested title: `Build ShipYard catalog: responsive grid + dynamic product pages`.
6. Copy the actual PR URL (e.g. `/pull/1`) into the Kalvium submission field. **Do not submit the compare URL; submit the PR URL.**

If `git remote add origin` reports `remote origin already exists`, replace it using `git remote set-url origin https://github.com/NIGHTFALLwarrior666/shipyard.git`.

## Note

The source package was assembled in an offline environment, so dependencies couldn't be downloaded here and `npm run build` could not be verified in this environment. Please run it locally before submitting.

## Part 2 — Optimization changes (Kalvium 5.14)

- Added eight **local SVG product illustrations** under `public/products/` and an image field to every typed product. Product cards and detail pages render them with `next/image` with intrinsic dimensions, descriptive alt text, and responsive `sizes` to avoid layout shifts. These are original illustrations, not externally sourced product photographs.
- Self-hosted Inter using `next/font/google` in `app/layout.tsx` (with `display: "swap"`); removed the body font override.
- Added a below-the-fold interactive product comparison. Its `ComparePanel` chunk is loaded with `next/dynamic` only when its wrapper nears the viewport; loading fallback included.
- Added homepage `metadata` and retained product-specific async `generateMetadata` with titles and descriptions for every product page.
- The catalog, eight detail routes, responsive layout, and product data from Part 1 are preserved.

To test before submitting: `npm install`, `npm run dev`, `npm run typecheck`, `npm run lint`, and `npm run build`. This PR intentionally covers Part 2; Lighthouse scores and live deployment belong to Part 3.
