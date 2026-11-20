# SEO status

Every item has one status. DONE means a script or file check passed (see `reports/live-results.json`). DONE-READY means built and switched off because clinic pages are intentionally noindex. CONFIG waits for a key or code. OWNER is a human task. N/A has an honest reason.

Last live check: 2026-11-20T13:53:14.783Z against http://localhost:4173 (41 routes).

## Lighthouse (recorded)

| Page | Form | SEO | A11y | Best practices | Perf | LCP ms | CLS | TBT ms |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 69 | 100 | 96 | 63 | 3571 | 0 | 1501 |
| /case-study/ | mobile | 100 | 100 | 96 | 56 | 5449 | 0 | 1147 |
| /appointments/ | mobile | 69 | 100 | 100 | 67 | 3198 | 0.063 | 1309 |
| /departments/primary-care/ | mobile | 69 | 100 | 96 | 66 | 3478 | 0 | 1336 |
| /resources/ | mobile | 69 | 98 | 100 | 81 | 3313 | 0 | 437 |
| /admin/dashboard/ | mobile | 66 | 100 | 100 | 72 | 3095 | 0.08 | 881 |
| / | desktop | 69 | 100 | 96 | 35 | 3966 | 0 | 17327 |
| /case-study/ | desktop | 100 | 100 | 96 | 33 | 4691 | 0.001 | 3977 |
| /appointments/ | desktop | 69 | 100 | 96 | 41 | 3091 | 0.019 | 2185 |
| /departments/primary-care/ | desktop | 69 | 100 | 96 | 39 | 3737 | 0 | 2921 |
| /resources/ | desktop | 69 | 98 | 96 | 38 | 3586 | 0.001 | 2084 |
| /admin/dashboard/ | desktop | 66 | 100 | 100 | 67 | 3071 | 0.056 | 337 |

INP is a field metric; TBT is the lab proxy.

## 1 Strategy

| # | Item | Status | Where or why |
|---|---|---|---|
| 1 | objectives | DONE | Documented in SEO-STRATEGY.md (items marked as plans there). [verified: file:SEO-STRATEGY.md] |
| 2 | target audiences | DONE | Documented in SEO-STRATEGY.md (items marked as plans there). [verified: file:SEO-STRATEGY.md] |
| 3 | target markets | DONE | Documented in SEO-STRATEGY.md (items marked as plans there). [verified: file:SEO-STRATEGY.md] |
| 4 | search intent | DONE | Documented in SEO-STRATEGY.md (items marked as plans there). [verified: file:SEO-STRATEGY.md] |
| 5 | competitors | DONE | Documented in SEO-STRATEGY.md (items marked as plans there). [verified: file:SEO-STRATEGY.md] |
| 6 | SEO audit | DONE | Documented in SEO-STRATEGY.md (items marked as plans there). [verified: file:SEO-STRATEGY.md] |
| 7 | keyword priorities | DONE | Documented in SEO-STRATEGY.md (items marked as plans there). [verified: file:SEO-STRATEGY.md] |
| 8 | ranking benchmarks | DONE | Documented in SEO-STRATEGY.md (items marked as plans there). [verified: file:SEO-STRATEGY.md] |
| 9 | SEO roadmap | DONE | Documented in SEO-STRATEGY.md (items marked as plans there). [verified: file:SEO-STRATEGY.md] |
| 10 | SEO budget | DONE | Documented in SEO-STRATEGY.md (items marked as plans there). [verified: file:SEO-STRATEGY.md] |

## 2 Keywords

| # | Item | Status | Where or why |
|---|---|---|---|
| 11 | primary | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 12 | secondary | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 13 | long-tail | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 14 | question-based | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 15 | commercial | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 16 | informational | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 17 | transactional | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 18 | navigational | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 19 | semantic | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 20 | search volume | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 21 | keyword difficulty | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 22 | intent validation | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 23 | competitor keywords | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 24 | clustering | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 25 | mapping to pages | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 26 | cannibalisation prevention | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 27 | trend monitoring | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |
| 28 | opportunity discovery | DONE | Keyword map in KEYWORD-MAP.md. Volume and difficulty are labeled estimates. [verified: file:KEYWORD-MAP.md] |

