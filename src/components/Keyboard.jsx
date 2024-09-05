import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { revealHint, resetGame, restartGame } from '../store/store';
import Button from '../utils/Button'; // Changed 'button' to 'Button'

function Keyboard({ onGuess, guessedLetters }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hintsUsed, maxHints, points, word, correctGuesses, incorrectGuesses } = useSelector((state) => state.hangman);
  const rows = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = event.key.toUpperCase(); // Convert the key pressed to uppercase
      // Check if the key pressed is a letter and hasn't been guessed already
      if (rows.join('').includes(letter) && !guessedLetters.includes(letter)) {
        onGuess(letter); // Trigger the guess
      }

      if (event.key === 'F1') {
        event.preventDefault(); // Prevent the default browser help page
        // Navigate to Help page on F1 key press
        navigate('/help');
      }

      if (event.key === 'F2') {
        event.preventDefault(); // Prevent any default action
        dispatch(revealHint()); // Reveal a hint on F2 key press
      }

      if (event.key === 'F5') {
        event.preventDefault(); // Prevent any default action
        dispatch(restartGame()); // Restart the game on F5 key press
      }
    };

    // Attach the event listener to the window
    window.addEventListener('keydown', handleKeyDown);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rows, guessedLetters, onGuess, dispatch, navigate]);

  const handleRevealHint = () => {
    dispatch(revealHint());
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  const getButtonClass = (letter) => {
    if (correctGuesses.includes(letter)) {
      return 'correct-guess text-white';
    } else if (incorrectGuesses.includes(letter)) {
      return 'incorrect-guess text-white';
    } else {
      return 'keyboard-button text-white';
    }
  };

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-2 mt-2">
          {row.split('').map((letter, index) => (
            <Button
              key={index}
              className={`${getButtonClass(letter)} font-bold ${guessedLetters.includes(letter) ? 'cursor-not-allowed' : ''}`}
              disabled={guessedLetters.includes(letter)}
              onClick={() => onGuess(letter)}
              aria-label={`Guess letter ${letter}`}
            >
              {letter}
            </Button>
          ))}
        </div>
      ))}
      <div className="flex justify-center space-x-4 mt-4"> {/* Updated button group */}
        <Button onClick={handleHelpClick} className="help-button text-white hover:bg-purple-600" aria-label="Help">Help</Button> {/* Changed to purple */}
        <Button onClick={handleRevealHint} className="hint-button text-white hover:bg-green-600" disabled={points < 10 || hintsUsed >= maxHints} aria-label={`Hint (${maxHints - hintsUsed})`}>
          Hint ({maxHints - hintsUsed})
        </Button> {/* Changed to green */}
        <Button onClick={handleReset} className="reset-button text-white hover:bg-red-600" aria-label="Reset">
          Reset
        </Button> {/* Kept as red */}
      </div>
    </div>
  )
}

export default Keyboard;
