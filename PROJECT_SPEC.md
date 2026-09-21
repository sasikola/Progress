# Progress Fitness App — PROJECT_SPEC.md

**Version:** 1.0
**Status:** MVP Specification
**Product:** Progress
**Platform:** iOS-first mobile app
**Primary stack:** Expo + React Native + TypeScript + Supabase
**Development environment:** Cursor AI
**Architecture:** Mobile client + Supabase backend
**Primary goal:** Help gym users consistently track workouts and clearly see their physical and strength progress.

---

# 1. Product Overview

## 1.1 Product name

**Progress**

## 1.2 Product tagline

**Train. Track. Progress.**

## 1.3 Product vision

Progress is a simple fitness progress-tracking application designed around one question:

> **"Am I actually making progress?"**

The application allows users to:

* Log workouts
* Track exercises, sets, reps and weight
* Review workout history
* Track body weight and measurements
* Track personal records
* Take and organize progress photos
* Compare progress photos over time
* View meaningful progress statistics

The product is intentionally **not** a complete gym-management system, social network, nutrition tracker, AI coach, or trainer marketplace in the MVP.

---

# 2. Problem Statement

Many gym users train regularly but don't have a reliable way to understand whether they are progressing.

Common problems:

* Workout information is stored in Notes, spreadsheets or memory.
* Users forget previous weights and repetitions.
* Progress is difficult to visualize.
* Body measurements are inconsistently recorded.
* Progress photos are scattered across the phone gallery.
* Users don't have an easy way to compare progress over time.
* Existing fitness applications can feel overloaded with features.

Progress focuses on a simple loop:

```text
TRAIN
  ↓
TRACK
  ↓
COMPARE
  ↓
UNDERSTAND
  ↓
PROGRESS
```

---

# 3. Product Principles

## 3.1 Simple

The user should be able to start a workout within seconds.

## 3.2 Fast

Workout logging must require minimal interaction.

## 3.3 Progress-focused

The application should emphasize changes over time rather than merely recording data.

## 3.4 Private

Workout information and especially progress photos are private by default.

## 3.5 Mobile-first

The primary experience is designed for a smartphone.

## 3.6 No unnecessary complexity

Do not add features simply because competing fitness applications have them.

---

# 4. Target User

## Primary user

A gym/fitness user who:

* Works out regularly
* Wants to gain muscle, lose fat, improve strength or maintain fitness
* Wants to track workouts
* Wants to see measurable progress
* Uses a smartphone
* Doesn't want a complicated fitness-management application

Initial target:

* Age: approximately 18–40
* Beginner to intermediate gym users
* Individual consumers rather than gyms

---

# 5. MVP Goals

The MVP must prove the following hypothesis:

> Users will repeatedly log workouts and measurements when the application makes tracking fast and makes progress visually meaningful.

## MVP success signals

The MVP should allow a user to:

1. Create an account.
2. Complete basic onboarding.
3. Start a workout.
4. Select exercises.
5. Record sets.
6. Complete a workout.
7. View workout history.
8. View exercise history.
9. Track body weight.
10. Track measurements.
11. Record progress photos.
12. Compare progress photos.
13. View personal records.

---

# 6. Explicitly Out of Scope for MVP

Do NOT implement:

* AI personal trainer
* AI body-fat estimation
* AI physique analysis
* Nutrition tracking
* Calorie tracking
* Meal plans
* Supplement marketplace
* Social feed
* Followers
* Likes/comments
* Trainer marketplace
* Gym management
* Gym memberships
* Payments
* Subscriptions
* Apple Watch application
* Wearable integrations
* Android-specific optimization
* Chat
* Public profiles
* Community
* Challenges
* Workout marketplace
* Live coaching
* Push notification campaigns
* Advanced recommendation engine

These features may be considered after MVP validation.

---

# 7. Technology Stack

## Mobile

* React Native
* Expo
* TypeScript
* Expo Router

## Backend

* Supabase
* PostgreSQL
* Supabase Auth
* Supabase Storage

## Data fetching

* TanStack Query

## Forms

* React Hook Form
* Zod

## State

Prefer:

* Local React state for local UI state
* TanStack Query for server state

Do not introduce Redux unless a concrete requirement appears.

## Navigation

Expo Router.

## Styling

Use a centralized design system.

Do not scatter arbitrary colors, font sizes or spacing values throughout components.

## Testing

* Jest
* React Native Testing Library
* Expo-compatible testing tools
* E2E testing may be added later

---

# 8. Supported Units

MVP should support:

## Weight

* kg
* lb

Default:

**kg**

## Height

* cm
* ft/in

Default:

**cm**

## Measurements

Support:

* cm
* in

Default:

**cm**

All database values should have explicit units where necessary.

---

# 9. Application Navigation

Bottom tab navigation:

```text
Home
Workout
Progress
You
```

Routes:

```text
/(auth)
/(onboarding)
/(tabs)
```

---

# 10. Exact Screen List

## Authentication

### 01. Splash

Purpose:

* Load application.
* Determine authentication state.
* Route user appropriately.

States:

* Loading
* Authenticated
* Unauthenticated

No business logic beyond session initialization.

---

### 02. Welcome

Content:

