# KANJI-SRS: Comprehensive Codebase Audit Report
**Version:** 2.0.1
**Date:** 2026-06-26

This document presents a deep, read-only static analysis and bug sweep of the Kanji-SRS application across four core pillars: UI & DOM Architecture, State Management & Data Sync, Desktop/Web Platform, and i18n Consistency.

---

## 1. UI & DOM Architecture (Vanilla JS)

### 🔴 WARNING: Repetitive Event Binding Memory Pressure
* **File:** `src/components/CardView.js` (Lines ~335 & ~366)
* **Function:** `initFlipGesture()` and `initFlipGestureToggle()`
* **Issue:** Event listeners (`mousedown`, `mousemove`, `mouseup`, `touchstart`, etc.) are attached to the `#fc-flip` container. Because `renderStudy()` overwrites `screen.innerHTML` on every card grade, the DOM elements are destroyed and recreated, leaving the old detached elements to be garbage collected. While modern browsers handle detached nodes well, repeatedly binding listeners without explicit `removeEventListener` on high-frequency actions (like studying flashcards) can lead to short-term memory pressure and possible leaks if closures inadvertently capture large external scopes.
* **Proposed Solution:** Either attach the flip gesture listeners once to a persistent parent container (event delegation) or explicitly call `removeEventListener` before destroying the `innerHTML`.

### 🟡 OPTIMIZATION: Inefficient DOM Re-renders
* **File:** `src/components/CardView.js` & `src/components/KanjiModal.js`
* **Issue:** Completely replacing `innerHTML` for complex UI components (like `CardView` and `KanjiModal`) forces the browser to re-parse the HTML, reconstruct the DOM tree, and recalculate styles on every user interaction. This is computationally expensive and can cause UI flickering, especially given the dynamic rendering of Ruby characters (`smartRuby`).
* **Proposed Solution:** Implement localized DOM updates (e.g., updating `textContent` or toggling CSS classes on existing elements) instead of re-rendering the entire template string.

---

## 2. State Management & Data Sync

### 🔴 CRITICAL: Unhandled Network Errors During Cloud Sync
* **File:** `src/services/dbService.js` (Lines ~8 & ~15) & `src/services/supabaseClient.js`
* **Issue:** `cloudPull` and `cloudPush` rely on the custom `sbFetch` wrapper. `fetch` throws a `TypeError: Failed to fetch` if the network drops. Since `sbFetch` has no internal `try/catch`, and the error handling only checks `if (!res.ok)`, a network drop will cause an unhandled promise rejection. If the app goes offline exactly during a cloud sync, it will fail silently or crash the calling function, leaving the local state unsynced without proper user notification.
* **Proposed Solution:** Wrap the `sbFetch` calls in a `try/catch` block within `dbService.js` and gracefully notify the user of offline status or sync failure using `app.showToast()`.

### 🔴 WARNING: FSRS Timezone & Date Parsing Discrepancies
* **File:** `src/store/appState.js` (Lines ~137 & ~159)
* **Function:** `pruneOldData()` and `migrateStats()`
* **Issue:** `reviewsByDate` keys are stored as local `YYYY-MM-DD` strings. However, `pruneOldData` parses them as UTC: `new Date(datePart + 'T00:00:00Z')`. If a user travels across timezones or studies near midnight, parsing local string dates as UTC can shift the epoch day calculation, causing off-by-one errors. This can lead to incorrect streak calculations, premature data pruning, or FSRS scheduling anomalies.
* **Proposed Solution:** Standardize date handling by storing and parsing all timezone boundaries explicitly in the user's local timezone, or exclusively use UTC epoch midnights consistently across `appState.js` and `srsEngine.js`.

---

## 3. Desktop (Electron) & Web (PWA) Platform Checks

### 🔴 WARNING: Unrestricted `openExternal` in Electron
* **File:** `electron/main.js` (Line ~50)
* **Issue:** The `setWindowOpenHandler` passes any intercepted `url` directly to `shell.openExternal(url)`. If the user is tricked into clicking a maliciously crafted link (e.g., `file://`, `smb://`, or `javascript:`), Electron might attempt to execute it at the OS level.
* **Proposed Solution:** Implement a scheme whitelist. Only allow `shell.openExternal(url)` if `url.startsWith('http://') || url.startsWith('https://')`.

### 🟢 OPTIMIZATION: Efficient Workbox PWA Caching
* **File:** `vite.config.js` (Lines ~40-51)
* **Issue/Observation:** The configuration excludes the heavy `public/dict/*.dat.gz` dictionary files (~17MB total) from the default precache payload, opting instead for a `CacheFirst` runtime caching strategy. This is an excellent and highly efficient approach. It prevents exceeding the browser's initial cache quota while ensuring offline availability upon first use.
* **Proposed Solution:** No fixes needed. The Workbox strategy is functioning exactly as intended for large static dictionary assets.

---

## 4. i18n Consistency

### 🔴 CRITICAL: Simplified Chinese Characters in Turkish Locale
* **Files:** `src/data/locales/kanji_en.json` vs `src/data/locales/kanji_tr.json`
* **Issue:** A deep key verification between the locale JSON files reveals structural mismatches. The Turkish locale (`kanji_tr.json`) is missing two Japanese kanji keys present in the English file:
  - `僑` (kyou - temporary)
  - `侶` (ryo - companion)
  
  Instead of these standard Japanese characters, `kanji_tr.json` mistakenly contains their Simplified Chinese equivalents:
  - `侨` (Simplified for 僑)
  - `侣` (Simplified for 侶)
  
  Because the app's flashcard system queries definitions using the Japanese kanji characters as strict keys, the lookup will fail in Turkish for these two characters, returning undefined results.
* **Proposed Solution:** Rename the keys `侨` to `僑` and `侣` to `侶` in `src/data/locales/kanji_tr.json` to exactly match the Japanese standard used in `kanji_en.json` and the core kanji database.
