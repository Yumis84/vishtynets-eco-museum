-- Draft schema for a dedicated museum Supabase project; review before applying.
create extension if not exists pgcrypto;
create table if not exists public.wall_works (
 id uuid primary key default gen_random_uuid(),
 author_name text not null default 'Гость музея' check (char_length(author_name) <= 80),
 caption text not null default '' check (char_length(caption) <= 2000),
 image_path text not null,
 status text not null default 'pending' check (status in ('pending','approved','rejected')),
 created_at timestamptz not null default now(),
 approved_at timestamptz
);
create table if not exists public.wall_likes (
 work_id uuid not null references public.wall_works(id) on delete cascade,
 voter_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key (work_id,voter_id)
);
create index if not exists wall_works_status_created_idx on public.wall_works(status,created_at desc);
alter table public.wall_works enable row level security;
alter table public.wall_likes enable row level security;
-- Only approved works are public. No public INSERT/UPDATE/DELETE policy for works.
create policy "Public read approved wall works" on public.wall_works for select to anon,authenticated using (status='approved');
create policy "Authenticated user sees own likes" on public.wall_likes for select to authenticated using (voter_id=auth.uid());
create policy "Authenticated user likes approved works" on public.wall_likes for insert to authenticated with check (voter_id=auth.uid() and exists(select 1 from public.wall_works w where w.id=work_id and w.status='approved'));
create policy "Authenticated user removes own like" on public.wall_likes for delete to authenticated using (voter_id=auth.uid());
-- Public read API should expose aggregated likes via a reviewed SECURITY INVOKER view or server endpoint.
-- Submission, storage upload, moderation, rate limiting and leader selection require server-side implementation.
