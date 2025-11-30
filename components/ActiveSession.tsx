import React, { useState, useEffect, useRef } from 'react';
import { SwimStyle, SessionData, LapData } from '../types';
import { Play, Square, Activity, Heart, Clock } from 'lucide-react';

interface ActiveSessionProps {
  style: SwimStyle;
  onEndSession: (data: SessionData) => void;
}

export const ActiveSession: React.FC<ActiveSessionProps> = ({ style, onEndSession }) => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [heartRate, setHeartRate] = useState(70);
  const [laps, setLaps] = useState<LapData[]>([]);
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setDuration(d => d + 1);
        
        // Simulate swimming physics
        if (duration % 2 === 0) {
            setDistance(dist => dist + 1.5); // Approx 1.5m/s pace
            setHeartRate(hr => Math.min(185, Math.max(110, hr + (Math.random() * 4 - 1.5))));
        }

        // Simulate completing a 50m lap every ~35 seconds
        if (duration > 0 && duration % 35 === 0) {
            const newLap: LapData = {
                lapNumber: laps.length + 1,
                timeSeconds: 35,
                strokeCount: Math.floor(Math.random() * (40 - 25) + 25),
                heartRate: Math.floor(heartRate),
                swolf: 0 // calculated later
            };
            newLap.swolf = newLap.timeSeconds + newLap.strokeCount;
            setLaps(prev => [...prev, newLap]);
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, duration, heartRate, laps.length]);

  const handleToggle = () => {
    if (isActive) {
      // End Session
      setIsActive(false);
      const sessionData: SessionData = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        style,
        totalDistanceMeters: Math.floor(distance),
        totalTimeSeconds: duration,
        caloriesBurned: Math.floor(duration * 0.15),
        laps: laps,
        averageHeartRate: Math.floor(laps.reduce((acc, l) => acc + l.heartRate, 0) / (laps.length || 1)) || Math.floor(heartRate)
      };
      onEndSession(sessionData);
    } else {
      setIsActive(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 p-4 text-orange-500 font-sans select-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">{style}</span>
        <div className="text-xs text-green-400 font-mono animate-pulse">{isActive ? 'LIVE' : 'READY'}</div>
      </div>

      {/* Main Metrics */}
      <div className="flex-1 flex flex-col gap-1">
        
        {/* Distance - Hero Metric */}
        <div className="flex flex-col">
            <span className="text-6xl font-bold text-white mono tabular-nums leading-none">
                {Math.floor(distance)}
            </span>
            <span className="text-xl font-medium text-orange-500">METERS</span>
        </div>

        <div className="h-px bg-slate-800 my-4" />

        {/* Secondary Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
                <div className="flex items-center gap-1 text-slate-400 mb-1">
                    <Heart size={14} className="text-red-500 fill-current" />
                    <span className="text-xs">BPM</span>
                </div>
                <span className="text-2xl font-bold text-white mono">{Math.floor(heartRate)}</span>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-1 text-slate-400 mb-1">
                    <Clock size={14} />
                    <span className="text-xs">TIME</span>
                </div>
                <span className="text-2xl font-bold text-white mono">{formatTime(duration)}</span>
            </div>
             <div className="flex flex-col">
                <div className="flex items-center gap-1 text-slate-400 mb-1">
                    <Activity size={14} />
                    <span className="text-xs">LAPS</span>
                </div>
                <span className="text-2xl font-bold text-white mono">{laps.length}</span>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-1 text-slate-400 mb-1">
                    <span className="text-xs">AVG PACE</span>
                </div>
                <span className="text-2xl font-bold text-white mono">1:45</span>
                <span className="text-[10px] text-slate-500">/100m</span>
            </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-auto pt-4">
        <button
          onClick={handleToggle}
          className={`w-full h-14 rounded-full flex items-center justify-center gap-2 font-bold text-lg transition-all ${
            isActive 
            ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
            : 'bg-yellow-500 text-black hover:bg-yellow-400'
          }`}
        >
          {isActive ? <Square fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} />}
          {isActive ? 'END' : 'START'}
        </button>
      </div>
    </div>
  );
};