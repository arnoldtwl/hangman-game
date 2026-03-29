// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Game from './components/Game';
import HelpPage from './components/HelpPage';
import HomePage from './components/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import { AudioProvider } from './audio/AudioProvider';
import { usePrefersReducedMotion } from './accessibility/usePrefersReducedMotion';

function RouteAnnouncer() {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState('Home page loaded');

  useEffect(() => {
    const pageNameByPath = {
      '/': 'Home page loaded',
      '/game': 'Game page loaded',
      '/help': 'Help page loaded',
    };

    setAnnouncement(pageNameByPath[location.pathname] ?? 'Page loaded');
  }, [location.pathname]);

  return (
    <p className="sr-only" aria-live="polite" aria-atomic="true">
      {announcement}
    </p>
  );
}

function App() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <AudioProvider>
      <Router>
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        <div className={`flex flex-col min-h-screen ${prefersReducedMotion ? 'reduce-motion' : ''}`}>
          <Header />
          <RouteAnnouncer />
          <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<Game />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