```text
Progress

Train. Track. Progress.

Track your workouts.
See your progress.
Build consistency.

[ Get Started ]

[ Log In ]
```

---

### 03. Sign Up

Fields:

* Email
* Password
* Confirm password

Actions:

* Create account
* Navigate to login if already registered

Validation:

* Valid email
* Password minimum length
* Password confirmation matches

---

### 04. Login

Fields:

* Email
* Password

Actions:

* Log in
* Forgot password
* Create account

---

### 05. Forgot Password

Fields:

* Email

Action:

* Send reset email

---

# 11. Onboarding Screens

### 06. Basic Profile

Fields:

* Name
* Date of birth
* Height
* Height unit

---

### 07. Fitness Goal

Options:

* Build muscle
* Lose fat
* Improve strength
* General fitness
* Maintain

The goal is informational only in MVP.

Do not create automatic health recommendations from the goal.

---

### 08. Initial Weight

Fields:

* Current weight
* Weight unit

Optional.

---

### 09. Onboarding Complete

Display:

```text
You're ready.

Let's start tracking your progress.

[ Start ]
```

---

# 12. Home Screen

Purpose:

Provide a quick summary.

Example:

```text
Good evening, Alex

Your Progress

Weight
78.4 kg

Workouts
12 this month

Consistency
86%

Latest PR
Bench Press
70 kg × 6

[ Start Workout ]

Recent Workouts
----------------
Push Day
Sep 21

Pull Day
Sep 19

Leg Day
Sep 17
```

Components:

* Greeting
* Weight summary
* Workout count
* Consistency summary
* Latest PR
* Start Workout CTA
* Recent workouts

Empty state:

```text
Your progress starts here.

[ Start Your First Workout ]
```

---

# 13. Workout Screens

## 13.1 Start Workout

Options:

* Empty workout
* Recent workout/template reuse

MVP may initially support only:

**Start Empty Workout**

---

## 13.2 Exercise Picker

Features:

* Search
* Muscle group filter
* Exercise list

Example:

```text
Search exercises...

Chest
Back
Shoulders
Arms
Legs
Core

Bench Press
Incline Bench Press
Chest Fly
...
```

---

## 13.3 Active Workout

Example:

```text
Push Day

Duration
34:21

Bench Press

Set   Weight   Reps   Done
1     60 kg     8     ✓
2     60 kg     8     ✓
3     65 kg     6     ✓

[ + Add Set ]

Previous:
65 kg × 5

------------------

Incline Dumbbell Press

...

[ + Add Exercise ]

[ Finish Workout ]
```

Requirements:

* Add exercise
* Remove exercise
* Add set
* Edit weight
* Edit reps
* Mark set complete
* Delete set
* Reorder exercises
* View previous performance
* Finish workout

---

## 13.4 Finish Workout Confirmation

Display:

```text
Finish workout?

You've completed:

4 exercises
12 sets
38 minutes

[ Finish ]
[ Continue Workout ]
```

---

## 13.5 Workout Summary

Display:

```text
Workout Complete 🎉

Push Day

Duration
38 min

Exercises
4

Sets
12

Volume
8,450 kg

New PR
Bench Press
70 kg × 6

[ Done ]
```

PR section only appears when applicable.

---

# 14. Workout History

Display chronological list:

```text
Sep 21
Push Day
38 min · 4 exercises

Sep 19
Pull Day
42 min · 5 exercises

Sep 17
Leg Day
51 min · 5 exercises
```

Filters may be added later.

---

# 15. Workout Detail

Shows:

* Workout name
* Date
* Duration
* Exercises
* Sets
* Weight
* Reps
* Volume
* Notes

Workout detail is read-only in initial MVP.

---

# 16. Exercise History

Example:

```text
Bench Press

Current PR
70 kg × 6

Best Weight
70 kg

Total Volume
14,820 kg

Progress

[ Chart ]

History

Sep 21
70 × 6

Sep 18
67.5 × 7

Sep 15
65 × 8
```

Chart:

* X-axis = date
* Y-axis = weight

Allow switching between:

* Weight
* Volume
* Reps

If implementation becomes too complex, only Weight is required for MVP.

---

# 17. Progress Dashboard

Sections:

```text
Progress

Weight
78.4 kg

Measurements
View measurements

Strength
View exercise progress

Photos
View photo timeline

Personal Records
View PRs
```

The progress dashboard is the central place for all progress information.

---

# 18. Weight Tracking

Screen:

```text
Weight

Current
78.4 kg

Change
-2.6 kg

[ Add Weight ]

[ Chart ]
```

User can:

* Add weight
* View historical weight
* Delete an incorrect measurement

No automatic health interpretation.

---

# 19. Body Measurements

Supported measurements:

* Waist
* Chest
* Arms
* Thighs
* Hips

Screen:

```text
Body Measurements

Waist
82 cm

Chest
101 cm

Arms
36 cm

[ Add Measurement ]
```

Historical chart available for each measurement.

---

# 20. Progress Photos

This is a key feature.

## Photo Timeline

```text
Progress Photos

Sep 21, 2026

Front
Side
Back

Aug 21, 2026

Front
Side
Back

[ Add Progress Photos ]
```

---

# 21. Add Progress Photos

Photo types:

* Front
* Side
* Back
* Other

