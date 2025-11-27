import React, { useState, useEffect } from 'react';
import { Participant, Match } from './types';
import { ParticipantInput } from './components/ParticipantInput';
import { Button } from './components/Button';
import { ResultCard } from './components/ResultCard';
import { translations, LanguageCode } from './translations';

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [gameState, setGameState] = useState<'INPUT' | 'RESULT'>('INPUT');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lang, setLang] = useState<LanguageCode>('en');

  const t = translations[lang];

  // Load participants from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('participants');
    if (saved) {
      setParticipants(JSON.parse(saved));
    }
    
    // Attempt to detect browser language if valid
    const browserLang = navigator.language.split('-')[0] as LanguageCode;
    if (translations[browserLang]) {
        // We stick to 'en' default as requested, but could enable auto-detect here.
        // setLang(browserLang);
    }
  }, []);

  // Save participants when changed
  useEffect(() => {
    localStorage.setItem('participants', JSON.stringify(participants));
  }, [participants]);

  const addParticipant = (name: string, phoneNumber: string) => {
    const newParticipant: Participant = {
      id: Date.now().toString() + Math.random().toString(),
      name,
      phoneNumber
    };
    setParticipants([...participants, newParticipant]);
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const resetGame = () => {
    setMatches([]);
    setGameState('INPUT');
  };

  const runRaffle = async () => {
    if (participants.length < 2) {
      alert(t.alertMinParticipants);
      return;
    }

    setIsProcessing(true);

    // Artificial delay for suspense
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Secret Santa Algorithm (Derangement)
    const shuffled = [...participants];
    let isValid = false;
    
    // Simple shuffle and check approach (reliable for small N)
    let attempts = 0;
    while (!isValid && attempts < 1000) {
      // Fisher-Yates Shuffle
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Check for self-matches
      isValid = true;
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].id === shuffled[i].id) {
          isValid = false;
          break;
        }
      }
      attempts++;
    }

    // Fallback: Just shift array by 1 to guarantee no self-match if shuffle fails
    if (!isValid) {
        const shifted = [...participants.slice(1), participants[0]];
        const results: Match[] = participants.map((p, i) => ({
        giver: p,
        receiver: shifted[i]
      }));
      setMatches(results);
    } else {
      const results: Match[] = participants.map((p, i) => ({
        giver: p,
        receiver: shuffled[i]
      }));
      setMatches(results);
    }

    setGameState('RESULT');
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-xmas-dark flex flex-col items-center relative overflow-hidden overflow-y-auto">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-slate-900 to-slate-900 pointer-events-none fixed"></div>

      {/* Top Bar with Language Selector - Moved out of absolute to prevent overlap */}
      <div className="w-full max-w-6xl mx-auto flex justify-end p-4 z-50 relative">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as LanguageCode)}
            className="bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-xmas-gold shadow-lg cursor-pointer"
          >
              <option value="en">🇬🇧 English</option>
              <option value="tr">🇹🇷 Türkçe</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="es">🇪🇸 Español</option>
          </select>
      </div>

      {/* Header */}
      <header className="text-center mb-6 z-10 relative px-4">
        <h1 className="text-5xl md:text-7xl font-christmas text-xmas-gold mb-2 drop-shadow-[0_0_15px_rgba(248,178,41,0.5)]">
          {t.title}
        </h1>
        <p className="text-white/80 font-light text-lg tracking-wide max-w-md mx-auto">
          {t.subtitle}
        </p>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-6xl z-10 pb-12 px-4">
        
        {gameState === 'INPUT' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-2xl border border-white/10 animate-fade-in max-w-2xl mx-auto">
            
            <div className="text-center mb-8">
               <div className="inline-block bg-xmas-red/20 text-xmas-red px-4 py-1 rounded-full text-sm font-bold border border-xmas-red/30 mb-4">
                 {t.yearTag}
               </div>
               <p className="text-gray-300 mb-6">
                 {t.inputDesc}
               </p>
               <ParticipantInput onAdd={addParticipant} t={t} />
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {participants.map((p) => (
                <div key={p.id} className="group flex items-center justify-between bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all border border-white/5 shadow-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-xmas-green to-emerald-700 flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-lg">
                       {p.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium truncate text-white">{p.name}</span>
                      {p.phoneNumber && (
                        <span className="text-xs text-white/50 truncate">📞 {p.phoneNumber}</span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeParticipant(p.id)}
                    className="text-white/40 hover:text-red-400 p-2 transition-colors rounded-full hover:bg-white/5 flex-shrink-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              {participants.length === 0 && (
                <div className="col-span-full text-center py-10 text-white/30 border-2 border-dashed border-white/10 rounded-xl bg-black/10">
                  <span className="text-4xl block mb-2 opacity-50">✨</span>
                  {t.emptyList}
                </div>
              )}
            </div>

            {/* Action */}
            <div className="flex justify-center mt-6">
              <Button 
                variant="gold" 
                onClick={runRaffle}
                disabled={participants.length < 2}
                isLoading={isProcessing}
                className="w-full md:w-auto text-xl px-12 py-4 shadow-xl shadow-yellow-900/20"
              >
                {t.raffleButton}
              </Button>
            </div>
          </div>
        )}

        {gameState === 'RESULT' && (
          <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 px-4 gap-4">
               <div className="text-center md:text-left">
                 <h2 className="text-4xl font-bold text-white font-christmas text-shadow-lg">{t.matchesReady}</h2>
                 <p className="text-white/70 mt-1">{t.matchesDesc}</p>
               </div>
               <Button variant="danger" onClick={resetGame} className="text-sm px-8 py-3 shadow-lg shadow-red-900/40">
                 {t.resetButton}
               </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
              {matches.map((match, idx) => (
                <ResultCard key={match.giver.id} match={match} index={idx} t={t} />
              ))}
            </div>
            
          </div>
        )}

      </main>
    </div>
  );
};

export default App;