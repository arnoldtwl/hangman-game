import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-3 py-2 bg-gradient-to-r from-blue-900 via-indigo-900 to-violet-900 shadow-xs z-50">
      <button
        onClick={() => navigate('/')}
        className="text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1 rounded-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-xs"
      >
        HANGMAN
      </button>
      
      <button
        onClick={() => navigate('/help')}
        className="text-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-1 rounded-md hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-xs"
      >
        HELP
      </button>
    </header>
  );
}

export default Header;
