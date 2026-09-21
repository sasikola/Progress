export type FitnessGoal =
  | 'muscle_gain'
  | 'fat_loss'
  | 'strength'
  | 'general_fitness'
  | 'maintenance';

export type WeightUnit = 'kg' | 'lb';

export type HeightUnit = 'cm' | 'ft';

export type MeasurementUnit = 'cm' | 'in';

export type MeasurementType =
  | 'weight'
  | 'waist'
  | 'chest'
  | 'arms'
  | 'thighs'
  | 'hips';

export type PhotoType = 'front' | 'side' | 'back' | 'other';

export interface Exercise {
  id: string;
  name: string;
  muscle_group: string | null;
  equipment: string | null;
  is_default: boolean;
  created_at: string;
}

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

export interface BodyMeasurement {
  id: string;
  user_id: string;
  measurement_type: MeasurementType;
  value: number;
  unit: string;
  recorded_at: string;
  created_at: string;
}

export interface ProgressPhoto {
  id: string;
  user_id: string;
  photo_type: PhotoType;
  storage_path: string;
  captured_at: string;
  notes: string | null;
  created_at: string;
}
