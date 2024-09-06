import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotStarted, resetGame } from '../store/store';
import Button from '../utils/Button'; 

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    dispatch(resetGame()); 
    dispatch(setNotStarted());
    navigate('/');
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  return (
    <header className="header flex justify-between items-center px-6 py-4">
      <h1 className="text-2xl font-bold">
        <Button onClick={handleHomeClick} className="text-white header-button" aria-label="Hangman">Hangman</Button>
      </h1>
      <nav>
        <Button onClick={handleHelpClick} className="bg-yellow-500 text-white hover:bg-yellow-600 header-button" aria-label="Help">Help</Button>
      </nav>
    </header>
  );
}

export default Header;
