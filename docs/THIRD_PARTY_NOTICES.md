# Third-party notice distribution (KS-AUDIT-006)

The owned distribution artifact is `public/THIRD_PARTY_NOTICES.html`. It contains
complete source license/notice texts, component/version mappings, source locations,
and explicit provenance gaps. The text blocks preserve the source characters and
whitespace after CRLF-to-LF normalization; HTML entities preserve trailing spaces.
Each block records a SHA-256 fingerprint of its decoded text.

## Confirmed renderer and worker coverage

The current production renderer graph contains Kuromoji source modules, nested
`async/dist/async.js`, `doublearray/doublearray.js`, and `fflate/esm/browser.js`.
A `write:false` trace matches the normal renderer exactly after Vite's five
pre-finalization `__VITE_PRELOAD__` placeholders are replaced with `[]`; all locale
chunks match directly. Merely appearing in a dependency tree is not bundle evidence.

The production Workbox Rollup graph contains code from the six Workbox packages
listed below, `idb/build/index.js`, `idb/build/wrap-idb-value.js`, and the generated
`rollupPluginBabelHelpers.js` module (304 rendered bytes before final minification).
`@rollup/plugin-babel` generates that module with Babel's `buildExternalHelpers`,
which reads the installed `@babel/helpers` implementation. Other Babel/compiler
packages are not identified as redistributed runtime implementations.

| Component / distributed version | License | Exact local source copied into the artifact |
|---|---|---|
| fflate 0.8.3 | MIT | `node_modules/fflate/LICENSE` |
| doublearray 0.0.2 | MIT | `node_modules/doublearray/LICENSE.txt` |
| async 2.6.4, nested under Kuromoji | MIT | `node_modules/@sglkc/kuromoji/node_modules/async/LICENSE` |
| Lodash helpers embedded in async 2.6.4 | MIT | `node_modules/lodash/LICENSE`, identical to the upstream build pin's license; see below |
| @sglkc/kuromoji 1.1.0 | Apache-2.0 | `node_modules/@sglkc/kuromoji/LICENSE-2.0.txt`; also the exact leading author/license comment from `src/Tokenizer.js` in that package |
| IPADIC, identified as mecab-ipadic-2.7.0-20070801 by the package NOTICE | NAIST/ICOT terms | Complete `node_modules/@sglkc/kuromoji/NOTICE.md` |
| workbox-core, workbox-routing, workbox-expiration, workbox-cacheable-response, workbox-strategies, workbox-precaching, each 7.4.1 | MIT | Each package's `node_modules/workbox-*/LICENSE`; all six texts are identical and reproduced once with six source mappings |
| idb 7.1.1 | ISC | `node_modules/idb/LICENSE` |
| @babel/helpers 7.29.7, generated worker helper code | MIT | `node_modules/@babel/helpers/LICENSE` |

The Workbox package and lock versions are 7.4.1, although the installed source
`_version.js` markers embedded in the worker say 7.4.0. This is recorded accurately
without altering those packages. All twelve `public/dict/*.dat.gz` files match the
installed Kuromoji dictionary files and the generated web/desktop resource copies.

### Embedded Lodash provenance

