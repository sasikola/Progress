import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const migrationPath = path.join(
  root,
  'supabase/migrations/20260921184500_init.sql',
);
const seedPath = path.join(root, 'supabase/seed.sql');
const clientPath = path.join(root, 'lib/supabase.ts');
const gitignorePath = path.join(root, '.gitignore');
const envExamplePath = path.join(root, '.env.example');

const sql = readFileSync(migrationPath, 'utf8');
const seed = readFileSync(seedPath, 'utf8');
const client = readFileSync(clientPath, 'utf8');
const gitignore = readFileSync(gitignorePath, 'utf8');
const envExample = readFileSync(envExamplePath, 'utf8');

const failures = [];

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

const tables = [
  'profiles',
  'exercises',
  'workouts',
  'workout_exercises',
  'sets',
  'body_measurements',
  'progress_photos',
];

for (const table of tables) {
  assert(
    new RegExp(`create table public\\.${table}\\b`, 'i').test(sql),
    `Missing table: ${table}`,
  );
  assert(
    new RegExp(
      `alter table public\\.${table}\\s+enable row level security`,
      'i',
    ).test(sql),
    `RLS not enabled on ${table}`,
  );
}

const foreignKeys = [
  ['profiles', 'references auth.users'],
  ['workouts', 'references auth.users'],
  ['body_measurements', 'references auth.users'],
  ['progress_photos', 'references auth.users'],
  ['workout_exercises', 'references public.workouts'],
  ['workout_exercises', 'references public.exercises'],
  ['sets', 'references public.workout_exercises'],
];

for (const [table, fragment] of foreignKeys) {
  const tableBlock = sql.split(`create table public.${table}`)[1]?.split(
    'create table public.',
  )[0];
  assert(
    Boolean(tableBlock && tableBlock.includes(fragment)),
    `Missing FK on ${table}: ${fragment}`,
  );
}

const indexes = [
  'workouts_user_id_idx',
  'workouts_started_at_idx',
  'body_measurements_user_id_idx',
  'body_measurements_recorded_at_idx',
  'progress_photos_user_id_idx',
  'progress_photos_captured_at_idx',
  'workout_exercises_workout_id_idx',
  'sets_workout_exercise_id_idx',
];

for (const index of indexes) {
  assert(sql.includes(index), `Missing index: ${index}`);
}

assert(
  /on delete cascade/i.test(sql),
  'Expected ON DELETE CASCADE on user-owned child tables',
);

assert(
  sql.includes('auth.uid() = user_id') || sql.includes('auth.uid() = id'),
  'Expected auth.uid() ownership checks',
);

assert(
  /workouts\.user_id = auth\.uid\(\)/.test(sql),
  'workout_exercises policies must check parent workout ownership',
);

assert(
  /w\.user_id = auth\.uid\(\)/.test(sql),
  'sets policies must check ownership through workout_exercises -> workouts',
);

assert(
  !/create policy[\s\S]{0,200}on public\.exercises[\s\S]{0,80}for insert/i.test(
    sql,
  ),
  'exercises must not allow client inserts',
);

const photoPolicies = [
  'Users can view own progress photos',
  'Users can insert own progress photos',
  'Users can update own progress photos',
  'Users can delete own progress photos',
];

for (const policy of photoPolicies) {
  assert(sql.includes(policy), `Missing progress_photos policy: ${policy}`);
}

assert(
  /values \(\s*'progress-photos',\s*'progress-photos',\s*false/i.test(sql),
  'progress-photos bucket must be private (public = false)',
);

assert(
  !/bucket_id = 'progress-photos'[\s\S]{0,120}using \(true\)/.test(sql),
  'progress-photos storage must not allow public/open using(true)',
);

assert(
  /split_part\(name, '\/', 1\) = auth\.uid\(\)::text/.test(sql),
  'storage policies must match the first path segment to auth.uid()',
);

assert(
  !/to anon/.test(sql),
  'No table or storage policies should be granted to anon',
);

assert(
  /grant select on table public\.exercises to authenticated/.test(sql),
  'authenticated users need select on exercises',
);

const seedExercises = [
  'Bench Press',
  'Deadlift',
  'Overhead Press',
  'Back Squat',
  'Barbell Curl',
  'Plank',
];

for (const name of seedExercises) {
  assert(seed.includes(`'${name}'`), `Seed missing exercise: ${name}`);
}

assert(
  envExample.includes('EXPO_PUBLIC_SUPABASE_URL=') &&
    envExample.includes('EXPO_PUBLIC_SUPABASE_ANON_KEY='),
  '.env.example must list public Supabase credentials only',
);

assert(
  !/SERVICE_ROLE|service.role key\s*=/i.test(envExample),
  '.env.example must not include the service-role key',
);

assert(
  /^\.env$/m.test(gitignore) && gitignore.includes('.env.local'),
  '.gitignore must ignore .env and .env.local',
);

assert(
  client.includes('EXPO_PUBLIC_SUPABASE_ANON_KEY'),
  'client must read the anon key',
);

assert(
  client.includes('service_role'),
  'client must reject a service-role key',
);

assert(
  !/createClient\([^)]*SERVICE/i.test(client),
  'client must not construct with a service-role env var',
);

if (failures.length > 0) {
  console.error('Supabase foundation validation failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Supabase foundation validation passed.');
console.log(`Tables with RLS: ${tables.join(', ')}`);
console.log('progress-photos bucket is private.');
console.log('Child workout tables check parent ownership via auth.uid().');
