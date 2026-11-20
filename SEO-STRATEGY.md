# SEO strategy

## What this SEO is for
Oakline Medical Group is a fictional clinic. It must never rank for patient searches such as "primary care Sandy Springs". The goal is that people who need a clinic or healthcare website can find the developer and studio who built it: Marvel Mafong and TekGemm Studio (https://tekgemmstudio.com, https://marvelmafong.work).

Only one URL is indexable: `/case-study/`. Every other page is `noindex, follow`. One config drives this: `src/config/seo.config.mjs` (`INDEXABLE_PATHS`, `SITE_INDEXABLE` env override). It feeds the robots meta tag, the `X-Robots-Tag` header, `robots.txt` and `sitemap.xml`.

## 1. Strategy (items 1 to 10)
1. **Objectives.** Earn qualified inquiries for TekGemm Studio from clinics, practices and healthcare startups. Secondary: be cited as an example of an accessible, fast healthcare site.
2. **Target audiences.** Clinic owners, practice managers, healthcare startup founders, wellness brands, agencies and recruiters hiring a web designer or developer.
3. **Target markets.** United States first (healthcare buyers, English), plus remote clients worldwide in English.
4. **Search intent.** Commercial investigation ("healthcare web design agency", "medical website examples") and transactional ("hire a web developer for a clinic"). Informational intent is served by the FAQ on the case study.
5. **Competitors.** Healthcare web design agencies, template marketplaces and freelance portfolios. Method: review the top ten results for each priority keyword in Ahrefs, Semrush or Google (owner task, see OWNER list). No competitor claims are made here.
6. **SEO audit.** Run per release: `npm run check:live` (status codes, titles, descriptions, headings, alt text, schema, links, headers) plus Lighthouse. Results are saved in `reports/` and summarized in SEO-STATUS.md.
7. **Keyword priorities.** See KEYWORD-MAP.md. One primary target for the single indexable page, with clusters around it.
8. **Ranking benchmarks (plan).** Baseline after first indexing: record position, impressions and clicks per query in Search Console. Review monthly. No targets are promised.
9. **SEO roadmap (plan).**
   - Stage 1 (done): static, fast, accessible build; one indexable landing page; structured data; sitemap; llms.txt.
   - Stage 2 (owner): verify Search Console and Bing Webmaster Tools, submit the sitemap, add links from tekgemmstudio.com and marvelmafong.work.
   - Stage 3: add more indexable case studies or articles for TekGemm Studio only when each has unique value.
   - Stage 4: review queries and CTR, refine title and description, refresh the page.
10. **SEO budget (plan).** Zero paid links. Time budget: about 2 hours per month for monitoring and refreshes. Tools are free tiers (Search Console, Bing Webmaster, Lighthouse, Rich Results Test, Schema Markup Validator, Google Trends).

## 6. Off-page outreach plan (items 106 to 122). Nothing has been sent and nothing is purchased.
| Item | Plan |
|---|---|
| Backlink profile analysis | After indexing, export linking domains from Search Console and review quarterly. |
| Quality backlinks | Link from tekgemmstudio.com and marvelmafong.work with the exact anchor text in PROGRESS.md. |
| Industry publications, guest contributions | Pitch a short article on accessible clinic booking to healthcare and web design publications. Owner task. |
| Digital PR, brand mentions, unlinked mentions | Share the case study on professional networks. Search monthly for "TekGemm Studio" mentions and ask for a link where one is missing. |
| Resource page outreach, broken link opportunities | Find "healthcare web design examples" resource pages and suggest the case study politely. Never mass-email. |
| Competitor backlinks | Review which sites link to competing portfolios, then decide if an honest listing fits. |
| Anchor text diversity, link relevance | Mix of brand ("TekGemm Studio"), descriptive ("healthcare website case study") and naked URL. Prefer healthcare and web design sites. |
| Link spam monitoring | Check new referring domains monthly. Disavow only clear spam. |
| No paid links | Policy: never buy or trade links. |
| Partnerships, community participation, reputation | Join accessibility and web design communities and answer questions with no link spam. Collect real client testimonials only when real clients exist. |

## Reporting (item 217)
Monthly one-page report: impressions, clicks, CTR and average position for the case study; referring domains; Lighthouse scores; inquiries to TekGemm Studio (counted by TekGemm Studio, not by this site).

## Risk notes (items 221 to 236)
- No link schemes, no scaled content, no cloaking, no hidden text. One indexable page, no duplicates (canonical set per page).
- Migration plan: if the domain changes, set `NEXT_PUBLIC_SITE_URL`, rebuild, add 301 redirects in `vercel.json` from every old URL, resubmit the sitemap, verify with `npm run check:live`.
- Backup and recovery: source in GitHub, deploy from a local build; redeploy with `vercel deploy --prebuilt --prod`.
- Security incident response: rotate any exposed token in the Vercel and GitHub dashboards, redeploy, review the repository history. The site stores nothing server-side.
- Privacy: no cookies, no third-party scripts, local demo storage only (see /privacy/).

## Content updating and calendar (items 98, 101, 103)
Review the case study every quarter. Update the measured scores after each release. Seasonal content does not apply.

## Prioritization (item 249)
Impact on inquiries first, then effort. Order: indexing and links, case study clarity and speed, new proof (more case studies), then wider keywords.
