// Help.jsx
import React from 'react';

function Help({ onClose, onHelp }) {
  return (
    <div className="help bg-white p-6 rounded shadow-lg mt-6">
        <h3 className="text-2xl mb-4">How to play Hangman</h3>
        <p className="mb-4">Guess the word letter by letter. Incorrect guesses will add a part to the hangman figure. Six incorrect guesses result in losing the game.</p>
        
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Close</button> 
    </div>
  )
}

export default Help;