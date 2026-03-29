// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import HelpPage from './components/HelpPage';
import HomePage from './components/Home';

import Footer from './components/Footer';
import Header from './components/Header';
import { AudioProvider } from './audio/AudioProvider';

function App() {

  return (
    <AudioProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<Game />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
