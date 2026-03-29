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
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 border-b border-white/10 bg-slate-900/85 px-3 py-3 shadow-lg backdrop-blur-md transition-all duration-300 sm:gap-4 sm:px-6 sm:py-4">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="focus-ring shrink-0 rounded-xl transition-opacity hover:opacity-90"
        aria-label="Go to home page"
      >
        <Logo />
      </button>

      <nav className="flex items-center gap-2 sm:gap-3" aria-label="Primary">
        <button
          type="button"
          onClick={() => setMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          aria-pressed={isMuted}
          className="focus-ring group relative flex min-h-11 min-w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-800/70 px-2.5 py-2.5 transition-all duration-300 hover:border-cyan-400/60 hover:bg-slate-700/70 sm:px-4 sm:py-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors group-hover:text-cyan-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMuted ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l6 6m0-6l-6 6M11 5L6 9H3v6h3l5 4V5z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H3v6h3l5 4V5zm4.5 3.5a5 5 0 010 7m2.5-9.5a8 8 0 010 12" />
              )}
            </svg>
            <span className="hidden whitespace-nowrap min-[430px]:inline">
              {isMuted ? 'MUTED' : 'SOUND ON'}
            </span>
          </span>
        </button>

        {!isHelpPage && (
          <button
            type="button"
            onClick={() => navigate('/help')}
            className="focus-ring group relative flex min-h-11 min-w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-800/70 px-2.5 py-2.5 transition-all duration-300 hover:border-cyan-400/60 hover:bg-slate-700/70 sm:px-4 sm:py-2"
            aria-label="Open help page"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors group-hover:text-cyan-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden whitespace-nowrap min-[430px]:inline">HELP</span>
            </span>
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
