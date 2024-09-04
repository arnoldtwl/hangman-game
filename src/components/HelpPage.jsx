import React from 'react';
import Header from './Header';

function HelpPage() {
  return (
    <div className="hangman-container min-h-screen flex flex-col items-center justify-center p-8 pt-20">
      <Header />
      <div className="bg-white p-8 rounded shadow-lg mt-8 help-content">
        <h2 className="text-2xl font-bold mb-4">How to Play Hangman</h2>
        <p className="mb-4">Guess the word letter by letter. Incorrect guesses will add a part to the hangman figure. Six incorrect guesses result in losing the game.</p>
        <p className="mb-4">Use the on-screen keyboard or your physical keyboard to make guesses. You can also use the following shortcuts:</p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>F1:</strong> Open Help</li>
          <li><strong>F2:</strong> Reveal a Hint (costs 10 points, max 3 hints per word)</li>
          <li><strong>F5:</strong> Restart Game</li>
        </ul>
        <p className="mb-4">Points System:</p>
        <ul className="list-disc list-inside mb-4">
          <li>1 point for each correct letter guess that appears only once in the word</li>
          <li>2 points for each correct letter guess that appears twice in the word</li>
          <li>3 points for each correct letter guess that appears three or more times in the word</li>
          <li>50 points for completing a 3-4 letter word</li>
          <li>100 points for completing a 5-6 letter word</li>
          <li>150 points for completing a 7-8 letter word</li>
          <li>200 points for completing a 9-letter or longer word</li>
          <li>10 points for each correct guess that keeps the hangman alive</li>
          <li>-5 points for each incorrect guess</li>
          <li>-10 points for using a hint</li>
        </ul>
        <p className="mb-4">Streak Multiplier:</p>
        <ul className="list-disc list-inside mb-4">
          <li>1x multiplier for 1-2 consecutive correct guesses</li>
          <li>2x multiplier for 3-4 consecutive correct guesses</li>
          <li>3x multiplier for 5-6 consecutive correct guesses</li>
          <li>4x multiplier for 7 or more consecutive correct guesses</li>
        </ul>
        <p className="mb-4">Good luck and have fun!</p>
      </div>
    </div>
  );
}

export default HelpPage;