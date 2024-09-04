import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { revealHint, resetGame } from '../store/store';
import Button from '../utils/button'; // Correct import
import KeyboardButton from '../utils/KeyboardButton';

function Keyboard({ onGuess, guessedLetters }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hintsUsed, maxHints, points } = useSelector((state) => state.hangman);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = event.key.toUpperCase(); // Convert the key pressed to uppercase
      // Check if the key pressed is a letter and hasn't been guessed already
      if (alphabet.includes(letter) && !guessedLetters.includes(letter)) {
        onGuess(letter); // Trigger the guess
      }

      if (event.key === 'F1') {
        // Navigate to Help page on F1 key press
        navigate('/help');
      }

      if (event.key === 'F2') {
        dispatch(revealHint()); // Reveal a hint on F2 key press
      }
    };

    // Attach the event listener to the window
    window.addEventListener('keydown', handleKeyDown);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [alphabet, guessedLetters, onGuess, dispatch, navigate]);

  const handleRevealHint = () => {
    dispatch(revealHint());
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
        {alphabet.split('').map((letter, index) => (
          <Button
            key={index}
            className={`bg-blue-500 text-white font-bold ${guessedLetters.includes(letter) ? 'bg-gray-400 cursor-not-allowed' : ''}`}
            disabled={guessedLetters.includes(letter)}
            onClick={() => onGuess(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4"> {/* Updated button group */}
        <Button onClick={handleHelpClick} className="bg-yellow-500 text-white hover:bg-yellow-600">Help</Button>
        <Button onClick={handleRevealHint} className="bg-orange-500 text-white hover:bg-orange-600" disabled={points < 10 || hintsUsed >= maxHints}>
          Hint ({maxHints - hintsUsed} left)
        </Button>
        <Button onClick={handleReset} className="bg-red-500 text-white hover:bg-red-600">
          Reset
        </Button>
      </div>
    </div>
  )
}

export default Keyboard;
