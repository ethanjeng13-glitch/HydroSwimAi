import { SwimStyle, ProfessionalBenchmark, WorkoutPreset } from './types';

export const PRO_BENCHMARKS: Record<SwimStyle, ProfessionalBenchmark> = {
  [SwimStyle.FREESTYLE]: {
    swimmerName: "Caleb Dressel",
    style: SwimStyle.FREESTYLE,
    avgLapTime50m: 21.0,
    avgStrokeRate: 55, 
    description: "Explosive power and high tempo."
  },
  [SwimStyle.BUTTERFLY]: {
    swimmerName: "Michael Phelps",
    style: SwimStyle.BUTTERFLY,
    avgLapTime50m: 24.5,
    avgStrokeRate: 48,
    description: "Rhythmic undulation and powerful kick."
  },
  [SwimStyle.BREASTSTROKE]: {
    swimmerName: "Adam Peaty",
    style: SwimStyle.BREASTSTROKE,
    avgLapTime50m: 26.0,
    avgStrokeRate: 58,
    description: "High turnover and massive pull strength."
  },
  [SwimStyle.BACKSTROKE]: {
    swimmerName: "Ryan Murphy",
    style: SwimStyle.BACKSTROKE,
    avgLapTime50m: 24.8,
    avgStrokeRate: 45,
    description: "Efficient rotation and underwater kicking."
  },
  [SwimStyle.INDIVIDUAL_MEDLEY]: {
    swimmerName: "Leon Marchand",
    style: SwimStyle.INDIVIDUAL_MEDLEY,
    avgLapTime50m: 28.5, // Approx avg pace for 200/400 IM WR
    avgStrokeRate: 50, // Blended average
    description: "Versatile mastery and elite underwaters."
  }
};

export const WORKOUT_PRESETS: WorkoutPreset[] = [
  // Freestyle
  { id: 'free-open', title: 'Open Freestyle', style: SwimStyle.FREESTYLE, color: 'text-blue-400' },
  { id: 'free-50', title: '50m Sprint', style: SwimStyle.FREESTYLE, distanceMeters: 50, color: 'text-blue-400' },
  { id: 'free-100', title: '100m Freestyle', style: SwimStyle.FREESTYLE, distanceMeters: 100, color: 'text-blue-400' },
  { id: 'free-200', title: '200m Freestyle', style: SwimStyle.FREESTYLE, distanceMeters: 200, color: 'text-blue-400' },
  { id: 'free-400', title: '400m Endurance', style: SwimStyle.FREESTYLE, distanceMeters: 400, color: 'text-blue-400' },
  { id: 'free-1500', title: '1500m Distance', style: SwimStyle.FREESTYLE, distanceMeters: 1500, color: 'text-blue-400' },
  
  // IM
  { id: 'im-200', title: '200m Medley', style: SwimStyle.INDIVIDUAL_MEDLEY, distanceMeters: 200, color: 'text-purple-400' },
  { id: 'im-400', title: '400m Medley', style: SwimStyle.INDIVIDUAL_MEDLEY, distanceMeters: 400, color: 'text-purple-400' },
  
  // Butterfly
  { id: 'fly-50', title: '50m Butterfly', style: SwimStyle.BUTTERFLY, distanceMeters: 50, color: 'text-orange-400' },
  { id: 'fly-100', title: '100m Butterfly', style: SwimStyle.BUTTERFLY, distanceMeters: 100, color: 'text-orange-400' },
  { id: 'fly-200', title: '200m Butterfly', style: SwimStyle.BUTTERFLY, distanceMeters: 200, color: 'text-orange-400' },
  
  // Backstroke
  { id: 'back-50', title: '50m Backstroke', style: SwimStyle.BACKSTROKE, distanceMeters: 50, color: 'text-cyan-400' },
  { id: 'back-100', title: '100m Backstroke', style: SwimStyle.BACKSTROKE, distanceMeters: 100, color: 'text-cyan-400' },
  { id: 'back-200', title: '200m Backstroke', style: SwimStyle.BACKSTROKE, distanceMeters: 200, color: 'text-cyan-400' },
  
  // Breaststroke
  { id: 'breast-50', title: '50m Breaststroke', style: SwimStyle.BREASTSTROKE, distanceMeters: 50, color: 'text-green-400' },
  { id: 'breast-100', title: '100m Breaststroke', style: SwimStyle.BREASTSTROKE, distanceMeters: 100, color: 'text-green-400' },
  { id: 'breast-200', title: '200m Breaststroke', style: SwimStyle.BREASTSTROKE, distanceMeters: 200, color: 'text-green-400' },
];

export const MOCK_SESSION_ID = "session_12345";