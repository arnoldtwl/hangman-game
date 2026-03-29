import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const SOUND_STORAGE_KEY = 'hangman-sound-muted';

const SOUND_EFFECTS = {
  correct: '/audio/correct.wav',
  incorrect: '/audio/incorrect.wav',
  win: '/audio/win.wav',
  lose: '/audio/lose.wav',
};

function loadMutedPreference() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(SOUND_STORAGE_KEY) === 'true';
}

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(loadMutedPreference);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRefs = useRef({});

  useEffect(() => {
    audioRefs.current = Object.fromEntries(
      Object.entries(SOUND_EFFECTS).map(([key, src]) => {
        const audio = new Audio(src);
        audio.preload = 'auto';
        return [key, audio];
      }),
    );
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SOUND_STORAGE_KEY, String(isMuted));
  }, [isMuted]);

  const value = useMemo(() => ({
    isMuted,
    setMuted: setIsMuted,
    markInteracted: () => setHasInteracted(true),
    playSound: (soundKey) => {
      const sound = audioRefs.current[soundKey];

      if (!sound || isMuted || !hasInteracted) {
        return;
      }

      sound.currentTime = 0;
      sound.play().catch(() => {});
    },
  }), [hasInteracted, isMuted]);

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }

  return context;
}

export { SOUND_EFFECTS, SOUND_STORAGE_KEY, loadMutedPreference };