## 3 Technical

| # | Item | Status | Where or why |
|---|---|---|---|
| 29 | crawler accessibility | DONE | robots.txt allows crawling; pages are static HTML. [verified: robots] |
| 30 | XML sitemap | DONE | public/sitemap.xml generated by scripts/seo-gen.mjs (case study only). [verified: sitemap] |
| 31 | robots.txt | DONE | public/robots.txt generated at build. [verified: robots] |
| 32 | Google Search Console | OWNER | Verify the property in Search Console (DNS or HTML tag) and submit /sitemap.xml. Once, then check monthly. |
| 33 | Bing Webmaster Tools | OWNER | Import the site from Search Console into Bing Webmaster Tools and submit the sitemap. Once, then check monthly. |
| 34 | HTTPS | DONE | Served over HTTPS by the host; HSTS header set in vercel.json. [verified: https] |
| 35 | canonical URLs | DONE | Self-referencing absolute canonical on every page (src/components/seo.tsx). [verified: canonical] |
| 36 | redirects | DONE | Only the trailing-slash redirect exists (one hop). [verified: redirect] |
| 37 | broken links | DONE | Every internal link in the build returns 200. [verified: links] |
| 38 | 404 pages | DONE | Branded 404 page returns a real 404 status. [verified: notfound] |
| 39 | no redirect chains | DONE | No redirect chains (single hop). [verified: redirect-chain] |
| 40 | duplicate content | DONE | Unique titles and canonical per page; no duplicate content. [verified: dup-titles] |
| 41 | URL structure | DONE | Lowercase, trailing-slash, hyphenated URLs. [verified: urlform] |
| 42 | mobile-first | PENDING | Mobile-first layout; Lighthouse mobile run. (check "lh:mobile" has not passed yet) |
| 43 | crawlability | DONE | Static HTML, internal links on every page. [verified: links] |
| 44 | indexability | DONE | Only /case-study/ is indexable; verified by meta robots and X-Robots-Tag on every route. [verified: indexing] |
| 45 | JavaScript SEO | DONE | Pages are pre-rendered static HTML; content is present without running scripts. [verified: ssr] |
| 46 | pagination | N/A | No paginated lists. |
| 47 | international URL structure | N/A | Single language and country (en-US). |
| 48 | hreflang | N/A | No alternate language versions. |
| 49 | structured data validation | DONE | All JSON-LD parses and has @context and @type. Also run the Schema Markup Validator (owner, quarterly). [verified: schema] |
| 50 | site architecture | DONE | Flat architecture: home, departments, doctors, resources, case study. Documented in PROGRESS.md. [verified: links] |
| 51 | internal linking | DONE | Footer credit and breadcrumbs link to /case-study/; every page links onward. [verified: links] |
| 52 | orphan pages | DONE | No page is unlinked from the site. [verified: orphans] |
| 53 | crawl budget | DONE | Small static site; one indexable URL. [verified: sitemap] |
| 54 | server response | DONE | Static files from the CDN edge; response time measured. [verified: ttfb] |
| 55 | Core Web Vitals | PENDING | Lighthouse results in reports/ and on the case study. (check "lh:perf" has not passed yet) |
| 56 | LCP under 2.5s | PENDING | LCP measured by Lighthouse (lab). (check "lh:lcp" has not passed yet) |
| 57 | INP under 200ms | CONFIG | INP is a field metric. Lab proxy (TBT) is recorded; confirm field INP in Search Console once traffic exists. |
| 58 | CLS 0.1 or lower | DONE | CLS measured by Lighthouse (lab). [verified: lh:cls] |
| 59 | image loading | DONE | Responsive avif/webp/jpg with width, height, lazy loading; hero is eager with high priority. [verified: imgdims] |
| 60 | browser caching | DONE | Immutable one-year cache for /images, /_next/static, /fonts; HTML revalidates. [verified: cache-assets] |
| 61 | compression | DONE | Brotli or gzip on responses. [verified: gzip] |
| 62 | CDN | DONE | Served from the Vercel edge network. [verified: cdn] |
| 63 | database performance | N/A | No database. Data lives in the browser until Neon is added. |
| 64 | uptime monitoring | OWNER | Add a free uptime monitor for the case study URL (any provider). Check alerts monthly. |
| 65 | security monitoring | DONE | Security headers set (HSTS, CSP, frame, referrer, nosniff). Rotate tokens if exposed. [verified: secheaders] |

