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
  const lr = (s) => (s.stats?.lifetimeReviews || 0);
  return lr(remote) >= lr(local) ? remote : local;
}

export function generateSyncCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ─── COMMUNITY HUB ──────────────────────────────────────────────────
// This app uses sync_code for identity (no Supabase Auth), so author
// identification is passed explicitly rather than derived from a JWT.

const COMMUNITY_TABLE = 'community_decks';

export async function publishDeckToCommunity(deckData, title, description, tags) {
  try {
    if (!deckData || !title) throw new Error('Deste verisi ve başlık zorunludur');

    const syncCode = deckData.syncCode || '';
    if (!syncCode) throw new Error('Paylaşmak için sync kodu gerekli');

    const cards = Array.isArray(deckData.cards) ? deckData.cards : [];
    const payload = {
      author_sync_code: syncCode,
      author_name: deckData.authorName || 'Anonymous',
      title,
      description: description || '',
      tags: Array.isArray(tags) ? tags : [],
      deck_data: {
        // Mirror the local card schema (kanji/furigana/meaningTr/exampleJp/
        // exampleTr/exampleFuriganaMap) so a downloaded deck maps 1:1 back via
        // makeCard(). SRS state is intentionally stripped — downloaders start fresh.
        cards: cards.map(c => ({
          kanji: c.kanji || '',
          furigana: c.furigana || '',
          meaningTr: c.meaningTr || '',
          exampleJp: c.exampleJp || '',
          exampleTr: c.exampleTr || '',
          exampleFuriganaMap: c.exampleFuriganaMap || {},
        })),
      },
    };

    const res = await sbFetch(COMMUNITY_TABLE, {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`Deste paylaşma hatası: ${res.status} ${detail}`);
    }
    const rows = await res.json();
    return rows[0] || null;
  } catch (err) {
    console.error('[CommunityHub] publishDeck failed:', err);
    throw err;
  }
}

export async function fetchCommunityDecks(limit = 50, offset = 0) {
  try {
    const query = `${COMMUNITY_TABLE}?select=id,author_name,title,description,tags,downloads,created_at&order=created_at.desc&limit=${limit}&offset=${offset}`;
    const res = await sbFetch(query);
    if (!res.ok) throw new Error(`Topluluk desteleri alınamadı: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[CommunityHub] fetchDecks failed:', err);
    throw err;
  }
}

export async function fetchCommunityDeck(deckId) {
  try {
    const query = `${COMMUNITY_TABLE}?id=eq.${encodeURIComponent(deckId)}&select=*`;
    const res = await sbFetch(query);
    if (!res.ok) throw new Error(`Deste detayı alınamadı: ${res.status}`);
    const rows = await res.json();
    return rows[0] || null;
  } catch (err) {
    console.error('[CommunityHub] fetchDeck failed:', err);
    throw err;
  }
}

export async function incrementDownloadCount(deckId) {
  try {
    const res = await sbFetch('rpc/increment_download_count', {
      method: 'POST',
      body: JSON.stringify({ deck_id: deckId }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`İndirme sayacı hatası: ${res.status} ${detail}`);
    }
  } catch (err) {
    console.error('[CommunityHub] incrementDownload failed:', err);
    throw err;
  }
}
