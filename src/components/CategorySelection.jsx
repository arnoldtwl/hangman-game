import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCategory } from '../store/store';
import Header from './Header';

function CategorySelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = ["all categories", "animals", "countries", "authors", "foods", "instruments", "literature", "sports", "technologies", "historicalFigures", "landmarks"];

  const onSelectCategory = (category) => {
      dispatch(selectCategory(category)); 
      navigate('/game', { state: { category } }); category
  };

  return (
    <div className="hangman-container min-h-screen flex flex-col items-center justify-center p-8 pt-20">
        <Header />
        <div className="bg-white p-8 rounded shadow-lg mt-8">
          <h2 className="text-xl font-bold mb-4">Welcome to Hangman Game!</h2>
          <p className="mb-4">Select a category to start playing:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
              <button
                  key={category}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  aria-label={`Select category ${category}`}
                  onClick={() => onSelectCategory(category)}>{category}</button>
              ))}
          </div>
        </div>
    </div>
  );
}

export default CategorySelection;
