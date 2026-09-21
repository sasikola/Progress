export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          date_of_birth: string | null;
          height: number | null;
          height_unit: HeightUnit;
          goal: FitnessGoal | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          date_of_birth?: string | null;
          height?: number | null;
          height_unit?: HeightUnit;
          goal?: FitnessGoal | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          date_of_birth?: string | null;
          height?: number | null;
          height_unit?: HeightUnit;
          goal?: FitnessGoal | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      exercises: {
        Row: {
          id: string;
          name: string;
          muscle_group: string | null;
          equipment: string | null;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          muscle_group?: string | null;
          equipment?: string | null;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          muscle_group?: string | null;
          equipment?: string | null;
          is_default?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      workouts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          started_at: string;
          completed_at: string | null;
          duration_seconds: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          started_at: string;
          completed_at?: string | null;
          duration_seconds?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          started_at?: string;
          completed_at?: string | null;
          duration_seconds?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      workout_exercises: {
        Row: {
          id: string;
          workout_id: string;
          exercise_id: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          workout_id: string;
          exercise_id: string;
          order_index: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          workout_id?: string;
          exercise_id?: string;
          order_index?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      sets: {
        Row: {
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
        };
        Insert: {
          id?: string;
          workout_exercise_id: string;
          set_number: number;
          weight?: number | null;
          weight_unit?: WeightUnit;
          reps?: number | null;
          duration_seconds?: number | null;
          is_warmup?: boolean;
          is_completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          workout_exercise_id?: string;
          set_number?: number;
          weight?: number | null;
          weight_unit?: WeightUnit;
          reps?: number | null;
          duration_seconds?: number | null;
          is_warmup?: boolean;
          is_completed?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      body_measurements: {
        Row: {
          id: string;
          user_id: string;
          measurement_type: MeasurementType;
          value: number;
          unit: string;
          recorded_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          measurement_type: MeasurementType;
          value: number;
          unit: string;
          recorded_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          measurement_type?: MeasurementType;
          value?: number;
          unit?: string;
          recorded_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      progress_photos: {
        Row: {
          id: string;
          user_id: string;
          photo_type: PhotoType;
          storage_path: string;
          captured_at: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          photo_type: PhotoType;
          storage_path: string;
          captured_at?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          photo_type?: PhotoType;
          storage_path?: string;
          captured_at?: string;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      fitness_goal: FitnessGoal;
      weight_unit: WeightUnit;
      height_unit: HeightUnit;
      measurement_type: MeasurementType;
      photo_type: PhotoType;
    };
    CompositeTypes: Record<string, never>;
  };
}
