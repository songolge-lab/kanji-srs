const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');

const root = path.resolve(__dirname, '../..');
const requireAtRoot = createRequire(path.join(root, 'package.json'));

// Execute production ES modules with the real installed CommonJS libraries,
// Vite import-meta values and controlled browser transports. No user storage.
function createHarness(globals = {}, options = {}) {
  const context = vm.createContext({
    console, setTimeout, clearTimeout, setInterval, clearInterval,
    Uint8Array, Int16Array, Int32Array, Uint32Array, ArrayBuffer, DataView,
    URL, Blob, TextEncoder, TextDecoder, ...globals,
  });
  const cache = new Map();
  function moduleFor(filename) {
    if (cache.has(filename)) return cache.get(filename);
    let module;
    if (filename.endsWith('.json') || filename.includes('node_modules')) {
      let value = filename.endsWith('.json')
        ? JSON.parse(fs.readFileSync(filename, 'utf8')) : requireAtRoot(filename);
      if (filename.endsWith('.json') && options.jsonValue) value = options.jsonValue(filename, value);
      const names = ['default', ...Object.keys(value).filter(key => key !== 'default')];
      module = new vm.SyntheticModule(names, function () {
        this.setExport('default', value);
        for (const key of names.slice(1)) this.setExport(key, value[key]);
      }, { context, identifier: filename });
    } else {
      const source = fs.readFileSync(filename, 'utf8') + (options.append?.[filename] || '');
      module = new vm.SourceTextModule(source, {
        context, identifier: filename,
        initializeImportMeta(meta) { meta.env = { BASE_URL: '/nested/' }; },
        async importModuleDynamically(specifier, parent) {
          const load = async () => {
            const child = resolve(specifier, parent.identifier);
            if (child.status === 'unlinked') await child.link(linker);
            if (child.status === 'linked') await child.evaluate();
            return child;
          };
          return options.dynamicImport ? options.dynamicImport(specifier, parent, load) : load();
        },
      });
    }
    cache.set(filename, module);
    return module;
  }
  function resolve(specifier, parent) {
    return moduleFor(specifier.startsWith('.')
      ? path.resolve(path.dirname(parent), specifier) : requireAtRoot.resolve(specifier));
  }
  const linker = (specifier, parent) => resolve(specifier, parent.identifier);
  async function load(relative) {
    const module = moduleFor(path.resolve(root, relative));
    if (module.status === 'unlinked') await module.link(linker);
    if (module.status === 'linked') await module.evaluate();
    return module.namespace;
  }
  return { load, context };
}

function dictionaryTransport(branch = 'web') {
  const assets = Object.fromEntries(fs.readdirSync(path.join(root, 'public/dict'))
    .filter(name => name.endsWith('.dat.gz'))
    .map(name => [name, new Uint8Array(fs.readFileSync(path.join(root, 'public/dict', name)))]));
  const state = { reads: [], replacements: {}, missing: null };
  function read(name) {
    state.reads.push(name);
    if (name === state.missing) throw new Error('Dict file not found: ' + name);
    return state.replacements[name] || assets[name];
  }
  const globals = branch === 'ipc' ? {
    window: { location: { protocol: 'file:' }, electronAPI: { readDict: async name => read(name) } },
    fetch() { throw new Error('IPC must not fetch'); },
  } : {
    window: { location: { protocol: 'https:' } },
    fetch: async url => {
      if (!url.startsWith('/nested/dict/')) throw new Error('Unexpected dictionary URL');
      const name = url.split('/').pop();
      if (name === state.missing) { state.reads.push(name); return { ok: false, status: 404, statusText: 'Not Found' }; }
      const bytes = read(name);
      return { ok: true, arrayBuffer: async () => bytes.slice().buffer };
    },
  };
  return { assets, state, globals };
}

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

module.exports = { root, createHarness, dictionaryTransport, deferred };
