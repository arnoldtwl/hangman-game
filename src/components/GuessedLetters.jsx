import React from 'react';

const GuessedLetters = ({ correctGuesses, incorrectGuesses }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-cyan-400">Guessed Letters</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {alphabet.map((letter) => {
            const isCorrect = correctGuesses.includes(letter);
            const isIncorrect = incorrectGuesses.includes(letter);
            const isGuessed = isCorrect || isIncorrect;
            
            return (
              <div
                key={letter}
                className={`
                  w-8 h-8 flex items-center justify-center rounded-md font-semibold text-sm
                  ${!isGuessed ? 'bg-slate-700 text-slate-400' : ''}
                  ${isCorrect ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' : ''}
                  ${isIncorrect ? 'bg-gradient-to-br from-red-500 to-red-600 text-white' : ''}
                `}
              >
                {letter}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-xs bg-gradient-to-br from-green-500 to-green-600"></div>
          <span className="text-slate-300">Correct</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-xs bg-gradient-to-br from-red-500 to-red-600"></div>
          <span className="text-slate-300">Incorrect</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-xs bg-slate-700"></div>
          <span className="text-slate-300">Not Guessed</span>
        </div>
      </div>
    </div>
  );
};

export default GuessedLetters;
