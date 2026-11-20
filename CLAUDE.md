# Oakline Medical Group (project rules)
- Every change must keep the SEO checklist satisfied (SEO-CHECKLIST.md, status in SEO-STATUS.md).
- Static export only: no API routes, middleware, server actions, ISR or runtime functions.
- No em dashes, no emojis, American English. Never invent reviews, numbers or promises.
- Indexing is controlled in ONE place: src/config/seo.config.mjs (INDEXABLE_PATHS, SITE_INDEXABLE env).
- Data goes through repositories in src/lib/repos (swap localStorage for Neon there only).
