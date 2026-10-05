const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { root, createHarness } = require('./harness.cjs');
const hashes = {
  base: '556fbea019f0fbf1867303be5b084461511933f2aed3d09a5f475b89da039b39',
  en: '2c4d92a9caff23983878f02ce8cd2536ff5a1d0b0c2f0154f570d8d94928639d',
  ko: '562ec07ad2203a2d0d3f55862019ed38d259b83c4b75cc4964e6fbafcb2030bc',
  mn: '2ad3c9db7da97df0ac5d3edbc0cc720b0c3920a2323102077cb3972b8f3687d2',
};
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

async function run() {
  for (const [lang, expected] of Object.entries(hashes)) {
    assert.equal(hash(fs.readFileSync(path.join(root, `src/data/locales/kanji_${lang}.json`))), expected);
  }
  const source = fs.readFileSync(path.join(root, 'src/data/locales/kanji_tr.json'), 'utf8');
  assert.equal(hash(source.replace('"僑":', '"侨":').replace('"侶":', '"侣":')), 'e76d6a88ba1e5a50460de301f46b7b4f9fdb8fafdf1889b623dca9dd62ed9e63');
  const tr = JSON.parse(source);
  const base = JSON.parse(fs.readFileSync(path.join(root, 'src/data/locales/kanji_base.json')));
  assert.deepEqual(Object.keys(tr).sort(), Object.keys(base).sort());
  assert.equal(tr.僑, 'Geçici İkamet'); assert.equal(tr.侶, 'Arkadaş, Yoldaş');
  assert.ok(!('侨' in tr) && !('侣' in tr));
  const dictionary = await createHarness().load('src/services/kanjiDictService.js');
  await dictionary.init('tr');
  for (const key of ['僑', '侶']) { assert.equal(dictionary.lookup(key, 'tr').meaning, tr[key]); assert.equal(dictionary.lookup(key).hasNativeMeaning, true); }
  assert.equal(dictionary.lookup('侨'), null); assert.equal(dictionary.lookup('侣'), null);
  const en = JSON.parse(fs.readFileSync(path.join(root, 'src/data/locales/kanji_en.json')));
  const missing = Object.keys(en).find(key => !tr[key] && en[key]);
  assert.ok(missing); assert.equal(dictionary.lookup(missing).meaning, en[missing]); assert.equal(dictionary.lookup(missing).hasNativeMeaning, false);
  await dictionary.setLanguage('en');
  for (const key of ['僑', '侶']) { assert.equal(dictionary.lookup(key).meaning, en[key]); assert.equal(dictionary.lookup(key).hasNativeMeaning, false); }
  console.log('PASS Turkish: exact 3121-key equality, two key-only corrections with byte-identical glosses, unchanged base/other locales, native lookup and English fallback');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
