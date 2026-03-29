import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useAudio } from '../audio/AudioProvider';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHelpPage = location.pathname === '/help';
  const { isMuted, setMuted } = useAudio();

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-50 backdrop-blur-md bg-slate-900/80 border-b border-white/10 shadow-lg transition-all duration-300">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="focus-ring rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
        aria-label="Go to home page"
      >
        <Logo />
      </button>

      <nav className="flex items-center gap-3" aria-label="Primary">
        <button
          type="button"
          onClick={() => setMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          aria-pressed={isMuted}
          className="focus-ring group relative px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 hover:border-cyan-400/60 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-2 text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMuted ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l6 6m0-6l-6 6M11 5L6 9H3v6h3l5 4V5z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H3v6h3l5 4V5zm4.5 3.5a5 5 0 010 7m2.5-9.5a8 8 0 010 12" />
              )}
            </svg>
            {isMuted ? 'MUTED' : 'SOUND ON'}
          </span>
        </button>

        {!isHelpPage && (
          <button
            type="button"
            onClick={() => navigate('/help')}
            className="focus-ring group relative px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 hover:border-cyan-400/60 transition-all duration-300 overflow-hidden"
            aria-label="Open help page"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2 text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              HELP
            </span>
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
