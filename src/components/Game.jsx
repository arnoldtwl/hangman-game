import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeGuess, gameWon, gameLost, revealHint, restartGame, toggleHint } from '../store/store';
import HangmanFigure from './HangmanFigure';
import Keyboard from './Keyboard';
import WordToGuess from './WordToGuess';
import Scoreboard from './Scoreboard';
import GameControls from './GameControls';
import { DIFFICULTY_CONFIG } from '../config/difficulty';
import { useAudio } from '../audio/AudioProvider';

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
        hintsUsed,
        isLoadingRound,
        roundSource,
        difficulty,
        maxIncorrectGuesses,
    } = useSelector((state) => state.hangman);
    const hiddenInput = useRef(null);
    const pageHeadingRef = useRef(null);
    const playingPanelRef = useRef(null);
    const resultHeadingRef = useRef(null);
    const previousCorrectGuesses = useRef(correctGuesses);
    const previousIncorrectGuesses = useRef(incorrectGuesses);
    const previousCorrectGuessesForSound = useRef(correctGuesses);
    const previousIncorrectGuessesForSound = useRef(incorrectGuesses);
    const previousHintsUsed = useRef(hintsUsed);
    const previousStatus = useRef(status);
    const previousHintsUsedForSound = useRef(hintsUsed);
    const previousStatusForSound = useRef(status);
    const previousShowHint = useRef(showHint);
    const previousLoadingState = useRef(isLoadingRound);
    const { markInteracted, playSound } = useAudio();
    const [politeAnnouncement, setPoliteAnnouncement] = useState('');
    const [assertiveAnnouncement, setAssertiveAnnouncement] = useState('');
    const remainingChances = maxIncorrectGuesses - incorrectGuesses.length;

    const handleGuess = (letter) => {
        if (status === 'Playing' && !isLoadingRound) {
            markInteracted();
            dispatch(makeGuess(letter));
        }
    };

    const handleHint = () => {
        markInteracted();
        dispatch(revealHint());
    };

    const handleReset = () => {
        markInteracted();
        dispatch(restartGame());
    };

    const handleToggleHint = () => {
        dispatch(toggleHint());
    };

    const handlePlay = () => {
        markInteracted();
        dispatch(restartGame());
    };

    const handleFocusInput = () => {
        markInteracted();
        hiddenInput.current?.focus({ preventScroll: true });
    };

    const handleKeyPress = (event) => {
        const key = event.key.toUpperCase();

        if (event.key === 'F1') {
            event.preventDefault();
            navigate('/help');
            return;
        }

        if (event.key === 'F2') {
            event.preventDefault();
            handleHint();
            return;
        }

        if (event.key === 'F5') {
            event.preventDefault();
            handleReset();
            return;
        }

        if (status === 'Playing' && !isLoadingRound && /^[A-Z]$/.test(key)) {
            handleGuess(key);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isLoadingRound, navigate, status]);

    useEffect(() => {
        if (isLoadingRound) {
            pageHeadingRef.current?.focus();
            return;
        }

        if (status === 'Playing') {
            playingPanelRef.current?.focus();
            return;
        }

        resultHeadingRef.current?.focus();
    }, [isLoadingRound, status]);

    useEffect(() => {
        if (isLoadingRound) {
            return;
        }

        if (incorrectGuesses.length === maxIncorrectGuesses) {
            dispatch(gameLost());
        } else if (word.split('').every((letter) => correctGuesses.includes(letter) || letter === ' ')) {
            dispatch(gameWon());
        }
    }, [correctGuesses, dispatch, incorrectGuesses, isLoadingRound, maxIncorrectGuesses, word]);

    useEffect(() => {
        if (isLoadingRound) {
            return;
        }

        const currentCorrectGuessesCount = correctGuesses.length;
        const currentIncorrectGuessesCount = incorrectGuesses.length;

        if (
            currentCorrectGuessesCount > previousCorrectGuessesForSound.current.length &&
            hintsUsed === previousHintsUsedForSound.current
        ) {
            playSound('correct');
        }

        if (currentIncorrectGuessesCount > previousIncorrectGuessesForSound.current.length) {
            playSound('incorrect');
        }

        if (status !== previousStatusForSound.current) {
            if (status === 'You have won!') {
                playSound('win');
            } else if (status === 'You have lost!') {
                playSound('lose');
            }
        }

        previousCorrectGuessesForSound.current = correctGuesses;
        previousIncorrectGuessesForSound.current = incorrectGuesses;
        previousHintsUsedForSound.current = hintsUsed;
        previousStatusForSound.current = status;
    }, [correctGuesses, hintsUsed, incorrectGuesses, isLoadingRound, playSound, status]);

    useEffect(() => {
        if (isLoadingRound) {
            setPoliteAnnouncement(`Preparing a ${DIFFICULTY_CONFIG[difficulty].label.toLowerCase()} round.`);
            previousLoadingState.current = true;
            return;
        }

        if (previousLoadingState.current) {
            setPoliteAnnouncement(`Round ready. ${DIFFICULTY_CONFIG[difficulty].label} difficulty. ${remainingChances} of ${maxIncorrectGuesses} chances left.`);
            previousLoadingState.current = false;
        }
    }, [difficulty, isLoadingRound, maxIncorrectGuesses, remainingChances]);

    useEffect(() => {
        if (isLoadingRound) {
            return;
        }

        const newCorrectGuess = correctGuesses.find((letter) => !previousCorrectGuesses.current.includes(letter));
        const newIncorrectGuess = incorrectGuesses.find((letter) => !previousIncorrectGuesses.current.includes(letter));

        if (newCorrectGuess && hintsUsed === previousHintsUsed.current) {
            setPoliteAnnouncement(`Correct guess: ${newCorrectGuess}. ${remainingChances} chances left.`);
        }

        if (newIncorrectGuess) {
            setAssertiveAnnouncement(`Incorrect guess: ${newIncorrectGuess}. ${remainingChances} of ${maxIncorrectGuesses} chances left.`);
        }

        if (hintsUsed > previousHintsUsed.current) {
            setPoliteAnnouncement(`Hint revealed. Definition shown. ${remainingChances} chances left.`);
        }

        if (showHint && !previousShowHint.current && hintsUsed === previousHintsUsed.current) {
            setPoliteAnnouncement('Definition hint shown.');
        }

        if (!showHint && previousShowHint.current) {
            setPoliteAnnouncement('Definition hint hidden.');
        }

        if (status !== previousStatus.current) {
            if (status === 'You have won!') {
                setAssertiveAnnouncement('You have won the round.');
            } else if (status === 'You have lost!') {
                setAssertiveAnnouncement(`You have lost the round. The word was ${word}.`);
            }
        }

        previousCorrectGuesses.current = correctGuesses;
        previousIncorrectGuesses.current = incorrectGuesses;
        previousHintsUsed.current = hintsUsed;
        previousStatus.current = status;
        previousShowHint.current = showHint;
    }, [correctGuesses, hintsUsed, incorrectGuesses, isLoadingRound, maxIncorrectGuesses, remainingChances, showHint, status, word]);

    return (
        <section
            className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden relative"
            aria-labelledby="game-page-title"
        >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <h1 id="game-page-title" ref={pageHeadingRef} tabIndex={-1} className="sr-only">
                Hangman game
            </h1>
            <p className="sr-only" aria-live="polite" aria-atomic="true">{politeAnnouncement}</p>
            <p className="sr-only" aria-live="assertive" aria-atomic="true">{assertiveAnnouncement}</p>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-32 pb-8 flex flex-col lg:flex-row gap-8 items-start justify-center">
                <div className="w-full lg:w-2/3 flex flex-col gap-6">
                    <section className="backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden" aria-labelledby="current-round-heading">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50" />

                        <div className="flex flex-col items-center gap-8 py-4">
                            <div className="transform scale-90 lg:scale-100 transition-transform duration-300">
                                <HangmanFigure onClick={handleToggleHint} showHint={showHint} />
                            </div>

                            <div className="w-full flex flex-col items-center gap-4">
                                <h2 id="current-round-heading" className="sr-only">Current round</h2>

                                {isLoadingRound ? (
                                    <div className="w-full max-w-2xl rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-6 py-8 text-center shadow-lg shadow-cyan-500/10" role="status" aria-live="polite">
                                        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-400" />
                                        <p className="text-lg font-semibold text-cyan-100">Preparing your next word...</p>
                                        <p className="mt-2 text-sm text-slate-200">Fetching a random word and dictionary definition.</p>
                                    </div>
                                ) : (
                                    <div ref={playingPanelRef} tabIndex={-1} className="focus:outline-none rounded-xl">
                                        <WordToGuess />
                                    </div>
                                )}

                                {!isLoadingRound && (
                                    <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-200">
                                        <span className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2">
                                            {DIFFICULTY_CONFIG[difficulty].label}
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2">
                                            {remainingChances} of {maxIncorrectGuesses} chances left
                                        </span>
                                    </div>
                                )}

                                {showHint && !isLoadingRound && (
                                    <div id="definition-hint-panel" className="animate-fade-in px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-50 text-sm lg:text-base font-medium flex items-center gap-3 backdrop-blur-sm shadow-lg shadow-cyan-500/5 max-w-2xl text-center" role="note">
                                        <div className="bg-cyan-500/20 p-2 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-300" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span><strong className="text-cyan-200 uppercase tracking-wider text-xs block mb-1">Definition Hint</strong> {hint}</span>
                                    </div>
                                )}

                                {roundSource === 'local' && !isLoadingRound && (
                                    <p className="text-xs uppercase tracking-[0.2em] text-amber-200" role="status">
                                        Local fallback round active
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-xl" aria-labelledby="game-actions-heading">
                        <h2 id="game-actions-heading" className="sr-only">Game actions</h2>
                        {status === 'Playing' ? (
                            <>
                                <input
                                    ref={hiddenInput}
                                    type="text"
                                    className="sr-only"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    inputMode="text"
                                    autoComplete="off"
                                    onChange={(event) => {
                                        const letter = event.target.value.slice(-1).toUpperCase();
                                        if (/^[A-Z]$/.test(letter)) {
                                            handleGuess(letter);
                                        }
                                        event.target.value = '';
                                    }}
                                />

                                <div className="flex flex-col gap-6">
                                    <Keyboard
                                        onGuess={handleGuess}
                                        guessedLetters={[...correctGuesses, ...incorrectGuesses]}
                                        disabled={isLoadingRound}
                                    />

                                    <div className="border-t border-white/5 pt-4">
                                        <GameControls
                                            onHint={handleHint}
                                            onReset={handleReset}
                                            onFocusInput={handleFocusInput}
                                            disabled={isLoadingRound}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <h3
                                    ref={resultHeadingRef}
                                    tabIndex={-1}
                                    className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-300 to-blue-300 text-transparent bg-clip-text"
                                >
                                    {status}
                                </h3>
                                {status === 'You have lost!' && (
                                    <p className="text-xl text-slate-100 mb-8">
                                        The word was: <span className="font-bold text-red-300">{word}</span>
                                    </p>
                                )}

                                <div className="flex justify-center gap-4">
                                    {status === 'You have won!' ? (
                                        <button
                                            type="button"
                                            onClick={handlePlay}
                                            className="focus-ring px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all duration-200"
                                        >
                                            Continue Playing
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="focus-ring px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all duration-200"
                                        >
                                            Play Again
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                <div className="w-full lg:w-1/3">
                    <div className="sticky top-24">
                        <Scoreboard showButtons={false} compact={false} />

                        <section className="mt-6 backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl p-6 shadow-xl" aria-labelledby="quick-tips-heading">
                            <h2 id="quick-tips-heading" className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                Quick Tips
                            </h2>
                            <ul className="space-y-2 text-sm text-slate-200">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5" />
                                    Use keyboard or click letters
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5" />
                                    {DIFFICULTY_CONFIG[difficulty].label} mode gives you {maxIncorrectGuesses} mistakes
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5" />
                                    F1 for Help, F2 for Hint
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5" />
                                    Hints cost points
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Game;
