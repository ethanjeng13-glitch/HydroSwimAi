import React, { useState } from 'react';
import { WatchFace } from './components/WatchFace';
import { ActiveSession } from './components/ActiveSession';
import { Analysis } from './components/Analysis';
import { Journal } from './components/Journal';
import { ViewState, SessionData, WorkoutPreset } from './types';
import { WORKOUT_PRESETS } from './constants';
import { Waves, PlayCircle, History, Settings, Trophy } from 'lucide-react';

const Dashboard: React.FC<{ onStart: (preset: WorkoutPreset) => void }> = ({ onStart }) => {
  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Fixed Header */}
      <div className="px-4 pt-4 pb-2 bg-slate-950/90 z-10 backdrop-blur-sm border-b border-white/5">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 italic">
          HYDRO<br/>SYNC
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-1">SELECT WORKOUT</p>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 pb-20 scrollbar-hide">
        {WORKOUT_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onStart(preset)}
            className="w-full p-4 bg-slate-900 hover:bg-slate-800 rounded-2xl flex items-center justify-between group transition-all border border-transparent hover:border-blue-500/30 shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${preset.color} group-hover:bg-white/10 transition-colors`}>
                <Waves size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-sm">{preset.title}</div>
                <div className="text-[10px] text-slate-500 uppercase font-mono">
                  {preset.distanceMeters ? `${preset.distanceMeters}M` : 'OPEN'} • {preset.style.split(' ')[0]}
                </div>
              </div>
            </div>
            <PlayCircle size={24} className="text-slate-600 group-hover:text-blue-500" />
          </button>
        ))}
      </div>

      {/* Bottom Nav Mock - Absolute to sit over scroll */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent flex justify-around items-end pb-4 text-slate-600 z-20 px-6">
        <button className="flex flex-col items-center gap-1 text-blue-500 transition-colors hover:text-blue-400">
            <Waves size={20} />
        </button>
        <button className="flex flex-col items-center gap-1 hover:text-slate-400 transition-colors">
            <History size={20} />
        </button>
        <button className="flex flex-col items-center gap-1 hover:text-slate-400 transition-colors">
            <Trophy size={20} />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [selectedPreset, setSelectedPreset] = useState<WorkoutPreset>(WORKOUT_PRESETS[0]);
  const [lastSession, setLastSession] = useState<SessionData | null>(null);

  const handleStartSession = (preset: WorkoutPreset) => {
    setSelectedPreset(preset);
    setView('ACTIVE_SWIM');
  };

  const handleEndSession = (data: SessionData) => {
    setLastSession(data);
    setView('ANALYSIS');
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-neutral-900 to-black">
      
      {/* Container for desktop layout presentation */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        
        {/* Marketing / Context Side (Desktop only) */}
        <div className="hidden lg:block max-w-md space-y-6">
            <h1 className="text-5xl font-bold text-white tracking-tighter">
                Train like <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">an Olympian.</span>
            </h1>
            <p className="text-slate-400 text-lg">
                HydroSync uses Gemini AI to analyze your stroke mechanics in real-time, comparing your telemetry against professional benchmarks.
            </p>
            <div className="flex gap-4">
                 <div className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 text-sm font-mono">React 18</div>
                 <div className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 text-sm font-mono">Gemini Flash 2.5</div>
                 <div className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 text-sm font-mono">Tailwind</div>
            </div>
        </div>

        {/* The App */}
        <WatchFace>
            {view === 'DASHBOARD' && <Dashboard onStart={handleStartSession} />}
            {view === 'ACTIVE_SWIM' && (
            <ActiveSession 
                workout={selectedPreset} 
                onEndSession={handleEndSession} 
            />
            )}
            {view === 'ANALYSIS' && lastSession && (
            <Analysis 
                session={lastSession} 
                onBack={() => setView('DASHBOARD')}
                onJournal={() => setView('JOURNAL')} 
            />
            )}
            {view === 'JOURNAL' && (
            <Journal 
                onComplete={() => setView('DASHBOARD')}
                onBack={() => setView('ANALYSIS')}
            />
            )}
        </WatchFace>

      </div>
    </div>
  );
}