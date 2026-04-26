-- Jamea Parent + Secure Auth Foundation
-- Apply in Supabase SQL editor or with the Supabase CLI.
-- This migration is additive and avoids dropping existing data.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'jamea_role') then
    create type public.jamea_role as enum ('parent', 'student', 'teacher', 'admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'course_approval_status') then
    create type public.course_approval_status as enum ('pending', 'approved', 'blocked');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key,
  email text,
  display_name text not null,
  role public.jamea_role not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_for_non_students check (role = 'student' or email is not null)
);

create table if not exists public.parent_children (
  id uuid primary key default gen_random_uuid(),
  parent_profile_id uuid not null references public.profiles(id) on delete cascade,
  child_profile_id uuid not null references public.profiles(id) on delete cascade,
  relationship_label text not null default 'guardian',
  created_at timestamptz not null default now(),
  unique (parent_profile_id, child_profile_id)
);

create table if not exists public.child_access_codes (
  id uuid primary key default gen_random_uuid(),
  child_profile_id uuid not null references public.profiles(id) on delete cascade,
  code_hash text not null unique,
  pin_hash text,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.course_approvals (
  id uuid primary key default gen_random_uuid(),
  parent_profile_id uuid not null references public.profiles(id) on delete cascade,
  child_profile_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null,
  status public.course_approval_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (parent_profile_id, child_profile_id, course_id)
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references public.profiles(id) on delete set null,
  target_profile_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.student_progress (
  student_code text primary key,
  child_profile_id uuid references public.profiles(id) on delete cascade,
  parent_profile_id uuid references public.profiles(id) on delete set null,
  progress jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.student_progress
  add column if not exists child_profile_id uuid references public.profiles(id) on delete cascade;

alter table public.student_progress
  add column if not exists parent_profile_id uuid references public.profiles(id) on delete set null;

alter table public.student_progress
  add column if not exists created_at timestamptz not null default now();

alter table public.student_progress
  add column if not exists updated_at timestamptz not null default now();

create unique index if not exists student_progress_child_profile_id_key
on public.student_progress(child_profile_id)
where child_profile_id is not null;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists course_approvals_set_updated_at on public.course_approvals;
create trigger course_approvals_set_updated_at
before update on public.course_approvals
for each row execute function public.set_updated_at();

drop trigger if exists student_progress_set_updated_at on public.student_progress;
create trigger student_progress_set_updated_at
before update on public.student_progress
for each row execute function public.set_updated_at();

create or replace function public.sha256_hex(input_text text)
returns text
language sql
immutable
as $$
  select encode(digest(upper(trim(coalesce(input_text, ''))), 'sha256'), 'hex');
$$;

create or replace function public.create_parent_profile(parent_email text, parent_display_name text default null)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  insert into public.profiles (id, email, display_name, role)
  values (
    auth.uid(),
    lower(trim(parent_email)),
    coalesce(nullif(trim(parent_display_name), ''), lower(trim(parent_email))),
    'parent'
  )
  on conflict (id) do update
    set email = excluded.email,
        display_name = excluded.display_name,
        role = 'parent',
        updated_at = now()
  returning * into profile;

  insert into public.audit_events (actor_profile_id, target_profile_id, event_type)
  values (profile.id, profile.id, 'parent_profile_upserted');

  return profile;
end;
$$;

create or replace function public.create_child_profile(child_display_name text, plain_code text)
returns table (
  child_profile_id uuid,
  display_name text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  parent_id uuid := auth.uid();
  child_id uuid := gen_random_uuid();
  clean_name text := coalesce(nullif(trim(child_display_name), ''), 'Student');
  code_digest text := public.sha256_hex(plain_code);
begin
  if parent_id is null then
    raise exception 'Authentication required';
  end if;

  if code_digest = public.sha256_hex('') then
    raise exception 'Access code required';
  end if;

  insert into public.profiles (id, email, display_name, role)
  values (child_id, null, clean_name, 'student');

  insert into public.parent_children (parent_profile_id, child_profile_id)
  values (parent_id, child_id);

  insert into public.child_access_codes (child_profile_id, code_hash)
  values (child_id, code_digest);

  insert into public.audit_events (actor_profile_id, target_profile_id, event_type)
  values (parent_id, child_id, 'child_profile_created');

  return query
  select child_id, clean_name, now();
end;
$$;

create or replace function public.verify_child_access_code(plain_code text)
returns table (
  child_profile_id uuid,
  display_name text,
  parent_profile_id uuid
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select p.id, p.display_name, pc.parent_profile_id
  from public.child_access_codes cac
  join public.profiles p on p.id = cac.child_profile_id
  join public.parent_children pc on pc.child_profile_id = p.id
  where cac.code_hash = public.sha256_hex(plain_code)
    and cac.revoked_at is null
    and (cac.expires_at is null or cac.expires_at > now())
    and p.role = 'student'
  limit 1;
end;
$$;

create or replace function public.list_my_children()
returns table (
  child_profile_id uuid,
  display_name text,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select p.id, p.display_name, p.created_at
  from public.parent_children pc
  join public.profiles p on p.id = pc.child_profile_id
  where pc.parent_profile_id = auth.uid()
  order by p.created_at desc;
$$;

alter table public.profiles enable row level security;
alter table public.parent_children enable row level security;
alter table public.child_access_codes enable row level security;
alter table public.course_approvals enable row level security;
alter table public.audit_events enable row level security;
alter table public.student_progress enable row level security;

drop policy if exists profiles_parent_reads_self_and_children on public.profiles;
create policy profiles_parent_reads_self_and_children
on public.profiles for select
using (
  id = auth.uid()
  or exists (
    select 1 from public.parent_children pc
    where pc.parent_profile_id = auth.uid()
      and pc.child_profile_id = profiles.id
  )
);

drop policy if exists profiles_parent_updates_self on public.profiles;
create policy profiles_parent_updates_self
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid() and role in ('parent', 'teacher', 'admin'));

drop policy if exists parent_children_parent_reads on public.parent_children;
create policy parent_children_parent_reads
on public.parent_children for select
using (parent_profile_id = auth.uid());

drop policy if exists course_approvals_parent_manages on public.course_approvals;
create policy course_approvals_parent_manages
on public.course_approvals for all
using (parent_profile_id = auth.uid())
with check (parent_profile_id = auth.uid());

drop policy if exists audit_events_parent_reads_own on public.audit_events;
create policy audit_events_parent_reads_own
on public.audit_events for select
using (actor_profile_id = auth.uid() or target_profile_id = auth.uid());

drop policy if exists student_progress_parent_reads_children on public.student_progress;
create policy student_progress_parent_reads_children
on public.student_progress for select
using (
  parent_profile_id = auth.uid()
  or exists (
    select 1 from public.parent_children pc
    where pc.parent_profile_id = auth.uid()
      and pc.child_profile_id = student_progress.child_profile_id
  )
);

drop policy if exists student_progress_parent_writes_children on public.student_progress;
create policy student_progress_parent_writes_children
on public.student_progress for insert
with check (
  parent_profile_id = auth.uid()
  or exists (
    select 1 from public.parent_children pc
    where pc.parent_profile_id = auth.uid()
      and pc.child_profile_id = student_progress.child_profile_id
  )
);

drop policy if exists student_progress_parent_updates_children on public.student_progress;
create policy student_progress_parent_updates_children
on public.student_progress for update
using (
  parent_profile_id = auth.uid()
  or exists (
    select 1 from public.parent_children pc
    where pc.parent_profile_id = auth.uid()
      and pc.child_profile_id = student_progress.child_profile_id
  )
)
with check (
  parent_profile_id = auth.uid()
  or exists (
    select 1 from public.parent_children pc
    where pc.parent_profile_id = auth.uid()
      and pc.child_profile_id = student_progress.child_profile_id
  )
);

-- Do not expose child_access_codes directly to anon/authenticated clients.
revoke all on public.child_access_codes from anon, authenticated;

grant execute on function public.create_parent_profile(text, text) to authenticated;
grant execute on function public.create_child_profile(text, text) to authenticated;
grant execute on function public.list_my_children() to authenticated;
grant execute on function public.verify_child_access_code(text) to anon, authenticated;
