import React from 'react'

function WordToGuess({ word, correctGuesses, status }) {
  // Return the JSX to render the word being guessed
  return (
    <div className="text-center text-4xl font-mono">
      {word.split('').map((letter, index) => (
        // Iterate over each letter of the word, and display either the letter or an underscore
        // If the letter is in correctGuesses or the game is lost, display the letter, otherwise display an underscore
        <span key={index} className="mx-2">{correctGuesses.includes(letter) || status === "You have lost!" ? letter : '_'}</span>
      ))}
    </div>
  );
}

export default WordToGuess; 
