import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { makeGuess, restartGame, toggleHelp, gameWon, gameLost, selectCategory } from '../store/store';
import HangmanFigure from './HangmanFigure';
import WordToGuess from './WordToGuess';
import Keyboard from './Keyboard';
import Scoreboard from './Scoreboard';
import Help from './Help';
import CategorySelection from './CategorySelection';
import Header from './Header';

const Game = () => {
    // Get the selected category from the location state
    const location = useLocation();
    const selectedCategory = location.state?.category;

    // Define dispatch and state from Redux store
    const dispatch = useDispatch();
    const { category, word, correctGuesses, incorrectGuesses, status, showHelp, showHint, hint } = useSelector((state) => state.hangman);

    // Handler for guessing a letter
    const handleGuess = (letter) => {
        if (status === "Playing") {
            dispatch(makeGuess(letter));
        }
    };

    // Handler for restarting the game
    const handleRestart = () => {
        dispatch(restartGame(category));
    };

    // Handler for toggling help
    const toggleHelper = () => {
        dispatch(toggleHelp());
    };

    // Effect to select category on component mount
    useEffect(() => {
        dispatch(selectCategory(selectedCategory));
    }, [selectedCategory, dispatch]);

    // Effect to check for game won or lost condition
    useEffect(() => {
        if (incorrectGuesses.length === 6) {
            dispatch(gameLost());
        }

        if (word.split("").every((letter) => correctGuesses.includes(letter) || letter === " ")) {
            dispatch(gameWon());
        }
    }, [correctGuesses, incorrectGuesses, word, dispatch]);

    // If no category selected, redirect to category selection
    if (category === null) {
        return <CategorySelection />;
    }

    return (
        <div className="hangman-container bg-indigo-500 min-h-screen flex flex-col items-center justify-center p-8">
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
};

export default Game; 
