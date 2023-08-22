import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleHint } from '../store/store';

function Keyboard({ onGuess, guessedLetters, onHelp, handleRestart }) {
  const dispatch = useDispatch();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Alphabet letters to be used for guessing

  // Effect to handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = event.key.toUpperCase(); // Convert the key pressed to uppercase
      // Check if the key pressed is a letter and hasn't been guessed already
      if (alphabet.includes(letter) && !guessedLetters.includes(letter)) {
        onGuess(letter); // Trigger the guess
      }

      if (event.key === 'F1') {
        onHelp(); // Trigger help on F1 key press
      }

      if (event.key === 'F2') {
        dispatch(toggleHint()); // Toggle hint on F2 key press
      }

      if (event.key === 'F5') {
        handleRestart(); // Restart game on F5 key press
      }
    }

    // Attach the event listener to the window
    window.addEventListener('keydown', handleKeyDown);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [alphabet, guessedLetters, onGuess, onHelp, dispatch, handleRestart]); // Dependencies for useEffect

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
        {alphabet.split('').map((letter, index) => (
          <button 
            key={index} 
            className={`px-4 py-2 bg-blue-500 text-white font-bold rounded disabled:bg-gray-400 ${guessedLetters.includes(letter) ? 'cursor-not-allowed' : ''}`} 
            disabled={guessedLetters.includes(letter)} // Disable button if letter has been guessed
            onClick={() => onGuess(letter)}>{letter}</button> // Button for each letter of the alphabet
        ))}
      </div>
      <button onClick={onHelp} className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-600">Help</button> 
      <button onClick={() => dispatch(toggleHint())} className="bg-orange-500 text-white px-4 py-2 rounded mt-4 hover:bg-orange-600">Hint</button> 
    </div>
  )
}

export default Keyboard; 
