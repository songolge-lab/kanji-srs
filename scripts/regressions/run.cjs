// Combined validation entry point. Each real-dictionary case gets a fresh
// process so VM dictionary allocations cannot accumulate across fixtures.
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { root } = require('./harness.cjs');
const jobs = [];
for (const branch of ['web', 'ipc']) {
  for (const fixture of ['healthy', 'missing', 'gzip', 'cc', 'cc-truncated',
    'map-truncated', 'map-partial', 'map-target', 'map-trie', 'map-count', 'map-padding',
    'tid-padding', 'map-unpadded', 'decoded', 'offset', 'runtime',
    'unk-truncated', 'unk-partial', 'unk-count', 'unk-target', 'unk-key',
    'unk-padding', 'unk-record', 'unk-feature', 'unk-char', 'unk-compat',
    'unk-invoke-padding', 'unk-invoke-truncated', 'unk-default', 'unk-unpadded',
    'maps-reordered', 'trie-unmapped']) {
    jobs.push(['tokenizer.cjs', branch, fixture]);
  }
}
for (const concern of ['occurrences', 'unicode', 'language', 'turkish']) jobs.push([`${concern}.cjs`]);
for (const branch of ['web', 'ipc']) jobs.push(['unknown-neighbors.cjs', branch]);
let failed = 0;
for (const [script, ...args] of jobs) {
  const result = spawnSync(process.execPath, ['--experimental-vm-modules', '--no-warnings', path.join(__dirname, script), ...args], {
    cwd: root, encoding: 'utf8', maxBuffer: 2 * 1024 * 1024,
  });
  if (result.status !== 0 || result.error) {
    failed++;
    console.error(`FAIL ${script} ${args.join(' ')}\n${result.error || result.stderr || result.stdout}`);
  } else process.stdout.write(result.stdout);
}
console.log(`${jobs.length - failed}/${jobs.length} focused regression processes passed`);
process.exitCode = failed ? 1 : 0;
