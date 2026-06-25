-- E&K Immobilier - Supabase schema
-- À exécuter dans Supabase Dashboard > SQL Editor.
-- Ce schéma garde les annonces et les demandes de visite dans PostgreSQL.

create table if not exists public.properties (
  id text primary key,
  name text not null,
  location text default '',
  price numeric default 0,
  bedrooms numeric default 0,
  bathrooms numeric default 0,
  area numeric default 0,
  description text default '',
  images jsonb not null default '[]'::jsonb,
  amenities jsonb not null default '[]'::jsonb,
  available boolean not null default true,
  available_from date,
  features jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id text primary key,
  property_id text not null references public.properties(id) on delete cascade,
  name text not null,
  email text not null,
  phone text default '',
  check_in_date date not null,
  check_out_date date not null,
  message text default '',
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists properties_set_updated_at on public.properties;
create trigger properties_set_updated_at
before update on public.properties
for each row execute function public.set_updated_at();

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

alter table public.properties enable row level security;
alter table public.bookings enable row level security;

-- Version simple pour GitHub Pages :
-- Les visiteurs peuvent lire les annonces, créer une demande, et lire leur statut.
-- L'admin actuel est encore côté frontend, donc les updates restent possibles avec la clé publique.
-- Pour une vraie sécurité pro, passer par un backend privé/Vercel avec service role.

drop policy if exists "public read properties" on public.properties;
create policy "public read properties"
on public.properties
for select
to anon
using (true);

drop policy if exists "public write properties" on public.properties;
create policy "public write properties"
on public.properties
for all
to anon
using (true)
with check (true);

drop policy if exists "public insert bookings" on public.bookings;
create policy "public insert bookings"
on public.bookings
for insert
to anon
with check (true);

drop policy if exists "public read bookings" on public.bookings;
create policy "public read bookings"
on public.bookings
for select
to anon
using (true);

drop policy if exists "public update bookings" on public.bookings;
create policy "public update bookings"
on public.bookings
for update
to anon
using (true)
with check (true);
