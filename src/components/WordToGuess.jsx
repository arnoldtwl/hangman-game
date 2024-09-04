import React from 'react';
import { useSelector } from 'react-redux';

function WordToGuess() {
  const { word, correctGuesses, status } = useSelector((state) => state.hangman);

  return (
    <div className="text-center text-4xl font-mono mt-4 mb-8">
      {word.split('').map((letter, index) => (
        <span key={index} className="mx-1">
          {correctGuesses.includes(letter) || status === "You have lost!" ? letter : '_'}
        </span>
      ))}
    </div>
  );
}

export default WordToGuess;
