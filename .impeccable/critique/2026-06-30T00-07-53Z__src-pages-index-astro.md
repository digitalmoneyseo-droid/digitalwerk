---
target: src/pages/index.astro
total_score: 22
p0_count: 0
p1_count: 2
timestamp: 2026-06-30T00-07-53Z
slug: src-pages-index-astro
---
Method: dual-agent (A: 019f15d4-1896-77f0-8754-195840e51a22 · B: 019f15d4-5363-79b2-8e34-d5b91b40e5c0)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Active navigation exists, but desktop dropdowns visually open while `aria-expanded` remains false; reveal state depends on JS. |
| 2 | Match System / Real World | 3 | German copy is practical and local, but the promised full-funnel system is mostly asserted rather than shown. |
| 3 | User Control and Freedom | 2 | Mobile menu has back/Escape handling; desktop menu behavior is hover/focus-based and not programmatically honest. |
| 4 | Consistency and Standards | 3 | Components are cohesive, but repeated pills, cards, serif headings, and text-led sections flatten the campaign concept. |
| 5 | Error Prevention | 2 | Homepage has few risky inputs, but pricing/contact decisions lack fit guidance and expectation-setting. |
| 6 | Recognition Rather Than Recall | 3 | Services are discoverable, but visitors must remember how channels connect across sections. |
| 7 | Flexibility and Efficiency | 2 | Good route depth, but no fast diagnostic path, comparison aid, or shortcut for high-intent visitors. |
| 8 | Aesthetic and Minimalist Design | 2 | Clean but overfamiliar: pale agency wash, pill shell, broad shadows, rounded cards, editorial serif. |
| 9 | Error Recovery | 1 | Little recovery guidance; contact/pricing paths move visitors away without inline reassurance. |
| 10 | Help and Documentation | 2 | Resources and subpages exist, but contextual help for choosing a service, budget, or first lever is thin. |
| **Total** | | **22/40** | **Acceptable - significant improvements needed before the homepage feels ownable and robust.** |

## Anti-Patterns Verdict

**LLM assessment**: Moderate AI-slop risk. The page is competent and orderly, but it sits in a saturated polished-agency lane: Cormorant display serif, Manrope body, pale blue wash, fixed pill navigation, soft shadows, rounded pricing cards, and quiet text-led sections. For a brand-register agency, it currently reads as "clean digital agency" before it reads as "Digitalwerk."

The bigger functional issue is reveal motion. `.dw-reveal` and `.dw-reveal-stagger > *` start hidden and wait for IntersectionObserver to add `.is-visible`. That can produce blank sections in screenshots, hidden tabs, bots, print-like captures, or JS failure states.

**Deterministic scan**: The required project-local command failed because `.agents/skills/impeccable/scripts/detect.mjs` was missing in the repo. The installed fallback detector returned clean source scans for `src/pages/index.astro`, `src/components/home`, and `src/components/Header.astro`: 0 CLI findings.

**Visual overlays**: Browser injection succeeded in a Playwright fallback run, not a persistent Human tab. The rendered-page detector reported 6 anti-pattern overlays: two visible "hairline border with wide shadow" + "nested cards" flags around the navigation/menu region, one low-confidence invisible hairline-shadow flag, one all-caps body text flag on the audience ribbon, one long-line flag around the pricing section, and one low-contrast text flag in the featured pricing card. CLI and browser evidence disagree because the source scan is clean while rendered composition exposes the issues.

## Overall Impression

The homepage has a solid skeleton and unusually decent German agency copy. It avoids fake metrics and obvious buzzword fog. But it does not yet create a memorable agency world. Digitalwerk says it connects Website, SEO, Ads, Social, Branding, and KI; the page mostly renders that as lists, cards, and repeated CTAs. The single biggest opportunity is to turn the "system behind growth" into a visible, ownable interaction or visual model.

## What's Working

- **German copy is grounded.** It sounds practical and business-oriented, especially in `src/data/siteContent.ts`; it avoids inflated claims and gives visitors a clear commercial frame.
- **IA has real depth.** Services, prices, cases/project types, method, resources, and contact all exist as navigable routes, so this is not trapped as a one-page brochure.
- **Mobile basics are mostly sane.** The header has large touch targets, the menu has a back path and Escape handling, and the page avoided obvious horizontal overflow in browser inspection.

## Priority Issues

**[P1] Reveal motion can make real content disappear**

**Why it matters**: A brand homepage cannot rely on scroll-triggered JS for content visibility. Large sections can render blank before `.is-visible` is applied, which is fragile for screenshots, crawlers, background tabs, reduced-motion users, and JS failure.

