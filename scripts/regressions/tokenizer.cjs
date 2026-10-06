const assert = require('node:assert/strict');
const { gzipSync, gunzipSync } = require('fflate');
const doublearray = require('doublearray');
const { createHarness, dictionaryTransport } = require('./harness.cjs');

async function run() {
  const branch = process.argv[2] || 'web';
  const fixture = process.argv[3] || 'healthy';
  const transport = dictionaryTransport(branch);
  const { state, assets } = transport;
  const api = await createHarness(transport.globals).load('src/utils/furiganaParser.js');
  const rawMap = gunzipSync(assets['tid_map.dat.gz']);
  const replaceMap = bytes => { state.replacements['tid_map.dat.gz'] = gzipSync(bytes); };
  const rawUnknownMap = gunzipSync(assets['unk_map.dat.gz']);
  const replaceUnknownMap = bytes => { state.replacements['unk_map.dat.gz'] = gzipSync(bytes); };
  if (fixture === 'missing') state.missing = 'cc.dat.gz';
  if (fixture === 'gzip') state.replacements['cc.dat.gz'] = new Uint8Array([31, 139, 8, 0, 0]);
  if (fixture === 'cc') state.replacements['cc.dat.gz'] = gzipSync(new Uint8Array(new Int16Array([1, 1, 0]).buffer));
  if (fixture === 'cc-truncated') state.replacements['cc.dat.gz'] = gzipSync(gunzipSync(assets['cc.dat.gz']).slice(0, 6));
  if (fixture === 'map-truncated') replaceMap(rawMap.slice(0, 3271064));
  if (fixture === 'map-partial') replaceMap(rawMap.slice(0, 4175475));
  if (fixture === 'map-target') {
    const bytes = rawMap.slice();
    const recordLength = gunzipSync(assets['tid.dat.gz']).length;
    new DataView(bytes.buffer).setInt32(12, recordLength + 10, true);
    replaceMap(bytes);
  }
  if (fixture === 'map-trie') {
    const bytes = rawMap.slice();
    new DataView(bytes.buffer).setInt32(4, 0x7f4e5d6c, true);
    replaceMap(bytes);
  }
  if (fixture === 'map-count') {
    const bytes = rawMap.slice();
    new DataView(bytes.buffer).setInt32(0, 1, true);
    replaceMap(bytes);
  }
  if (fixture === 'map-padding') {
    const bytes = rawMap.slice(); bytes[bytes.length - 1] = 1; replaceMap(bytes);
  }
  if (fixture === 'tid-padding') {
    const bytes = gunzipSync(assets['tid.dat.gz']); bytes[bytes.length - 1] = 1;
    state.replacements['tid.dat.gz'] = gzipSync(bytes);
  }
  if (fixture === 'map-unpadded') replaceMap(rawMap.slice(0, 4175476));
  if (fixture === 'unk-truncated') replaceUnknownMap(rawUnknownMap.slice(0, 4));
  if (fixture === 'unk-partial') replaceUnknownMap(rawUnknownMap.slice(0, 251));
  if (fixture === 'unk-count') {
    const bytes = rawUnknownMap.slice(); new DataView(bytes.buffer).setInt32(0, 0x7fffffff, true); replaceUnknownMap(bytes);
  }
  if (fixture === 'unk-target' || fixture === 'unk-key') {
    const bytes = rawUnknownMap.slice();
    new DataView(bytes.buffer).setInt32(fixture === 'unk-key' ? 4 : 12,
      fixture === 'unk-key' ? 255 : gunzipSync(assets['unk.dat.gz']).length + 10, true);
    replaceUnknownMap(bytes);
  }
  if (fixture === 'unk-padding') {
    const bytes = rawUnknownMap.slice(); bytes[bytes.length - 1] = 1; replaceUnknownMap(bytes);
  }
  if (fixture === 'unk-record' || fixture === 'unk-feature') {
    const bytes = gunzipSync(assets['unk.dat.gz']);
    if (fixture === 'unk-record') bytes[bytes.length - 1] = 1;
    else new DataView(bytes.buffer).setInt32(6, 0x7fffffff, true);
    state.replacements['unk.dat.gz'] = gzipSync(bytes);
  }
  if (fixture === 'unk-char' || fixture === 'unk-compat') {
    const name = fixture === 'unk-char' ? 'unk_char.dat.gz' : 'unk_compat.dat.gz';
    const bytes = gunzipSync(assets[name]);
    if (fixture === 'unk-char') bytes['X'.charCodeAt(0)] = 255;
    else new DataView(bytes.buffer).setUint32('X'.charCodeAt(0) * 4, 0x80000000, true);
    state.replacements[name] = gzipSync(bytes);
  }
  if (fixture === 'unk-invoke-padding' || fixture === 'unk-invoke-truncated' || fixture === 'unk-default') {
    let bytes = gunzipSync(assets['unk_invoke.dat.gz']);
    if (fixture === 'unk-invoke-padding') bytes[bytes.length - 1] = 1;
    if (fixture === 'unk-invoke-truncated') bytes = bytes.slice(0, 152); // final class terminator missing
    if (fixture === 'unk-default') bytes[12] = 'X'.charCodeAt(0); // DEFAULT -> DEFAULX, same length
    state.replacements['unk_invoke.dat.gz'] = gzipSync(bytes);
  }
  if (fixture === 'unk-unpadded') {
    replaceUnknownMap(rawUnknownMap.slice(0, 252));
    state.replacements['unk_invoke.dat.gz'] = gzipSync(gunzipSync(assets['unk_invoke.dat.gz']).slice(0, 153));
    state.replacements['unk.dat.gz'] = gzipSync(gunzipSync(assets['unk.dat.gz']).slice(0, 400));
  }
  if (fixture === 'maps-reordered') {
    // Move the second entry before the first, without changing counts/targets
    // or the remaining real padding. Neither serialized map requires key order.
    for (const [name, raw] of [['tid_map.dat.gz', rawMap], ['unk_map.dat.gz', rawUnknownMap]]) {
      const view = new DataView(raw.buffer);
      const firstEnd = 12 + view.getInt32(8, true) * 4;
      const secondEnd = firstEnd + 8 + view.getInt32(firstEnd + 4, true) * 4;
      const bytes = raw.slice(); bytes.set(raw.slice(firstEnd, secondEnd), 4);
      bytes.set(raw.slice(4, firstEnd), 4 + secondEnd - firstEnd);
      state.replacements[name] = gzipSync(bytes);
    }
  }
  if (fixture === 'trie-unmapped') {
    const originalBase = new Int32Array(gunzipSync(assets['base.dat.gz']).buffer);
    const originalCheck = new Int32Array(gunzipSync(assets['check.dat.gz']).buffer);
    const base = new Int32Array(originalBase.length + 256); base.set(originalBase);
    const check = new Int32Array(originalCheck.length + 256); check.set(originalCheck);
    const trie = doublearray.load(base, check); let parent = 0;
    assert.equal(trie.lookup('セキュ'), -1);
    for (const byte of new TextEncoder().encode('セキュ')) parent = trie.traverse(parent, byte);
    assert.ok(parent > 0);
    const oldBase = base[parent], terminal = originalBase.length, moves = new Map();
    for (let code = 1; code < 256; code++) {
      if (check[oldBase + code] === parent) moves.set(oldBase + code, terminal + code);
    }
    for (let index = 0; index < originalCheck.length; index++) {
      if (moves.has(check[index])) check[index] = moves.get(check[index]);
    }
    for (const [oldChild, newChild] of moves) {
      base[newChild] = base[oldChild]; check[newChild] = parent; check[oldChild] = -1;
    }
    base[parent] = terminal; base[terminal] = -2147483647; check[terminal] = parent;
    assert.equal(trie.lookup('セキュ'), 2147483646);
    assert.equal(trie.lookup('セキュリティ'), doublearray.load(originalBase, originalCheck).lookup('セキュリティ'));
    state.replacements['base.dat.gz'] = gzipSync(new Uint8Array(base.buffer));
    state.replacements['check.dat.gz'] = gzipSync(new Uint8Array(check.buffer));
  }
  if (fixture === 'decoded') state.replacements = Object.fromEntries(Object.entries(assets).map(([name, bytes]) => [name, gunzipSync(bytes)]));
  if (fixture === 'offset') {
    state.replacements = Object.fromEntries(Object.entries(assets).map(([name, bytes]) => {
      const decoded = gunzipSync(bytes), allocation = new Uint8Array(decoded.length + 12);
      allocation.fill(0x7f); allocation.set(decoded, 7);
      return [name, allocation.subarray(7, 7 + decoded.length)];
    }));
  }
  const healthy = ['healthy', 'decoded', 'offset', 'maps-reordered', 'unk-unpadded', 'map-unpadded', 'runtime'].includes(fixture);
  const first = api.getTokenizer();
  const callers = Array.from({ length: 12 }, () => api.getTokenizer());
  callers.forEach(promise => assert.equal(promise, first));
  assert.equal(api.getTokenizerSync(), null);
  if (!healthy) {
    const failures = await Promise.allSettled(callers);
    assert.ok(failures.every(result => result.status === 'rejected'));
    assert.equal(api.getTokenizerSync(), null);
    assert.equal(state.reads.length, 12);
    state.missing = null; state.replacements = {};
    const retry = api.getTokenizer();
    assert.notEqual(retry, first);
    const retries = Array.from({ length: 12 }, () => api.getTokenizer());
    retries.forEach(promise => assert.equal(promise, retry));
    await Promise.all(retries);
    assert.equal(state.reads.length, 24);
  } else await Promise.all(callers);
  const tokenizer = api.getTokenizerSync();
  for (const word of ['日本語', '食べる', 'XYZ', '𠮷']) assert.equal(tokenizer.tokenize(word).map(token => token.surface_form).join(''), word);
  assert.equal(await api.generateFurigana('日本語'), 'にほんご');
  assert.equal(await api.generateFurigana('食べる'), 'たべる');
  const count = state.reads.length;
  assert.equal(await api.getTokenizer(), tokenizer);
  assert.equal(state.reads.length, count);
  if (fixture === 'runtime') {
    assert.throws(() => tokenizer.tokenize(null));
    assert.equal(api.getTokenizerSync(), tokenizer); // ordinary TypeErrors keep cache
    tokenizer.viterbi_searcher.connection_costs.buffer = new Int16Array([1316, 1316, 0]);
    assert.throws(() => tokenizer.tokenize('日本語'), error => error === 'ConnectionCosts buffer overflow');
    assert.equal(api.getTokenizerSync(), null);
    const replacement = await api.getTokenizer();
    assert.notEqual(replacement, tokenizer);
    assert.throws(() => tokenizer.tokenize('日本語'));
    assert.equal(api.getTokenizerSync(), replacement);
    assert.equal(state.reads.length, count + 12);
  }
  console.log(`PASS tokenizer ${branch}: ${fixture}, concurrency, retry/cache`);
}
run().catch(error => { console.error(error); process.exitCode = 1; });
