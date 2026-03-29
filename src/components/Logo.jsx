import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg transition-transform duration-300 hover:rotate-6 sm:h-10 sm:w-10">
        <span className="text-xl font-black text-white drop-shadow-md sm:text-2xl">H</span>
        <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-purple-500 sm:h-4 sm:w-4"></div>
      </div>
      <span className="hidden bg-gradient-to-r from-white to-slate-300 bg-clip-text text-xl font-bold tracking-[0.2em] text-transparent drop-shadow-sm min-[430px]:inline sm:text-2xl">
        HANGMAN
      </span>
    </div>
  );
};

export default Logo;
