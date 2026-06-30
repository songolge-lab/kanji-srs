# Comprehensive Codebase Audit & Health Check Report

## 1. Static Analysis & Memory Leaks

### Event Listeners
- **Dangling Listeners in `CardView.js`**: Functions `initFlipGesture` and `initFlipGestureToggle` attach `mousedown`, `mousemove`, `mouseup`, `touchstart`, `touchmove`, and `touchend` listeners directly to the DOM `container` element. Although the container is regularly destroyed and recreated via `screen.innerHTML = ...` (allowing the browser to garbage-collect the listeners tied to the orphaned DOM nodes), this pattern is brittle. If these listeners were attached to `document` or `window` instead, it would cause a severe memory leak.
- **Missing `removeEventListener`**: Only one `removeEventListener` is present in the codebase. All other event listeners rely on DOM element garbage collection. This is currently safe because the listeners are attached to the elements being destroyed, but it poses a risk for future refactoring.

### Dead Code & Unused Variables
- Several legacy SM-2 fields (`intervalDays`, `ease`) are deliberately preserved for backward compatibility with older synced clients, which is an acceptable architectural decision but adds slight cruft.

## 2. State & Data Integrity

### Critical Bug Fixed
- **Silent Data Loss on Quota Exceeded**: In `appState.js`, if `localStorage.setItem` failed (e.g., due to quota limits), `_tryLS` caught the error and switched the app to in-memory mode (`_inMemory = true`). However, the `saveState` function did not subsequently store the *current* JSON payload into `_memStore`, causing the active state to be silently discarded. This was patched.

### AI & Async Error Handling
- **Unhandled Promise Rejections in AI Fetching**: The `geminiRequest` function in `aiService.js` utilized `fetch` without a `try/catch` block. If the network failed or a timeout occurred, `fetch` would reject, resulting in an unhandled promise rejection that bypassed the app's error handling and could cause silent failures or crashes. This was patched.
- **Kuromoji Loader Fault Tolerance**: The offline dictionary loader for `furiganaParser.js` similarly lacked a `catch` around the `fetch` call, leaving it vulnerable to network-level exceptions. This was patched.

## 3. CRITICAL Architectural Risks (For Architecture Team Review)

### Severe FSRS Logic Flaw: Relearning Graduation Ignores User Grades
In `srsEngine.js`, the intraday step phase manages both "new" and "relearning" cards. However, the `graduate` function contains a major FSRS scheduling logic flaw for relearning cards:

```javascript
function graduate(srs, fsrsGrade, relearning, now, settings) {
  if (!relearning || !(srs.S > 0)) {
    const init = computeInitialDS(fsrsGrade);
    srs.D = round4(init.D);
    srs.S = round4(init.S);
  }
  // ... schedules the card using the existing srs.S
}
```

**The Flaw**: When a card lapses, its post-lapse Stability (`S`) is computed and banked immediately. When the user subsequently graduates the card from the relearning steps (by pressing "Good" or "Easy"), the engine *completely ignores* the `fsrsGrade` (e.g., whether they pressed Good or Easy). 
- It schedules the card using the previously banked `S` regardless of the user's performance during relearning.
- Pressing "Easy" vs "Good" during relearning produces the exact same interval and stability. 
- **Recommendation**: FSRS v4.5 specifies that relearning steps do not update stability, BUT if a user presses "Easy" during relearning, the stability/interval *should* ideally reflect that ease. If following strict FSRS where steps are just delays, the interval calculation should still perhaps differentiate early graduation, or the UI should not offer an "Easy" button that mathematically does the exact same thing as "Good".

### `localStorage` Corruption Fallback Loophole
In `loadState()` (`appState.js`), if the `JSON.parse(raw)` fails due to corrupt data, the raw data is backed up to `kanji_srs_v1_corrupt_backup` and `null` is returned.
**The Flaw**: Returning `null` signals `main.js` to initialize a brand-new, empty app state via `createInitialState()`. On the next save, this empty state overwrites `kanji_srs_v1`. If the user experiences consecutive corruptions or fails to manually extract the backup immediately, the single `_corrupt_backup` key will be overwritten, causing permanent data loss of the recoverable payload.
- **Recommendation**: Maintain a rolling backup (e.g., appending a timestamp to the key) or halt the app with a fatal error screen prompting the user to export their corrupt data instead of silently proceeding with a wiped slate.
