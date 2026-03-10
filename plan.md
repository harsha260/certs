# Improvement Plan for certs-showcase

## Phase 1: Clean Up Default Next.js Assets

**Goal:** Remove scaffolding leftover from `create-next-app`.

1. Delete unused SVG files from `public/`:
   - `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
2. Clean up `globals.css`:
   - Remove the light-mode `:root` variables (the app uses a dark hardcoded theme via Tailwind classes, so the CSS variable light/dark toggle is unused)
   - Keep the Tailwind import and the `@theme inline` block
3. Remove the default `body` font-family override in `globals.css` (the app already uses Geist fonts via `next/font`)

**Files touched:** `public/`, `src/app/globals.css`

---

## Phase 2: Modularize `page.tsx` into Components

**Goal:** Break the monolithic 124-line `page.tsx` into reusable, testable components.

Create `src/components/` directory with:

1. **`Header.tsx`** -- Page title and subtitle
2. **`SearchBar.tsx`** -- Search input, accepts `value` and `onChange` props
3. **`CategoryFilter.tsx`** -- Category pill buttons, accepts `categories`, `activeCategory`, `onSelect` props
4. **`CertificateCard.tsx`** -- Single certificate card with hover overlay and action buttons
5. **`CertificateGrid.tsx`** -- Grid layout that maps certificates to `CertificateCard` components, includes empty-state message

6. **Refactor `page.tsx`** -- Keep state management (`searchQuery`, `categoryFilter`) and filtering logic here; compose the above components

7. **Extract types** -- Create `src/types/certificate.ts` with a `Certificate` interface to replace implicit JSON typing

**Files touched:** `src/app/page.tsx`, `src/components/` (5 new files), `src/types/certificate.ts` (1 new file)

---

## Phase 3: Add Metadata and SEO

**Goal:** Replace default `create-next-app` metadata with proper project metadata.

1. Update `layout.tsx` metadata:
   - `title`: "My Certifications | Harsha"
   - `description`: "A visual showcase of my professional certifications and achievements"
   - Add Open Graph tags (`openGraph.title`, `openGraph.description`, `openGraph.type`)
   - Add `metadataBase` pointing to the Vercel deployment URL
2. Add a `robots` field to allow search engine indexing
3. Update `<html lang="en">` -- already correct, no change needed

**Files touched:** `src/app/layout.tsx`

---

## Phase 4: Add Lightweight Tests

**Goal:** Add basic test coverage for core logic and rendering.

1. Install test dependencies:
   - `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
2. Add Vitest config (`vitest.config.ts`)
3. Add `test` script to `package.json`
4. Write tests:
   - **`src/app/page.test.tsx`** -- Smoke test: page renders without crashing, certificate data is displayed
   - **`src/utils/filterCertificates.test.ts`** -- Extract and unit-test the search+filter logic:
     - Filters by search query (title match, issuer match, no match)
     - Filters by category
     - Combined search + category filter
5. Extract the filtering logic into `src/utils/filterCertificates.ts` to make it independently testable

**Files touched:** `vitest.config.ts`, `package.json`, `src/utils/filterCertificates.ts`, `src/utils/filterCertificates.test.ts`, `src/app/page.test.tsx`

---

## Phase 5: Create README.md

**Goal:** Add a clear, informative README (no emojis).

Sections to include:
1. **Project title and description** -- Personal certification showcase, goal of growing the collection
2. **Features** -- Search, category filter, responsive grid, hover overlays, view/download
3. **Tech stack** -- Next.js 16, React 19, TypeScript, Tailwind CSS v4
4. **Getting started** -- Clone, install, dev server, build
5. **How to add a certificate** -- Add PDF+PNG to `public/certs/`, add entry to `certificates.json`, document the JSON schema
6. **Fork and customize** -- Instructions for others to use this as a template for their own certifications
7. **Deployment** -- Brief note that it's deployed on Vercel
8. **License** (if desired)

**Files touched:** `README.md` (new)

---

## Phase 6: Final Verification

1. Run `npm run lint` -- ensure no lint errors
2. Run `npm run build` -- ensure production build succeeds
3. Run `npm run test` -- ensure all tests pass

---

## Execution Order

```
Phase 1 (Cleanup)  -->  Phase 2 (Modularize)  -->  Phase 3 (Metadata)
                                                         |
                                                         v
                        Phase 5 (README)  <--  Phase 4 (Tests)
                              |
                              v
                      Phase 6 (Verify)
```
