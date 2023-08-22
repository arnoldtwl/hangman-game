import React from 'react'
import { useDispatch } from 'react-redux';
import { selectCategory } from '../store/store'

function Scoreboard({ status, onRestart, onHelp }) {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Function to handle category selection, resetting the category to null
  const handleChooseCategory = () => {
    dispatch(selectCategory(null));
  };

  return (
    <div className="text-center mt-4">
      <div className="text-2xl font-bold mb-4">{status}</div> {/* Display the game status */}
      <button onClick={onRestart} className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600">Play Again</button> {/* Button to restart the game */}
      <button 
        onClick={handleChooseCategory} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Choose Category
      </button> {/* Button to choose a new category */}
      <button onClick={onHelp} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Help</button> {/* Button to display help */}
    </div>
  );
}

export default Scoreboard; 
