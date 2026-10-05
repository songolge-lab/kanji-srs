// Distribution-only assertions. Does not boot the app, write files, or access user data.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');

const root = path.resolve(__dirname, '..');
const noticeName = 'THIRD_PARTY_NOTICES.html';
const sourceNotice = fs.readFileSync(path.join(root, 'public', noticeName));
const builtNotice = fs.readFileSync(path.join(root, 'dist', noticeName));
assert.deepEqual(builtNotice, sourceNotice, 'dist notice differs from owned public artifact');
const normalize = value => value.replaceAll('\r\n', '\n');
const html = normalize(sourceNotice.toString('utf8'));
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', '#32': ' ', '#9': '\t' };
const decode = value => value.replace(/&(amp|lt|gt|quot|#32|#9);/g, (_, entity) => entities[entity]);
const texts = new Map();
for (const match of html.matchAll(/<pre data-source="([^"]+)"(?: data-extract="([^"]+)")? data-sha256="([a-f0-9]{64})">([\s\S]*?)<\/pre>/g)) {
  const [, source, extract, expectedHash, encoded] = match;
  const content = decode(encoded);
  assert.equal(digest(content), expectedHash, `notice text fingerprint changed: ${source}`);
  if (!source.startsWith('https://')) {
    let original = normalize(fs.readFileSync(path.join(root, source), 'utf8'));
    if (extract) {
      assert.equal(extract, 'leading-comment');
      original = original.match(/^\/\*[\s\S]*?\*\//)[0];
    }
    assert.equal(content, original, `exact installed source text differs: ${source}`);
  }
  assert(!texts.has(source), `duplicate source block: ${source}`);
  texts.set(source, content);
}
const required = [
  'node_modules/fflate/LICENSE',
  'node_modules/doublearray/LICENSE.txt',
  'node_modules/@sglkc/kuromoji/node_modules/async/LICENSE',
  'node_modules/lodash/LICENSE',
  'node_modules/@sglkc/kuromoji/src/Tokenizer.js',
  'node_modules/@sglkc/kuromoji/LICENSE-2.0.txt',
  'node_modules/@sglkc/kuromoji/NOTICE.md',
  'node_modules/workbox-core/LICENSE',
  'node_modules/idb/LICENSE',
  'node_modules/@babel/helpers/LICENSE',
  'https://github.com/davidluzgouveia/kanji-data/blob/5b5f1dfcb806f8ad9c5074c43a6a6bb3e0665ef7/LICENSE',
];
for (const source of required) assert(texts.has(source), `required notice missing: ${source}`);
for (const name of ['core', 'routing', 'expiration', 'cacheable-response', 'strategies', 'precaching']) {
  const source = `node_modules/workbox-${name}/LICENSE`;
  assert(html.includes(source), `Workbox source mapping missing: ${source}`);
  assert.equal(normalize(fs.readFileSync(path.join(root, source), 'utf8')), texts.get('node_modules/workbox-core/LICENSE'), `Workbox ${name} needs separate license text`);
}
const rootLock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json')));
const desktopLock = JSON.parse(fs.readFileSync(path.join(root, 'electron/package-lock.json')));
const packages = [...html.matchAll(/data-package="([^"]+)" data-version="([^"]+)"/g)].map(([, source, version]) => ({ source, version }));
for (const { source, version } of packages) {
  const installed = JSON.parse(fs.readFileSync(path.join(root, source, 'package.json')));
  const desktop = source.startsWith('electron/');
  const lockKey = desktop ? source.slice('electron/'.length) : source;
  assert.equal(installed.version, version, `notice version differs: ${source}`);
  assert.equal((desktop ? desktopLock : rootLock).packages[lockKey].version, version, `lock version differs: ${source}`);
}
assert(html.includes('Unresolved exact notice provenance'), 'lazy-val uncertainty must remain explicit');
assert(html.includes('Turkish/custom translation authorship and permissions remain unknown'), 'translation provenance uncertainty must remain explicit');
assert(!/<script\b/i.test(html), 'notice must remain a static asset');

const worker = fs.readFileSync(path.join(root, 'dist/sw.js'), 'utf8');
const precache = [...worker.matchAll(/\{url:"([^"]+)",revision:"([^"]+)"\}/g)];
assert(precache.some(([, url]) => url === noticeName), 'notice missing from normal PWA precache');
const noticeRevision = precache.find(([, url]) => url === noticeName)[2];
assert.equal(noticeRevision, crypto.createHash('md5').update(builtNotice).digest('hex'), 'PWA notice revision differs from the built bytes');
const dictionaries = fs.readdirSync(path.join(root, 'public/dict')).filter(file => file.endsWith('.dat.gz'));
assert.equal(dictionaries.length, 12);
for (const file of dictionaries) {
  const bytes = fs.readFileSync(path.join(root, 'public/dict', file));
  assert.deepEqual(fs.readFileSync(path.join(root, 'dist/dict', file)), bytes, `built dictionary differs: ${file}`);
  assert.deepEqual(fs.readFileSync(path.join(root, 'node_modules/@sglkc/kuromoji/dict', file)), bytes, `dictionary notice association differs: ${file}`);
}

const args = process.argv.slice(2);
assert(args.length === 0 || (args.length === 2 && args[0] === '--asar'), 'usage: node scripts/verify_third_party_notices.cjs [--asar <fresh app.asar>]');
if (args.length) {
  const archive = path.resolve(args[1]);
  const desktopRequire = createRequire(path.join(root, 'electron/package.json'));
  const asar = desktopRequire('@electron/asar');
  assert.deepEqual(asar.extractFile(archive, path.join('dist', noticeName)), sourceNotice, 'Electron archive notice differs');
  for (const { source, version } of packages.filter(pkg => pkg.source.startsWith('electron/'))) {
    const archivePath = source.slice('electron/'.length);
    const installed = JSON.parse(asar.extractFile(archive, path.join(archivePath, 'package.json')));
    assert.equal(installed.version, version, `Electron distributed version differs: ${source}`);
  }
  for (const source of texts.keys()) {
    if (source.startsWith('electron/')) {
      assert.deepEqual(asar.extractFile(archive, source.slice('electron/'.length).replaceAll('/', path.sep)), fs.readFileSync(path.join(root, source)), `Electron individual license differs: ${source}`);
    }
  }
  for (const file of dictionaries) {
    assert.deepEqual(fs.readFileSync(path.join(path.dirname(archive), 'dict', file)), fs.readFileSync(path.join(root, 'public/dict', file)), `Electron dictionary differs: ${file}`);
  }
  for (const file of ['LICENSE.electron.txt', 'LICENSES.chromium.html']) {
    assert(fs.statSync(path.join(path.dirname(archive), '..', file)).size > 0, `Electron runtime notice missing: ${file}`);
  }
  console.log('PASS: Electron ASAR notice, component versions, individual licenses, dictionary resources, and runtime credits.');
}
console.log(`PASS: ${texts.size} exact text blocks, ${packages.length} locked package versions, ${dictionaries.length} dictionary associations, dist copy and PWA precache revision.`);