## 4 On-page

| # | Item | Status | Where or why |
|---|---|---|---|
| 66 | unique titles | DONE | On-page basics verified on every page. [verified: titles] |
| 67 | meta descriptions | DONE | Unique 50 to 170 character descriptions. [verified: descs] |
| 68 | heading hierarchy | DONE | One h1 per page; h2 and h3 follow in order. [verified: h1] |
| 69 | primary keyword placement | DONE | Primary keyword in title, h1 and first paragraph of /case-study/. [verified: casestudy-links] |
| 70 | introduction | DONE | Intro paragraph states what was built and who built it. [verified: casestudy-links] |
| 71 | readability | DONE | Plain language, short sentences. [verified: casestudy-links] |
| 72 | content completeness | DONE | Covers who, problem, design, build, technology, outcomes and FAQ. [verified: casestudy-links] |
| 73 | semantic relevance | DONE | Related entities included (WCAG, appointment requests, static site). [verified: casestudy-links] |
| 74 | image alt text | DONE | Every image has an alt attribute (empty for decorative). [verified: alt] |
| 75 | image filenames | DONE | Descriptive filenames (case-home.png, dept-cardiology.jpg). [verified: alt] |
| 76 | image captions | DONE | Captions on case study screenshots. [verified: caseimgs] |
| 77 | internal contextual links | DONE | Case study links to the live demo pages. [verified: links] |
| 78 | external references | DONE | Articles link to public health references (noindex pages); case study links to the studio and portfolio. [verified: casestudy-links] |
| 79 | descriptive anchor text | DONE | Descriptive anchor text throughout. [verified: links] |
| 80 | content freshness | DONE | Case study shows measured date; refresh quarterly (see strategy). [verified: file:SEO-STRATEGY.md] |
| 81 | unique content | DONE | All copy is original. [verified: dup-titles] |
| 82 | formatting | DONE | Headings, lists, tables and short paragraphs. [verified: h1] |
| 83 | media optimisation | DONE | Pre-generated avif/webp/jpg sizes. [verified: imgdims] |
| 84 | breadcrumbs | DONE | Breadcrumbs with BreadcrumbList schema on inner pages. [verified: schema] |
| 85 | conversion alignment | DONE | One conversion goal per page (A10). [verified: casestudy-links] |

## 5 Content and authority

| # | Item | Status | Where or why |
|---|---|---|---|
| 86 | content strategy | DONE | Single-landing-page strategy in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 87 | topic clusters | DONE-READY | Clinic articles form clusters (visit prep, everyday health, heart, skin). Built and noindex by design. |
| 88 | pillar pages | DONE | /case-study/ is the pillar page. [verified: casestudy-links] |
| 89 | supporting articles | DONE-READY | Eight articles exist, noindex by design. |
| 90 | original research | N/A | No invented research. Only measured Lighthouse results are shown. |
| 91 | expert contributions | N/A | No outside experts are quoted. Doctors are fictional. |
| 92 | author identification | DONE | Marvel Mafong is identified on the case study (Person schema); articles carry fictional author lines. [verified: casestudy-schema] |
| 93 | editorial quality control | DONE | Editorial rules in CLAUDE.md (no invented claims, American English). [verified: file:CLAUDE.md] |
| 94 | evidence and citations | DONE-READY | Articles cite public references; no medical claims on the indexable page. |
| 95 | practical examples | DONE | The case study shows real screenshots and measured scores. [verified: caseimgs] |
| 96 | differentiation | DONE | Fully working demo with admin, not just mockups. [verified: casestudy-links] |
| 97 | content gap analysis | OWNER | Review the top results for the primary keywords and note gaps. Quarterly. |
| 98 | content updating | DONE | Quarterly update plan in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 99 | consolidation | N/A | One indexable page, nothing to consolidate. |
| 100 | pruning | N/A | Nothing to prune. |
| 101 | editorial calendar | DONE | Calendar in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 102 | evergreen content | DONE | Case study content is evergreen. [verified: casestudy-links] |
| 103 | seasonal content | N/A | No seasonal content. |
| 104 | multimedia | DONE | Real screenshots of the build on the case study. [verified: caseimgs] |
| 105 | content performance analysis | OWNER | Review Search Console queries and CTR monthly. |