async 2.6.4's npm publication identifies source commit
`c6bdaca4f9175c14fc655d3783c6af6a883e6514`. Its
[bundle build script](https://github.com/caolan/async/blob/c6bdaca4f9175c14fc655d3783c6af6a883e6514/support/build/aggregate-bundle.js)
resolves imported dependencies into the UMD output. Its
[upstream build lock](https://github.com/caolan/async/blob/c6bdaca4f9175c14fc655d3783c6af6a883e6514/package-lock.json)
pins Lodash 4.17.14. The installed async UMD file contains the Lodash helper bodies
and documentation, rather than an external Lodash import. The flattened helpers
carry no separate release marker, so the notice identifies the upstream build pin
without asserting an independently identified embedded version.

The exact [Lodash 4.17.14 license](https://github.com/lodash/lodash/blob/4.17.14/LICENSE)
was retrieved and compared byte-for-byte with the installed `node_modules/lodash/LICENSE`:
they match. That installed file supplies the preserved notice text. The installed
standalone Lodash version is not claimed to be present in the renderer graph. Root
async 3.2.6, Vite, Rolldown, and electron-builder are likewise not included merely
because they are installed.

## Confirmed Electron dependency coverage

A fresh local unpacked application archive physically contains these packages.
Their versions match the currently installed packages and `electron/package-lock.json`.
Every complete license text listed below is also in the consolidated artifact;
individual license files remain in the new ASAR unchanged.

Paths in this table start under `electron/node_modules/`. In the application
archive the same paths start under `node_modules/`.

| Component / version | License | Exact source relative to that prefix |
|---|---|---|
| graceful-fs 4.2.11 | ISC | `graceful-fs/LICENSE` |
| argparse 2.0.1 | Python-2.0 | `argparse/LICENSE` |
| debug 4.4.3 | MIT | `debug/LICENSE` |
| electron-updater 6.8.9 | MIT | `electron-updater/LICENSE` |
| builder-util-runtime 9.7.0 | MIT | `electron-updater/node_modules/builder-util-runtime/LICENSE` |
| fs-extra 10.1.0 | MIT | `electron-updater/node_modules/fs-extra/LICENSE` |
| jsonfile 6.2.1 | MIT | `electron-updater/node_modules/jsonfile/LICENSE` |
| semver 7.7.4 | ISC | `electron-updater/node_modules/semver/LICENSE` |
| universalify 2.0.1 | MIT | `electron-updater/node_modules/universalify/LICENSE` |
| js-yaml 4.2.0 | MIT | `js-yaml/LICENSE` |
| lodash.escaperegexp 4.1.2 | MIT | `lodash.escaperegexp/LICENSE` |
| lodash.isequal 4.5.0 | MIT | `lodash.isequal/LICENSE` |
| ms 2.1.3 | MIT | `ms/license.md` |
| sax 1.6.0 | BlueOak-1.0.0 | `sax/LICENSE.md` |
| tiny-typed-emitter 2.1.0 | MIT | `tiny-typed-emitter/LICENSE` |
| universalify 0.1.2 | MIT | `universalify/LICENSE` |
| lazy-val 1.0.5 | MIT declared in metadata; exact notice unresolved | `lazy-val/package.json`, with the provenance gap below |

### Unresolved lazy-val notice source

The installed and lock-pinned `lazy-val` 1.0.5 package is actually required by
`electron-updater/out/AppUpdater.js` and physically redistributed in the fresh ASAR.
Its metadata declares MIT and lists Vladimir Krivosheev as author. Its package
contains no license file or exact copyright/permission notice. An author field is
not treated as a copyright statement.

The [npm publication](https://registry.npmjs.org/lazy-val/1.0.5) identifies source commit
[`b69ad4119f1b19bdab13c61ee2fcc88d46b89071`](https://github.com/develar/lazy-val/tree/b69ad4119f1b19bdab13c61ee2fcc88d46b89071).
That tree also lacks a license file; its README and source supply no complete
license text. Upstream `LICENSE` path history returned no commits during this
verification. The artifact retains this unresolved exact notice provenance and
does not fabricate a copyright line or substitute MIT text. An authoritative
notice from the upstream maintainer is still needed to close that gap.

## Locale-data provenance retained accurately

`AGENTS.md` identifies `davidluzgouveia/kanji-data` as the dataset source and mentions
ten manually edited multilingual entries. The named upstream's full MIT license,
copyright 2019 David Gouveia, is preserved from
[license revision 5b5f1dfcb806f8ad9c5074c43a6a6bb3e0665ef7](https://github.com/davidluzgouveia/kanji-data/blob/5b5f1dfcb806f8ad9c5074c43a6a6bb3e0665ef7/LICENSE).
This revision identifies the license source only, not the data revision used here.

The original data revision, extraction record, exact underlying KANJIDIC license
chain, and Turkish/custom translation authorship and permissions are unresolved.
Other locally edited translation provenance is also not established. The artifact
does not assign these translations to David Gouveia or claim a definitive complete
license chain. None of the locale files was rewritten.

## Distribution and reproducible assertions

No Vite/Electron configuration changes are needed. `publicDir: '../public'` copies
the top-level HTML asset to `dist/THIRD_PARTY_NOTICES.html`. The existing PWA HTML
precache glob includes it with a content revision. Electron's existing dist file
mapping copies it into `app.asar/dist/THIRD_PARTY_NOTICES.html`; the `!dict/**`
exclusion does not exclude it. Dictionary `extraResources` is used only for the
existing dictionary gzip files. No runtime caching rule was added.

Run from the repository root after a normal build:

```powershell
npm run build
node scripts/verify_third_party_notices.cjs
git diff --check
```

To verify a freshly generated unpacked desktop package as well:

```powershell
node scripts/verify_third_party_notices.cjs --asar '<fresh package>/win-unpacked/resources/app.asar'
```

The assertions compare decoded license text with installed exact sources, versions
with both locks, all six Workbox licenses, owned/build/ASAR notice bytes, the PWA
precache content revision, dictionary associations, individual desktop license
copies, and the presence of Electron/Chromium credits. The externally sourced
locale upstream license is fingerprinted in the artifact; its source URL/revision
is recorded above. The script performs no network requests or writes and does not
boot the application or access user data. Passing it verifies distribution
coverage, not resolution of the explicitly retained provenance gaps.

### Verification performed on 2026-10-05

- `npm run build`: passed; Vite 8.0.16, 54 modules; PWA 1.3.0 generated 11 precache
  entries (935.61 KiB), including the notice with its matching content revision.
- `dist/THIRD_PARTY_NOTICES.html`: 78,780 bytes, byte-for-byte identical to public.
  SHA-256: `93798c7adb779d2abdefd4d891638d72bcfaacb0768c806afc670614257908da`.
- Text/version assertions: passed, 27 exact text blocks, 29 locked package versions,
  and 12 dictionary associations. External source license text was compared with
  the retrieved pinned upstream file before inclusion.
- Electron: existing supported electron-builder 24.13.3 generated a fresh Windows
  x64 unpacked application (internal app version 2.6.1) with current file mappings.
  The installed Electron runtime files were incomplete, so a temporary copy of the
  existing matching Electron 31.7.7 executable/runtime was used as `electronDist`.
  Publication was `never`, target was `dir`, dependency rebuilding and executable
  signing/editing were disabled through temporary CLI options. No project config
  or existing desktop artifacts were changed. The initial attempt used a
  sandbox-remapped temp directory and failed; the explicit host-path retry passed.
- Fresh output: `C:/Users/songo/AppData/Local/Temp/kanji-srs-notices-20261005/package/win-unpacked/resources/app.asar`.
  The same notice was extracted from `dist/THIRD_PARTY_NOTICES.html` in this ASAR
  and compared byte-for-byte. All listed Node packages/licenses and dictionary
  resources passed. Adjacent `LICENSE.electron.txt` and `LICENSES.chromium.html`
  match the original runtime copies exactly.
- Desktop limitations: no signed executable/installer, application launch, update,
  release, upload, or publication was performed. The artifact validates ASAR and
  resource packaging, rather than a published release. Live PWA installation/cache
  behavior was not exercised; generated precache membership/revision was verified.
- Original source/dirty-file fingerprints: 137 files unchanged. Existing app
  JS/CSS, locale chunks, dictionary bytes, and Workbox runtime output are unchanged;
  only `sw.js` gains the notice precache entry. Dependencies, lock files and app
  versions are unchanged. Existing user changes remain outside this implementation.
- `git diff --check`: passed. Scope is only KS-AUDIT-006 implementation verification;
  no post-implementation Japanese audit was performed.
