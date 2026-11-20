# Oakline Medical Group (fictional clinic website)

A portfolio project by Marvel Mafong at TekGemm Studio. Oakline is a fictional clinic; nothing here is a real healthcare service.

- Static export (Next.js, TypeScript, CSS). No server functions.
- `npm run build` creates `out/` (also generates responsive images, sitemap, robots.txt, llms.txt and `vercel.json`).
- `node scripts/serve-out.mjs` serves `out/` locally on port 4173.
- `node scripts/verify-live.mjs <url>` runs the SEO and status checks. `node scripts/e2e.mjs <url>` runs the browser flows (needs playwright-core).
- `node scripts/deploy-static.mjs [--prod]` uploads `out/` with low concurrency (works on slow links). `vercel deploy --prebuilt --prod` also works.
- Indexing is controlled in `src/config/seo.config.mjs`.
- Data layer: `src/lib/repos.ts` (localStorage today, swap for Neon there).
