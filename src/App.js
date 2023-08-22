// App.js
import React, { useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import CategorySelection from './components/CategorySelection';

import './App.css';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategorySelection />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;


