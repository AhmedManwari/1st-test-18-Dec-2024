create table if not exists vehicle_booking_requests (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  supervisor_id uuid references profiles(id),
  fleet_officer_id uuid references profiles(id),
  requested_start timestamptz not null,
  requested_end timestamptz not null,
  purpose text,
  status text not null
    check (status in ('draft', 'submitted', 'approved', 'rejected', 'assigned', 'completed')),
  availability_checked boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists vehicle_booking_assignments (
  id uuid primary key default gen_random_uuid(),
  booking_request_id uuid not null
    references vehicle_booking_requests(id) on delete cascade,
  vehicle_id uuid references vehicles(id),
  driver_id uuid references profiles(id),
  assigned_by uuid references profiles(id),
  assigned_at timestamptz not null default now()
);

create table if not exists vehicle_trip_logs (
  id uuid primary key default gen_random_uuid(),
  booking_request_id uuid not null
    references vehicle_booking_requests(id) on delete cascade,
  start_odometer numeric(10, 2),
  end_odometer numeric(10, 2),
  start_time timestamptz,
  end_time timestamptz,
  return_confirmed boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists vehicle_inspection_photos (
  id uuid primary key default gen_random_uuid(),
  booking_request_id uuid not null
    references vehicle_booking_requests(id) on delete cascade,
  inspection_phase text not null check (inspection_phase in ('before', 'after')),
  photo_url text not null,
  uploaded_at timestamptz not null default now()
);

create index if not exists vehicle_booking_requests_owner_id_idx
  on vehicle_booking_requests(owner_id);
create index if not exists vehicle_booking_requests_supervisor_id_idx
  on vehicle_booking_requests(supervisor_id);
create index if not exists vehicle_booking_assignments_booking_request_id_idx
  on vehicle_booking_assignments(booking_request_id);
create index if not exists vehicle_trip_logs_booking_request_id_idx
  on vehicle_trip_logs(booking_request_id);
