import React from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '../store/store';

function Scoreboard({ status }) {
  const dispatch = useDispatch();

  return (
    <div className="text-center mt-8">
      <div className="text-2xl font-bold mb-4">{status}</div>
      <div className="flex justify-center space-x-4">
        <button onClick={() => dispatch(resetGame())} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Reset</button>
      </div>
    </div>
  );
}

export default Scoreboard;
