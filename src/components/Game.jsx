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

    const handlePlay = () => {
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
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white overflow-x-hidden">
            <Header />
            
            {/* Score display at the top */}
            <div className="w-full max-w-6xl mx-auto px-4 pt-20">
                <div className="flex justify-end">
                    <div className="w-[300px]">
                        <Scoreboard showButtons={false} compact={true} />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-6xl mx-auto px-2 pt-4 pb-4 lg:px-4 lg:pb-8">
                <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-start">
                    <div className="flex flex-col items-center w-full space-y-2 lg:space-y-4">
                        <div className="w-full max-w-[280px] lg:max-w-none">
                            <HangmanFigure />
                        </div>
                        <WordToGuess />
                        {showHint && (
                            <div className="hint text-center mt-1 text-sm lg:text-lg text-cyan-400">
                                {hint}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center w-full space-y-2 lg:space-y-4">
                        {status === "Playing" ? (
                            <>
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

                                <div className="w-full max-w-[350px] lg:max-w-none">
                                    <Keyboard 
                                        onGuess={handleGuess} 
                                        guessedLetters={[...correctGuesses, ...incorrectGuesses]} 
                                    />
                                </div>

                                {/* Game Controls */}
                                <div className="mt-2 lg:mt-4">
                                    <GameControls onHint={handleHint} onReset={handleReset} />
                                </div>

                                {/* Instructions */}
                                <div className="text-center mt-4 px-4 w-full">
                                    <p className="mb-2 text-sm text-slate-300">
                                        {window.innerWidth < 1024 
                                            ? "Use your phone's keyboard to make guesses"
                                            : "Use your keyboard or click the letters above to make guesses"
                                        }
                                    </p>
                                    <div className="hidden lg:block space-y-1 text-xs text-slate-400">
                                        <p><strong>F1:</strong> Open Help</p>
                                        <p><strong>F2:</strong> Reveal Hint</p>
                                        <p><strong>F5:</strong> Restart Game</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center mt-4">
                                <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                                    {status}
                                </div>
                                {status === "You have lost!" && (
                                    <div className="text-xl mb-4">
                                        The word was:{' '}
                                        <span className="font-bold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
                                            {word}
                                        </span>
                                    </div>
                                )}
                                <div className="mt-8 space-x-4">
                                    {status === "You have won!" ? (
                                        <>
                                            <button
                                                onClick={handlePlay}
                                                className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-xs shadow-purple-500/20"
                                                aria-label="Continue"
                                            >
                                                Continue
                                            </button>
                                            <button
                                                onClick={handleReset}
                                                className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-xs shadow-green-500/20"
                                                aria-label="Reset"
                                            >
                                                Reset
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleReset}
                                            className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-xs shadow-red-500/20"
                                            aria-label="Play Again"
                                        >
                                            Play Again
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