Camera flow:

```text
Select Type
    ↓
Camera
    ↓
Preview
    ↓
Retake / Use Photo
    ↓
Upload
```

Gallery selection may also be supported.

Camera permission must be handled gracefully.

---

# 22. Photo Comparison

User selects:

```text
Before:
January 1

After:
September 21
```

Then:

```text
┌──────────────────────────┐
│                          │
│       PHOTO COMPARE      │
│                          │
│   BEFORE | AFTER         │
│                          │
│      < slider >          │
│                          │
└──────────────────────────┘
```

The comparison component should support:

* Horizontal slider
* Same photo type
* Before/after dates
* Full-screen viewing

No automatic body transformation analysis in MVP.

---

# 23. Personal Records

Automatically derive records from workout data.

Records:

* Highest weight
* Highest reps at a weight
* Highest estimated 1RM if implemented

Initial MVP can simply define PR as:

> Highest completed weight for an exercise.

Example:

```text
Personal Records

Bench Press
70 kg

Squat
110 kg

Deadlift
140 kg
```

A PR should only use completed, non-warmup sets.

---

# 24. Profile Screen

Display:

* Name
* Email
* Goal
* Height
* Weight
* Units

Actions:

* Edit profile
* Units
* Privacy
* Logout

---

# 25. Settings

MVP settings:

* Weight unit
* Height unit
* Measurement unit
* Logout
* Delete account

Future:

* Notifications
* Subscription
* Export
* Apple Health
* Google Fit
* Wearables

---

# 26. User Flows

## New User

```text
Open App
 ↓
Welcome
 ↓
Sign Up
 ↓
Profile
 ↓
Goal
 ↓
Initial Weight (optional)
 ↓
Onboarding Complete
 ↓
Home
```

---

# 27. Returning User

```text
Open App
 ↓
Session Check
 ↓
Home
```

---

# 28. Workout Flow

```text
Home
 ↓
Start Workout
 ↓
Exercise Picker
 ↓
Select Exercise
 ↓
Active Workout
 ↓
Add Sets
 ↓
Add More Exercises
 ↓
Finish
 ↓
Confirmation
 ↓
Workout Summary
 ↓
Home
```

---

# 29. Progress Photo Flow

```text
Progress
 ↓
Photos
 ↓
Add Photos
 ↓
Select Type
 ↓
Camera / Gallery
 ↓
Preview
 ↓
Upload
 ↓
Photo Timeline
```

---

# 30. Comparison Flow

```text
Progress
 ↓
Photos
 ↓
Compare
 ↓
Select Before
 ↓
Select After
 ↓
Select Photo Type
 ↓
Comparison Viewer
```

---

# 31. Data Model

## profiles

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  date_of_birth date,
  height numeric,
  height_unit text default 'cm',
  goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Allowed goals:

```text
muscle_gain
fat_loss
strength
general_fitness
maintenance
```

---

# 32. exercises

```sql
create table exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  muscle_group text,
  equipment text,
  is_default boolean not null default true,
  created_at timestamptz not null default now()
);
```

Exercises are globally readable.

Only administrators/backend processes should create or modify default exercises in MVP.

---

# 33. workouts

```sql
create table workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  started_at timestamptz not null,
  completed_at timestamptz,
  duration_seconds integer,
  notes text,
  created_at timestamptz not null default now()
);
```

---

# 34. workout_exercises

```sql
create table workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references workouts(id) on delete cascade,
  exercise_id uuid not null references exercises(id),
  order_index integer not null,
  created_at timestamptz not null default now()
);
```

---

# 35. sets

```sql
create table sets (
  id uuid primary key default gen_random_uuid(),
  workout_exercise_id uuid not null references workout_exercises(id) on delete cascade,
  set_number integer not null,
  weight numeric,
  weight_unit text default 'kg',
  reps integer,
  duration_seconds integer,
  is_warmup boolean not null default false,
  is_completed boolean not null default false,
  created_at timestamptz not null default now()
);
```

---

# 36. body_measurements

```sql
create table body_measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  measurement_type text not null,
  value numeric not null,
  unit text not null,
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
```

Allowed types:

```text
weight
waist
chest
arms
thighs
hips
```

---

# 37. progress_photos

```sql
create table progress_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  photo_type text not null,
  storage_path text not null,
  captured_at timestamptz not null default now(),
  notes text,
  created_at timestamptz not null default now()
);
```

Allowed photo types:

```text
front
side
back
other
```

---

# 38. Database Indexes

Create indexes for common queries.

```sql
create index workouts_user_id_idx
on workouts(user_id);

create index workouts_started_at_idx
on workouts(user_id, started_at desc);

create index body_measurements_user_id_idx
on body_measurements(user_id);

create index body_measurements_recorded_at_idx
on body_measurements(user_id, recorded_at desc);

create index progress_photos_user_id_idx
on progress_photos(user_id);

create index progress_photos_captured_at_idx
on progress_photos(user_id, captured_at desc);

create index workout_exercises_workout_id_idx
on workout_exercises(workout_id);

create index sets_workout_exercise_id_idx
on sets(workout_exercise_id);
```

---

# 39. Supabase Row Level Security

RLS is mandatory.

Never rely only on client-side filtering.

