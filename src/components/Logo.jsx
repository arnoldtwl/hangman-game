import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
        <span className="text-2xl font-black text-white drop-shadow-md">H</span>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-slate-900"></div>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 text-transparent bg-clip-text tracking-wider drop-shadow-sm">
        HANGMAN
      </span>
    </div>
  );
};

export default Logo;
