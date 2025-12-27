create table if not exists profiles (
  id uuid primary key references auth.users(id),
  role text not null check (role in ('admin', 'rep'))
);

create table if not exists stages (
  name text primary key,
  display_order integer not null
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id),
  name text not null,
  email text,
  phone text,
  company text,
  title text,
  created_at timestamptz not null default now()
);

create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id),
  lead_id uuid references leads(id),
  name text not null,
  stage text not null references stages(name),
  amount numeric(12, 2),
  expected_close_date date,
  created_at timestamptz not null default now()
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id),
  opportunity_id uuid references opportunities(id),
  activity_type text not null,
  due_date timestamptz not null,
  notes text,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

insert into stages (name, display_order)
values
  ('Prospecting', 1),
  ('Qualified', 2),
  ('Proposal', 3),
  ('Negotiation', 4),
  ('Closed Won', 5),
  ('Closed Lost', 6)
on conflict (name) do nothing;

alter table profiles enable row level security;
alter table leads enable row level security;
alter table opportunities enable row level security;
alter table activities enable row level security;
alter table stages enable row level security;

create index if not exists leads_owner_id_idx on leads(owner_id);
create index if not exists opportunities_owner_id_idx on opportunities(owner_id);
create index if not exists activities_owner_id_idx on activities(owner_id);
