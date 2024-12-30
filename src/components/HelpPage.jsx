import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import Button from '../utils/Button';

function HelpPage() {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.hangman);
  const isPlaying = status === "Playing";

  const handleContinue = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header />
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl mt-20 max-w-3xl mx-4 border border-slate-700">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">How to Play Hangman</h2>
        
        <div className="space-y-6 text-slate-300">
          <section>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Basic Rules</h3>
            <p>Guess the word letter by letter. Incorrect guesses will add a part to the hangman figure. Six incorrect guesses result in losing the game.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Controls</h3>
            <p className="mb-2">Use the on-screen keyboard or your physical keyboard to make guesses. You can also use the following shortcuts:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>F1:</strong> Open Help</li>
              <li><strong>F2:</strong> Reveal a Hint (First 3 hints are free, then costs double each time)</li>
              <li><strong>F5:</strong> Restart Game</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Hint System</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>First 3 hints are completely free</li>
              <li>4th hint costs 10 points</li>
              <li>5th hint costs 20 points</li>
              <li>6th hint costs 40 points</li>
              <li>Each subsequent hint doubles in cost</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Points System</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>1 point for each correct letter that appears once</li>
              <li>2 points for each correct letter that appears twice</li>
              <li>3 points for each correct letter that appears three or more times</li>
              <li>50 points for completing a 3-4 letter word</li>
              <li>100 points for completing a 5-6 letter word</li>
              <li>150 points for completing a 7-8 letter word</li>
              <li>200 points for completing a 9+ letter word</li>
              <li>10 points for each correct guess that keeps the hangman alive</li>
              <li>-5 points for each incorrect guess</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Streak Multiplier</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>1x multiplier for 1-2 consecutive correct guesses</li>
              <li>2x multiplier for 3-4 consecutive correct guesses</li>
              <li>3x multiplier for 5-6 consecutive correct guesses</li>
              <li>4x multiplier for 7+ consecutive correct guesses</li>
            </ul>
          </section>

          <p className="text-lg font-semibold text-cyan-400 mt-4">Good luck and have fun!</p>
        </div>

        <div className="mt-8 flex justify-center">
          {isPlaying ? (
            <Button 
              onClick={handleContinue}
              className="game-ui-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Continue Game
            </Button>
          ) : (
            <Button 
              onClick={() => navigate('/')}
              className="game-ui-button bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Back to Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HelpPage;