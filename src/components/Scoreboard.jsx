import React from 'react';
import { useDispatch } from 'react-redux';
import { resetGame, restartGame } from '../store/store';
import Button from '../utils/Button'; // Import Button component

function Scoreboard({ status }) {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(restartGame());
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  return (
    <div className="text-center mt-8">
      <div className="text-2xl font-bold mb-4">{status}</div>
      <div className="flex justify-center space-x-4">
        {status === "You have won!" ? (
          <>
            <Button onClick={handlePlay} className="help-button text-white hover:bg-purple-600">Continue</Button>
            <Button onClick={handleReset} className="hint-button text-white hover:bg-green-600">Reset</Button>
          </>
        ) : (
          <Button onClick={handleReset} className="reset-button text-white hover:bg-red-600">Play Again</Button>
        )}
      </div>
    </div>
  );
}

export default Scoreboard;
