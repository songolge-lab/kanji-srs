# Kanji-SRS — Product & UI Quality Profile

Source of truth for UI/UX decisions. Any agent improving the interface should read this first and align to it. It describes what "good" looks like for this app in concrete, applicable terms — not abstract design theory.

The app already has a strong token system in `src/styles/app.css`. This profile mostly codifies rules that keep the app consistent as it grows, and closes the gaps found in the current code.

---

## 1. Product identity

Kanji-SRS is a daily-use Japanese study tool (flashcards + SRS + JLPT packs + custom tests). It must feel like a **serious, trustworthy learning instrument** a person opens every morning — not a demo, not a toy, not a student project.

### It should feel
- **Calm** — a quiet paper-and-ink surface, low visual noise, generous whitespace.
- **Focused** — one obvious thing to do per screen.
- **Organized** — the user believes their study data is safe and well-structured.
- **Premium but restrained** — quality shows in spacing, alignment, and typography, not in gradients or color.
- **Smooth** — reviewing cards is fluid and satisfying; nothing janky.
- **Reliable** — works offline, states are always explained.

### It should NOT feel
- Cluttered, cramped, or busy.
- Colorful for its own sake (rainbow buttons, decorative gradients).
- Loud with destructive actions or heavy borders.
- Inconsistent (buttons/cards/modals that differ screen-to-screen).
- Gamified to the point of childishness (celebration is a reward, not the theme).
- Slow or uncertain (blank screens, silent failures).

### Design adjectives
`clean` · `calm` · `focused` · `organized` · `warm` · `precise` · `quiet-premium`

### UI personality
Washi (Japanese paper) and sumi (ink). Warm off-white surfaces, near-black ink text, a single restrained accent (hanko red / 印) used sparingly for meaning. Serif (Mincho) is reserved for Japanese glyphs; everything else is a clean system sans. The personality is a well-made physical study notebook, digitized.

---

## 2. Visual design principles

All values below already exist as CSS variables in `src/styles/app.css`. **Use the tokens. Never hardcode a hex color, radius, or shadow in component JS or inline styles.**

### Spacing
- Base rhythm is `rem`-based; common gaps are `.5rem` / `.6rem` / `.75rem` / `1rem`.
- Cards use `1.1rem` internal padding; list items `.7rem–.85rem`.
- Vertical gap between stacked cards: `.5rem–.75rem`. Do not exceed `1rem` between peers — it fragments the page.
- Sections are separated by `.section-hd` (uppercase label + hairline rule), not by large empty gaps.
- Never let content touch screen edges: `#app` provides the outer padding; don't remove it.

### Typography
- Body/UI: system sans stack (`-apple-system, 'Hiragino Sans', 'Yu Gothic UI', 'Segoe UI', system-ui`).
- Japanese glyphs (card fronts, ruby): Mincho serif (`'Hiragino Mincho ProN', 'Yu Mincho', serif`) via `.fc-kanji` / `.fc-ruby`. **Do not** render UI-language prose in Mincho (reverse-card prompts correctly use `.fc-prompt` to override back to sans — follow that pattern).
- Scale is compact and deliberate: titles `1.02–1.3rem/700`, body `.85–.95rem`, meta/labels `.68–.82rem`. Don't invent new sizes; reuse existing ones.
- Line-height `1.55` for prose; tight (`1–1.2`) for numeric stats and single-line titles.
- Weight carries hierarchy more than size: `700` for titles/labels, `400` for glyphs and body. Avoid `800`+ except intentional celebration (`.done-*`).

### Color usage
Semantic, not decorative. Each accent has **one meaning** — keep it consistent everywhere:

| Token | Color | Meaning (must stay consistent) |
|---|---|---|
| `--ink` | near-black | primary text, **primary button fill** |
| `--ink-soft` | muted | secondary text, meta, muted icons |
| `--hanko` / `--hanko-bg` | red 印 | the accent; **due/overdue**, **Again**, destructive, active nav |
| `--gold` / `--gold-bg` | ochre | **learning**, **Hard** |
| `--sky` / `--sky-bg` | blue | **new**, **Good**, informational, focus rings |
| `--jade` / `--jade-bg` | green | **mastered**, **Easy**, success/confirmation |
| `--paper` / `--paper-2` | surface | page & recessed surfaces |
| `--card` | surface | raised card/control fill |
| `--line` / `--line-soft` | hairline | borders |

