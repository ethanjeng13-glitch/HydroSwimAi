import React, { useEffect, useState } from 'react';
import { SessionData, ProfessionalBenchmark } from '../types';
import { PRO_BENCHMARKS } from '../constants';
import { analyzeSwimPerformance } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Award, Zap, ArrowLeft, Loader2, TrendingUp } from 'lucide-react';

interface AnalysisProps {
  session: SessionData;
  onBack: () => void;
  onJournal: () => void;
}

export const Analysis: React.FC<AnalysisProps> = ({ session, onBack, onJournal }) => {
  const benchmark = PRO_BENCHMARKS[session.style];
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Prepare chart data
  const chartData = session.laps.map(l => ({
    lap: l.lapNumber,
    swolf: l.swolf,
    hr: l.heartRate
  }));

  useEffect(() => {
    const fetchAnalysis = async () => {
      const result = await analyzeSwimPerformance(session, benchmark);
      setAnalysis(result.analysis);
      setTips(result.tips);
      setLoading(false);
    };
    fetchAnalysis();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avgLapTime = session.totalTimeSeconds / (session.laps.length || 1);
  const diff = avgLapTime - benchmark.avgLapTime50m;
  const isFaster = diff < 0;

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-y-auto">
        {/* Nav */}
        <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md p-4 border-b border-slate-800 flex justify-between items-center">
            <button onClick={onBack} className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white">
                <ArrowLeft size={18} />
            </button>
            <h2 className="text-white font-semibold">Summary</h2>
            <div className="w-8" />
        </div>

        <div className="p-4 space-y-6">
            {/* Top Level Comparison Card */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
                <div className="flex items-start gap-3">
                    <img 
                        src={`https://picsum.photos/seed/${benchmark.swimmerName}/100/100`} 
                        alt="Pro" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500"
                    />
                    <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">VS. PROFESSIONAL</div>
                        <div className="text-white font-bold text-lg leading-tight">{benchmark.swimmerName}</div>
                        <div className="text-xs text-slate-500">{benchmark.description}</div>
                    </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="bg-slate-950 p-3 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase">Pace Gap (50m)</div>
                        <div className={`text-xl font-bold mono ${isFaster ? 'text-green-400' : 'text-red-400'}`}>
                            {diff > 0 ? '+' : ''}{diff.toFixed(1)}s
                        </div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase">Stroke Efficiency</div>
                        <div className="text-xl font-bold text-white mono">86%</div>
                    </div>
                </div>
            </div>

            {/* AI Analysis */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-400">
                    <Zap size={18} fill="currentColor" />
                    <span className="font-bold text-sm uppercase tracking-wide">AI Coach Insight</span>
                </div>
                
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-500 gap-2">
                        <Loader2 className="animate-spin" />
                        <span className="text-xs">Analyzing telemetry...</span>
                    </div>
                ) : (
                    <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-4">
                        <p className="text-sm text-purple-100 leading-relaxed mb-4">
                            {analysis}
                        </p>
                        <div className="space-y-2">
                            {tips.map((tip, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[10px] font-bold text-purple-300">{idx + 1}</span>
                                    </div>
                                    <span className="text-xs text-slate-300">{tip}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Chart */}
            <div className="h-48 w-full bg-slate-900 rounded-2xl p-3 border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-400 font-bold uppercase">SWOLF Score</span>
                    <span className="text-[10px] text-slate-600">Lower is better</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="lap" hide />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        />
                        <Bar dataKey="swolf" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.swolf < 40 ? '#4ade80' : '#facc15'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* CTA */}
            <button 
                onClick={onJournal}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
                <TrendingUp size={18} />
                <span>Log in Journal</span>
            </button>
            <div className="h-8"/> 
        </div>
    </div>
  );
};