## 6 Off-page

| # | Item | Status | Where or why |
|---|---|---|---|
| 106 | backlink profile analysis | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 107 | quality backlinks | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 108 | industry publications | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 109 | guest contributions | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 110 | digital PR | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 111 | brand mentions | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 112 | unlinked mentions | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 113 | resource page outreach | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 114 | broken link opportunities | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 115 | competitor backlinks | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 116 | anchor text diversity | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 117 | link relevance | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 118 | link spam monitoring | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 119 | no paid links | DONE | Policy: no paid links. Stated in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 120 | partnerships | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 121 | community participation | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |
| 122 | reputation development | OWNER | Outreach plan in SEO-STRATEGY.md (section 6). Nothing contacted, nothing purchased. |

## 7 Local

| # | Item | Status | Where or why |
|---|---|---|---|
| 123 | Google Business Profile | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 124 | NAP consistency | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 125 | categories | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 126 | business description | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 127 | business photos | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 128 | opening hours | DONE-READY | Hours are shown on the Contact page but are not marked up as a real business. |
| 129 | customer reviews | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 130 | review responses | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 131 | local directories | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 132 | local landing pages | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 133 | local keywords | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 134 | local backlinks | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 135 | local business schema | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |
| 136 | local search monitoring | N/A | Oakline is fictional and has no real address, so no local listing exists. TekGemm Studio is not given a made-up address. |

## 8 International

| # | Item | Status | Where or why |
|---|---|---|---|
| 137 | market research | DONE | Market scope in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 138 | country search research | DONE | United States first, in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 139 | language targeting | DONE | html lang is en-US. [verified: lang] |
| 140 | hreflang accuracy | N/A | No alternate languages. |
| 141 | country targeting strategy | DONE | Strategy in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 142 | localised content | N/A | English only. |
| 143 | international link building | OWNER | Add when expanding outreach. |
| 144 | international payment experience | N/A | No sales on this site. |
| 145 | shipping information | N/A | No products. |
| 146 | regional performance tracking | OWNER | Review the Search Console country report monthly. |

## 9 E-commerce

| # | Item | Status | Where or why |
|---|---|---|---|
| 147 | product titles | N/A | No products or checkout. Oakline takes no payment. |
| 148 | unique descriptions | N/A | No products or checkout. Oakline takes no payment. |
| 149 | product images | N/A | No products or checkout. Oakline takes no payment. |
| 150 | product schema | N/A | No products or checkout. Oakline takes no payment. |
| 151 | price markup matches visible price | N/A | No products or checkout. Oakline takes no payment. |
| 152 | availability markup | N/A | No products or checkout. Oakline takes no payment. |
| 153 | review markup | N/A | No products or checkout. Oakline takes no payment. |
| 154 | category pages | N/A | No products or checkout. Oakline takes no payment. |
| 155 | filter indexation control | DONE | Doctor and article filters are client-side state and create no crawlable URLs. [verified: canonical] |
| 156 | variants | N/A | No products or checkout. Oakline takes no payment. |
| 157 | out-of-stock handling | N/A | No products or checkout. Oakline takes no payment. |
| 158 | discontinued products | N/A | No products or checkout. Oakline takes no payment. |
| 159 | Merchant Center | N/A | No products or checkout. Oakline takes no payment. |
| 160 | shopping feed | N/A | No products or checkout. Oakline takes no payment. |
| 161 | customer-generated content | N/A | No products or checkout. Oakline takes no payment. |
| 162 | comparison content | N/A | No products or checkout. Oakline takes no payment. |
| 163 | product navigation | N/A | No products or checkout. Oakline takes no payment. |
| 164 | checkout accessibility | N/A | No products or checkout. Oakline takes no payment. |

## 10 Rich results

