-- ============================================================
-- EXCAVATION SITE — Supabase schema
-- SHARED Supabase project with Squeegeez (same Project URL + anon key).
-- Uses PREFIXED tables (exc_*) + a SEPARATE storage bucket ('excavation')
-- so it NEVER collides with Squeegeez's data.
--
-- Paste into the SAME Supabase project → SQL Editor → Run. Safe to re-run.
-- (Read the "Supabase sharing" section of BUILD-GUIDE.md first — there is a
--  real trade-off to understand before you commit to sharing one project.)
-- ============================================================

-- ---------- TABLES ----------
create table if not exists public.exc_folders (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  icon        text,
  sort_order  int  not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.exc_projects (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  description      text,
  category         text,
  folder_id        uuid references public.exc_folders(id) on delete set null,
  before_image_url text,
  after_image_url  text,
  sort_order       int  not null default 0,
  published        boolean not null default true,
  created_at       timestamptz not null default now()
);

create table if not exists public.exc_leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  service    text,
  message    text,
  created_at timestamptz not null default now()
);

create table if not exists public.exc_comparisons (
  id               uuid primary key default gen_random_uuid(),
  title            text,
  before_image_url text,
  after_image_url  text,
  sort_order       int  not null default 0,
  published        boolean not null default true,
  created_at       timestamptz not null default now()
);

-- ---------- ROW LEVEL SECURITY ----------
alter table public.exc_folders     enable row level security;
alter table public.exc_projects    enable row level security;
alter table public.exc_leads       enable row level security;
alter table public.exc_comparisons enable row level security;

-- folders: public reads published; admin does everything
drop policy if exists "exc_folders read"  on public.exc_folders;
create policy "exc_folders read"  on public.exc_folders for select using (published = true);
drop policy if exists "exc_folders admin" on public.exc_folders;
create policy "exc_folders admin" on public.exc_folders for all to authenticated using (true) with check (true);

-- projects
drop policy if exists "exc_projects read"  on public.exc_projects;
create policy "exc_projects read"  on public.exc_projects for select using (published = true);
drop policy if exists "exc_projects admin" on public.exc_projects;
create policy "exc_projects admin" on public.exc_projects for all to authenticated using (true) with check (true);

-- leads: anon can INSERT (public form), only admin can read
drop policy if exists "exc_leads insert" on public.exc_leads;
create policy "exc_leads insert" on public.exc_leads for insert to anon with check (true);
drop policy if exists "exc_leads admin"  on public.exc_leads;
create policy "exc_leads admin"  on public.exc_leads for all to authenticated using (true) with check (true);

-- comparisons
drop policy if exists "exc_comparisons read"  on public.exc_comparisons;
create policy "exc_comparisons read"  on public.exc_comparisons for select using (published = true);
drop policy if exists "exc_comparisons admin" on public.exc_comparisons;
create policy "exc_comparisons admin" on public.exc_comparisons for all to authenticated using (true) with check (true);

-- ---------- STORAGE (separate bucket, does NOT touch Squeegeez's 'gallery') ----------
insert into storage.buckets (id, name, public)
values ('excavation', 'excavation', true)
on conflict (id) do nothing;

drop policy if exists "exc bucket read"   on storage.objects;
create policy "exc bucket read"   on storage.objects for select using (bucket_id = 'excavation');
drop policy if exists "exc bucket write"  on storage.objects;
create policy "exc bucket write"  on storage.objects for insert to authenticated with check (bucket_id = 'excavation');
drop policy if exists "exc bucket update" on storage.objects;
create policy "exc bucket update" on storage.objects for update to authenticated using (bucket_id = 'excavation') with check (bucket_id = 'excavation');
drop policy if exists "exc bucket delete" on storage.objects;
create policy "exc bucket delete" on storage.objects for delete to authenticated using (bucket_id = 'excavation');

-- ---------- SEED (placeholder services — edit later in the admin) ----------
insert into public.exc_folders (name, slug, description, sort_order) values
  ('Excavation & Site Prep', 'excavation-site-prep', 'Digging, hauling, and preparing sites for build.', 1),
  ('Land Clearing',          'land-clearing',        'Brush, stumps, and debris removal.',              2),
  ('Grading & Leveling',     'grading-leveling',     'Precise grading for drainage and foundations.',   3),
  ('Trenching',              'trenching',            'Utility, water, and drainage trenches.',          4),
  ('Demolition',             'demolition',           'Safe removal of structures and concrete.',        5),
  ('Drainage & Septic',      'drainage-septic',      'Drainage systems and septic installs.',           6)
on conflict (slug) do nothing;

-- Done. Copy the SAME Project URL + anon key you use for Squeegeez into the new
-- site's Vercel env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).