Users must only access their own private data.

---

# 40. Profiles RLS

Enable RLS:

```sql
alter table profiles enable row level security;
```

Users can read their own profile:

```sql
create policy "Users can view own profile"
on profiles
for select
using (auth.uid() = id);
```

Users can insert their own profile:

```sql
create policy "Users can insert own profile"
on profiles
for insert
with check (auth.uid() = id);
```

Users can update their own profile:

```sql
create policy "Users can update own profile"
on profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);
```

---

# 41. Exercises RLS

Exercises are publicly readable to authenticated users.

```sql
alter table exercises enable row level security;

create policy "Authenticated users can view exercises"
on exercises
for select
to authenticated
using (true);
```

Do not expose arbitrary insert/update/delete permissions to normal users.

---

# 42. Workouts RLS

```sql
alter table workouts enable row level security;
```

Select:

```sql
create policy "Users can view own workouts"
on workouts
for select
using (auth.uid() = user_id);
```

Insert:

```sql
create policy "Users can create own workouts"
on workouts
for insert
with check (auth.uid() = user_id);
```

Update:

```sql
create policy "Users can update own workouts"
on workouts
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

Delete:

```sql
create policy "Users can delete own workouts"
on workouts
for delete
using (auth.uid() = user_id);
```

---

# 43. Workout Exercises RLS

Because workout_exercises does not directly contain user_id, policies should verify ownership through the parent workout.

Example:

```sql
create policy "Users can view own workout exercises"
on workout_exercises
for select
using (
  exists (
    select 1
    from workouts
    where workouts.id = workout_exercises.workout_id
    and workouts.user_id = auth.uid()
  )
);
```

Equivalent ownership checks must be applied to:

* INSERT
* UPDATE
* DELETE

Never trust a client-provided workout_id without checking ownership.

---

# 44. Sets RLS

Sets inherit ownership through:

```text
sets
 ↓
workout_exercises
 ↓
workouts
 ↓
user_id
```

Every operation must verify that the parent workout belongs to the authenticated user.

Example:

```sql
create policy "Users can view own sets"
on sets
for select
using (
  exists (
    select 1
    from workout_exercises we
    join workouts w on w.id = we.workout_id
    where we.id = sets.workout_exercise_id
    and w.user_id = auth.uid()
  )
);
```

Apply equivalent checks to:

* INSERT
* UPDATE
* DELETE

---

# 45. Body Measurement RLS

```sql
alter table body_measurements enable row level security;
```

All CRUD operations:

```sql
auth.uid() = user_id
```

---

# 46. Progress Photo RLS

```sql
alter table progress_photos enable row level security;
```

All CRUD operations:

```sql
auth.uid() = user_id
```

Photos are private by default.

---

# 47. Storage Security

Create a private storage bucket:

```text
progress-photos
```

Recommended path:

```text
{user_id}/{photo_id}.jpg
```

Storage policies must verify that the authenticated user's ID matches the first path segment.

Never create a public bucket for progress photos.

Never store photo URLs permanently in the database if they are signed URLs.

Store the storage path instead.

Generate temporary signed URLs when displaying private images.

---

# 48. TypeScript Types

Create:

```text
types/database.ts
types/domain.ts
```

Example:

```ts
export type FitnessGoal =
  | 'muscle_gain'
  | 'fat_loss'
  | 'strength'
  | 'general_fitness'
  | 'maintenance';

export type WeightUnit = 'kg' | 'lb';

export type HeightUnit = 'cm' | 'ft';

export type MeasurementType =
  | 'weight'
  | 'waist'
  | 'chest'
  | 'arms'
  | 'thighs'
  | 'hips';

export type PhotoType =
  | 'front'
  | 'side'
  | 'back'
  | 'other';
```

Exercise:

```ts
export interface Exercise {
  id: string;
  name: string;
  muscle_group: string | null;
  equipment: string | null;
  is_default: boolean;
  created_at: string;
}
```

Workout:

```ts
export interface Workout {
  id: string;
  user_id: string;
  name: string;
  started_at: string;
  completed_at: string | null;
  duration_seconds: number | null;
  notes: string | null;
  created_at: string;
}
```

Set:

```ts
export interface WorkoutSet {
  id: string;
  workout_exercise_id: string;
  set_number: number;
  weight: number | null;
  weight_unit: WeightUnit;
  reps: number | null;
  duration_seconds: number | null;
  is_warmup: boolean;
  is_completed: boolean;
  created_at: string;
}
```

Body measurement:

```ts
export interface BodyMeasurement {
  id: string;
  user_id: string;
  measurement_type: MeasurementType;
  value: number;
  unit: string;
  recorded_at: string;
  created_at: string;
}
```

Progress photo:

```ts
export interface ProgressPhoto {
  id: string;
  user_id: string;
  photo_type: PhotoType;
  storage_path: string;
  captured_at: string;
  notes: string | null;
  created_at: string;
}
```

---

# 49. Validation Rules

Use Zod.

## Sign Up

```text
email:
  valid email

password:
  minimum 8 characters

confirmPassword:
  must match password
