# Certs Showcase

A personal certification showcase web application built to display professional certifications in a visual, interactive card-based catalog. The goal is to keep growing this collection over time as new certifications are earned.

## Features

- Responsive grid layout that displays certificate preview images as cards
- Hover overlay on each card revealing title, issuer, year, and category
- View and download buttons for each certificate PDF
- Search by certificate title or issuer
- Filter certificates by category
- Sorted by date (newest first)
- Dark theme with smooth animations and transitions

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **UI:** React 19
- **Styling:** Tailwind CSS v4
- **Fonts:** Geist Sans and Geist Mono
- **Testing:** Vitest with Testing Library
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
git clone https://github.com/harsha260/certs.git
cd certs
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Testing

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
  app/
    layout.tsx            Root layout with metadata and fonts
    page.tsx              Main page with state management and composition
    globals.css           Global styles and Tailwind imports
  components/
    Header.tsx            Page title and subtitle
    SearchBar.tsx          Search input component
    CategoryFilter.tsx    Category pill button filter
    CertificateCard.tsx   Individual certificate card with hover overlay
    CertificateGrid.tsx   Responsive grid of certificate cards
  data/
    certificates.json     Certificate data entries
  types/
    certificate.ts        TypeScript interface for certificate data
  utils/
    filterCertificates.ts Search and filter logic

public/
  certs/                  Certificate PDFs and preview images
```

## How to Add a Certificate

1. Place your certificate PDF and a preview image (PNG or JPG) in the `public/certs/` directory. Use a consistent naming convention, for example:
   - `public/certs/My-Certificate-Name.pdf`
   - `public/certs/My-Certificate-Name.png`

2. Add a new entry to `src/data/certificates.json`:

```json
{
  "id": 2,
  "title": "Certificate Title",
  "issuer": "Issuing Organization",
  "date": "YYYY-MM-DD",
  "category": "Category Name",
  "fileUrl": "/certs/My-Certificate-Name.pdf",
  "imageUrl": "/certs/My-Certificate-Name.png"
}
```

Each field explained:

| Field      | Description                                              |
|------------|----------------------------------------------------------|
| `id`       | Unique numeric identifier (increment from the last entry)|
| `title`    | Full name of the certification                           |
| `issuer`   | Organization that issued the certificate                 |
| `date`     | Date of completion in `YYYY-MM-DD` format                |
| `category` | Category for filtering (e.g., "AI", "Cloud", "Security") |
| `fileUrl`  | Path to the PDF file relative to `public/`               |
| `imageUrl` | Path to the preview image relative to `public/`          |

3. The new certificate will automatically appear in the grid, be searchable, and filterable by its category.

## Fork and Customize

This project can be used as a template for showcasing your own certifications:

1. Fork this repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/certs.git
   cd certs
   npm install
   ```
3. Clear the existing certificate data:
   - Delete the files in `public/certs/`
   - Replace the contents of `src/data/certificates.json` with an empty array: `[]`
4. Add your own certificates following the steps in the "How to Add a Certificate" section above.
5. Customize the branding:
   - Update the title and subtitle in `src/components/Header.tsx`
   - Update the metadata in `src/app/layout.tsx` with your name and description
6. Deploy to Vercel (or any hosting platform that supports Next.js):
   ```bash
   npm run build
   ```

## Deployment

This project is deployed on Vercel. Pushing to the `main` branch triggers an automatic deployment.

## License

This project is open source. Feel free to fork and adapt it for your own use.