Rules:
- Solid strong colors (`--hanko`, `--jade`) are for **fills of small/meaningful elements** (badges, active states, the streak flame). Large surfaces stay paper/card.
- Text on colored badges uses the strong color on the `-bg` tint (e.g. `--jade` text on `--jade-bg`), never white-on-saturated except the primary button and active calendar/nav cells.
- Don't introduce new colors. Five theme variants already exist; a new hue breaks all of them.

### Contrast
- Body text (`--ink` on `--paper`/`--card`) must stay ≥ 4.5:1 in every theme. When adjusting a theme, check `--ink-soft` on `--card` too (it's the weakest pairing).
- Muted text (`--ink-soft`) is for genuinely secondary info only — never for a primary label the user must read.

### Elevation / shadows
- Three levels only: `--sh-sm` (cards, controls), `--sh-md` (flashcards, popovers, menus), `--sh-pop` (bottom nav, upward). Do not add new shadow values.
- Elevation is subtle — this is paper, not Material. Never use shadow as decoration; use it to signal "this floats above."
- A raised element has shadow **or** a border, rarely a heavy version of both.

### Border radius
- Single scale: `--r-lg` (14px, cards & flashcards), `--r-md` (10px, buttons & controls), `--r-sm` (8px, inputs & chips), `--r-pill` (badges, toasts, nav pills). Never hardcode a radius.

### Density
- Comfortable, not dense. This is a focus app, not a dashboard. Prefer fewer elements with more breathing room.
- Lists (deck cards, card rows, test rows) are the exception — keep rows compact and scannable so long lists don't require endless scrolling.

### Icon usage
- One family only: inline SVG, 24×24 viewBox, `1.75` stroke, round caps/joins, `currentColor` (`.ic`). Sized in `em` so it inherits the button's color and scale.
- Icons support labels; they rarely stand alone. Icon-only controls (`.icon-btn`, kebab, card row edit/delete) **must** have `aria-label`.
- Don't mix filled and outline styles arbitrarily — `.ic-fill` is reserved for a few deliberate glyphs (play, star).

### Motion / animation
- Motion is functional feedback, not decoration. Allowed: view fade-in (`.18s`), card flip, swipe/snap, progress fills, `:active` scale (`.94–.97`), toast slide.
- Celebration (confetti, `donePop`) is a once-per-session reward on deck completion — never on every render.
- Durations stay short (`.15–.5s`) and easing gentle. No bouncing/spinning purely for flair.
- **Respect `prefers-reduced-motion`** for every non-essential animation (see §7). Currently only confetti does — this must expand.

### Dark mode
- `sumi` is a first-class theme, not an afterthought; it auto-applies via `prefers-color-scheme` on first run. Every new surface/color **must** be expressed with tokens so all five themes (incl. sumi) inherit it for free.
- Never hardcode `#fff`/`#000` on backgrounds or text. The only acceptable literal whites are inside already-established strong-fill contexts (primary button text uses `--paper`; active nav/calendar cells use `#fff` on a saturated fill — reuse those, don't add new ones).

---

## 3. Layout principles

Global shell: single centered column, `max-width` 600px (mobile/PWA) widening to 720–960px on Electron. Bottom tab nav on mobile; left sidebar on Electron ≥768px. Web/PWA is **always** the mobile layout — never assume desktop chrome.

- **Dashboard (Decks view):** top = at-a-glance stats (`#global-stats`, 4→3 cols), then the streak card (tappable), then "My Decks" with an inline search toggle, then the deck list. Keep it skimmable in one screen; heavy analytics (heatmap, forecast) live on the Streak screen, not here.
- **Deck list:** vertically stacked deck cards. Each card is a scannable unit: title + sub-deck badge, one line of meta, a compact status badge row, and **one primary action** (Study). Nesting shown by indent + chevron collapse, not by boxes-in-boxes.
- **Deck detail:** stats grid → card-direction control → primary actions → card list. This screen currently over-uses full-width buttons; consolidate per §4/§5.
- **Study screen:** maximum focus. Progress bar + count at top, the card fills the center, one action zone at the bottom (Show answer → 2×2 grade grid). No nav distractions, nothing competing with the card. Body scroll is locked (`study-mode-active`).
- **Test screen (play):** one question per screen, large prompt, clearly separated options, immediate correct/wrong feedback, auto-advance. Results screen: score headline + per-question breakdown.
- **Community:** two clearly separated sections — **Curated Packs** (premium, trustworthy) first, then **Community Decks** (user-shared). Responsive grid on Electron; single column on mobile.
- **Search:** not a separate destination — an inline bar (global from the Decks header, or deck-scoped in deck detail). Keep it compact; results reuse the deck-row visual language.
- **Settings:** grouped `.section-hd` sections (Language, Appearance, Sync, AI, SRS, Backup, Danger). One card per group. Danger zone visually separated and last.
- **Modals:** one shared bottom-sheet modal (`#modal`), centered on desktop. Title + body + a single `.btn-row` of actions (primary left, ghost cancel right). Optional back arrow (`.modal-back-btn`) for drill-downs. Never build a second modal system.

---

## 4. Component rules

Reuse the existing classes. If you need a variant, extend the token/class — don't fork a new one-off style inline.

### Cards (`.card`)
- One concept per card. `--card` fill, `--line-soft` hairline, `--r-lg`, `--sh-sm`, `1.1rem` padding.
- No nested cards. A card inside a card (except a deliberate banner like `.mastered-banner`) means the hierarchy is wrong.
- Title uses `.card-title`; secondary info `.deck-meta`. Keep to one meta line where possible.

### Deck/test parent–child rows
- Hierarchy is shown by **indentation + a chevron collapse toggle**, not borders or background boxes.
- A parent shows a `badge-soft` sub-count ("N sub-decks" / "N sub-tests"); children indent under it.
- The row layout is identical between Decks and Tests — they share one visual language on purpose. Keep them in sync: a change to deck-row structure should be mirrored in test-row structure.

### Buttons (`.btn`)
- Every button is `min-height: --tap`, `--r-md`, weight `700`. Use `.btn-row` for horizontal groups (they wrap gracefully); `.btn-block` for full-width.
- **Exactly one `.btn-primary` per view/section.** Everything else is `.btn-ghost` or a menu item.
- Icon + label is the norm; keep labels to 1–2 words.

### Primary / secondary / destructive
- **Primary** (`.btn-primary`, ink fill): the single main action (Study, Save, Import, Create).
- **Secondary** (`.btn-ghost`, outlined): supporting actions (Add card, Browse, Search-in-deck).
- **Destructive** (`.btn-danger`, soft red tint — *not* solid red): Delete, Reset. Destructive actions are **quiet**: tinted background, never a loud solid-red block, never larger than the primary. Prefer moving them into a kebab menu (see below) rather than sitting inline.

### Menus / kebab actions (`.card-menu`)
- Secondary/rare actions (Rename, Move, Delete, Export) belong behind a compact kebab (`.card-menu-btn` → `.card-menu-pop`), **not** as inline buttons.
- The Tests screen already does this correctly. Deck cards/detail should adopt the same pattern instead of stacking multiple full-width buttons.
- One menu open at a time; a document-level click closes it. Destructive items use `.danger` (red text) inside the menu — that's loud enough.

### Forms
- Inputs/selects/textareas inherit the base style (`--bd-ctrl` border, `--r-sm`, `--card` fill, `min-height: --tap`, focus → `--sky` border). Don't restyle per-field.
- `label` above the field, `700`/`.85rem`. Helper text uses `.form-hint`. Required marker `.required` (hanko).
- Group fields with `.form-group`. One primary submit button, full-width (`.btn-block`), at the bottom.
- **Do not apply undefined classes** (`.form-input`, `.theme-btn` are referenced in code but not defined — see §9/roadmap). Rely on the base element styling or a real class.

### Modals (`#modal`)
- Always via `app.openModal(title, html)`. One title, a scrollable body, and a trailing `.btn-row` (primary + ghost cancel).
- Consistent action ordering: confirm/save primary first, cancel ghost second.
- Drill-down modals (Word → Kanji) use `.modal-back-btn` and preserve prior state — never refetch/rebuild on back.

### Badges (`.badge`)
- Pill, `.72rem/700`, tint background + strong text. Use the semantic color map (§2): `badge-sky` new, `badge-gold` learning, `badge-hanko` due, `badge-jade` mastered, `badge-soft` neutral/count.
- Badges communicate **state or count**, never actions. Keep to ≤3 status badges per row.

### Progress indicators
- Study progress: thin `--hanko` fill bar + `n/total` count. Forecast/heatmap: token-derived fills only.
- Keep progress honest and quiet — a slim bar, not a giant animated meter.

### Empty states (`.empty`)
- Standard shape everywhere: centered, muted icon (`.empty-icon` + `ic-lg`), one short explanatory line, and — where relevant — one primary action to resolve it ("Create a deck").
- **Unify the variants.** Community/pack states (`.community-state`) currently skip the icon and CTA; bring them to the same shape so empty states feel intentional, not accidental.

### Loading states
- No blank screens and no bare "Loading…" text where content will appear. Prefer a lightweight skeleton or a labeled spinner (`.spin` on `.ic`) that matches the shape of what's coming.
- AI/async inline text ("Thinking…") is acceptable inside a modal region, but should read as intentional status, not a placeholder left in.

### Error states
- Always explain + offer recovery. Pattern: short human message + a retry/refresh action (`.btn-ghost` + sync icon), same layout as the empty state.
- Never fail silently and never dump raw error objects at the user; surface a sentence, log the detail to console.

### Import / status cards (curated packs, sync, storage warning)
- These carry trust. A curated pack card should look **more** finished than a user card: clear title, one-line description, a tidy metadata row, and a single clear action (Import → becomes an "Imported ✓" badge).
- Sync/storage status cards state the current state plainly and expose the next step. The storage-warning card correctly uses a hanko outline for a real problem — reserve that treatment for genuine warnings.

### Study answer cards (`.flashcard` / `.fc-flip-*`)
- The card is the hero: centered, `--sh-md`, generous height, Mincho glyph large and legible.
- Front = prompt only. Back = reading (ruby) + meaning + example, in a fixed vertical order. Clickable words/kanji are marked with the dashed hanko underline (`.word-clickable` / `.kanji-clickable`) — consistent affordance for "tap to look up."
- The 2×2 grade grid maps to the semantic colors (Again=hanko, Hard=gold, Good=sky, Easy=jade). Keep that mapping identical to the swipe-direction glow.

### Test question cards (`.tv-question-card`)
- One prompt, options as full-width tappable rows (`.tv-option`), large targets. Correct = jade tint, wrong = hanko tint. True/false is a 2-up row. Feedback is immediate and color-coded, then auto-advance.

---

## 5. UX rules

- **Reduce clutter.** One primary action per screen. If a screen has 4+ equally-weighted buttons, that's a redesign signal — demote all but one to ghost or a menu.
- **Keep the primary action obvious.** It's the only ink-filled button in view, and it's where the thumb expects it (bottom on study, top of a card's action row elsewhere).
- **Hide secondary actions.** Rename/Move/Delete/Export go behind the kebab. Inline everything only when there are exactly two peers (e.g. a card row's Edit + Delete icons).
- **Keep destructive actions quiet.** Tinted, small, ideally in a menu. Confirm before cascading deletes; say what will be deleted (including child count).
- **Make hierarchy legible.** Indent + chevron for nesting; sub-count badges; parent actions operate on the whole subtree and say so ("Study all (N)").
- **Make curated packs feel premium.** Distinct, trustworthy presentation, "curated"/level framing, clear provenance. They should never look like a random user upload.
- **Make offline/sync/community states understandable.** Always show whether data is local-only, syncing, or synced; whether the network call failed; whether a pack is already imported. No ambiguous spinners that never resolve.
- **Make mobile the baseline.** Design for one thumb on a 375px screen first; Electron widening is an enhancement layer, never a requirement for usability.

---

## 6. Microcopy rules

- **Concise, verb-first labels.** "Study", "Add card", "Import", "Delete". Not "Click here to start studying".
- **Professional, human tone.** Calm and plain. No exclamation spam, no cutesy machine phrasing. Celebration copy ("Great job!") is the one allowed moment of warmth.
- **Consistent action names.** The same operation uses the same word everywhere — "Delete" (not sometimes "Remove"), "Import", "Study", "Create". Decks and Tests must use matching verbs for matching operations.
- **Explain state, don't just label it.** Empty/error/sync messages say what happened and what to do next, in one sentence.
- **i18n discipline (en/tr/ko/mn):**
  - Every user-visible string goes through `t()`; no hardcoded UI text in components.
  - Add a key to **all four** languages when adding a string; never ship an English-only key.
  - Keep labels short — Turkish, Korean, and Mongolian translations run longer than English. Buttons must survive the longest translation without breaking layout (buttons already wrap via `word-break`; verify on the 2×2 grade grid and nav).
  - Interpolate counts (`{count}`) rather than concatenating; respect that word order differs per language.
  - Fix stale copy when found (e.g. the bulk-import format hint currently describes the wrong field set — see roadmap).

---

## 7. Accessibility & usability

- **Touch targets:** every interactive element ≥ `--tap` (48px) effective size. Small visual controls (kebab, card-row icons, info button) already sit in larger padded hit areas — preserve that; don't shrink below ~40px live area.
- **Keyboard / focus:** interactive non-button elements that act like buttons need `role="button"` + `tabindex="0"` (card rows already do). Provide a **visible focus style** — currently focus relies on `:focus-visible` opacity on a couple of controls; a consistent focus ring (e.g. `--sky` outline) should exist app-wide for keyboard users.
- **Contrast:** verify text pairings in all five themes, especially `--ink-soft` on `--card` and colored text on `-bg` tints.
- **Readable sizes:** don't go below `.68rem` for anything the user must read; that floor is reserved for labels/legends, not content.
- **Responsive:** must be usable and un-clipped from 320px up. Long Japanese strings must wrap/ellipsize, never overflow the viewport (the codebase has specific fixes for this — don't regress them).
- **Reduced motion:** wrap non-essential animation in `@media (prefers-reduced-motion: reduce)` and disable it (confetti, `donePop`, `fireFlicker`, `update-pulse`, streak-flame scaling, view fade). Essential feedback (a flip, a tap scale) can remain minimal. This is currently a gap.
- **Labels:** every icon-only control has an `aria-label`; images (test question images) should have meaningful `alt` where authored.

---

## 8. Professional polish checklist

Before calling any UI task done, verify:

- [ ] No hardcoded colors, radii, shadows, or font stacks — only tokens/classes.
- [ ] No new one-off button/card/badge styles; reused existing components.
- [ ] Exactly one `.btn-primary` per view/section; secondary actions ghost or in a kebab.
- [ ] Destructive actions are quiet (tinted/menu), confirmed, and describe scope.
- [ ] Spacing matches the existing rhythm; nothing cramped, nothing touching edges.
- [ ] Empty, loading, and error states all present and using the unified shape.
- [ ] All strings via `t()`, added to en/tr/ko/mn, and layout survives the longest translation.
- [ ] Works in all five themes, including `sumi` dark (checked, not assumed).
- [ ] Touch targets ≥ 48px; icon-only controls have `aria-label`; focus is visible.
- [ ] `prefers-reduced-motion` respected for any animation added.
- [ ] Verified at 320–375px width with no overflow or clipping; long JP strings wrap.
- [ ] No console errors; no layout shift on load; no blank flash before content.
- [ ] Decks and Tests still share the same row/action visual language.

---

## 9. Examples — bad vs good (for this app)

**Test/deck cards**
- ❌ Bad: every test card shows large Play, Edit, Move, Export, Delete buttons in a row.
- ✅ Good: one `Start (N)` primary + a `Details` ghost + a kebab for Rename/Move/Delete. (Tests already do this — Decks should match.)

**Deck detail actions**
- ❌ Bad: five stacked full-width buttons (Study / Add / Delete / Browse / Search) filling the screen before the card list.
- ✅ Good: `Study (N)` primary + `Add card` ghost on one row; Browse/Search/Delete behind a kebab or compact secondary row.

**Curated packs**
- ❌ Bad: pack card with five identical gray `badge-soft` chips, looking like a raw data dump — less polished than user uploads.
- ✅ Good: a clearly premium card — level badge emphasized (e.g. `badge-jade`/`badge-sky`), concise description, a tidy meta line ("300 cards · 100 questions · v0.1.0"), one Import action → `Imported ✓`.

**Destructive actions**
- ❌ Bad: a solid bright-red "DELETE" button the same size as Study.
- ✅ Good: a soft-tinted `.btn-danger` or a red menu item, smaller than the primary, with a scope-aware confirm.

**Empty states**
- ❌ Bad: Community shows plain centered text "No community decks yet."; Decks shows an icon + text + CTA. Two different personalities.
- ✅ Good: both use `.empty` shape — muted icon, one line, and (where actionable) one primary CTA.

**Buttons**
- ❌ Bad: language selector buttons styled with an undefined `.theme-btn` class, rendering as bare unstyled text.
- ✅ Good: language options as real segmented/pill controls using defined classes and the active-state token treatment.

**Color**
- ❌ Bad: introducing a new purple for "AI" features.
- ✅ Good: reuse `--sky` (informational) or `--gold`; the five-color semantic map covers every need and keeps all themes coherent.

**Motion**
- ❌ Bad: confetti and a pulsing flame on every screen render.
- ✅ Good: confetti once per completed session; pulse reserved for a genuinely actionable state (update available); all of it disabled under reduced-motion.

**Typography**
- ❌ Bad: rendering a Turkish meaning prompt in Mincho serif because it's on a card front.
- ✅ Good: Mincho for Japanese glyphs only; UI-language prose in the sans stack (`.fc-prompt` already does this — follow it).
