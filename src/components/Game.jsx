// Game.jsx
import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { makeGuess, restartGame, toggleHelp, gameWon, gameLost, selectCategory } from '../store/store'
import HangmanFigure from './HangmanFigure';
import WordToGuess from './WordToGuess';
import Keyboard from './Keyboard';
import Scoreboard from './Scoreboard';
import Help from './Help';
import CategorySelection from './CategorySelection';
import Header from './Header';

const Game = () => {
    const location = useLocation();
    const selectedCategory = location.state?.category;
    const dispatch = useDispatch();
    const { category, word, correctGuesses, incorrectGuesses, status, showHelp, showHint, hint } = useSelector((state) => state.hangman);

    const handleGuess = (letter) => { 
        if (status === "Playing") {
        dispatch(makeGuess(letter));
        }
    };

    const handleRestart = () => {
        dispatch(restartGame(category));
    };

    const toggleHelper = () => {
        dispatch(toggleHelp());
    };

    useEffect(() => {
    dispatch(selectCategory(selectedCategory));
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    if (incorrectGuesses.length === 6) {
      dispatch(gameLost());
    }

    if (word.split("").every((letter) => correctGuesses.includes(letter) || letter === " ")) {
      dispatch(gameWon());
    }
  }, [correctGuesses, incorrectGuesses, word, dispatch]);

    if (category === null) {
        return <CategorySelection />;
    }

  return (
    <div className="App bg-indigo-500 min-h-screen flex flex-col items-center justify-center p-8">
      <Header />
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

export default Game;