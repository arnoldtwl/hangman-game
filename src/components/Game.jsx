import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeGuess, gameWon, gameLost, revealHint, restartGame, toggleHint } from '../store/store';
import HangmanFigure from './HangmanFigure';
import Keyboard from './Keyboard';
import WordToGuess from './WordToGuess';
import Scoreboard from './Scoreboard';
import GameControls from './GameControls';

const Game = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        word,
        correctGuesses,
        incorrectGuesses,
        status,
        showHint,
        hint,
        isLoadingRound,
        roundSource,
    } = useSelector((state) => state.hangman);
    const hiddenInput = useRef(null);

    const handleGuess = (letter) => {
        if (status === "Playing" && !isLoadingRound) {
            dispatch(makeGuess(letter));
        }
    };

    const handleHint = () => {
        dispatch(revealHint());
    };

    const handleReset = () => {
        dispatch(restartGame());
    };

    const handleToggleHint = () => {
        dispatch(toggleHint());
    };

    const handlePlay = () => {
        dispatch(restartGame());
    };

    // Handle physical keyboard input
    const handleKeyPress = (e) => {
        const key = e.key.toUpperCase();

        // Handle Shortcuts
        if (e.key === 'F1') {
            e.preventDefault();
            navigate('/help');
            return;
        }
        if (e.key === 'F2') {
            e.preventDefault();
            handleHint();
            return;
        }
        if (e.key === 'F5') {
            e.preventDefault();
            handleReset();
            return;
        }

        if (status === "Playing" && !isLoadingRound && /^[A-Z]$/.test(key)) {
            handleGuess(key);
        }
    };

    // Focus hidden input on mobile
    const focusInput = () => {
        if (hiddenInput.current) {
            hiddenInput.current.focus({ preventScroll: true });
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        focusInput();
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [status, navigate]); // Added navigate dependency

    useEffect(() => {
        if (isLoadingRound) {
            return;
        }

        if (incorrectGuesses.length === 6) {
            dispatch(gameLost());
        } else if (word.split("").every((letter) => correctGuesses.includes(letter) || letter === " ")) {
            dispatch(gameWon());
        }
    }, [correctGuesses, incorrectGuesses, word, dispatch, isLoadingRound]);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>



            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-32 pb-8 flex flex-col lg:flex-row gap-8 items-start justify-center">

                {/* Left Column: Game Area */}
                <div className="w-full lg:w-2/3 flex flex-col gap-6">
                    {/* Main Game Card */}
                    <div className="backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50" />

                        <div className="flex flex-col items-center gap-8 py-4">
                            <div className="transform scale-90 lg:scale-100 transition-transform duration-300">
                                <HangmanFigure onClick={handleToggleHint} />
                            </div>

                            <div className="w-full flex flex-col items-center gap-4">
                                {isLoadingRound ? (
                                    <div className="w-full max-w-2xl rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-6 py-8 text-center shadow-lg shadow-cyan-500/10">
                                        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-400" />
                                        <p className="text-lg font-semibold text-cyan-100">Preparing your next word...</p>
                                        <p className="mt-2 text-sm text-slate-400">Fetching a random word and dictionary definition.</p>
                                    </div>
                                ) : (
                                    <WordToGuess />
                                )}

                                {showHint && !isLoadingRound && (
                                    <div className="animate-fade-in px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-100 text-sm lg:text-base font-medium flex items-center gap-3 backdrop-blur-sm shadow-lg shadow-cyan-500/5 max-w-2xl text-center">
                                        <div className="bg-cyan-500/20 p-2 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span><strong className="text-cyan-400 uppercase tracking-wider text-xs block mb-1">Definition Hint</strong> {hint}</span>
                                    </div>
                                )}

                                {roundSource === "local" && !isLoadingRound && (
                                    <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80">
                                        Local fallback round active
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Controls & Keyboard */}
                    <div className="backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-xl">
                        {status === "Playing" ? (
                            <>
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

                                <div className="flex flex-col gap-6">
                                    <Keyboard
                                        onGuess={handleGuess}
                                        guessedLetters={[...correctGuesses, ...incorrectGuesses]}
                                        disabled={isLoadingRound}
                                    />

                                    <div className="border-t border-white/5 pt-4">
                                        <GameControls onHint={handleHint} onReset={handleReset} disabled={isLoadingRound} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                                    {status}
                                </h3>
                                {status === "You have lost!" && (
                                    <p className="text-xl text-slate-300 mb-8">
                                        The word was: <span className="font-bold text-red-400">{word}</span>
                                    </p>
                                )}

                                <div className="flex justify-center gap-4">
                                    {status === "You have won!" ? (
                                        <button
                                            onClick={handlePlay}
                                            className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all duration-200"
                                        >
                                            Continue Playing
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleReset}
                                            className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all duration-200"
                                        >
                                            Play Again
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Scoreboard */}
                <div className="w-full lg:w-1/3">
                    <div className="sticky top-24">
                        <Scoreboard showButtons={false} compact={false} />

                        {/* Instructions Card */}
                        <div className="mt-6 backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-xl">
                            <h4 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                Quick Tips
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5" />
                                    Use keyboard or click letters
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5" />
                                    F1 for Help, F2 for Hint
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5" />
                                    Hints cost points!
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
