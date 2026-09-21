-- Progress MVP schema, indexes, RLS, and private photo storage.
-- Source of truth: PROJECT_SPEC.md sections 31–47.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  date_of_birth date,
  height numeric,
  height_unit text not null default 'cm',
  goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_name_length_chk
    check (char_length(trim(name)) between 1 and 100),
  constraint profiles_height_unit_chk
    check (height_unit in ('cm', 'ft')),
  constraint profiles_goal_chk
    check (
      goal is null
      or goal in (
        'muscle_gain',
        'fat_loss',
        'strength',
        'general_fitness',
        'maintenance'
      )
    )
);

create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  muscle_group text,
  equipment text,
  is_default boolean not null default true,
  created_at timestamptz not null default now(),
  constraint exercises_name_unique unique (name)
);

create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  started_at timestamptz not null,
  completed_at timestamptz,
  duration_seconds integer,
  notes text,
  created_at timestamptz not null default now(),
  constraint workouts_name_length_chk
    check (char_length(trim(name)) between 1 and 100),
  constraint workouts_duration_chk
    check (duration_seconds is null or duration_seconds >= 0)
);

create table public.workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references public.workouts (id) on delete cascade,
  exercise_id uuid not null references public.exercises (id),
  order_index integer not null,
  created_at timestamptz not null default now(),
  constraint workout_exercises_order_chk
    check (order_index >= 0)
);

create table public.sets (
  id uuid primary key default gen_random_uuid(),
  workout_exercise_id uuid not null references public.workout_exercises (id) on delete cascade,
  set_number integer not null,
  weight numeric,
  weight_unit text not null default 'kg',
  reps integer,
  duration_seconds integer,
  is_warmup boolean not null default false,
  is_completed boolean not null default false,
  created_at timestamptz not null default now(),
  constraint sets_set_number_chk
    check (set_number >= 1),
  constraint sets_weight_chk
    check (weight is null or weight >= 0),
  constraint sets_reps_chk
    check (reps is null or reps >= 0),
  constraint sets_duration_chk
    check (duration_seconds is null or duration_seconds >= 0),
  constraint sets_weight_unit_chk
    check (weight_unit in ('kg', 'lb'))
);

create table public.body_measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  measurement_type text not null,
  value numeric not null,
  unit text not null,
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint body_measurements_type_chk
    check (
      measurement_type in (
        'weight',
        'waist',
        'chest',
        'arms',
        'thighs',
        'hips'
      )
    ),
  constraint body_measurements_value_chk
    check (value > 0),
  constraint body_measurements_unit_chk
    check (unit in ('kg', 'lb', 'cm', 'in'))
);

create table public.progress_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  photo_type text not null,
  storage_path text not null,
  captured_at timestamptz not null default now(),
  notes text,
  created_at timestamptz not null default now(),
  constraint progress_photos_type_chk
    check (photo_type in ('front', 'side', 'back', 'other')),
  constraint progress_photos_path_not_blank_chk
    check (char_length(trim(storage_path)) > 0)
);

-- ---------------------------------------------------------------------------
-- Indexes (PROJECT_SPEC.md §38)
-- ---------------------------------------------------------------------------

create index workouts_user_id_idx
  on public.workouts (user_id);

create index workouts_started_at_idx
  on public.workouts (user_id, started_at desc);

create index body_measurements_user_id_idx
  on public.body_measurements (user_id);

create index body_measurements_recorded_at_idx
  on public.body_measurements (user_id, recorded_at desc);

create index progress_photos_user_id_idx
  on public.progress_photos (user_id);

create index progress_photos_captured_at_idx
  on public.progress_photos (user_id, captured_at desc);

create index workout_exercises_workout_id_idx
  on public.workout_exercises (workout_id);

create index sets_workout_exercise_id_idx
  on public.sets (workout_exercise_id);

-- ---------------------------------------------------------------------------
-- updated_at
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute procedure public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Privileges: anon has no table access; authenticated is scoped by RLS.
-- ---------------------------------------------------------------------------

revoke all on table public.profiles from anon, public;
revoke all on table public.exercises from anon, public;
revoke all on table public.workouts from anon, public;
revoke all on table public.workout_exercises from anon, public;
revoke all on table public.sets from anon, public;
revoke all on table public.body_measurements from anon, public;
revoke all on table public.progress_photos from anon, public;

