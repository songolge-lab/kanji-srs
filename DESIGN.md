# Stacks — Aurora Glass design spec v1.0

Design brief for the new **Aurora** theme family of Stacks (kanji-srs).
Consumers: **Claude Design** (Phase 2 — prototyping) and **Claude Code** (Phase 3 — implementation).
Locked decisions: dark variant (`aurora`) ships first; light variant (`aurora-day`) later; legacy themes stay untouched.

---

## 1. Scope and hard constraints

1. Aurora is an **additional** theme family. The six legacy themes (Washi, Sumi, Matcha, Sakura, Indigo, Nova) must remain visually unchanged. All Aurora-specific colors and effects live behind the app's existing theme mechanism (e.g. `[data-theme="aurora"]` or the current theme-class system) — never in global selectors.
2. Structural changes (navigation, layout) are allowed but must be **theme-neutral**: legacy themes inherit the new structure rendered with their existing flat palettes.
3. Implementation target is the current stack: **vanilla HTML/CSS/JS**, CSS custom properties, no frameworks, no Tailwind, no build step. Prototype CSS must stay plain and portable.
4. Information architecture is frozen: same screens, same elements, same hierarchy as the current app (see §11). This is a full reskin + layout modernization, **not** a feature redesign.
5. Repo rules in `CLAUDE.md` still apply during implementation (electron/web mirror, triple version sync, `t()` naming, unconditional `migrateStats()`).

## 2. Design intent

Modern, sleek, softly futuristic. One violet color family. Frosted-glass surfaces floating over a deep night canvas lit by soft aurora glows. Depth comes from layered translucency and light — not heavy drop shadows.

- Mood keywords: aurora, glass, calm night, premium, focus.
- Anti-keywords (never do): neon color clash, cyberpunk HUD, glitch/scanlines, chromatic aberration, gamer RGB, pure black `#000`, pure white text `#FFF`.
- Restraint rule: **one gradient hero element per view region**; everything else is quiet glass.

### 2.1 Signature element

The **study-card flip** is the app's core loop and its one memorable moment: a frosted glass card that, on flip, catches a diagonal light sweep (a gradient pseudo-element moving via `transform`, ~450 ms) as the answer side settles in. Kanji + furigana typography is part of the signature. Spend the boldness here; keep every other screen disciplined.

## 3. Color tokens — `aurora` (dark)

### 3.1 Canvas and aurora layer

| Token | Value | Use |
|---|---|---|
| `--au-canvas` | `#0B0D1A` | Page background |
| `--au-orb-1` | `rgba(124,92,255,0.20)` | Violet orb |
| `--au-orb-2` | `rgba(198,75,255,0.13)` | Magenta orb |
| `--au-orb-3` | `rgba(45,212,191,0.07)` | Faint teal orb (optional, sparing) |

Aurora layer = one `position:fixed; inset:0; pointer-events:none; z-index:0` element behind content painted with 2–3 large radial gradients fading to transparent, e.g. `radial-gradient(640px 440px at 12% -6%, var(--au-orb-1), transparent 70%)`. Do **not** build orbs with `filter: blur()` on DOM nodes — gradients are cheap, filters are not.

### 3.2 Glass surfaces

| Token | Value | Use |
|---|---|---|
| `--au-glass-1` | `rgba(255,255,255,0.05)` | Default card |
| `--au-glass-2` | `rgba(255,255,255,0.08)` | Hover / raised / dock |
| `--au-line` | `rgba(255,255,255,0.09)` | 1px borders |
| `--au-line-strong` | `rgba(255,255,255,0.16)` | Hover/focus borders |
| `--au-solid` | `#14172B` | Blur fallback, long-list rows |
| `--au-solid-2` | `#1A1E38` | Raised solid surfaces |
| `--au-field` | `rgba(255,255,255,0.04)` | Input inner background |
| `--au-scrim` | `rgba(5,6,15,0.60)` | Modal backdrop |

### 3.3 Accent

| Token | Value |
|---|---|
| `--au-accent-a` | `#7C5CFF` |
| `--au-accent-b` | `#C64BFF` |
| `--au-grad` | `linear-gradient(135deg, #7C5CFF, #C64BFF)` |
| `--au-glow` | `0 8px 28px rgba(124,92,255,0.35)` |
| `--au-accent-solid` | `#8E6BFF` (links, icons, thin strokes where a gradient is overkill) |

### 3.4 Text

`--au-text: #F4F4FA` · `--au-text-2: #9AA0B4` · `--au-text-3: #6B7089` · disabled `rgba(244,244,250,0.35)`.

### 3.5 SRS semantic colors (meanings preserved, surfaces reskinned)

| Grade | Base | Chip background | Chip border | Chip text |
|---|---|---|---|---|
| Again | `#FF5C7A` | `rgba(255,92,122,0.12)` | `rgba(255,92,122,0.38)` | `#FF8CA1` |
| Hard | `#F5A623` | `rgba(245,166,35,0.12)` | `rgba(245,166,35,0.38)` | `#FFC46B` |
| Good | `#4D9FFF` | `rgba(77,159,255,0.12)` | `rgba(77,159,255,0.38)` | `#8CC1FF` |
| Easy | `#2DD4BF` | `rgba(45,212,191,0.12)` | `rgba(45,212,191,0.38)` | `#7CE8DA` |

