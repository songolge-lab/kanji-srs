const assert = require('node:assert/strict');
const { gzipSync, gunzipSync } = require('fflate');
const { createHarness, dictionaryTransport } = require('./harness.cjs');

async function run() {
  const branch = process.argv[2] || 'web';
  const fixture = process.argv[3] || 'healthy';
  const transport = dictionaryTransport(branch);
  const { state, assets } = transport;
  const api = await createHarness(transport.globals).load('src/utils/furiganaParser.js');
  const rawMap = gunzipSync(assets['tid_map.dat.gz']);
  const replaceMap = bytes => { state.replacements['tid_map.dat.gz'] = gzipSync(bytes); };
  if (fixture === 'missing') state.missing = 'cc.dat.gz';
  if (fixture === 'gzip') state.replacements['cc.dat.gz'] = new Uint8Array([31, 139, 8, 0, 0]);
  if (fixture === 'cc') state.replacements['cc.dat.gz'] = gzipSync(new Uint8Array(new Int16Array([1, 1, 0]).buffer));
  if (fixture === 'cc-truncated') state.replacements['cc.dat.gz'] = gzipSync(gunzipSync(assets['cc.dat.gz']).slice(0, 6));
  if (fixture === 'map-truncated') replaceMap(rawMap.slice(0, 3271064));
  if (fixture === 'map-partial') replaceMap(rawMap.slice(0, 4175475));
  if (fixture === 'map-target') {
    const bytes = rawMap.slice();
    new DataView(bytes.buffer).setInt32(12, 0x7ffffffa, true);
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
  if (fixture === 'decoded') state.replacements = Object.fromEntries(Object.entries(assets).map(([name, bytes]) => [name, gunzipSync(bytes)]));
  const healthy = ['healthy', 'decoded', 'runtime'].includes(fixture);
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
  for (const word of ['日本語', '食べる']) assert.equal(tokenizer.tokenize(word).map(token => token.surface_form).join(''), word);
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