grant select, insert, update on table public.profiles to authenticated;
grant select on table public.exercises to authenticated;
grant select, insert, update, delete on table public.workouts to authenticated;
grant select, insert, update, delete on table public.workout_exercises to authenticated;
grant select, insert, update, delete on table public.sets to authenticated;
grant select, insert, update, delete on table public.body_measurements to authenticated;
grant select, insert, update, delete on table public.progress_photos to authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.exercises enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.sets enable row level security;
alter table public.body_measurements enable row level security;
alter table public.progress_photos enable row level security;

-- profiles
create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- exercises: authenticated read-only. No insert/update/delete for clients.
create policy "Authenticated users can view exercises"
on public.exercises
for select
to authenticated
using (true);

-- workouts
create policy "Users can view own workouts"
on public.workouts
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create own workouts"
on public.workouts
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own workouts"
on public.workouts
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own workouts"
on public.workouts
for delete
to authenticated
using (auth.uid() = user_id);

-- workout_exercises: ownership via parent workout. Never trust workout_id alone.
create policy "Users can view own workout exercises"
on public.workout_exercises
for select
to authenticated
using (
  exists (
    select 1
    from public.workouts
    where workouts.id = workout_exercises.workout_id
      and workouts.user_id = auth.uid()
  )
);

create policy "Users can insert own workout exercises"
on public.workout_exercises
for insert
to authenticated
with check (
  exists (
    select 1
    from public.workouts
    where workouts.id = workout_exercises.workout_id
      and workouts.user_id = auth.uid()
  )
);

create policy "Users can update own workout exercises"
on public.workout_exercises
for update
to authenticated
using (
  exists (
    select 1
    from public.workouts
    where workouts.id = workout_exercises.workout_id
      and workouts.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.workouts
    where workouts.id = workout_exercises.workout_id
      and workouts.user_id = auth.uid()
  )
);

create policy "Users can delete own workout exercises"
on public.workout_exercises
for delete
to authenticated
using (
  exists (
    select 1
    from public.workouts
    where workouts.id = workout_exercises.workout_id
      and workouts.user_id = auth.uid()
  )
);

-- sets: ownership via workout_exercises -> workouts
create policy "Users can view own sets"
on public.sets
for select
to authenticated
using (
  exists (
    select 1
    from public.workout_exercises we
    join public.workouts w on w.id = we.workout_id
    where we.id = sets.workout_exercise_id
      and w.user_id = auth.uid()
  )
);

create policy "Users can insert own sets"
on public.sets
for insert
to authenticated
with check (
  exists (
    select 1
    from public.workout_exercises we
    join public.workouts w on w.id = we.workout_id
    where we.id = sets.workout_exercise_id
      and w.user_id = auth.uid()
  )
);

create policy "Users can update own sets"
on public.sets
for update
to authenticated
using (
  exists (
    select 1
    from public.workout_exercises we
    join public.workouts w on w.id = we.workout_id
    where we.id = sets.workout_exercise_id
      and w.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.workout_exercises we
    join public.workouts w on w.id = we.workout_id
    where we.id = sets.workout_exercise_id
      and w.user_id = auth.uid()
  )
);

create policy "Users can delete own sets"
on public.sets
for delete
to authenticated
using (
  exists (
    select 1
    from public.workout_exercises we
    join public.workouts w on w.id = we.workout_id
    where we.id = sets.workout_exercise_id
      and w.user_id = auth.uid()
  )
);

-- body_measurements
create policy "Users can view own body measurements"
on public.body_measurements
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own body measurements"
on public.body_measurements
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own body measurements"
on public.body_measurements
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own body measurements"
on public.body_measurements
for delete
to authenticated
using (auth.uid() = user_id);

-- progress_photos (metadata only; files live in a private bucket)
create policy "Users can view own progress photos"
on public.progress_photos
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own progress photos"
on public.progress_photos
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own progress photos"
on public.progress_photos
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own progress photos"
on public.progress_photos
for delete
to authenticated
using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Private storage bucket: progress-photos
-- Path convention: {user_id}/{photo_id}.jpg
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'progress-photos',
  'progress-photos',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/webp']
);

create policy "Users can view own progress photo objects"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'progress-photos'
  and split_part(name, '/', 1) = auth.uid()::text
);

create policy "Users can upload own progress photo objects"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'progress-photos'
  and split_part(name, '/', 1) = auth.uid()::text
);

create policy "Users can update own progress photo objects"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'progress-photos'
  and split_part(name, '/', 1) = auth.uid()::text
)
with check (
  bucket_id = 'progress-photos'
  and split_part(name, '/', 1) = auth.uid()::text
);

create policy "Users can delete own progress photo objects"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'progress-photos'
  and split_part(name, '/', 1) = auth.uid()::text
);
