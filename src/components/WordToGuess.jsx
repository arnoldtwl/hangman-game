import React from 'react';
import { useSelector } from 'react-redux';

const WordToGuess = () => {
  const { word, correctGuesses, status } = useSelector((state) => state.hangman);

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 my-4 sm:my-8 px-4">
      {word.split("").map((letter, index) => {
        const isRevealed = status === "Lost" || status === "You have lost!" || correctGuesses.includes(letter) || letter === " ";
        return (
          <div
            key={index}
            className={`
              flex items-end justify-center
              w-8 h-12 sm:w-12 sm:h-16 md:w-14 md:h-20
              border-b-4 
              ${letter === " " ? "border-transparent" : "border-slate-500"}
              ${isRevealed ? "border-cyan-400" : ""}
              transition-colors duration-300
            `}
          >
            <span className={`
              text-2xl sm:text-4xl md:text-5xl font-bold 
              ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              ${status === "Lost" || status === "You have lost!" && !correctGuesses.includes(letter) ? "text-red-400" : "text-white"}
              transition-all duration-300
            `}>
              {letter}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default WordToGuess;
