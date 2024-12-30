import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../utils/Button'; 

function Header() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  return (
    <header className="header fixed top-0 left-0 right-0 flex justify-between items-center px-4 md:px-8 py-4 md:py-6 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg z-50">
      <nav className="text-xl md:text-2xl font-bold">
        <Button 
          onClick={handleHomeClick} 
          className="header-button bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 md:px-6 py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300" 
          aria-label="Hangman"
        >
          Hangman
        </Button>
      </nav>
      <nav className="hidden md:block">
        <Button 
          onClick={handleHelpClick} 
          className="header-button bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300" 
          aria-label="Help"
        >
          Help
        </Button>
      </nav>
    </header>
  );
}

export default Header;
