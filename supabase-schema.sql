-- ============================================================
-- KANJI SRS — SUPABASE VERİTABANI ŞEMASI
-- ============================================================
-- Bu SQL'i Supabase projende "SQL Editor" sekmesine yapıştırıp
-- "Run" butonuna basman yeterli. Tabloyu ve güvenlik kurallarını
-- otomatik kurar.
-- ============================================================

-- Tek bir tablo: her "giriş kodu" (device_code) için tüm uygulama
-- durumu (desteler, kartlar, ayarlar, istatistik) tek bir JSON
-- satırı olarak saklanır. Basit ve senkron için yeterli.

create table if not exists app_state (
  code text primary key,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

-- Herkesin (anon key ile) kendi kodunu okuyup yazabilmesi için.
-- Not: Bu basit bir "paylaşılan kod = paylaşılan veri" modelidir;
-- şifre değildir, sadece cihazları birbirine bağlamak içindir.
-- Kodunu kimseyle paylaşma.

alter table app_state enable row level security;

create policy "anyone can read app_state"
  on app_state for select
  using (true);

create policy "anyone can insert app_state"
  on app_state for insert
  with check (true);

create policy "anyone can update app_state"
  on app_state for update
  using (true);

-- Otomatik updated_at güncellemesi
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_app_state_updated_at
  before update on app_state
  for each row
  execute function set_updated_at();
