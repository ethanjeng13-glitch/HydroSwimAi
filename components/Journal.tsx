import React, { useState } from 'react';
import { analyzeJournalEntry } from '../services/geminiService';
import { Save, ArrowLeft, Mic } from 'lucide-react';

interface JournalProps {
  onComplete: () => void;
  onBack: () => void;
}

export const Journal: React.FC<JournalProps> = ({ onComplete, onBack }) => {
  const [mood, setMood] = useState<string>('Good');
  const [note, setNote] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = ['Great', 'Good', 'Tired', 'Sore', 'Injured'];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await analyzeJournalEntry(note, mood);
    setFeedback(result);
    setIsSubmitting(false);
  };

  if (feedback) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-950 text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400">
            <Save size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Saved!</h3>
        <p className="text-sm text-slate-400 mb-6">Your session has been added to your history.</p>
        
        <div className="bg-slate-900 p-4 rounded-xl border-l-4 border-blue-500 text-left mb-8">
            <h4 className="text-xs uppercase text-blue-400 font-bold mb-2">Recovery Tip</h4>
            <p className="text-sm text-slate-300 italic">"{feedback}"</p>
        </div>

        <button 
            onClick={onComplete}
            className="w-full py-3 bg-slate-800 text-white rounded-full font-medium hover:bg-slate-700"
        >
            Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 p-4">
       <div className="flex items-center gap-4 mb-6">
            <button onClick={onBack} className="p-2 bg-slate-900 rounded-full text-slate-400">
                <ArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-bold text-white">How did it feel?</h2>
       </div>

       {/* Mood Selector */}
       <div className="grid grid-cols-3 gap-2 mb-6">
            {moods.map(m => (
                <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        mood === m 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                >
                    {m}
                </button>
            ))}
       </div>

       {/* Text Input */}
       <div className="flex-1 mb-4 relative">
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Notes on technique, fatigue, or water feel..."
                className="w-full h-full bg-slate-900 rounded-2xl p-4 text-white placeholder:text-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
            <button className="absolute bottom-4 right-4 p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700">
                <Mic size={20} />
            </button>
       </div>

       <button
            onClick={handleSubmit}
            disabled={isSubmitting || !note}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                isSubmitting || !note 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-orange-500 text-white hover:bg-orange-400'
            }`}
       >
            {isSubmitting ? (
                <span>Analyzing...</span>
            ) : (
                <>
                    <Save size={18} />
                    <span>Save Entry</span>
                </>
            )}
       </button>
    </div>
  );
};