import React from 'react';

const Keyboard = ({ onGuess, guessedLetters, disabled = false }) => {
  const rows = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  return (
    <div className="flex flex-col gap-2 w-full max-w-2xl mx-auto">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5 sm:gap-2">
          {row.map((letter) => {
            const isGuessed = guessedLetters.includes(letter);
            const isDisabled = disabled || isGuessed;
            return (
              <button
                key={letter}
                onClick={() => onGuess(letter)}
                disabled={isDisabled}
                className={`
                  relative group overflow-hidden
                  w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14
                  rounded-lg font-bold text-sm sm:text-base md:text-lg
                  transition-all duration-200
                  ${isDisabled
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-800'
                    : 'bg-slate-700/50 text-slate-200 hover:bg-cyan-600 hover:text-white hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5 border border-white/10'
                  }
                `}
              >
                {!isDisabled && (
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
