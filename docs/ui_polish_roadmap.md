# Kanji-SRS — UI Polish Roadmap

A staged, low-risk plan to raise the app from "functional" to "polished and trustworthy." Pairs with [`product_ui_quality_profile.md`](product_ui_quality_profile.md) (the standard); this doc is the sequence of work to get there.

**Ground rules for every stage below:** no changes to data model, FSRS/SRS logic, Supabase schema, Electron files, `package.json`/lockfile, version numbers, or curated-pack JSON. No built-in/local packs. No broad refactors — each stage is an isolated, reviewable pass.

---

## 1. Current UI audit summary

The foundation is strong: a real token system, five coherent themes with genuine dark mode, shared `.card`/`.btn`/`.badge`/`#modal` primitives, semantic color coding, safe-area handling, and existing overflow fixes for long Japanese strings. The gaps are **consistency and finish**, not architecture.

Likely areas needing polish, found in code inspection:

1. **Action-pattern divergence (highest impact).** `TestManager.js` uses a clean kebab menu (`.card-menu`) with one primary + Details + overflow. `DeckList.js` deck-detail instead stacks 5+ full-width buttons (Study/Add/Delete row, then Browse block, then Search block, plus mastered-banner buttons). Decks feel cluttered; Tests feel tidy. The good pattern already exists — Decks should adopt it.
2. **Undefined classes.** `.theme-btn` (language buttons, `Settings.js`) is not defined in `app.css` → those buttons render unstyled. `.form-input` (AI section) is also undefined (harmless — inputs keep base styling, but it's dead code).
3. **Inconsistent empty/loading/error states.** `.empty` (icon + text + CTA) vs `.community-state` (plain centered text, no icon/CTA) vs inline "Thinking…"/`pack_loading` text. No skeletons; some loads show bare text.
4. **Curated packs under-sell trust.** Pack cards use five identical gray `badge-soft` chips — they look *less* finished than user community decks, the opposite of the "curated/premium" goal.
5. **Reduced-motion gap.** Only `confetti.js` respects `prefers-reduced-motion`. `donePop`, `fireFlicker`, `update-pulse`, streak-flame scaling, and view `fadeIn` ignore it.
6. **Stale microcopy.** `bulk_format` hint says "Kanji | Furigana | Meaning | Example JP | Example TR" (5 fields), but the importer uses 4 fields (Word | Meaning | Example JP | Example TR). The placeholder and hint disagree.
7. **Font payload.** `index.html` loads five Google Font families (Libre Baskerville, Pacifico, Righteous, Permanent Marker, Lato) that the system-font body stack doesn't use — a network dependency on first paint that works against the offline-first PWA. Likely dead weight to confirm and remove.
8. **Inline-style sprawl.** Component templates carry many inline `style="…"` overrides (margins, grid columns, colors). Not a bug, but it erodes consistency and makes token changes leaky. Tighten opportunistically, not in a big-bang refactor.
9. **Focus visibility.** Focus styling is ad hoc (`:focus-visible` opacity on a couple of controls); there's no consistent app-wide keyboard focus ring.
10. **Brand naming.** UI/splash say "Stacks"; repo/product is "Kanji-SRS." Cosmetic — confirm intended name before touching.

---

## 2. Priority levels

**P0 — Professional first impression** (what a new user sees in the first 30 seconds)
- Fix undefined `.theme-btn` so the language selector isn't unstyled (P0-visible bug).
- Deck-detail / deck-card action consolidation (kill the button clutter; adopt the kebab pattern).
- Curated-pack card presentation (make packs look trustworthy/premium).
- Confirm & remove unused Google Fonts (faster, cleaner first paint; supports offline).

**P1 — Consistency & component cleanup**
- Unify empty/loading/error states across Decks, Community, Search, Tests.
- Align Decks and Tests row/action language 1:1.
- Fix stale `bulk_format` microcopy; sweep for other stale strings.
- Remove/replace dead classes (`.form-input`), reduce inline-style overrides where trivial.

**P2 — Delightful polish**
- Consistent, token-based focus ring for keyboard users.
- `prefers-reduced-motion` coverage for all non-essential animation.
- Loading skeletons for Community/pack lists (shape-matched, no blank flash).
- Study-screen finish: spacing, grade-grid/glow mapping verification, completion screen.

**P3 — Optional nice-to-have**
- Light micro-interactions (button press, badge transitions) — only within motion budget.
- Electron-specific layout refinements (multi-column density).
- Brand-name reconciliation (Stacks vs Kanji-SRS), if desired.

---

## 3. Suggested implementation order

Staged so each pass is isolated, visually verifiable, and safe to ship alone. **Do not** bundle these into one redesign PR.

### Stage 1 — Design tokens & base visual consistency (foundation)
- Audit `app.css` tokens against the profile; fill any gap (e.g. a `--focus` ring token) without changing existing values.
- Define the missing classes referenced by code (`.theme-btn`, and decide `.form-input` → real class or removal).
- Confirm and remove unused webfonts from `index.html`.
- No component-behavior changes. Purely CSS/markup token hygiene.

### Stage 2 — Cards / buttons / forms / menu consistency
- Enforce "one primary per view"; demote extra primaries to ghost.
- Standardize form field markup on the base input styling; drop undefined classes.
- Ensure every card/button/badge uses shared classes, not inline overrides. Move recurring inline styles into small utility/component classes.

### Stage 3 — Decks & Tests hierarchy polish
- Refactor deck cards/detail to the kebab pattern (Rename/Move/Delete/secondary actions in `.card-menu`); keep one primary Study + one ghost Add visible.
- Mirror the row structure between Decks and Tests so they read as one system.
- Verify collapse/indent hierarchy and sub-count badges on both.

### Stage 4 — Study screen polish
- Tighten spacing/hierarchy; confirm the grade-grid color map matches the swipe-glow map exactly.
- Verify flip, swipe, and completion states; ensure the celebration is once-per-session and reduced-motion-safe.
- Check long-string/overflow behavior on card faces at 320px.

### Stage 5 — Community / JLPT pack presentation polish
- Redesign the curated-pack card to feel premium (emphasized level badge, concise meta line, single clear Import → Imported state).
- Clearly separate "Curated Packs" from "Community Decks" with consistent section headers.
- Keep remote-only architecture; no local/built-in pack data.

### Stage 6 — Empty / loading / error states
- Bring all screens to the unified `.empty` shape (icon + line + optional CTA).
- Add shape-matched loading skeletons or labeled spinners for async lists (Community, packs).
- Standardize error states: human message + retry, no raw errors.

### Stage 7 — Mobile polish
- Re-verify every screen at 320/360/375px: targets ≥48px, no overflow, wrapped JP strings, grade grid and nav intact under long translations.
- Check safe-area insets (notch/home indicator) and body-scroll lock on study.

### Stage 8 — Final visual QA
- Walk the profile's §8 checklist across all screens in all five themes.
- Confirm no console errors, no layout shift, no blank flash on boot.
- Sanity-check i18n on the three longest languages (tr/ko/mn).

---

## 4. Risk notes

**Risky to touch (isolate changes, verify live in Vite preview before/after):**
- `src/main.js` — orchestration, i18n `LANG`, routing, `Object.assign(window, …)` globals for inline `onclick`. Adding a UI string means adding the key to **all four** languages here. Do not rename or drop a function used by an inline `onclick` without updating the global export. Read-only for navigation/i18n context unless a string genuinely must change.
- `src/components/CardView.js` — study flow, swipe physics, FSRS grade wiring, completion/celebration. Visual-only tweaks (spacing/classes) are fine; **do not** touch grade logic, swipe→grade mapping, or `gradeCard`/`applySRS` calls.
- `src/store/appState.js`, `src/core/srsEngine.js`, `src/services/dbService.js`, `src/services/studyPackService.js` — data/model/SRS/sync/schema. **Out of scope** for UI work; do not edit.
- `supabase-schema.sql`, `electron/*`, `vite.config.js`, `package.json`/lockfile, curated-pack JSON — **do not touch** (explicit constraints).

**Safe to touch (lower risk, still verify):**
- `src/styles/app.css` — the right home for visual changes. Prefer editing/adding tokens and classes here over inline styles. Changing a token cascades to all themes — verify all five.
- Component render templates (`DeckList.js`, `TestManager.js`, `CommunityHub.js`, `Settings.js`, `Search.js`, `KanjiModal.js`, `WordModal.js`, `TestView.js`, `TestResults.js`) — markup/class changes are fine; keep logic, IDs referenced elsewhere, and `t()` keys intact.
- `src/index.html` — static structure, font links, view scaffolding. Removing webfonts and fixing markup is safe; don't remove view containers or IDs the JS mounts into.

**Isolation guidance:** one stage = one focused change set. CSS-only stages (1, parts of 6) are the safest and can land first. Screen-scoped stages (3, 4, 5) touch a single component's markup — keep each in its own pass. Always verify in the live preview across themes and at mobile width; the app has prior overflow fixes that are easy to regress.

---

## 5. Future agent prompts

Short, self-contained templates. Each assumes the agent has read `product_ui_quality_profile.md` and obeys the §"Ground rules" constraints (no data/SRS/schema/Electron/package/version changes; docs-driven, isolated passes; verify in Vite preview across all five themes at mobile width).

**Visual consistency pass**
> Read `docs/product_ui_quality_profile.md`. Do a CSS/markup-only consistency pass on [screen/component]. Replace hardcoded colors/radii/shadows/fonts with tokens, remove undefined/dead classes, enforce one `.btn-primary` per view, and consolidate inline `style=` overrides into shared classes in `app.css`. No logic, data, or SRS changes. Verify in Vite preview in all five themes at 375px. Report what changed and any regressions checked.

**Dashboard polish**
> Read the quality profile. Polish the Decks dashboard (`#global-stats`, streak card, "My Decks" list) for a calm, scannable first impression. Improve spacing/hierarchy only; keep heavy analytics on the Streak screen. One primary action per card. No data/model changes. Verify across themes and at mobile width.

**Study screen polish**
> Read the quality profile. Polish the study screen in `CardView.js`/`app.css` — spacing, card hierarchy, progress bar, and the 2×2 grade grid. Confirm the grade→color map (Again=hanko, Hard=gold, Good=sky, Easy=jade) matches the swipe-glow map exactly. Do NOT touch grade logic, swipe→grade mapping, or FSRS calls. Make celebration once-per-session and reduced-motion-safe. Verify long strings at 320px don't overflow.

**Deck/test card polish**
> Read the quality profile. Bring deck cards/detail (`DeckList.js`) to the same compact pattern the Tests screen already uses: one primary Study + one ghost Add visible, and Rename/Move/Delete/secondary actions behind a `.card-menu` kebab. Mirror the row/action structure between Decks and Tests. Markup/CSS only; keep `t()` keys, IDs, and inline-onclick globals intact. Verify collapse/indent and all five themes.

**Community curated-pack polish**
> Read the quality profile. Redesign the curated-pack card in `CommunityHub.js`/`app.css` to feel premium and trustworthy: emphasized level badge, concise one-line description, a tidy single meta line (cards · questions · version), and one clear Import action that flips to an Imported state. Keep "Curated Packs" and "Community Decks" as distinct sections. Remote-only — do NOT reintroduce local/built-in packs or edit pack JSON. Verify across themes and at mobile width.

**Mobile polish**
> Read the quality profile. Do a mobile-only QA/polish pass at 320/360/375px across all screens. Verify touch targets ≥48px, no horizontal overflow, wrapped/ellipsized Japanese strings, intact 2×2 grade grid and bottom nav under the longest tr/ko/mn translations, and correct safe-area insets. CSS/markup only. List each screen checked and any fixes applied.

**Empty/loading/error states pass**
> Read the quality profile. Unify empty, loading, and error states across Decks, Community, packs, Search, and Tests to the `.empty` shape (muted icon + one line + optional single CTA). Add shape-matched loading skeletons or labeled spinners for async lists; standardize errors to a human message + retry. All strings via `t()` in en/tr/ko/mn. Verify across themes.