Derived roles: danger = Again, warning = Hard, info = Good, success = Easy.
Card-state pills: New → Good tint · Learning → Hard tint · Review → Again tint · Mastered → Easy tint + star icon.

### 3.6 `aurora-day` (later — tokens reserved now)

Canvas `#F2F1FA` · glass `rgba(255,255,255,0.62)` + blur · line `rgba(27,29,46,0.08)` · text `#1B1D2E` / `#5B5F76` · accents deepen for contrast: `#6C4BF4 → #B23BF0` · glow opacity halved. Same structure, same components.

## 4. Typography

- Display: **Space Grotesk** 500/700 — screen titles, stat numbers, streak count, button labels. `font-variant-numeric: tabular-nums` on every counter and progress readout.
- Body/UI: `system-ui` stack (keeps the PWA light; no extra Latin body font).
- Japanese: system-JP-first stack with Noto Sans JP as progressive enhancement:
  `"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", Meiryo, sans-serif`.
  Full Noto Sans JP is heavy — if self-hosting, subset it, use `font-display: swap`, and cache font files in `sw.js`. Falling back to system JP fonts is acceptable.
- Scale: study-card kanji 44–56px · stat number 28 · h1 22 · h2 17 · body 15 · caption 12.5 · pill/badge 11.5. Line-height 1.5 body, 1.15 display.
- Furigana: `<ruby><rt>` at `0.5em`, color `--au-text-2`, slight letter-spacing. Verify ruby rendering in Electron (Chromium) and mobile PWA at the new sizes.
- Wordmark: "Stacks" in Space Grotesk 700. Gradient text-clip allowed **only** on splash/about; plain `--au-text` elsewhere.

## 5. Shape and spacing

4px grid. Radius: cards 20 · inner cards/inputs 12 · buttons 14 · pills 999. Card padding 16–20px. Content column max-width 760px centered (web desktop); 16px gutters on mobile. Floating dock offsets by `env(safe-area-inset-bottom)`.

## 6. Effect recipes (copy-paste)

```css
.au-card {
  background: var(--au-glass-1);
  border: 1px solid var(--au-line);
  border-radius: 20px;
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  backdrop-filter: blur(16px) saturate(140%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .au-card { background: var(--au-solid); }
}

.au-btn-primary {
  background: var(--au-grad);
  color: #fff;
  border: 0;
  border-radius: 14px;
  box-shadow: var(--au-glow);
  font: 500 15px "Space Grotesk", system-ui, sans-serif;
}
.au-btn-primary:hover  { filter: brightness(1.06); transform: translateY(-1px); }
.au-btn-primary:active { transform: scale(0.98); }

.au-btn-ghost {
  background: transparent;
  border: 1px solid var(--au-line);
  color: var(--au-text-2);
  border-radius: 14px;
}
.au-btn-ghost:hover { background: var(--au-glass-2); }
```

Motion: 160–240 ms `cubic-bezier(0.2, 0.8, 0.2, 1)`. Keep the existing card-flip interaction; add the §2.1 light sweep on flip. Grade buttons press to `scale(0.97)`. Animate only `transform`/`opacity` — never `box-shadow` or `filter`. Honor `prefers-reduced-motion` (freeze orb drift, drop the sweep and entrance transitions).
Focus: `outline: 2px solid var(--au-accent-a); outline-offset: 2px;` on every interactive element.

## 7. Performance budget (hard rules)

1. Max **4 `backdrop-filter` surfaces** visible at once.
2. Long lists (the 650-row card browser, exam lists) use `--au-solid` rows — never per-row blur.
3. Aurora orbs: static gradients on one fixed layer; at most one slow transform-only drift animation, disabled under reduced-motion.
4. Checkpoint after the first implemented screen: run the PWA on a real phone; if scrolling janks, drop blur 16 → 10px or demote cards to solid.

## 8. Components

