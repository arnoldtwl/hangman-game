// Keyboard.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleHint } from '../store/store';


function Keyboard({ onGuess, guessedLetters, onHelp, handleRestart }) {
  const dispatch = useDispatch();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = event.key.toUpperCase();
      if (alphabet.includes(letter) && !guessedLetters.includes(letter)) {
        onGuess(letter);
      }

      if (event.key === 'F1') {
        onHelp();
      }

      if (event.key === 'F2') {
        dispatch(toggleHint());
      }

      if (event.key === 'F5') {
        handleRestart();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [alphabet, guessedLetters, onGuess, onHelp, dispatch, handleRestart]);

  return (
    <div>
      <div className="grid grid-cols-6 gap-4 mt-6">
        {alphabet.split('').map((letter, index) => (
          <button 
            key={index} 
            className={`px-4 py-2 bg-blue-500 text-white font-bold rounded disabled:bg-gray-400 ${guessedLetters.includes(letter) ? 'cursor-not-allowed' : ''}`} 
            disabled={guessedLetters.includes(letter) } 
            onClick={() => onGuess(letter)}>{letter}</button>
        ))}
      </div>
      <button onClick={onHelp} className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-600">Help</button>
      <button onClick={() => dispatch(toggleHint())} className="bg-orange-500 text-white px-4 py-2 rounded mt-4 hover:bg-orange-600">Hint</button>
    </div>
  )
}

export default Keyboard;