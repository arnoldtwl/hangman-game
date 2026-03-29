import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../utils/Button';

const GameControls = ({ onHint, onReset, disabled = false }) => {
  const navigate = useNavigate();
  const { hintsUsed } = useSelector((state) => state.hangman);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Button
        onClick={() => navigate('/help')}
        disabled={disabled}
        className="px-6 py-2 rounded-lg font-semibold text-white bg-slate-700 hover:bg-slate-600 transition-colors shadow-lg shadow-slate-900/20"
        aria-label="Help"
      >
        HELP
      </Button>

      <button
        onClick={onHint}
        disabled={disabled}
        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-yellow-500/20 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        aria-label="Hint"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        HINT (-{5 * (hintsUsed + 1)})
      </button>

      <Button
        onClick={onReset}
        disabled={disabled}
        className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 transition-all shadow-lg shadow-red-500/20"
        aria-label="Reset"
      >
        RESET
      </Button>
    </div>
  );
};

export default GameControls;
