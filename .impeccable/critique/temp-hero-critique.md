# Critique Report: Hero Section

**Method: dual-agent (A: a2d04d5b3155e3b31 · B: a9819daff27499a09)**

---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 0/4 | WebGL loading = blank void; no scroll indicator; no feedback during 3D init |
| 2 | Match System / Real World | 3/4 | Bahasa Indonesia correct; "Diskusi Gratis" natural; minor deduction for Silicon Valley aesthetic |
| 3 | User Control and Freedom | 2/4 | CTAs work but no persistent nav visible in hero; scroll IDs have no JS fallback |
| 4 | Consistency and Standards | 1/4 | DESIGN.md tokens completely abandoned — wrong palette, wrong font, wrong hero pattern |
| 5 | Error Prevention | 1/4 | No WebGL error boundary; `loading: () => null` on 3D import; no feature detection |
| 6 | Recognition Rather Than Recall | 1/4 | RotatingText hides 3/4 services at any moment; forces working memory |
| 7 | Flexibility and Efficiency | 1/4 | No keyboard shortcuts; LightRays pointer-only; no user control over animation |
| 8 | Aesthetic and Minimalist Design | 1/4 | Yellow (#facc15) on charcoal is aggressive; 3D scene competes with headline |
| 9 | Error Recovery | 0/4 | getElementById failures silent; WebGL context loss unhandled; zero fallback content |
| 10 | Help and Documentation | 0/4 | No help in hero; "Diskusi Gratis" has no scope; no trust signals |
| **Total** | | **9/40** | **Critical redesign required** |

> **Rating band: 0–11 Critical.** At 9/40, this hero is in critical condition.

---

## Design Specificity Verdict

### LLM Assessment

**FAIL — The implementation is a complete design system betrayal.**

The DESIGN.md specifies: deep indigo navy (`#1b1938`), pale violet accent (`#c9b4fa`), teal closing band (`#0e3030`), variable display sans at sub-default weights (460–540), and a half-bleed portrait pattern. None of these were implemented.

What shipped instead:

| Token | DESIGN.md Spec | What Shipped |
|-------|---------------|--------------|
| `--color-primary` | `#1b1938` (indigo) | `#171614` (charcoal) |
| `--color-surface-violet-soft` | `#c9b4fa` (pale violet) | `#facc15` (yellow) |
| `--color-surface-teal-deep` | `#0e3030` (teal) | `#262211` (dark brown) |
| Headline font | Variable display sans (460–540) | Arial_Black |
| Hero pattern | Half-bleed portrait + atmospheric backdrop | WebGL 3D geometric sculpture |

This is not an evolution — it's a different product. The yellow accent (`#facc15`) signals "attention! sale!" rather than "premium, trustworthy, personal." A prospect cannot distinguish this hero from 10,000 other indie-hacker landing pages. The 3D sculpture is technically impressive but atomizes Al Ghifari's identity into a commodity aesthetic. There is no human face, no personal anchor, no "who is this person" answered in the hero.

The CLI detector found **0 issues** — this does not mean the design is clean. The detector does not evaluate color token fidelity, brand coherence, or strategic intent. The automated scan is not the arbiter of design quality here.

### Deterministic Scan

- **CLI exit code:** 0 — 0 findings
- **CLI note:** The detector does not flag design token drift, color palette misalignment, typography system violations, or missing human identity elements. Clean scan ≠ clean design.
- **Browser visualization:** Hero renders with dark gradient, rotating text, 2 CTAs, and a 3D Spline scene loading in background. No console errors.
- **Additional issues caught by manual check (not detector):**
  - Hidden scrollbar (`scrollbar-width: none`) — accessibility violation for users who rely on scroll position indicators
  - Focus outline uses `--color-primary` (dark `#171614`) on dark hero background — invisible on keyboard navigation

---

## Overall Impression

The hero is a case of **implementation drift at scale** — the DESIGN.md describes a specific aesthetic, and the implementation delivers almost none of it. Two things work: the `prefersReducedMotion` handling and the "Diskusi Gratis" copy decision. Everything else needs fundamental rethinking.

The single biggest problem: **there is no Al Ghifari in this hero.** A 3D sculpture and rotating text do not answer "who is this person and why should I trust them." For a personal freelance brand targeting cautious Indonesian UMKM buyers, this is the only question that matters.

---

## What's Working

1. **`prefersReducedMotion` integration** — the most mature accessibility feature on the page. Respects user motion preferences before applying blur/scale/opacity transforms. This is the correct approach and should be the standard.

2. **"Diskusi Gratis" CTA copy** — strategically brilliant for the Indonesian market. Removes perceived risk of reaching out, signals openness. Best decision on the page.

3. **CSS variable architecture** — the `--color-*` token system is structurally correct, even if the values are wrong. Theming is ready; it just needs the right values.

---

## Priority Issues

### [P0] Design tokens completely deviate from DESIGN.md

**What:** The brand palette, typography, and hero pattern bear no resemblance to what was specified. Yellow (`#facc15`) replaced violet (`#c9b4fa`); Arial_Black replaced variable display sans; WebGL replaced the half-bleed portrait.

**Why it matters:** A visitor who expected a Superhumon-inspired deep indigo/violet design and arrives to a yellow-on-charcoal generic dark theme feels the disconnect subconsciously. Trust is built through intentionality. This feels like two different projects.

**Fix:** Align `globals.css` tokens to DESIGN.md values. Replace Arial_Black with Inter Variable (wght 540). Add a human portrait element — half-bleed, atmospheric, personal.

---

### [P0] WebGL 3D scene has zero fallback and blank loading state

**What:** `dynamic(() => import("./3d/HeroScene"), { loading: () => null })` means users on slow connections, corporate VPNs, or unsupported browsers (no WebGL2) see a completely blank hero for 2–6 seconds.

**Why it matters:** This is the first and most important impression on the page. A blank void is not a loading state — it's a broken state.

**Fix:** Wrap HeroScene in an ErrorBoundary. Show a CSS gradient skeleton during loading (not null). Add WebGL feature detection before rendering. Provide a static fallback image for unsupported browsers.

---

### [P0] RotatingText hides services — forces working memory

**What:** Only 1 of 4 services visible at any moment. A user interested in "Sistem Informasi" must wait up to 9 seconds (3000ms × 3 items) for confirmation.

**Why it matters:** For a distracted mobile user, this is an abandonment trigger. The answer to "does he do what I need?" should take 0.3 seconds, not 9 seconds.

**Fix:** Replace rotating text with a static pill grid showing all 4 services simultaneously. If rotation is retained, add pause-on-hover and accessible list items.

---

### [P1] No human identity or trust signals in the hero

**What:** Zero human elements: no photo, no name prominence, no credentials, no "projects completed" count. The 3D sculpture answers "what can he build?" but not "who is he?"

**Why it matters:** This is a personal brand for Al Ghifari in Indonesia — a market where "siapa ini?" is the first question. The hero provides zero reassurance before the CTA fires.

**Fix:** Add circular avatar or half-bleed portrait of Al Ghifari. Display name prominently ("Hai, saya Al Ghifari"). Add one trust signal: "50+ project selesai" or "Freelance sejak 2021."

---

### [P1] "Diskusi Gratis" has no scope definition

**What:** The phrase "free discussion" without bounds creates ambiguity — 5 minutes? 30? A full scoping call?

**Why it matters:** Indonesian UMKM owners are cautious about hidden costs and time commitments. Ambiguity creates hesitation at the exact moment the CTA fires.

**Fix:** Add micro-copy under the CTA: "📱 via WhatsApp • ±15 menit • Tanpa komitmen" or similar.

---

### [P2] Focus outline invisible on dark hero background

**What:** Focus states use `--color-primary` (`#171614`, dark) which is invisible on the dark hero canvas.

**Why it matters:** Keyboard-only users cannot see focus indicators on any hero interactive element. WCAG 2.1 SC 2.4.7 failure.

**Fix:** Override focus outline color on dark surfaces: `outline-color: var(--color-on-primary)` or `outline-color: var(--color-surface-violet-soft)`.

---

### [P3] Hidden scrollbar removes orientation cues

**What:** `scrollbar-width: none` and `::-webkit-scrollbar { display: none }` remove scroll position indicators from the entire page.

**Why it matters:** Users with cognitive disabilities, unfamiliar browser users, and anyone who relies on scroll position to understand page depth lose that signal entirely.

**Fix:** Restore native scrollbars, or implement a custom scrollbar that matches the design system aesthetic while remaining functional.

---

## Persona Red Flags

**Jordan (First-Timer):** No human face or name prominence — Jordan has no idea who they are talking to. "Diskusi Gratis" has no scope — Jordan doesn't know if this is a casual chat or a commitment. RotatingText at 3000ms intervals forces waiting. The 3D scene is impressive but communicates nothing about Al Ghifari's personality or trustworthiness.

**Casey (Distracted Mobile):** WebGL scene is GPU-intensive on older Android (common in Indonesian mahasiswa market). RotatingText means Casey sees 1–2 services max before deciding to bounce. LightRays with `followMouse={true}` is pointer-only — completely non-functional on touch. Two CTAs stacked with `flex-wrap` may orphan on 320px viewports.

**Sam (Accessibility-Dependent):** Focus outlines invisible on dark hero (keyboard nav users see nothing). Screen reader gets no accessible name on the chat icon SVG. RotatingText animation is not paused by user input. No `aria-live` region announces service changes to screen readers.

---

## Minor Observations

1. The `font-variation-settings: 'wght' 540` on body text is correctly set in `globals.css` — this part of the design system IS implemented for body type.

2. LightRays uses hardcoded `#e8d5a0` (warm gold) — breaks CSS variable consistency. If brand colors change, LightRays becomes an orphan.

3. The subheadline "dengan harga ramah" is oddly defensive — anticipates price anxiety before the user has expressed it. Consider reframing around value delivered.

4. The `btn-3d-press` class adds `transform: translateY(-1px)` on hover and `translateY(1px) scale(0.97)` on active — this works against the scroll-based scale transform (1 → 1.28) on the parent, creating conflicting motion cues.

5. The `max-w-[1250px]` at `px-4` on mobile creates a narrow content column — text-6xl may overflow in narrow containers before breakpoint hits.

---

## Questions to Consider

- **Who approved the yellow (`#facc15`) accent?** This choice has no documented rationale in DESIGN.md. Was this a deliberate pivot or a token copy-paste error from a different project?

- **Why is WebGL the chosen hero medium for a personal freelance developer?** What business metric does the 3D sculpture move? If it doesn't increase consultation bookings, what problem does it solve?

- **Is the rotating text serving the user or the developer's ego?** A user who needs "Sistem Informasi" will search for it — they shouldn't wait 9 seconds to confirm it exists.

- **If this page loads on a Redmi 9A (common in Indonesian mahasiswa market) with a MediaTek Helio G25, what does the WebGL performance look like?** Is this design targeting the user's device or the developer's portfolio?

- **Does the 3D sculpture unconsciously signal "professional software house" — the exact thing the brand commitments say to avoid?** Does technical complexity communicate trustworthiness or intimidation for a first-time buyer?

---

**Trend for `hero` (last 5 runs):** First run — no trend yet.
