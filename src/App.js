// App.js
import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeGuess, restartGame, toggleHelp, gameWon, gameLost } from './store/store';
import HangmanFigure from './components/HangmanFigure';
import WordToGuess from './components/WordToGuess';
import Keyboard from './components/Keyboard';
import Scoreboard from './components/Scoreboard';
import Help from './components/Help';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { word, correctGuesses, incorrectGuesses, status, showHelp, showHint, hint } = useSelector((state) => state.hangman);

  const handleGuess = (letter) => { 
    if (status === "Playing") {
      dispatch(makeGuess(letter));
    }
  };

  const handleRestart = () => {
    dispatch(restartGame());
  };

  const toggleHelper = () => {
    dispatch(toggleHelp());
  };

  useEffect(() => {
    if (incorrectGuesses.length === 6) {
      dispatch(gameLost());
    }

    if (word.split("").every((letter) => correctGuesses.includes(letter))) {
      dispatch(gameWon());
    }
  }, [correctGuesses, incorrectGuesses, word, dispatch]);



  return (
    <div className="App bg-indigo-500 min-h-screen flex flex-col items-center justify-center p-8">
      <HangmanFigure incorrectGuesses={incorrectGuesses.length} />
      <WordToGuess word={word} correctGuesses={correctGuesses} status={status} />
      {status === "Playing" ? (
        <Keyboard onGuess={handleGuess} guessedLetters={[...correctGuesses, ...incorrectGuesses]} onHelp={toggleHelper} />
      ) : (
        <Scoreboard status={status} onRestart={handleRestart} onHelp={toggleHelper} />
      )}
      {showHelp && <Help onClose={toggleHelper} />}
      {showHint && <div className="hint text-center mt-2 text-lg text-gray-700">{hint}</div>}
    </div>
  );
}

export default App;


