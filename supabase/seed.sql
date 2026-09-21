-- Default exercise library (PROJECT_SPEC.md §88).
-- Applied by `supabase db reset`. Clients cannot insert default exercises.

insert into public.exercises (name, muscle_group, equipment, is_default)
values
  -- Chest
  ('Bench Press', 'chest', 'barbell', true),
  ('Incline Bench Press', 'chest', 'barbell', true),
  ('Decline Bench Press', 'chest', 'barbell', true),
  ('Dumbbell Bench Press', 'chest', 'dumbbell', true),
  ('Incline Dumbbell Press', 'chest', 'dumbbell', true),
  ('Chest Fly', 'chest', 'dumbbell', true),
  ('Cable Fly', 'chest', 'cable', true),
  ('Push Up', 'chest', 'bodyweight', true),
  -- Back
  ('Deadlift', 'back', 'barbell', true),
  ('Barbell Row', 'back', 'barbell', true),
  ('Dumbbell Row', 'back', 'dumbbell', true),
  ('Lat Pulldown', 'back', 'cable', true),
  ('Pull Up', 'back', 'bodyweight', true),
  ('Seated Cable Row', 'back', 'cable', true),
  -- Shoulders
  ('Overhead Press', 'shoulders', 'barbell', true),
  ('Dumbbell Shoulder Press', 'shoulders', 'dumbbell', true),
  ('Lateral Raise', 'shoulders', 'dumbbell', true),
  ('Front Raise', 'shoulders', 'dumbbell', true),
  ('Rear Delt Fly', 'shoulders', 'dumbbell', true),
  -- Legs
  ('Back Squat', 'legs', 'barbell', true),
  ('Front Squat', 'legs', 'barbell', true),
  ('Leg Press', 'legs', 'machine', true),
  ('Romanian Deadlift', 'legs', 'barbell', true),
  ('Leg Extension', 'legs', 'machine', true),
  ('Leg Curl', 'legs', 'machine', true),
  ('Calf Raise', 'legs', 'machine', true),
  -- Arms
  ('Barbell Curl', 'arms', 'barbell', true),
  ('Dumbbell Curl', 'arms', 'dumbbell', true),
  ('Hammer Curl', 'arms', 'dumbbell', true),
  ('Tricep Pushdown', 'arms', 'cable', true),
  ('Skull Crusher', 'arms', 'barbell', true),
  ('Overhead Tricep Extension', 'arms', 'dumbbell', true),
  -- Core
  ('Plank', 'core', 'bodyweight', true),
  ('Crunch', 'core', 'bodyweight', true),
  ('Cable Crunch', 'core', 'cable', true),
  ('Hanging Leg Raise', 'core', 'bodyweight', true)
on conflict (name) do nothing;
