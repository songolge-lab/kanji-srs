import { sbFetch, SUPABASE_URL, SUPABASE_ANON_KEY, SYNC_TABLE } from './supabaseClient.js';

export function syncConfigured() {
  return SUPABASE_URL.indexOf('YOUR_PROJECT') === -1 &&
         SUPABASE_ANON_KEY.indexOf('YOUR_ANON_KEY') === -1;
}

export async function cloudPull(code) {
  const res = await sbFetch(`${SYNC_TABLE}?code=eq.${encodeURIComponent(code)}&select=*`);
  if (!res.ok) throw new Error('Sunucudan okuma hatası');
  const rows = await res.json();
  return rows[0] || null;
}

export async function cloudPush(code, stateObj) {
  const res = await sbFetch(`${SYNC_TABLE}?on_conflict=code`, {
    method: 'POST',
    headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({ code, state: stateObj }),
  });
  if (!res.ok) throw new Error('Sunucuya yazma hatası');
  const rows = await res.json();
  return rows[0] || null;
}

export function pickNewerState(local, remote) {
  if (!remote) return local;
  if (!local) return remote;
  const score = (s) => {
    let cards = 0, reviews = 0;
    for (const d of (s.decks || [])) cards += d.cards.length;
    for (const k in (s.stats?.reviewsByDate || {})) reviews += s.stats.reviewsByDate[k];
    return cards * 1000 + reviews;
  };
  return score(remote) >= score(local) ? remote : local;
}

export function generateSyncCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
