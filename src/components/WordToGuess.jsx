// WordToGuess.jsx
import React from 'react'

function WordToGuess({ word, correctGuesses, status }) {
  
  return (
    <div className="text-center text-4xl font-mono">
      {word.split('').map((letter, index) => (
        <span key={index} className="mx-2">{correctGuesses.includes(letter) || status === "You have lost!" ? letter : '_'}</span>
      ))}
    </div>
  );
}

export default WordToGuess;