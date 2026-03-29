import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../utils/Button';

function HelpPage() {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.hangman);
  const isPlaying = status === "Playing";

  const handleContinue = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>



      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-24 pb-12 animate-fade-in-up">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-sm">
            How to Play
          </h2>
          <p className="text-slate-400 text-lg">Master the rules and become a Hangman champion</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Rules */}
          <div className="backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-xl hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Basic Rules</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Guess the word letter by letter. Incorrect guesses will add a part to the hangman figure.
              <span className="text-red-400 font-semibold ml-1">6 incorrect guesses</span> result in losing the game.
            </p>
          </div>

          {/* Controls */}
          <div className="backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-xl hover:border-purple-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Controls</h3>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Open Help</span>
                <kbd className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400">F1</kbd>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Reveal Hint</span>
                <kbd className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400">F2</kbd>
              </li>
              <li className="flex items-center justify-between">
                <span>Restart Game</span>
                <kbd className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400">F5</kbd>
              </li>
            </ul>
          </div>

          {/* Hint System */}
          <div className="backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-xl hover:border-yellow-500/30 transition-colors">
            <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hint System
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                <span>Hints reveal one random un-guessed letter and show a dictionary definition.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                <span>Hints have a deferred cost deducted upon winning:</span>
              </li>
              <li className="ml-8 text-sm text-slate-400">
                • 1st Hint: -5 points<br />
                • 2nd Hint: -10 points<br />
                • 3rd Hint: -15 points
              </li>
            </ul>
          </div>

          {/* Points System */}
          <div className="backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-xl hover:border-green-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Points & Multipliers</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Points</h4>
                <ul className="space-y-1 text-slate-400">
                  <li>Correct Letter: +1-3</li>
                  <li>Complete Word: +50-200</li>
                  <li>Survival Bonus: +10</li>
                  <li>Incorrect: -5</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Streak</h4>
                <ul className="space-y-1 text-slate-400">
                  <li>1-2 Correct: 1x</li>
                  <li>3-4 Correct: 2x</li>
                  <li>5-6 Correct: 3x</li>
                  <li>7+ Correct: 4x</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          {isPlaying ? (
            <Button
              onClick={handleContinue}
              className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all duration-200"
            >
              Continue Game
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/')}
              className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all duration-200"
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
