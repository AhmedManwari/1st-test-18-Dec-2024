create table if not exists material_categories (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  category_id uuid references material_categories(id),
  name text not null,
  sku text,
  unit text,
  created_at timestamptz not null default now()
);

create table if not exists stock_locations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  name text not null,
  code text,
  created_at timestamptz not null default now()
);

create table if not exists stock_movements (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  material_id uuid not null references materials(id),
  location_id uuid not null references stock_locations(id),
  movement_type text not null check (movement_type in ('issue', 'receive')),
  quantity numeric(12, 2) not null,
  movement_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists inventory_balances (
  id uuid primary key default gen_random_uuid(),
  material_id uuid not null references materials(id),
  location_id uuid not null references stock_locations(id),
  quantity_on_hand numeric(12, 2) not null default 0,
  updated_at timestamptz not null default now(),
  unique (material_id, location_id)
);

create table if not exists purchase_requests (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  request_number text,
  status text not null check (status in ('draft', 'submitted', 'approved', 'rejected')),
  requested_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists purchase_request_lines (
  id uuid primary key default gen_random_uuid(),
  purchase_request_id uuid not null references purchase_requests(id) on delete cascade,
  material_id uuid references materials(id),
  description text,
  quantity numeric(12, 2) not null,
  created_at timestamptz not null default now()
);

create table if not exists purchase_orders (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  purchase_request_id uuid references purchase_requests(id),
  order_number text,
  status text not null check (status in ('draft', 'submitted', 'approved', 'rejected', 'received')),
  ordered_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists purchase_order_lines (
  id uuid primary key default gen_random_uuid(),
  purchase_order_id uuid not null references purchase_orders(id) on delete cascade,
  material_id uuid references materials(id),
  description text,
  quantity numeric(12, 2) not null,
  unit_price numeric(12, 2),
  created_at timestamptz not null default now()
);

create table if not exists goods_receipts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  purchase_order_id uuid not null references purchase_orders(id),
  status text not null check (status in ('draft', 'received', 'rejected')),
  received_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  registration_number text not null,
  make text,
  model text,
  status text not null check (status in ('active', 'inactive', 'maintenance')),
  created_at timestamptz not null default now()
);

create table if not exists vehicle_assignments (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id),
  assigned_to uuid not null references profiles(id),
  owner_id uuid not null references profiles(id),
  status text not null check (status in ('assigned', 'returned', 'cancelled')),
  assigned_at timestamptz not null default now(),
  returned_at timestamptz
);

create table if not exists vehicle_inspections (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id),
  inspector_id uuid not null references profiles(id),
  inspection_type text not null check (inspection_type in ('before', 'after')),
  status text not null check (status in ('draft', 'submitted', 'approved', 'rejected')),
  notes text,
  inspected_at timestamptz not null default now()
);

create table if not exists vehicle_returns (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id),
  assignment_id uuid references vehicle_assignments(id),
  returner_id uuid not null references profiles(id),
  status text not null check (status in ('draft', 'submitted', 'approved', 'rejected')),
  returned_at timestamptz not null default now(),
  notes text
);

create table if not exists leave_applications (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  leave_type text not null,
  start_date date not null,
  end_date date not null,
  status text not null check (status in ('draft', 'submitted', 'approved', 'rejected')),
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists leave_balances (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  leave_type text not null,
  balance numeric(12, 2) not null default 0,
  updated_at timestamptz not null default now(),
  unique (owner_id, leave_type)
);

create table if not exists attendance_logs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  log_type text not null check (log_type in ('in', 'out')),
  logged_at timestamptz not null default now()
);

create index if not exists materials_owner_id_idx on materials(owner_id);
create index if not exists material_categories_owner_id_idx on material_categories(owner_id);
create index if not exists stock_locations_owner_id_idx on stock_locations(owner_id);
create index if not exists stock_movements_owner_id_idx on stock_movements(owner_id);
create index if not exists purchase_requests_owner_id_idx on purchase_requests(owner_id);
create index if not exists purchase_orders_owner_id_idx on purchase_orders(owner_id);
create index if not exists goods_receipts_owner_id_idx on goods_receipts(owner_id);
create index if not exists vehicles_owner_id_idx on vehicles(owner_id);
create index if not exists vehicle_assignments_owner_id_idx on vehicle_assignments(owner_id);
create index if not exists vehicle_inspections_inspector_id_idx on vehicle_inspections(inspector_id);
create index if not exists vehicle_returns_returner_id_idx on vehicle_returns(returner_id);
create index if not exists leave_applications_owner_id_idx on leave_applications(owner_id);
create index if not exists attendance_logs_owner_id_idx on attendance_logs(owner_id);
