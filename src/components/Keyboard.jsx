import React from 'react';

const Keyboard = ({ onGuess, guessedLetters }) => {
  const rows = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  return (
    <div className="keyboard-container">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => (
            <button
              key={letter}
              onClick={() => onGuess(letter)}
              disabled={guessedLetters.includes(letter)}
              className={`key-button ${
                guessedLetters.includes(letter) ? 'bg-gray-600' : ''
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
