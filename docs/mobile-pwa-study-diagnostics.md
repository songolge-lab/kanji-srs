# Temporary mobile PWA study diagnostics

Diagnostic only; uncommitted on codex/approved-stacks-work. No deployment or push performed.

## Current paths (inspected before instrumentation)

A: trusted touch/pointer and optional compatibility mouse events reach #btn-show;
its inline click handler calls showBack() synchronously. showBack vibrates, sets
studyShowingBack, and calls renderStudy. renderStudy replaces study-screen.innerHTML
with #swipe-stage / #grade-card and the four .ans-btn buttons. Their existing inline
onclick handlers call gradeCard(0..3); initSwipeGrade installs pointer handlers.

B: initFlipGesture listens to mouse start/move/up/leave and passive touch start/move/end.
It does not handle touchcancel. Start sets dragging and .no-transition; move maps horizontal
distance/card width to rotateY (clamped +/-180). End removes .no-transition. At >=90 degrees
it sets flipped and rotateY(+/-180), then schedules showBack in 350ms. Below 90 it snaps
to zero. There is no discrete movement-start threshold in this front helper. The 350ms
timer is shorter than CSS's normal .5s (Nova .55s) transform transition. The transformed
back face already contains words but grading buttons arrive with DOM replacement.

Both paths converge on the same synchronous answer rendering and grading handlers.
Answer dragging uses pointer events, touch-action:none, 8px movement threshold, pointer
capture after that threshold, and release on pointerup OR pointercancel. A real drag
installs the existing capture click suppressor ON THE ANSWER CARD for 350ms (not on the
grading grid). A 100px directional swipe flies off and calls gradeCard after 230ms.
This is a code map, not evidence that any particular handler causes the mobile bug.

Document click delegation ignores flip-front/preview-front, opens WordModal for a word
and KanjiModal for a kanji. The translation button stops propagation of pointer/touch/
mouse events and its click before opening the shared modal. The shared #modal-bg is
fixed z-index 50, visibility:hidden when closed; .show makes it visible. No confirmed
persistent interaction barrier exists. Glow/Nova halo layers declare pointer-events:none.
Front/back use backface-visibility:hidden with an absolutely positioned rotated back.
Study locks body scrolling, but front faces have overflow-y:auto.

Current post-fix ruby refresh updates only answer ruby/example nodes, waits during modal,
drag, active/flying/snap interactions, and does not replace the entire answer screen.
It is traced too so child-node replacement can be distinguished from full rendering.

main.js registers ./sw.js on window load (non-Electron). VitePWA uses autoUpdate,
injectRegister:false, precached shell, and only dictionary CacheFirst runtime caching.
No registration, cache, update, SRS, threshold, timing, or interaction behavior is changed.

## Controls and privacy

On Study, expand Temporary study trace / Geçici çalışma izi (translated in four languages).
Choose planned path (A-button/B-gesture), delay and first target. Start / Clear trace starts
a new in-memory trial and collapses the panel; recording is initially OFF. Configure only
BEFORE reveal. Do not touch the diagnostic panel between reveal and the first/second test
tap: it could itself clear the reported condition. Copy trace freezes recording, captures
read-only runtime state, copies JSON and displays it in a readonly textarea. If clipboard
permission or activation fails, select/copy the textarea manually. Stop trace freezes it.

Globals: stacksStudyTrace.clear(), stacksStudyTrace.copy(), stacksStudyTrace.get(),
stacksStudyTrace.stop(), stacksStudyTrace.destroy(). Reload clears everything. 5000-entry
bounded trace reports dropped entries. Use short trials and send complete JSON. Captured
card/node identities are local sequence numbers; no text, translations, datasets, settings,
sync code, API key, storage, arbitrary element IDs or URL query/hash are exported.

All observer listeners are passive and do not cancel, intercept or capture pointers.
Document/window and direct card/button capture+bubble records share event IDs; after-dispatch
records preserve defaultPrevented even if bubbling is stopped. Hit details sample presses
and clicks (moves keep lightweight elementFromPoint); samplingMs records diagnostic cost.
This observer cost is a limitation when interpreting exact timing. Pseudo styles are
reported on their host (DOM hit testing cannot return a pseudo-element directly).

## Real-device procedure

1. Build and serve this worktree's dist on the test HTTPS origin used by the installed PWA.
   This task does not deploy it. Local LAN HTTP generally cannot establish a controlled PWA.
2. Reopen/refesh the installed PWA normally. Do not force/unregister/delete its service worker.
   The temporary panel must exist; its absence means the diagnostic JS has not loaded.
3. Open Study on a deck with cards available. Choose B-gesture / immediate / Again.
4. Start / Clear trace, drag to reveal, tap Again once; if needed tap it again. Do not open
   the trace panel or a modal in between unless that is the explicitly chosen test target.
5. Open the trace panel after the test; Copy trace. Paste the ENTIRE JSON back, with whether
   the first tap visibly worked. Approximate timing labels are intentions; timestamps are evidence.
6. Repeat with A-button (Show Answer), matching delay and first target, as a control.
7. Repeat each path 2-3 times for immediate, ~100ms, ~300ms, ~500ms and ~1000ms.
8. Test B's first tap on Again/Hard/Good/Easy, empty card, word/kanji, translation,
   and outside the card within Study (use a neutral area that does not navigate away).
   For neutral/other targets, try a grade button next; note modal open/close where applicable.
9. Also collect one matching trace in a fresh browser tab at the same deployed URL.
   Compare runtime script/CSS hash filenames, diagnostic revision, version, display mode,
   controller and waiting/installing workers. Same sw.js URL alone does not prove same bytes.

Send paired A/B complete JSON, first/second tap observations, device/OS/browser and whether
launched from home screen. Do not send secrets or card contents. No real-device root cause
can be concluded until these traces return; stop at instrumentation.

## Removal

Delete src/diagnostics/studyTrace.js, this document, TEMP STUDY TRACE imports/calls in
CardView.js and main.js, and diag_* locale keys. No release version bump or storage migration.

## Validation of the final diagnostic build

- npm run build: PASS (Vite 8.0.16, 55 modules; PWA generateSW, 10 precache entries).
- Diagnostic revision: study-trace-2026-09-30-r2; APP_VERSION remains 2.6.0.
- Expected entry assets: assets/index-Fc2uamrG.js and assets/index-CvYtZw7C.css.
- Isolated headless mobile viewport smoke test: PASS. Native emulated button taps and
  deterministic synthetic touch gesture events exercised both paths, direct grading
  capture/bubble events, hit tests, modal lifecycle, the existing answer click suppressor,
  after-dispatch defaultPrevented, touchcancel, copy/freeze, default-OFF and Study-only logging.
- Private card-text and URL query/hash sentinels were excluded from exported JSON.
  Only same-origin asset URLs are included; external script/stylesheet URLs are omitted
  and represented by counts. No page errors occurred.
- git diff --check: PASS. No diffs in SRS, state, Vite/PWA configuration, HTML or app CSS.
- This is instrumentation validation, not real mobile installed-PWA reproduction.
  Actual device timing/first-target matrix remains for the owner. No root cause claimed.
- All diagnostic source changes remain uncommitted and unpushed. Existing audit reports
  in this worktree and existing changes in the main checkout were left untouched.