**Fix**: Make content visible by default. Use animation as enhancement, for example with `@starting-style`, data attributes after hydration, or a class on `html` only after JS initializes. Reduced motion should skip choreography, not accelerate hidden content.

**Suggested command**: `$impeccable polish src/styles/global.css`

**[P1] Brand distinctiveness is too close to the agency template lane**

**Why it matters**: The brief calls for precise, inventive, commercially grounded. The current language and IA are grounded, but the visual system is broadly familiar: pale blue wash, pill nav, serif display, rounded cards, soft shadows. It could belong to many "Webdesign SEO Ads" agencies.

**Fix**: Build a proprietary Digitalwerk device: a campaign routing board, signal atlas, search/social/ads flow map, conversion architecture diagram, or channel orchestration scene. Let that device shape hero, services, and proof rather than adding another card section.

**Suggested command**: `$impeccable bolder src/pages/index.astro`

**[P2] The promised full-funnel system is not visualized**

**Why it matters**: Visitors have to mentally connect Webdesign, SEO, Ads, Social, Branding, and KI. That weakens the product promise: Digitalwerk appears as a service menu, not an operator of connected growth systems.

**Fix**: Replace at least one list section with a relationship model showing acquisition channels, landing pages, trust signals, measurement, and optimization loops. Motion should clarify flow, not just reveal blocks.

**Suggested command**: `$impeccable layout src/components/home/ServicesSection.astro`

**[P2] Pricing is generic for a high-trust decision**

**Why it matters**: "Starter / Professional / Betreuung" is understandable but package-shaped. German business owners need fit, scope, exclusions, and confidence about the first step more than another pricing card set.

**Fix**: Reframe pricing around situations: "Wenn die Website bremst," "Wenn Sichtbarkeit fehlt," "Wenn Kampagnen skalieren sollen." Add fit markers, what is not included, and what happens after the inquiry.

**Suggested command**: `$impeccable clarify src/components/home/PricingSection.astro`

**[P2] Navigation semantics and rendered anti-patterns need cleanup**

**Why it matters**: Desktop dropdowns use hover/focus but keep `aria-expanded="false"`. Rendered overlays also flagged nested-card and border-plus-wide-shadow patterns in the nav/menu region. This is both an accessibility issue and a visual craft issue.

**Fix**: Add real state management for desktop dropdowns or move to native disclosure/popover behavior. Reduce broad shadows around bordered nav/menu panels, and remove nested-card styling where the menu already sits inside a framed shell.

**Suggested command**: `$impeccable audit src/components/Header.astro`

## Persona Red Flags

**Jordan, first-time buyer**: Jordan understands the hero, but after that must infer which service fits the problem. "Leistungen," "Projektarten," "Ablauf," and "Preise" are individually clear, but the page does not guide Jordan from symptom to first action.

**Riley, edge-case evaluator**: Riley will notice the reveal fragility, the mismatch between "keine künstlichen Erfolgszahlen" and the lack of proof artifacts, and the placeholder-like nature of "Arbeiten" as project types instead of concrete evidence.

**Casey, mobile visitor**: Casey gets a readable mobile hero, but the page becomes a long sequence of text lists. The repeated CTA is accessible, but not more context-aware after pricing or service comparison.

**Sabine, German local service owner**: Sabine wants to know whether this fits her business, budget, region, and existing website. The site sounds competent, but does not yet show enough diagnostic examples, anonymized before/after structures, or decision logic to reduce agency risk.

## Minor Observations

- The repeated uppercase label treatment appears in the audience ribbon, why section, and pricing cards. A single strong label can be voice; repeated labels begin to feel like scaffolding.
- The process numbering is acceptable because it is a real sequence.
- Footer IA is useful and pragmatic; that practical decision support should move higher into the homepage.
- The featured pricing card uses translucent white text on a dark blue surface, which the browser overlay flagged as low contrast.
- The source CLI detector was clean, so the issues are more about rendered composition and design judgment than simple static lint findings.

## Questions to Consider

- What visual system could only belong to Digitalwerk, not any "Webdesign SEO Ads" agency?
- What if the homepage diagnosed the visitor's growth bottleneck before listing services?
- What proof can be shown without fake metrics: artifacts, decision logic, anonymized before/after structures, campaign maps?
- Should pricing sell packages, or should it sell the confidence that Digitalwerk will choose the right first lever?
- If every route is meant to feel like a distinct campaign concept, why does the homepage still feel like one continuous brochure?
