import React from 'react';
import { useSelector } from 'react-redux';

const WordToGuess = () => {
  const { word, correctGuesses, status } = useSelector((state) => state.hangman);

  return (
    <div className="word-to-guess">
      {word.split("").map((letter, index) => (
        <span key={index}>
          {status === "Lost" || correctGuesses.includes(letter) || letter === " " ? letter : "_"}
        </span>
      ))}
    </div>
  );
};

export default WordToGuess;
