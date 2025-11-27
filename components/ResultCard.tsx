import React, { useState } from 'react';
import { Match } from '../types';
import { Translation } from '../translations';

interface ResultCardProps {
  match: Match;
  index: number;
  t: Translation;
}

export const ResultCard: React.FC<ResultCardProps> = ({ match, index, t }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
        setIsRevealed(true);
    }
  };

  const handleSendMessage = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    if (!match.giver.phoneNumber) return;

    setSendingMessage(true);
    
    // Clean phone number (remove non-digits, ensure country code if needed)
    // Assuming user enters mostly clean numbers or we default to Turkey (+90) if it starts with 5
    let phone = match.giver.phoneNumber.replace(/\D/g, '');
    if (phone.length === 10 && phone.startsWith('5')) {
        phone = '90' + phone;
    }

    const message = t.whatsappMessage(match.giver.name, match.receiver.name);
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    setSendingMessage(false);
  };

  return (
    <div 
      className="relative w-full h-96 perspective-1000 cursor-pointer group"
      onClick={handleReveal}
    >
      <div className={`relative w-full h-full duration-700 preserve-3d transition-all ${isRevealed ? 'rotate-y-180' : ''}`}>
        
        {/* Front of Card (Hidden) */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl p-6 flex flex-col items-center justify-between bg-gradient-to-br from-xmas-red to-red-950 shadow-2xl border-4 border-xmas-gold/40">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-20"></div>
          
          {/* Top Section */}
          <div className="flex flex-col items-center w-full z-10 pt-2">
             <p className="text-xmas-gold font-bold uppercase tracking-widest text-xs mb-2 opacity-90">{t.giverLabel}</p>
             <h3 className="text-2xl sm:text-3xl font-bold text-white font-christmas tracking-wide drop-shadow-md break-words leading-snug px-2 line-clamp-2 text-center w-full">
               {match.giver.name}
             </h3>
          </div>
          
          {/* Center Icon */}
          <div className="text-5xl drop-shadow-xl filter saturate-150 transform group-hover:scale-110 transition-transform my-2">🎁</div>
          
          {/* Bottom Section */}
          <div className="w-full flex flex-col items-center gap-3 pb-2 z-20">
            <div className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all w-full text-center">
               <p className="text-xs sm:text-sm text-white font-semibold flex items-center justify-center gap-2">
                 <span>{t.receiverLabel}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-pulse flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </svg>
               </p>
            </div>

            {match.giver.phoneNumber && (
               <button 
                 onClick={handleSendMessage}
                 disabled={sendingMessage}
                 className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg transition-all transform hover:scale-105 active:scale-95 w-full"
                 title="WhatsApp"
               >
                  {sendingMessage ? (
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                      </svg>
                  )}
                 <span className="hidden sm:inline">{t.whatsappButton}</span>
               </button>
            )}
          </div>
        </div>

        {/* Back of Card (Revealed) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-xmas-green to-green-950 shadow-2xl border-4 border-xmas-gold overflow-hidden p-6 gap-6">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
          
          <div className="text-center w-full z-10 flex flex-col items-center justify-center gap-4">
            <p className="text-green-300 text-sm sm:text-base font-bold uppercase tracking-widest">{t.luckyPerson}</p>
            
            <h3 className="text-3xl sm:text-4xl font-bold text-white font-christmas tracking-wide drop-shadow-lg text-center break-words w-full px-2 leading-tight">
              {match.receiver.name}
            </h3>
            
            <div className="text-3xl animate-bounce-slow mt-2">🎁</div>
          </div>

        </div>
      </div>
    </div>
  );
};