- Header/top bar: transparent over the aurora layer; title in Space Grotesk; sync state as a small glass circle icon button.
- Stat cards: glass, 28px tabular number + caption label. 4-up on desktop, 2×2 on mobile.
- Streak card: flame icon inside a gradient-tinted circle with glow; "N days" as display number; week dots — past hit = gradient-filled dot, past miss = `--au-line` ring, today = accent ring; shield count with a shield icon.
- Deck/folder card: glass; folder icon in `--au-accent-solid`; sub-deck count pill; meta line in `--au-text-2`; **new element:** 3px progress bar (mastered %) with gradient fill; primary `Study (n)` + ghost `Detail`; `n new` pill in Good tint.
- Study screen: 3px top progress (track `--au-line`, fill gradient); question/answer card = large glass panel; kanji at display size with ruby furigana; state pill top-right; muted "drag to flip" hint; `Show answer` primary. Answer state adds a hairline divider + example sentence block (JP line, translation in `--au-text-2` italic).
- Grade row: four tinted chips per §3.5, 52px tall, radius 14, interval caption under the label.
- Kanji detail modal: glass panel over `--au-scrim` (scrim may add `blur(8px)`); 72px kanji; hairline-separated reading rows.
- Forms (add card, create deck, settings): caption label above field; field uses `--au-field`, 1px `--au-line`, radius 12; focus = accent ring + `--au-line-strong`.
- Exams/quiz: test cards styled as deck cards; quiz options = glass rows (radius 14), hover `--au-glass-2`; correct answer flashes Easy tint, wrong flashes Again tint.
- Community packs: glass cards; level badges (N3/N4/N5) as small Good-tint pills; `Import pack` primary; `Imported` state pill in Easy tint.
- Settings: rows on `--au-solid` list panels; section labels caption-size in `--au-text-3`; theme picker gains an Aurora swatch (dark circle with a violet-magenta gradient dot); danger zone panel in Again tint.
- Navigation, mobile/PWA: floating glass dock detached 12px from the bottom edge, radius 22, blurred, 5 items; active item = icon inside a small gradient pill + 11.5px label; inactive items in `--au-text-3`.
- Navigation, Electron: left glass rail (~76px) with icon + label items; active = 3px gradient indicator bar + accent-tinted icon. Legacy themes render both structures flat with their own palettes.
- Icons: pick **one** outline icon set app-wide (Lucide or Tabler outline, stroke ≈ 1.75, inline SVG or webfont) and replace all mixed glyphs.
- Empty states: icon in a glass circle, one-line body in `--au-text-2`, ghost CTA.

## 9. Layout notes

Web/PWA keeps the single centered column; Electron gets rail + content area. Modals: centered glass panels ≤ 480px wide, radius 20. Toasts: bottom-centered glass pill floating above the dock.

## 10. Accessibility floor

Contrast: `--au-text-2` on canvas ≈ 7:1 and ≥ 4.5:1 on `--au-glass-1` — preserve when tuning. Touch targets ≥ 44px. Visible focus everywhere. Reduced motion honored per §6.

## 11. Screen inventory and priority

- **P0 — design in Claude Design:** Home (deck list), Study card (question + answer states with grade row), Deck detail (sub-decks).
- **P1 — derive during implementation:** card list/browser, Add card + bulk import + AI deck, Exams list, quiz runner, Community, Settings, all modals (create deck, kanji detail).
- **P2 — polish:** empty states, onboarding, about/version footer.

## 12. Starter prompt for Claude Design (paste as-is)

Attach to the project: this `DESIGN.md` · 3–4 current screenshots (home, study front, study back, deck detail) · 2–3 style reference images.

> You are redesigning "Stacks", a Japanese-learning flashcard SRS app (vanilla HTML/CSS/JS, runs as a PWA and in Electron). Attached are current screenshots, style references, and DESIGN.md — DESIGN.md is the source of truth; follow its tokens and recipes exactly. Build high-fidelity interactive prototypes of three screens at a 390px mobile viewport: Home (deck list), Study card (question and answer states, including the four grade buttons), and Deck detail. Also produce a 1200px desktop variant of Home using the left rail navigation. Dark theme: #0B0D1A canvas with soft aurora radial-gradient orbs, frosted-glass cards, #7C5CFF→#C64BFF gradient primaries with a soft glow, Space Grotesk for display type and a Japanese-capable stack for kanji and furigana (render the Japanese content from the screenshots faithfully, including ruby text). The signature moment is the study-card flip with a diagonal light sweep. Keep the information architecture identical to the screenshots — same elements, same hierarchy; this is a reskin and layout modernization, not a feature redesign. Plain CSS with custom properties only; no Tailwind, no React. Exercise restraint: one gradient hero per region, everything else quiet glass.

Iterate with inline comments and adjustment sliders (spacing, blur, glow) before requesting full regenerations — it is cheaper on usage. When satisfied, use the handoff-to-Claude-Code export.

## 13. Handoff plan for Claude Code (Phase 3)

Work in Plan mode; each step is its own plan and commit:

1. Add Aurora tokens + theme registration — zero visual change to legacy themes; verify by cycling all themes.
2. Theme-neutral structural updates: floating dock (web/PWA) + left rail (Electron), safe-area handling.
3. Home screen skin → **PWA phone-test checkpoint (§7.4).**
4. Study screen + grade chips + kanji modal + signature flip sweep.
5. Deck detail + card browser.
6. Remaining P1 screens.
7. `aurora-day` variant from the reserved tokens in §3.6.

Acceptance checklist: legacy themes pixel-identical (screenshot spot-check) · blur fallback verified by disabling backdrop-filter in devtools · furigana correct at all sizes · no `box-shadow`/`filter` animations · PWA scroll performance not below current baseline on a real phone · `CLAUDE.md` repo rules obeyed (electron/web mirror, triple version sync).
