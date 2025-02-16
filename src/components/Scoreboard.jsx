import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame, restartGame } from '../store/store';

function Scoreboard({ status, showButtons = true, compact = false }) {
  const dispatch = useDispatch();
  const { points, streak, highScore, word } = useSelector((state) => state.hangman);

  const handlePlay = () => {
    dispatch(restartGame());
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  return (
    <div className={`text-center ${compact ? '' : 'mt-8'}`}>
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
      <div className={`scoreboard grid ${compact ? 'grid-cols-3 gap-2' : 'grid-cols-1 gap-4'}`}>
        {/* Score Card */}
        <div className={`score-item bg-gradient-to-br from-slate-800 to-slate-900 ${compact ? 'p-2' : 'p-4'} rounded-lg border border-cyan-500/20 shadow-xs shadow-cyan-500/10`}>
          <div className={`score-value ${compact ? 'text-2xl' : 'text-3xl'} font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text`}>
            {points}
          </div>
          <div className="score-label text-sm font-semibold uppercase tracking-wider text-cyan-400">Score</div>
        </div>

        {/* Streak Card */}
        <div className={`score-item bg-gradient-to-br from-slate-800 to-slate-900 ${compact ? 'p-2' : 'p-4'} rounded-lg border border-green-500/20 shadow-xs shadow-green-500/10`}>
          <div className={`score-value ${compact ? 'text-2xl' : 'text-3xl'} font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text`}>
            {streak}
          </div>
          <div className="score-label text-sm font-semibold uppercase tracking-wider text-green-400">Streak</div>
        </div>

        {/* High Score Card */}
        <div className={`score-item bg-gradient-to-br from-slate-800 to-slate-900 ${compact ? 'p-2' : 'p-4'} rounded-lg border border-purple-500/20 shadow-xs shadow-purple-500/10`}>
          <div className={`score-value ${compact ? 'text-2xl' : 'text-3xl'} font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 text-transparent bg-clip-text`}>
            {highScore}
          </div>
          <div className="score-label text-sm font-semibold uppercase tracking-wider text-purple-400">High Score</div>
        </div>
      </div>

      {showButtons && (
        <div className="mt-8 space-x-4">
          {status === "You have won!" ? (
            <>
              <button
                onClick={handlePlay}
                className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-xs shadow-purple-500/20"
                aria-label="Continue"
              >
                Continue
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-xs shadow-green-500/20"
                aria-label="Reset"
              >
                Reset
              </button>
            </>
          ) : (
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-xs shadow-red-500/20"
              aria-label="Play Again"
            >
              Play Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Scoreboard;
