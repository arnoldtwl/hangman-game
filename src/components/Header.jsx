// Header component is used in both CategorySelection and Game components. It is a simple component that renders the title of the game and links to the home page.
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4">
      <h1 className="text-2xl font-bold text-center">
        <Link to="/" className="text-white">Hangman Game</Link>
      </h1>
    </header>
  );
}

export default Header;
