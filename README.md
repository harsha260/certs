# Certs Showcase

a simple website i built to show off my certifications. basically a visual grid of cards where you can search, filter by category, and view or download the actual PDFs. nothing fancy, just a clean way to keep track of everything in one place.

the plan is to keep adding certs here as i earn more over time.

live at [certs.itsharsha.me](https://certs.itsharsha.me)

## what it does

- responsive card grid that looks good on both desktop and mobile
- hover over a card (or tap on mobile) to see the details and action buttons
- search across certificate titles and issuers
- filter by category with pill buttons
- view certs in a new tab or download the PDF directly
- dark theme with smooth animations
- keyboard accessible (you can press `/` to jump to search, navigate cards with tab, enter/space to open, escape to close)

## tech stack

| what | with |
|------|------|
| framework | Next.js 16 (App Router) |
| language | TypeScript (strict mode) |
| ui | React 19 |
| styling | Tailwind CSS v4 |
| fonts | Geist Sans + Geist Mono |
| testing | Vitest + Testing Library |
| deployed on | Vercel |

## getting started

you need Node.js 20+ and npm.

```bash
git clone https://github.com/harsha260/certs.git
cd certs
npm install
npm run dev
```

open [localhost:3000](http://localhost:3000) and you should see it running.

other commands:

```bash
npm run build     # production build (also checks for type errors)
npm run lint      # run eslint
npm run test      # run all tests
```

## project structure

```
src/
  app/
    page.tsx              main page (server component)
    layout.tsx            root layout, metadata, fonts
    loading.tsx           skeleton loading state
    error.tsx             error boundary
    not-found.tsx         404 page
    globals.css           tailwind + theme config
  components/
    CertificateExplorer   client boundary, owns search/filter state
    CertificateCard       card with hover/tap overlay
    CertificateGrid       responsive grid + empty state
    SearchBar             search input with "/" shortcut
    CategoryFilter        category pill buttons
    Header                page title and subtitle
  data/
    certificates.json     all the cert data lives here
  types/
    certificate.ts        TypeScript interface
  utils/
    filterCertificates.ts search, filter, and sort logic
public/
  certs/                  certificate PDFs and preview images
```

## how to add a certificate

1. drop your certificate PDF and a preview image (png/jpg) into `public/certs/`

2. add an entry to `src/data/certificates.json`:

```json
{
  "id": 2,
  "title": "Certificate Title",
  "issuer": "Issuing Organization",
  "date": "YYYY-MM-DD",
  "category": "Category Name",
  "fileUrl": "/certs/My-Certificate.pdf",
  "imageUrl": "/certs/My-Certificate.png"
}
```

that's it. the new cert shows up in the grid automatically, and it's searchable and filterable right away. categories are derived from the data so if you use a new category name it just works.

## want to use this for yourself?

feel free to fork this and make it your own. the rough steps:

- fork and clone the repo
- clear out `public/certs/` and set `src/data/certificates.json` to `[]`
- add your own certs (see above)
- update the title in `src/components/Header.tsx` and metadata in `src/app/layout.tsx`
- deploy to Vercel or wherever you like

## deployment

deployed on Vercel. pushing to `main` triggers an automatic deploy.

## license

open source -- fork it, modify it, do whatever you want with it.
