import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../utils/Button';

const GameControls = ({ onHint, onReset }) => {
  const navigate = useNavigate();
  const { hintsUsed } = useSelector((state) => state.hangman);

  const getHintText = () => {
    if (hintsUsed < 3) {
      return `Hint (${3 - hintsUsed} Free)`;
    }
    const cost = 10 * Math.pow(2, hintsUsed - 3);
    return `Hint (${cost}p)`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-slate-800/95 border-t border-slate-700 p-4 flex justify-around items-center gap-2 md:hidden">
      {/* Help button - Purple gradient */}
      <Button
        onClick={() => navigate('/help')}
        className="game-ui-button bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 flex-1"
      >
        Help
      </Button>

      {/* Hint button - Green gradient */}
      <Button
        onClick={onHint}
        className="game-ui-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex-1"
      >
        {getHintText()}
      </Button>

      {/* Reset button - Red gradient */}
      <Button
        onClick={onReset}
        className="game-ui-button bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex-1"
      >
        Reset
      </Button>
    </div>
  );
};

export default GameControls;