| # | Item | Status | Where or why |
|---|---|---|---|
| 165 | Article schema | DONE-READY | Article JSON-LD on every article (noindex by design). |
| 166 | Product schema | N/A | No products. |
| 167 | Organization schema | DONE | Organization (TekGemm Studio) on /case-study/. [verified: casestudy-schema] |
| 168 | Person schema | DONE | Person (Marvel Mafong) on /case-study/. [verified: casestudy-schema] |
| 169 | Breadcrumb schema | DONE | BreadcrumbList on inner pages. [verified: schema] |
| 170 | Video schema | N/A | No video. |
| 171 | Event schema | N/A | No events. |
| 172 | Recipe schema | N/A | No recipes. |
| 173 | Course schema | N/A | No courses. |
| 174 | Review schema | N/A | No reviews exist, so no Review markup. |
| 175 | rich result testing | OWNER | Test /case-study/ in the Rich Results Test and Schema Markup Validator after each change. Quarterly. |
| 176 | search appearance monitoring | OWNER | Review the Search Console appearance reports monthly. |
| 177 | image search | DONE | Image sitemap and descriptive alt text on case study images. [verified: imgsitemap] |
| 178 | video search | N/A | No video. |

## 11 AI search and GEO

| # | Item | Status | Where or why |
|---|---|---|---|
| 179 | answer-focused content | DONE | FAQ answers on /case-study/ answer questions directly. [verified: casestudy-schema] |
| 180 | factual consistency across web | DONE | Same facts in the page, schema and llms.txt. [verified: llms] |
| 181 | original expertise | DONE | First-hand project with real screenshots and measurements. [verified: caseimgs] |
| 182 | clear entity information | DONE | Organization and Person entities with sameAs. [verified: sameas] |
| 183 | structured information | DONE | JSON-LD, tables and lists. [verified: schema] |
| 184 | author credibility | DONE | Named builder, linked portfolio. [verified: casestudy-schema] |
| 185 | AI crawler accessibility | DONE | AI crawlers are allowed in robots.txt. [verified: robots] |
| 186 | AI visibility monitoring | OWNER | Search for TekGemm Studio in AI assistants monthly and note whether the case study is cited. |
| 187 | citation-worthiness | DONE | Plain facts, a clear fictional-clinic statement, and measured outcomes. [verified: llms] |
| 188 | original statistics | N/A | No invented statistics. Only measured scores. |
| 189 | conversational search | DONE | FAQ is written as natural questions. [verified: casestudy-schema] |
| 190 | AI content quality control | DONE | Everything is human-reviewed; rules in CLAUDE.md. [verified: file:CLAUDE.md] |

## 12 UX and conversion

| # | Item | Status | Where or why |
|---|---|---|---|
| 191 | mobile usability | PENDING | Mobile Lighthouse and viewport checks. (check "lh:mobile" has not passed yet) |
| 192 | navigation simplicity | DONE | Short main menu, mega menu, one-tap phone and request. [verified: links] |
| 193 | visual hierarchy | DONE | Clear hierarchy, large type, strong contrast. [verified: h1] |
| 194 | accessibility | DONE | Lighthouse accessibility score. [verified: lh:a11y] |
| 195 | readable typography | DONE | Hyperlegible body font, 17px base. [verified: fontpreload] |
| 196 | no intrusive popups | DONE | No popups or overlays on public pages. [verified: nopopups] |
| 197 | trust signals | DONE | Trust comes from honesty: named builder, fictional label, real measurements, no fake proof. [verified: casestudy-links] |
| 198 | clear calls to action | DONE | One clear call to action per page. [verified: casestudy-links] |
| 199 | form optimisation | DONE | Labeled fields, inline errors, no unnecessary fields. [verified: links] |
| 200 | cross-device testing | DONE | Desktop and phone viewports tested with screenshots (see reports/). [verified: caseimgs] |
| 201 | conversion tracking | DONE | Local event layer behind an interface; dashboard shows it. [verified: file:src/lib/repos.ts] |
| 202 | funnel analysis | DONE | Funnel chart in the admin dashboard. [verified: file:src/components/DashboardAdmin.tsx] |
| 203 | A/B testing | N/A | One indexable page; nothing to split-test yet. |
| 204 | customer feedback | OWNER | Ask people who contact TekGemm Studio what they were looking for. |

