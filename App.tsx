import React, { useState } from 'react';
import { WatchFace } from './components/WatchFace';
import { ActiveSession } from './components/ActiveSession';
import { Analysis } from './components/Analysis';
import { Journal } from './components/Journal';
import { SwimStyle, ViewState, SessionData } from './types';
import { Waves, PlayCircle, History, Settings } from 'lucide-react';

const Dashboard: React.FC<{ onStart: (style: SwimStyle) => void }> = ({ onStart }) => {
  return (
    <div className="h-full flex flex-col bg-slate-950 p-4">
      <div className="mb-6 mt-2">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 italic">
          HYDRO<br/>SYNC
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-1">PRO-GRADE ANALYTICS</p>
      </div>

      <div className="flex-1 space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">New Session</div>
        
        {Object.values(SwimStyle).map((style) => (
          <button
            key={style}
            onClick={() => onStart(style)}
            className="w-full p-4 bg-slate-900 hover:bg-slate-800 rounded-2xl flex items-center justify-between group transition-all border border-transparent hover:border-blue-500/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Waves size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold text-white">{style}</div>
                <div className="text-[10px] text-slate-500">Pool • 50m</div>
              </div>
            </div>
            <PlayCircle size={24} className="text-slate-600 group-hover:text-blue-500" />
          </button>
        ))}
      </div>

      {/* Bottom Nav Mock */}
      <div className="mt-4 pt-4 border-t border-slate-900 flex justify-around text-slate-600">
        <button className="flex flex-col items-center gap-1 text-blue-500">
            <Waves size={20} />
        </button>
        <button className="flex flex-col items-center gap-1 hover:text-slate-400">
            <History size={20} />
        </button>
        <button className="flex flex-col items-center gap-1 hover:text-slate-400">
            <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [selectedStyle, setSelectedStyle] = useState<SwimStyle>(SwimStyle.FREESTYLE);
  const [lastSession, setLastSession] = useState<SessionData | null>(null);

  const handleStartSession = (style: SwimStyle) => {
    setSelectedStyle(style);
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
            </div>
        </div>

        {/* The App */}
        <WatchFace>
            {view === 'DASHBOARD' && <Dashboard onStart={handleStartSession} />}
            {view === 'ACTIVE_SWIM' && (
            <ActiveSession 
                style={selectedStyle} 
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