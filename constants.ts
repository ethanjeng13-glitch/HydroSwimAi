import { SwimStyle, ProfessionalBenchmark } from './types';

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
  }
};

export const MOCK_SESSION_ID = "session_12345";