```

## Weight

```text
value > 0
```

Reasonable UI validation may prevent obviously invalid values, but don't make medical assumptions.

## Reps

```text
integer >= 0
```

## Weight

```text
number >= 0
```

## Workout

Workout name:

```text
1–100 characters
```

---

# 50. Design System

The application should feel:

* Modern
* Calm
* Premium
* Fitness-focused
* Minimal
* Data-oriented

Avoid an overly aggressive bodybuilding aesthetic.

---

# 51. Color Tokens

Use semantic tokens rather than hardcoded colors.

Example:

```ts
export const colors = {
  background: '#0B0D10',
  surface: '#14171C',
  surfaceElevated: '#1B1F26',

  textPrimary: '#FFFFFF',
  textSecondary: '#A7ADB8',
  textMuted: '#6F7682',

  border: '#292E36',

  primary: '#FFFFFF',
  primaryText: '#0B0D10',

  success: '#35C759',
  warning: '#FFCC00',
  danger: '#FF453A',

  overlay: 'rgba(0,0,0,0.6)',
};
```

These are initial tokens and may be refined during visual design.

Do not scatter raw hex values through components.

---

# 52. Typography

Use a system font initially.

Hierarchy:

```text
Display
32–36 px
Bold

Heading
24–28 px
Bold

Section
18–20 px
Semibold

Body
16 px
Regular

Secondary
14 px

Caption
12 px
```

Prioritize readability.

---

# 53. Spacing

Use a spacing scale:

```ts
spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};
```

Avoid arbitrary values unless necessary.

---

# 54. Border Radius

Use:

```text
small: 8
medium: 12
large: 16
pill: 999
```

Cards should generally use 12–16px radius.

---

# 55. Buttons

Primary:

* High contrast
* Full width where appropriate
* 48–52px minimum touch height

Secondary:

* Subtle surface/background

Danger:

* Only for destructive actions

Every interactive control must have an accessible touch target.

---

# 56. Cards

Cards should communicate one concept.

Examples:

* Workout summary
* PR
* Weight
* Recent workout
* Progress photo

Avoid deeply nested cards.

---

# 57. Loading States

Never leave the screen blank.

Use:

* Skeletons
* Spinners
* Disabled buttons
* Loading labels

For example:

```text
Saving...
```

instead of allowing the user to repeatedly tap Save.

---

# 58. Empty States

Every list must have an intentional empty state.

Example:

```text
No workouts yet.

Start your first workout and your progress
will appear here.

[ Start Workout ]
```

---

# 59. Error Handling

Errors must be human-readable.

Bad:

```text
PostgrestError: 23505
```

Good:

```text
We couldn't save your workout.

Please check your connection and try again.
```

Developer logs may contain technical details.

Never expose secrets or database details to users.

---

# 60. Accessibility

MVP requirements:

* Accessible labels
* Sufficient contrast
* Dynamic text where practical
* Touch targets >= 44px
* Screen-reader-friendly buttons
* Do not communicate information using color alone

---

# 61. Privacy

Progress photos are sensitive.

Requirements:

* Private storage
* RLS
* Signed URLs
* No public photo URLs
* No photo indexing by search engines
* No public profiles
* No analytics containing image content
* User can delete photos
* User can delete account

Do not send progress photos to third-party AI services in MVP.

---

# 62. Account Deletion

The user must be able to request account deletion.

Deletion must eventually remove:

* Profile
* Workouts
* Workout exercises
* Sets
* Measurements
* Progress photo records
* Progress photo files

Use database cascades where safe.

Storage objects require explicit cleanup.

Do not leave orphaned private images.

---

# 63. Analytics

Analytics should not be implemented until the core product works.

When added, events may include:

```text
account_created
onboarding_completed
workout_started
workout_completed
exercise_added
set_completed
measurement_added
photo_added
photo_comparison_viewed
```

Do not collect unnecessary sensitive information.

Do not send photo contents to analytics systems.

---

# 64. Performance Requirements

The workout logging interface must feel instant.

Avoid unnecessary network requests.

During a workout:

* Prefer local state for active workout
* Persist safely
* Sync to backend when appropriate

The app should not require a network round trip for every single UI interaction.

Potential future feature:

**offline workout mode**

This is not required for MVP but architecture should not make it impossible.

---

# 65. Security Requirements

Never:

* Hardcode Supabase service-role keys
* Put secret API keys in the mobile application
* Trust client-provided user IDs
* Disable RLS for convenience
* Make progress photos public
* Store authentication tokens manually unless required by the SDK
* Log passwords
* Log private photo URLs
* Expose database errors directly to users

Environment variables:

```text
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY
```

Only public Supabase client credentials belong in the Expo client.

The Supabase service-role key must never be shipped to the application.

---

# 66. Environment Files

Use:

```text
.env
.env.example
```

`.env` must not be committed.

`.gitignore` must contain:

```text
.env
.env.local
```

`.env.example` should contain:

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

---

# 67. Folder Structure

Recommended:

```text
progress/
│
├── app/
│   ├── _layout.tsx
│   │
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   │
│   ├── (onboarding)/
│   │   ├── _layout.tsx
│   │   ├── profile.tsx
│   │   ├── goal.tsx
│   │   ├── weight.tsx
│   │   └── complete.tsx
│   │
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── workout.tsx
│   │   ├── progress.tsx
│   │   └── you.tsx
│   │
│   ├── workout/
│   │   ├── start.tsx
│   │   ├── exercises.tsx
│   │   ├── active.tsx
│   │   ├── finish.tsx
│   │   ├── summary.tsx
│   │   ├── history.tsx
│   │   └── [id].tsx
│   │
│   ├── exercise/
│   │   └── [id].tsx
│   │
│   ├── progress/
│   │   ├── photos.tsx
│   │   ├── add-photo.tsx
│   │   ├── compare.tsx
│   │   ├── weight.tsx
│   │   ├── measurements.tsx
│   │   └── records.tsx
│   │
│   └── settings/
│       ├── index.tsx
│       ├── profile.tsx
│       └── units.tsx
│
├── components/
│   ├── ui/
│   ├── workout/
│   ├── progress/
│   ├── photos/
│   └── charts/
│
├── features/
│   ├── auth/
│   ├── profile/
│   ├── workouts/
│   ├── exercises/
│   ├── measurements/
│   ├── photos/
│   └── records/
│
├── hooks/
│
├── lib/
│   ├── supabase.ts
│   ├── query-client.ts
│   ├── storage.ts
│   └── utils.ts
│
├── types/
│   ├── database.ts
│   └── domain.ts
│
├── constants/
│   ├── colors.ts
│   ├── spacing.ts
│   └── typography.ts
│
├── assets/
│
├── supabase/
│   ├── migrations/
│   └── seed.sql
│
├── tests/
│
├── .env.example
├── .gitignore
├── PROJECT_SPEC.md
├── package.json
└── README.md
```

---

# 68. Coding Conventions

## TypeScript

Use strict TypeScript.

Do not use:

```ts
any
```

unless absolutely unavoidable and documented.

Prefer:

```ts
unknown
```

with explicit narrowing.

---

# 69. Components

Components should generally have one clear responsibility.

Bad:

```text
WorkoutScreen.tsx
```

containing:

* API calls
* database queries
* workout calculations
* 500 lines of UI
* navigation
* validation

Prefer separation:

```text
WorkoutScreen
WorkoutExerciseCard
WorkoutSetRow
useWorkout
workoutService
workoutValidation
```

---

# 70. Naming

Components:

```text
PascalCase
```

Hooks:

```text
useSomething
```

Functions:

```text
camelCase
```

Constants:

```text
UPPER_SNAKE_CASE
```

Files:

Prefer consistent kebab-case or Expo conventions.

Do not mix naming styles randomly.

---

# 71. Data Access

Components should not contain raw Supabase queries whenever practical.

Prefer:

```text
feature
 ↓
