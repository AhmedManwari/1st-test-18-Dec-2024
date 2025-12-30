alter table leave_applications
  add column if not exists request_type text not null default 'annual_leave'
    check (request_type in ('short_leave', 'annual_leave', 'absent_from_work', 'early_exit')),
  add column if not exists requested_hours numeric(5, 2),
  add column if not exists approval_stage text
    check (approval_stage in ('supervisor', 'hr', 'manager', 'completed')),
  add column if not exists requires_hr_approval boolean not null default true,
  add column if not exists requires_manager_approval boolean not null default true,
  add column if not exists auto_deduct boolean not null default false,
  add column if not exists balance_checked boolean not null default false,
  add column if not exists calendar_event_id text;

create table if not exists leave_approvals (
  id uuid primary key default gen_random_uuid(),
  leave_application_id uuid not null references leave_applications(id) on delete cascade,
  approver_id uuid references profiles(id),
  approval_level text not null
    check (approval_level in ('supervisor', 'hr', 'manager', 'system')),
  status text not null check (status in ('pending', 'approved', 'rejected')),
  decided_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

alter table attendance_logs
  add column if not exists source text not null default 'manual'
    check (source in ('biometric', 'manual', 'imported')),
  add column if not exists linked_leave_application_id uuid references leave_applications(id);

create table if not exists attendance_exceptions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id),
  attendance_log_id uuid references attendance_logs(id),
  detected_on date not null,
  exception_type text not null
    check (exception_type in ('absent_from_work', 'early_exit')),
  status text not null check (status in ('detected', 'justified', 'rejected')),
  manager_id uuid references profiles(id),
  justification text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists leave_approvals_leave_application_id_idx
  on leave_approvals(leave_application_id);
create index if not exists attendance_exceptions_owner_id_idx
  on attendance_exceptions(owner_id);
