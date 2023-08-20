import React from 'react'

function Scoreboard({ status, onRestart, onHelp }) {
  return (
    <div className="text-center mt-4">
      <div className="text-2xl font-bold mb-4">{status}</div>
      <button onClick={onRestart} className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600">Restart</button>
      <button onClick={onHelp} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Help</button>
    </div>
  );
}

export default Scoreboard;