# Digitalwerk

Astro + Tailwind website for Digitalwerk.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run check
```

## Structure

- `src/data/siteContent.ts` - central content and page data
- `src/components/home/*` - homepage sections
- `src/components/subpage/*` - reusable subpage template
- `src/styles/global.css` - global design system styles
- `functions/api/contact.ts` - Cloudflare Pages contact handler

## Deployment

The site is intended for Cloudflare Pages. Configure the production domain in `astro.config.mjs`.