hook
 ↓
service
 ↓
Supabase
```

Example:

```text
useWorkoutHistory()
    ↓
workoutService.getWorkoutHistory()
    ↓
supabase.from('workouts')
```

---

# 72. Business Logic

Keep calculations outside UI components.

Examples:

```text
calculateWorkoutVolume()
calculateWorkoutDuration()
calculatePersonalRecord()
calculateConsistency()
```

Place them in:

```text
features/*/utils
```

or:

```text
lib/
```

depending on ownership.

---

# 73. Personal Record Logic

For MVP:

```text
PR = highest completed non-warmup weight
```

Example:

```text
Bench Press

60 × 8
65 × 6
70 × 6
```

PR:

```text
70 kg
```

If:

```text
70 × 6
70 × 8
```

PR remains:

```text
70 kg
```

because MVP PR is weight-based.

Do not introduce complicated 1RM calculations unless explicitly required.

---

# 74. Volume Calculation

For standard weight/repetition sets:

```text
volume = weight × reps
```

Workout volume:

```text
sum(all completed non-warmup set volumes)
```

Only completed sets count.

---

# 75. Consistency Calculation

For MVP:

```text
consistency =
days_with_completed_workout / days_in_selected_period
```

The exact presentation can be simplified.

Do not present this as a health score.

It is simply a workout consistency metric.

---

# 76. Cursor AI Rules

Create:

```text
.cursor/rules/
```

with the following rules.

---

## Rule: General Development

```md
# General Development Rules

You are working on the Progress fitness application.

Stack:
- Expo
- React Native
- TypeScript
- Expo Router
- Supabase
- PostgreSQL
- TanStack Query
- React Hook Form
- Zod

Always inspect the existing project before changing code.

Do not rewrite unrelated files.

Do not introduce dependencies without explaining why they are required.

Prefer existing components and utilities.

Use strict TypeScript.

Do not use `any` unless absolutely necessary.

Keep components focused.

Separate UI, business logic and data access.

Never hardcode secrets.

Never use the Supabase service-role key in client code.

Never disable RLS to make a feature work.

Progress photos must remain private.
```

---

# 77. Cursor Rule: UI

```md
# UI Rules

Use the project's centralized design tokens.

Do not introduce arbitrary colors.

Do not introduce arbitrary spacing values unless necessary.

Use reusable UI components.

Interactive controls should have a minimum touch target of approximately 44px.

Every async operation needs:
- loading state
- success handling
- error handling

Every list needs an intentional empty state.

Avoid deeply nested cards.

Prioritize mobile usability.

Do not create desktop layouts unless specifically requested.
```

---

# 78. Cursor Rule: Supabase

```md
# Supabase Rules

All user-owned data must be protected with Row Level Security.

Never trust a client-provided user_id.

Use auth.uid() in RLS policies.

Progress photos must use a private storage bucket.

Never expose the Supabase service-role key to the mobile application.

Store storage paths, not permanent signed URLs.

Generate signed URLs when private images need to be displayed.

Any child table belonging to a user's workout must verify ownership through its parent relationship.

Do not bypass RLS from client code.
```

---

# 79. Cursor Rule: Database

```md
# Database Rules

Database migrations are the source of truth.

Do not manually modify production schema without a migration.

Every schema change must have a migration.

Use foreign keys.

Use ON DELETE CASCADE where appropriate for user-owned child data.

Add indexes for common user-scoped queries.

Use timestamps consistently.

Prefer timestamptz for timestamps.

Do not store derived values unless there is a clear performance requirement.
```

---

# 80. Cursor Rule: Security

```md
# Security Rules

Treat progress photos as sensitive private user data.

Never:
- log passwords
- log authentication tokens
- log private photo URLs
- expose database errors directly to users
- put secrets in source code
- disable RLS
- create public access to progress photos

Validate all user input.

Use Zod for client-side validation where appropriate.

Server/database constraints remain authoritative.
```

---

# 81. Cursor Rule: Product Scope

```md
# MVP Scope Rules

The MVP is intentionally small.

Do not implement:
- AI coach
- nutrition
- calorie tracking
- social feed
- trainer marketplace
- gym management
- subscriptions
- payments
- wearable integration
- Apple Watch
- chat
- public profiles
- community
- challenges

If a requested feature is outside MVP scope, explain that it belongs in the backlog rather than silently implementing it.
```

---

# 82. Cursor Rule: Before Coding

For significant tasks, Cursor should first:

1. Inspect relevant files.
2. Identify existing components.
3. Identify existing data access patterns.
4. Identify existing dependencies.
5. Explain planned changes.
6. Wait for approval when the change is large or architectural.

Do not regenerate the entire project.

---

# 83. Cursor Rule: After Coding

After completing a task, Cursor should provide:

```text
Changes made:
- ...

Files changed:
- ...

Tests:
- ...

Commands to run:
- ...

Potential issues:
- ...

Assumptions:
- ...
```

---

# 84. Git Strategy

Use small commits.

Example:

```text
feat: add Supabase authentication
feat: add onboarding flow
feat: add exercise library
feat: add workout logging
feat: add workout history
feat: add measurement tracking
feat: add progress photos
feat: add photo comparison
feat: add personal records
```

Avoid:

```text
feat: build entire app
```

---

# 85. MVP Acceptance Criteria

The MVP is complete only when all of the following work.

## Authentication

* [ ] User can create account
* [ ] User can log in
* [ ] User can log out
* [ ] User can reset password
* [ ] Authenticated session persists
* [ ] Unauthenticated users cannot access private screens

## Onboarding

* [ ] User can enter name
* [ ] User can enter height
* [ ] User can choose goal
* [ ] User can optionally enter weight
* [ ] Profile is persisted

## Workout

* [ ] User can start workout
* [ ] User can search exercises
* [ ] User can add exercise
* [ ] User can add sets
* [ ] User can edit sets
* [ ] User can delete sets
* [ ] User can mark sets complete
* [ ] User can finish workout
* [ ] Workout is persisted

## History

* [ ] User can see workout history
* [ ] User can open workout details
* [ ] User can see exercise history

## Progress

* [ ] User can record weight
* [ ] User can view weight history
* [ ] User can record measurements
* [ ] User can view measurement history
* [ ] User can see PRs

## Photos

* [ ] User can request camera permission
* [ ] User can take photo
* [ ] User can select photo from gallery
* [ ] User can categorize photo
* [ ] Photo uploads to private storage
* [ ] User can view own photos
* [ ] User can delete own photos
* [ ] User can compare two photos

## Security

* [ ] RLS enabled on all user-owned tables
* [ ] User cannot read another user's workouts
* [ ] User cannot modify another user's workouts
* [ ] User cannot access another user's photos
* [ ] Progress photo storage is private
* [ ] No service-role key in client bundle
* [ ] No secrets committed to Git

## UX

* [ ] Loading states exist
* [ ] Empty states exist
* [ ] Error states exist
* [ ] Buttons cannot be repeatedly submitted during async operations
* [ ] Keyboard does not obscure important inputs
* [ ] Basic accessibility labels exist
* [ ] App works on a current iPhone

---

# 86. Definition of Done

A feature is not considered complete merely because it renders.

A feature is done when:

1. UI works.
2. Data persists.
3. Loading state exists.
4. Error handling exists.
5. Empty state exists where applicable.
6. Validation exists.
7. RLS/security is correct.
8. TypeScript has no avoidable errors.
9. Tests exist for important business logic.
10. Existing functionality still works.
11. No unrelated files were unnecessarily changed.

---

# 87. Development Order

Build in this exact general order.

## Phase 1

Project setup

```text
Expo
TypeScript
Router
Theme
Supabase
Environment variables
```

## Phase 2

Authentication

```text
Welcome
Signup
Login
Forgot password
Session handling
```

## Phase 3

Onboarding

```text
Profile
Goal
Weight
Complete
```

## Phase 4

Exercises

```text
Exercise database
Exercise picker
Search
```

## Phase 5

Workout engine

```text
Start
Add exercise
Add sets
Edit sets
Complete
Summary
```

## Phase 6

History

```text
Workout history
Workout detail
Exercise history
```

## Phase 7

Progress

```text
Weight
Measurements
Charts
PRs
```

## Phase 8

Photos

```text
Camera
Gallery
Upload
Timeline
Comparison
```

## Phase 9

Polish

```text
Loading
Errors
Empty states
Animations
Accessibility
Performance
```

## Phase 10

Testing

```text
Unit
Integration
E2E
Security
```

---

# 88. Initial Exercise Seed Data

Create a basic exercise library.

Examples:

## Chest

```text
Bench Press
Incline Bench Press
Decline Bench Press
Dumbbell Bench Press
Incline Dumbbell Press
Chest Fly
Cable Fly
Push Up
```

## Back

```text
Deadlift
Barbell Row
Dumbbell Row
Lat Pulldown
Pull Up
Seated Cable Row
```

## Shoulders

```text
Overhead Press
Dumbbell Shoulder Press
Lateral Raise
Front Raise
Rear Delt Fly
```

## Legs

```text
Back Squat
Front Squat
Leg Press
Romanian Deadlift
Leg Extension
Leg Curl
Calf Raise
```

## Arms

```text
Barbell Curl
Dumbbell Curl
Hammer Curl
Tricep Pushdown
Skull Crusher
Overhead Tricep Extension
```

## Core

```text
Plank
Crunch
Cable Crunch
Hanging Leg Raise
```

This list can grow later.

---

# 89. Future Roadmap

After MVP validation:

## V1.1

* Workout templates
* Repeat previous workout
* Rest timer
* Better charts
* Exercise notes
* Workout notes

## V1.2

* Voice workout logging
* Natural-language set entry
* Improved photo comparison
* Progress insights

## V2

* Trainer mode
* Client management
* Workout assignment
* Trainer dashboard

## V3

* Wearables
* Apple Health
* Advanced analytics
* Subscription
* Social/sharing features

Only build these based on user demand.

---

# 90. Product Metrics

After launch, track:

## Activation

Percentage of new users who complete their first workout.

## Workout completion

Percentage of started workouts that are completed.

## Retention

Users who return and log another workout.

## Weekly active users

Users who perform at least one meaningful action per week.

## Photo adoption

Percentage of active users who add at least one progress photo.

## Measurement adoption

Percentage of active users recording measurements.

## PR engagement

Percentage of users viewing personal records.

The most important early metric is:

> **Do users come back and log another workout?**

---

# 91. Product Hypothesis

Primary hypothesis:

> If workout logging is fast and progress is visualized clearly, gym users will return regularly to record workouts and monitor progress.

Secondary hypothesis:

> Progress photos and measurable strength trends will provide a stronger emotional feedback loop than workout history alone.

---

# 92. Important Product Constraint

Progress is a **tracking and visualization product**, not a medical device or medical advice platform.

The application should not:

* Diagnose conditions
* Estimate medical risk
* Make medical claims
* Provide individualized medical treatment
* Claim to accurately determine body fat from photographs
* Claim to diagnose physical problems

Fitness insights should be framed as informational.

---

# 93. Final Architecture Principle

Keep the first version boring.

The desired architecture is:

```text
React Native
      ↓
Feature hooks
      ↓
Service layer
      ↓
Supabase
      ↓
PostgreSQL
      +
Private Storage
```

Not:

```text
React Native
 ↓
5 state libraries
 ↓
3 API abstraction layers
 ↓
microservices
 ↓
AI service
 ↓
event bus
 ↓
12 databases
```

The MVP should be understandable by one developer.

---

# 94. First Development Task

When starting the project in Cursor, do NOT ask Cursor to build the entire app.

First ask it to:

1. Inspect the current repository.
2. Initialize or verify Expo + TypeScript.
3. Configure Expo Router.
4. Configure Supabase client.
5. Configure environment variables.
6. Create the basic folder structure.
7. Create the design tokens.
8. Create the root navigation structure.
9. Create placeholder screens.
10. Verify the application builds.

Only after that should feature development begin.

---

# 95. First Milestone

The first milestone is:

```text
App opens
   ↓
Welcome
   ↓
Sign Up
   ↓
Login
   ↓
Onboarding
   ↓
Home
   ↓
Start Workout
   ↓
Select Bench Press
   ↓
Log:
60 × 8
60 × 8
65 × 6
   ↓
Finish Workout
   ↓
Workout Summary
   ↓
History
```

Once this works reliably, build the progress system.

---

# 96. Final Instruction to Cursor

When uncertain about implementation:

> Prefer the simplest implementation that satisfies the requirements in this document.

When requirements conflict:

> Preserve security, data integrity and existing functionality before adding convenience.

When a feature is not specified:

> Do not invent complex behavior. Ask for clarification or choose the simplest reasonable behavior.

When a requested feature is outside MVP:

> Identify it as out of scope and do not implement it unless explicitly approved.

**PROJECT_SPEC.md is the source of truth for the Progress MVP.**
