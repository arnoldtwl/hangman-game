import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeGuess, gameWon, gameLost, revealHint, restartGame } from '../store/store';
import HangmanFigure from './HangmanFigure';
import Keyboard from './Keyboard';
import WordToGuess from './WordToGuess';
import Header from './Header';
import Scoreboard from './Scoreboard';
import GuessedLetters from './GuessedLetters';
import GameControls from './GameControls';

const Game = () => {
    const dispatch = useDispatch();
    const { word, correctGuesses, incorrectGuesses, status, showHint, hint, hintsUsed } = useSelector((state) => state.hangman);
    const hiddenInput = useRef(null);

    const handleGuess = (letter) => {
        if (status === "Playing") {
            dispatch(makeGuess(letter));
        }
    };

    const handleHint = () => {
        dispatch(revealHint());
    };

    const handleReset = () => {
        dispatch(restartGame());
    };

    // Handle physical keyboard input
    const handleKeyPress = (e) => {
        const key = e.key.toUpperCase();
        if (status === "Playing" && /^[A-Z]$/.test(key)) {
            handleGuess(key);
        }
    };

    // Focus hidden input on mobile
    const focusInput = () => {
        if (hiddenInput.current) {
            hiddenInput.current.focus();
        }
    };

    useEffect(() => {
        // Add keyboard event listener
        window.addEventListener('keydown', handleKeyPress);
        // Focus input on mount
        focusInput();
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        if (incorrectGuesses.length === 6) {
            dispatch(gameLost());
        } else if (word.split("").every((letter) => correctGuesses.includes(letter) || letter === " ")) {
            dispatch(gameWon());
        }
    }, [correctGuesses, incorrectGuesses, word, dispatch]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            <Header />
            
            <div className="w-full max-w-4xl mx-auto px-4 pt-20 pb-24 md:pb-8">
                <div className="flex flex-col items-center">
                    <HangmanFigure />

                    {status === "Playing" ? (
                        <>
                            <WordToGuess />
                            {showHint && (
                                <div className="hint text-center mt-2 text-lg text-cyan-400">
                                    {hint}
                                </div>
                            )}
                            
                            {/* Hidden input for mobile keyboard */}
                            <input
                                ref={hiddenInput}
                                type="text"
                                className="opacity-0 h-0 w-0 absolute"
                                onBlur={focusInput}
                                onChange={(e) => {
                                    const letter = e.target.value.slice(-1).toUpperCase();
                                    if (/^[A-Z]$/.test(letter)) {
                                        handleGuess(letter);
                                    }
                                    e.target.value = '';
                                }}
                            />

                            {/* Show keyboard only on desktop */}
                            <div className="hidden md:block">
                                <Keyboard 
                                    onGuess={handleGuess} 
                                    guessedLetters={[...correctGuesses, ...incorrectGuesses]} 
                                />
                            </div>

                            {/* Show guessed letters grid on mobile */}
                            <div className="block md:hidden mt-4">
                                <GuessedLetters 
                                    correctGuesses={correctGuesses}
                                    incorrectGuesses={incorrectGuesses}
                                />
                            </div>

                            <Scoreboard showButtons={false} />

                            {/* Instructions */}
                            <div className="text-center mt-8 px-4">
                                <p className="mb-4 text-slate-300">
                                    {window.innerWidth < 768 
                                        ? "Use your phone's keyboard to make guesses."
                                        : "Use your keyboard or click the letters above to make guesses."
                                    }
                                </p>
                                <div className="hidden md:block space-y-2 text-sm text-slate-400">
                                    <p><strong>F1:</strong> Open Help</p>
                                    <p><strong>F2:</strong> Reveal Hint</p>
                                    <p><strong>F5:</strong> Restart Game</p>
                                </div>
                            </div>

                            {/* Mobile Game Controls */}
                            <GameControls onHint={handleHint} onReset={handleReset} />
                        </>
                    ) : (
                        <Scoreboard status={status} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Game;
