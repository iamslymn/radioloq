# Radioloq site

radioloq.com and courses.radioloq.com. React, TypeScript, Vite, hosted on Vercel.

```
npm ci
npm run dev       # local server
npm run lint      # oxlint
npm run build     # type check and production build into dist/
```

All visible text lives in `src/content/`, one file per language (`de`, `en`, `tr`, `az`, `ru`).
Prices and Stripe links come only from `src/content/pricing.ts`.
The legal and service pages are static HTML in `public/`.

Rules for text, prices and legal pages: see `CLAUDE.md` in the repository root.
