// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import HelpPage from './components/HelpPage';
import HomePage from './components/Home';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;


