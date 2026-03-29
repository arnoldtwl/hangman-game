import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDifficultyConfig } from '../config/difficulty';

function getVisibleParts(incorrectGuessCount, partRevealThresholds) {
  return partRevealThresholds.filter((threshold) => incorrectGuessCount >= threshold).length;
}

function HangmanFigure({ onClick }) {
  const { incorrectGuesses, status, maxIncorrectGuesses, difficulty } = useSelector((state) => state.hangman);
  const [visibleParts, setVisibleParts] = useState(0);
  const { partRevealThresholds } = getDifficultyConfig(difficulty);
  const totalFigureParts = partRevealThresholds.length;
  const initialVisibleParts = getVisibleParts(0, partRevealThresholds);

  useEffect(() => {
    if (status === "Not Started") {
      let timer;
      setVisibleParts(initialVisibleParts);
      for (let i = initialVisibleParts + 1; i <= totalFigureParts; i++) {
        timer = setTimeout(() => {
          setVisibleParts(i);
        }, (i - initialVisibleParts) * 500);
      }
      return () => clearTimeout(timer);
    } else {
      setVisibleParts(getVisibleParts(incorrectGuesses.length, partRevealThresholds));
    }
  }, [status, incorrectGuesses.length, maxIncorrectGuesses, initialVisibleParts, partRevealThresholds, totalFigureParts]);

  return (
    <div
      className={`flex justify-center mt-4 relative transition-all duration-300 pointer-events-auto bg-transparent ${status === 'Playing' ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}`}
      onClick={status === 'Playing' ? onClick : undefined}
      title={status === 'Playing' ? "Click for a definition hint!" : ""}
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
          {visibleParts > 0 && <circle cx="140" cy="70" r="20" fill="transparent" className="animate-draw" data-testid="hangman-head" />} {/* Head */}
          {visibleParts > 1 && <line x1="140" y1="90" x2="140" y2="150" className="animate-draw" data-testid="hangman-body" />} {/* Body */}
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
