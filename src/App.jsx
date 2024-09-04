// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import HelpPage from './components/HelpPage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;


