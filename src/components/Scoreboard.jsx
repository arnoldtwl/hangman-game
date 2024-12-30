import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame, restartGame } from '../store/store';
import Button from '../utils/Button';

function Scoreboard({ status, showButtons = true }) {
  const dispatch = useDispatch();
  const { points, streak, highScore, word } = useSelector((state) => state.hangman);

  const handlePlay = () => {
    dispatch(restartGame());
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  return (
    <div className="text-center mt-8">
      {status && (
        <>
          <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            {status}
          </div>
          {status === "You have lost!" && (
            <div className="text-xl mb-4">
              The word was:{' '}
              <span className="font-bold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
                {word}
              </span>
            </div>
          )}
        </>
      )}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Score Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Score</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
              {points}
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-green-500/20 shadow-lg shadow-green-500/10">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm font-semibold uppercase tracking-wider text-green-400">Streak</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">
              {streak}
            </div>
          </div>
        </div>

        {/* High Score Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-purple-500/20 shadow-lg shadow-purple-500/10">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm font-semibold uppercase tracking-wider text-purple-400">High Score</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
              {highScore}
            </div>
          </div>
        </div>
      </div>

      {showButtons && (
        <div className="flex justify-center space-x-4">
          {status === "You have won!" ? (
            <>
              <Button 
                onClick={handlePlay} 
                className="game-ui-button bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" 
                aria-label="Continue"
              >
                Continue
              </Button>
              <Button 
                onClick={handleReset} 
                className="game-ui-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                aria-label="Reset"
              >
                Reset
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleReset} 
              className="game-ui-button bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" 
              aria-label="Play Again"
            >
              Play Again
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Scoreboard;