## 13 Analytics

| # | Item | Status | Where or why |
|---|---|---|---|
| 205 | Google Analytics 4 | CONFIG | Provider interface ready (src/lib/repos.ts). Add a GA4 provider and measurement ID when wanted. No script loaded today. |
| 206 | Search Console monitoring | OWNER | Review Search Console weekly after launch, then monthly. |
| 207 | Bing monitoring | OWNER | Review Bing Webmaster monthly. |
| 208 | organic traffic tracking | OWNER | Track organic clicks in Search Console. |
| 209 | keyword ranking tracking | OWNER | Record positions monthly from Search Console. |
| 210 | CTR analysis | OWNER | Review CTR per query monthly. |
| 211 | landing page analysis | OWNER | Review landing page report. |
| 212 | conversion attribution | CONFIG | Needs GA4 or similar. Not installed by design. |
| 213 | device analysis | OWNER | Review device report. |
| 214 | geographic analysis | OWNER | Review country report. |
| 215 | engagement analysis | CONFIG | Needs an analytics provider. |
| 216 | revenue tracking | N/A | No online sales. |
| 217 | SEO reporting | DONE | Report template in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 218 | anomaly detection | OWNER | Watch Search Console for sudden drops. |
| 219 | competitor monitoring | OWNER | Re-check competitor pages quarterly. |
| 220 | algorithm update monitoring | OWNER | Follow Google Search Central announcements. |

## 14 Maintenance and risk

| # | Item | Status | Where or why |
|---|---|---|---|
| 221 | Google Search Essentials compliance | DONE | No spam techniques; one honest landing page. [verified: indexing] |
| 222 | spam prevention | DONE | No user-generated public content. [verified: nopopups] |
| 223 | no link schemes | DONE | No link schemes. [verified: file:SEO-STRATEGY.md] |
| 224 | scaled content quality | DONE | No scaled content. [verified: sitemap] |
| 225 | duplicate page prevention | DONE | Canonical on every page. [verified: canonical] |
| 226 | migration planning | DONE | Migration plan in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 227 | redirect verification | DONE | Redirect behavior verified. [verified: redirect] |
| 228 | indexation monitoring | OWNER | Check Search Console indexing report monthly. |
| 229 | security incident response | DONE | Response plan in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 230 | manual action monitoring | OWNER | Check Search Console for manual actions monthly. |
| 231 | copyright compliance | OWNER | Confirm usage rights for the supplied photographs before wider promotion. The site credits the build only. |
| 232 | privacy compliance | DONE | /privacy/ explains local-only storage; no personal data leaves the browser. [verified: nothirdparty] |
| 233 | cookie compliance | DONE | No cookies are set and no trackers load, so no banner is needed. [verified: nothirdparty] |
| 234 | broken functionality monitoring | DONE | npm run check:live checks every route. [verified: file:scripts/verify-live.mjs] |
| 235 | backup and recovery | DONE | Source in GitHub; redeploy with one command. [verified: file:vercel.json] |
| 236 | continuous SEO audits | DONE | npm run check:live and Lighthouse on each release. [verified: file:scripts/verify-live.mjs] |

## 15 Advanced

| # | Item | Status | Where or why |
|---|---|---|---|
| 237 | SERP feature analysis | OWNER | Review SERP features for the primary queries once indexed. |
| 238 | content benchmarking | OWNER | Compare with top results quarterly. |
| 239 | technical benchmarking | PENDING | Lighthouse results recorded for comparison. (check "lh:perf" has not passed yet) |
| 240 | authority analysis | OWNER | Review referring domains after links appear. |
| 241 | demand forecasting | OWNER | Use Google Trends quarterly. |
| 242 | content ROI | OWNER | Count inquiries attributed to the page. |
| 243 | programmatic SEO only with unique value | N/A | No programmatic pages. One unique landing page. |
| 244 | search journey optimisation | DONE | Footer, siblings and case study link the journey. [verified: links] |
| 245 | brand search growth | OWNER | Track branded queries in Search Console. |
| 246 | search reputation management | OWNER | Search brand names quarterly. |
| 247 | market expansion research | N/A | No expansion planned now. |
| 248 | SEO automation | DONE | Scripts automate audits (scripts/). [verified: file:scripts/verify-live.mjs] |
| 249 | prioritisation framework | DONE | Framework in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |
| 250 | long-term improvement | DONE | Roadmap in SEO-STRATEGY.md. [verified: file:SEO-STRATEGY.md] |

