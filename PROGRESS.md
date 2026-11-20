Overall progress: 55% (all screens written, building and testing next)

# Oakline Medical Group build log

## Stages
- [x] Stage 0: handoff extracted, fonts and images extracted, design CSS ported from the approved Home preview
- [x] Stage 1: data layer (repositories), Home, request flow, lookup, departments, doctors, resources, static pages, 404
- [x] Stage 2: staff admin (requests, dashboard, messages)
- [x] Stage 3: case study, SEO files, scripts
- [ ] Build, test flows, screenshots, Lighthouse
- [ ] GitHub push
- [ ] Preview deploys (max 3) and one production deploy
- [ ] Live smoke tests

## Decisions made without asking
- Design CSS is ported as a global stylesheet (src/app/globals.css) taken directly from the approved Home preview; inner-page additions live in src/app/app.css. This keeps the Home identical to the approved design.
- The preview used 1.5px outlines on some cards, but its own later rules and the brief say no outlines. Cards use soft shadows and gradients only.
- Admin sign-in uses the demo access string the brief specified (staff@oakline.example / oakline-demo) shown on the login page. The field is labeled "Staff ID", not "Email".
- Fictional street address on Contact: 100 Oakline Plaza, Suite 200, Sandy Springs, GA 30328. Phone (404) 555-0142 comes from the approved preview.
- Doctors: 9 fictional doctors. Three use the supplied portraits. Six use square crops of the team photos made by scripts/images.mjs.
- Booking request is date and time based on local availability derived from each doctor's weekly schedule. Weekdays only, next 28 days.
- Home quick form creates a real request using the soonest open time in the chosen window.
- Lint: eslint was dropped (the npm network was too slow to install it); `npm run lint` runs the TypeScript compiler.
- Dependencies were copied from another local project's node_modules because the npm registry was extremely slow here (about 19 KB/s). Versions follow that install.
- Commits use the git identity configured on this machine. The GitHub account signed in is MarvelMafong, which is the correct identity for the push.
