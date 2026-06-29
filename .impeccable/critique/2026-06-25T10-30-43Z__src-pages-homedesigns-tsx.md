---
target: whole Digitalwerk project
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-06-25T10-30-43Z
slug: src-pages-homedesigns-tsx
---
# Digitalwerk whole-project critique

Design health score: 28/40.

Anti-patterns verdict: Not obviously AI-made at first glance because the five concepts have real art-direction differences, custom local imagery, and distinct compositional systems. The weaker AI tells are repeated tiny uppercase labels, repeated rounded panel treatments, and placeholder-detail pages that reveal the concept as a scaffold rather than a finished agency site.

Deterministic scan: clean. `detect.mjs --json src` returned `[]`.

Browser evidence: desktop routes `/1` through `/5`, `/leistungen/geo`, `/preise`, and `/kontakt` rendered with no Vite overlay, no console errors, no mojibake, loaded local images on the five concept routes, and no horizontal overflow at 1280px. Mobile viewport automation became unstable after a screenshot timeout, so mobile evidence is source-level plus prior responsive structure, not a fresh visual overlay.

Priority issues:

[P1] The project is five concept demos, not one decisive agency homepage. `/1` to `/5` are all exposed as equal concepts in the main navigation, which is useful for exploration but confusing for a real prospect. Fix by choosing one primary direction, moving variants behind an internal showcase or removing them from public nav, and turning the winning route into `/`.

[P1] Detail pages are thin placeholders. Pricing, cases, contact, resources, and all service pages mostly say `Platzhalterseite`, which breaks trust exactly when a motivated visitor asks for proof, cost, or next steps. Fix by replacing placeholder intros with concrete deliverables, process, eligibility, example ranges, and real contact mechanics.

[P2] The megamenu is visually rich but semantically under-specified. Desktop menu buttons open hover/focus panels but do not expose `aria-haspopup`, `aria-expanded`, or click-to-toggle state, and the 920px absolute panel risks awkward edge cases. Fix with an accessible disclosure/menu pattern and current-route state.

[P2] The visual language is energetic but overuses the same small-label grammar and rounded/glow panel vocabulary. Several routes use tiny uppercase tracked labels and 22-26px rounded panels, which softens the difference between concepts and nudges the system toward generated landing-page habits. Fix by giving the chosen concept a tighter token system and removing repeated decorative grammar.

[P2] Conversion path is present but low-specificity. CTAs such as `Wachstum kartieren`, `Orbit planen`, and `Projekt skizzieren` sound stylish but do not set expectations for what happens next. Fix by making primary CTAs action-specific: `Kostenlosen Growth-Audit anfragen`, `SEO- und Ads-Potenzial prüfen`, or `30-minütiges Erstgespräch buchen`.

Strengths:

- The project avoids a one-page brochure shape and has real service IA through megamenus and linked subpages.
- The five concepts are materially different in mood: atlas, market, operations, studio, and orbit each has a recognizable premise.
- Browser rendering is technically healthy on desktop: no broken images, no visible encoding issue, no console errors, and the detector found no deterministic slop flags.

Persona red flags:

Jordan, the first-timer, may not know why there are five public concepts or which one represents the actual agency. On service pages, Jordan reaches placeholder copy instead of proof or next-step guidance.

Riley, the stress tester, will click pricing, cases, contact, and resources and immediately see the scaffolding. That creates a promise/reality mismatch.

Casey, the distracted mobile visitor, needs a clear single path. The mobile menu contains a lot of service, agency, resource, and concept choices before the business has proven why the user should engage.

Questions to consider:

- What is the one homepage concept Digitalwerk wants prospects to remember tomorrow?
- Which proof should replace placeholders first: cases, pricing, contact flow, or service detail?
- Should public navigation show concept variants at all, or should it behave like a finished agency website?