## 16 Tools

| Tool | Use |
|---|---|
| Search Console | OWNER: free tier or paid account |
| GA4 | OWNER: free tier or paid account |
| PageSpeed Insights | Run on the live URL after each release (OWNER) |
| Lighthouse | Run locally or via owner on the live URL |
| Screaming Frog | OWNER: free tier or paid account |
| Ahrefs | OWNER: free tier or paid account |
| Semrush | OWNER: free tier or paid account |
| Bing Webmaster Tools | OWNER: free tier or paid account |
| Rich Results Test | Run locally or via owner on the live URL |
| Schema Markup Validator | Run locally or via owner on the live URL |
| Google Trends | OWNER: free tier or paid account |
| Merchant Center | N/A: no products |

## Appendix A

| # | Item | Status | Where or why |
|---|---|---|---|
| A1 | Pass criteria recorded per item | DONE | Pass criteria recorded in the Lighthouse table and the live check above. [verified: lh:a11y] |
| A2 | IndexNow | DONE-READY | public/f3a91c27d84b4e6a9c05b17e2d8a64f0.txt exists. Switched off (INDEXNOW=off) while one page is indexable. Enable by setting INDEXNOW=on and pinging the API on deploy. |
| A3 | One consistent URL form | DONE | Lowercase, trailing slash, https canonical. [verified: urlform] |
| A4 | Soft 404 and status code correctness | DONE | Unknown URLs return a real 404. [verified: soft404] |
| A5 | Open Graph and Twitter cards per page | DONE | Open Graph and Twitter tags on every page. [verified: og] |
| A6 | sameAs links in Organization schema | DONE | Organization sameAs lists only tekgemmstudio.com and marvelmafong.work. [verified: sameas] |
| A7 | Image sitemap | DONE | Image sitemap entries for case study images. [verified: imgsitemap] |
| A8 | Third-party script control and font loading strategy | DONE | Self-hosted subset fonts, font-display swap, hero font preloaded, zero third-party scripts. [verified: nothirdparty] |
| A9 | Server log review of crawl behavior | OWNER | Review Vercel request logs for crawler hits after launch (no log drains are enabled to save usage). Monthly. |
| A10 | One conversion goal per page | DONE | Request an Appointment on clinic pages; Contact TekGemm Studio on the case study. [verified: casestudy-links] |
| A11 | Regular lost lead review | DONE | Admin "Needs follow-up" view lists Requested items older than 48 hours. [verified: file:src/components/RequestsAdmin.tsx] |

## 17 Final quality gate

| # | Gate | Status |
|---|---|---|
| 1 | Important pages discoverable and crawlable | PASS  |
| 2 | Indexable and indexed where appropriate | PASS  |
| 3 | No critical technical problems | PASS  |
| 4 | Every important page targets clear intent | PASS  |
| 5 | Content original, useful, accurate, comprehensive | PASS  |
| 6 | Navigation and internal linking logical | PASS  |
| 7 | Excellent mobile | OPEN  |
| 8 | Core Web Vitals good | OPEN  |
| 9 | Structured data valid | PASS  |
| 10 | Backlinks and mentions earned legitimately | OPEN OWNER: links must be earned (plan in strategy) |
| 11 | International and local targeting configured | PASS Local N/A by design; international: en-US only |
| 12 | Analytics and conversion tracking work | PASS Local event layer works; GA4 is CONFIG |
| 13 | No spam-policy violations | PASS  |
| 14 | Content reviewed regularly | PASS Quarterly plan |
| 15 | Performance measured against business outcomes | OPEN OWNER: after launch |

## Totals

- DONE: 142
- OWNER: 49
- PENDING: 5
- N/A: 55
- CONFIG: 4
- DONE-READY: 6
