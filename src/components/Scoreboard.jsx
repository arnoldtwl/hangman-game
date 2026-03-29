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
    <section className={`text-center ${compact ? '' : 'mt-8'}`} aria-label="Scoreboard">
      {status && (
        <div className="mb-6 animate-fade-in">
          <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            {status}
          </div>
          {status === "You have lost!" && (
            <div className="text-xl mb-4 text-slate-300">
              The word was:{' '}
              <span className="font-bold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
                {word}
              </span>
            </div>
          )}
        </div>
      )}

      <div className={`grid ${compact ? 'grid-cols-3 gap-3' : 'grid-cols-1 gap-4'}`}>
        {/* Score Card */}
        <div className={`relative overflow-hidden bg-slate-800/50 backdrop-blur-sm ${compact ? 'p-3' : 'p-6'} rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5 group hover:border-cyan-500/40 transition-colors`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50" />
          <div className={`font-black ${compact ? 'text-2xl' : 'text-4xl'} bg-gradient-to-r from-cyan-300 to-blue-300 text-transparent bg-clip-text mb-1`}>
            {points}
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-cyan-500/80">Score</div>
        </div>

        {/* Streak Card */}
        <div className={`relative overflow-hidden bg-slate-800/50 backdrop-blur-sm ${compact ? 'p-3' : 'p-6'} rounded-xl border border-green-500/20 shadow-lg shadow-green-500/5 group hover:border-green-500/40 transition-colors`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500 opacity-50" />
          <div className={`font-black ${compact ? 'text-2xl' : 'text-4xl'} bg-gradient-to-r from-green-300 to-emerald-300 text-transparent bg-clip-text mb-1`}>
            {streak}
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-green-500/80">Streak</div>
        </div>

        {/* High Score Card */}
        <div className={`relative overflow-hidden bg-slate-800/50 backdrop-blur-sm ${compact ? 'p-3' : 'p-6'} rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 group hover:border-purple-500/40 transition-colors`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-fuchsia-500 opacity-50" />
          <div className={`font-black ${compact ? 'text-2xl' : 'text-4xl'} bg-gradient-to-r from-purple-300 to-fuchsia-300 text-transparent bg-clip-text mb-1`}>
            {highScore}
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-purple-500/80">Best</div>
        </div>
      </div>

      {showButtons && (
        <div className="mt-8 flex justify-center gap-4">
          {status === "You have won!" ? (
            <>
              <button
                type="button"
                onClick={handlePlay}
                className="focus-ring px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/20 hover:scale-105"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="focus-ring px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg shadow-green-500/20 hover:scale-105"
              >
                Reset
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="focus-ring px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/20 hover:scale-105"
            >
              Play Again
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default Scoreboard;
