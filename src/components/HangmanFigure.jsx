import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function HangmanFigure() {
  const { incorrectGuesses, status } = useSelector((state) => state.hangman);
  const maxIncorrectGuesses = 6;
  const [visibleParts, setVisibleParts] = useState(0);

  useEffect(() => {
    if (status === "Not Started") {
      let timer;
      for (let i = 1; i <= maxIncorrectGuesses; i++) {
        timer = setTimeout(() => {
          setVisibleParts(i);
        }, i * 500); 
      }
      return () => clearTimeout(timer);
    } else {
      setVisibleParts(incorrectGuesses.length);
    }
  }, [status, incorrectGuesses.length]);

  return (
    <div className="flex justify-center mt-4">
      <svg height="250" width="200" className="figure-container">
        {/* Drawing the hangman's gallows */}
        <line x1="60" y1="20" x2="140" y2="20" /> {/* Horizontal line at the top */}
        <line x1="140" y1="20" x2="140" y2="50" /> {/* Short vertical line connecting to the noose */}
        <line x1="60" y1="20" x2="60" y2="230" /> {/* Vertical line for the stand */}
        <line x1="20" y1="230" x2="100" y2="230" /> {/* Horizontal line at the bottom */}

        {/* Drawing the hangman figure, based on the number of visible parts */}
        {visibleParts > 0 && <circle cx="140" cy="70" r="20" className="figure-part" />} {/* Head */}
        {visibleParts > 1 && <line x1="140" y1="90" x2="140" y2="150" className="figure-part" />} {/* Body */}
        {visibleParts > 2 && <line x1="140" y1="120" x2="120" y2="100" className="figure-part" />} {/* Left arm */}
        {visibleParts > 3 && <line x1="140" y1="120" x2="160" y2="100" className="figure-part" />} {/* Right arm */}
        {visibleParts > 4 && <line x1="140" y1="150" x2="120" y2="180" className="figure-part" />} {/* Left leg */}
        {visibleParts > 5 && <line x1="140" y1="150" x2="160" y2="180" className="figure-part" />} {/* Right leg */}
      </svg>
    </div>
  );
}

export default HangmanFigure;
