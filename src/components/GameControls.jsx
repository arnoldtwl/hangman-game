import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../utils/Button';

const GameControls = ({ onHint, onReset }) => {
  const navigate = useNavigate();
  const { hintsUsed } = useSelector((state) => state.hangman);

  return (
    <div className="flex justify-center gap-2 mt-4">
      <Button
        onClick={() => navigate('/help')}
        className="help-button text-white hover:bg-purple-600"
        aria-label="Help"
      >
        HELP
      </Button>

      <Button
        onClick={onHint}
        className="hint-button text-white hover:bg-green-600"
        aria-label="Hint"
      >
        HINT ({3 - hintsUsed})
      </Button>

      <Button
        onClick={onReset}
        className="reset-button text-white hover:bg-red-600"
        aria-label="Reset"
      >
        RESET
      </Button>
    </div>
  );
};

export default GameControls;
