export enum SwimStyle {
  FREESTYLE = 'Freestyle',
  BUTTERFLY = 'Butterfly',
  BREASTSTROKE = 'Breaststroke',
  BACKSTROKE = 'Backstroke',
  INDIVIDUAL_MEDLEY = 'Individual Medley'
}

export interface LapData {
  lapNumber: number;
  timeSeconds: number;
  strokeCount: number;
  heartRate: number;
  swolf: number; // Stroke count + Time
}

export interface SessionData {
  id: string;
  date: string;
  style: SwimStyle;
  totalDistanceMeters: number;
  totalTimeSeconds: number;
  caloriesBurned: number;
  laps: LapData[];
  averageHeartRate: number;
  targetDistance?: number;
}

export interface ProfessionalBenchmark {
  swimmerName: string;
  style: SwimStyle;
  avgLapTime50m: number;
  avgStrokeRate: number; // strokes per minute
  description: string;
}

export interface JournalEntry {
  id: string;
  sessionId: string;
  mood: 'Great' | 'Good' | 'Tired' | 'Exhausted' | 'Injured';
  notes: string;
  aiFeedback?: string;
}

export interface WorkoutPreset {
  id: string;
  title: string;
  style: SwimStyle;
  distanceMeters?: number; // undefined means Open Swim
  color: string;
}

export type ViewState = 'DASHBOARD' | 'ACTIVE_SWIM' | 'ANALYSIS' | 'JOURNAL';