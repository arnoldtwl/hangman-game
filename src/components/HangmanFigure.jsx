import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function HangmanFigure({ onClick }) {
  const { incorrectGuesses, status } = useSelector((state) => state.hangman);
  const maxIncorrectGuesses = 6;
  const [visibleParts, setVisibleParts] = useState(0);

  useEffect(() => {
    if (status === "Not Started") {
      let timer;
      for (let i = 1; i <= maxIncorrectGuesses; i++) {
        timer = setTimeout(() => {
          setVisibleParts(i);
        }, i * 500);
      }
      return () => clearTimeout(timer);
    } else {
      setVisibleParts(incorrectGuesses.length);
    }
  }, [status, incorrectGuesses.length]);

  return (
    <div
      className={`flex justify-center mt-4 relative transition-all duration-300 pointer-events-auto bg-transparent ${status === 'Playing' ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}`}
      onClick={status === 'Playing' ? onClick : undefined}
      title={status === 'Playing' ? "Click for a riddle hint!" : ""}
    >
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full transform scale-150" />

      <svg height="250" width="200" className="relative z-10 overflow-visible">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Gallows */}
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-600">
          <line x1="60" y1="20" x2="140" y2="20" /> {/* Top */}
          <line x1="140" y1="20" x2="140" y2="50" /> {/* Rope */}
          <line x1="60" y1="20" x2="60" y2="230" /> {/* Pole */}
          <line x1="20" y1="230" x2="100" y2="230" /> {/* Base */}
        </g>

        {/* Figure */}
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-cyan-400" filter="url(#glow)">
          {visibleParts > 0 && <circle cx="140" cy="70" r="20" fill="transparent" className="animate-draw" />} {/* Head */}
          {visibleParts > 1 && <line x1="140" y1="90" x2="140" y2="150" className="animate-draw" />} {/* Body */}
          {visibleParts > 2 && <line x1="140" y1="120" x2="120" y2="100" className="animate-draw" />} {/* Left arm */}
          {visibleParts > 3 && <line x1="140" y1="120" x2="160" y2="100" className="animate-draw" />} {/* Right arm */}
          {visibleParts > 4 && <line x1="140" y1="150" x2="120" y2="180" className="animate-draw" />} {/* Left leg */}
          {visibleParts > 5 && <line x1="140" y1="150" x2="160" y2="180" className="animate-draw" />} {/* Right leg */}
        </g>
      </svg>
    </div>
  );
}

export default HangmanFigure;
