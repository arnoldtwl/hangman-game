import React, { startTransition, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSavedGame, loadSavedGame, resetGame, setDifficulty, setNotStarted } from '../store/store';
import HangmanFigure from './HangmanFigure';
import Button from '../utils/Button';
import { Link, useNavigate } from 'react-router-dom';
import { DIFFICULTY_CONFIG } from '../config/difficulty';
import { useAudio } from '../audio/AudioProvider';
import { clearSavedProgress, loadSavedProgress } from '../persistence/progressSave';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoadingRound, difficulty, maxIncorrectGuesses, hasSavedProgress, status } = useSelector((state) => state.hangman);
    const { markInteracted } = useAudio();
    const headingRef = useRef(null);

    useEffect(() => {
        if (!hasSavedProgress && !isLoadingRound && status !== 'Not Started') {
            dispatch(setNotStarted());
        }
    }, [dispatch, hasSavedProgress, isLoadingRound, status]);

    useEffect(() => {
        headingRef.current?.focus();
    }, []);

    const handlePlay = () => {
        markInteracted();
        clearSavedProgress();
        dispatch(clearSavedGame());
        dispatch(resetGame());
        startTransition(() => {
            navigate('/game');
        });
    };

    const handleResume = () => {
        const savedProgress = loadSavedProgress();

        if (!savedProgress) {
            dispatch(clearSavedGame());
            return;
        }

        markInteracted();
        dispatch(loadSavedGame(savedProgress.game));
        startTransition(() => {
            navigate('/game');
        });
    };

    const difficultyEntries = Object.entries(DIFFICULTY_CONFIG);

    return (
        <section
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative pt-24"
            aria-labelledby="home-page-title"
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[100px]" />
            </div>



            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 animate-fade-in-up">
                <div className="mb-12 transform hover:scale-105 transition-transform duration-500">
                    <HangmanFigure ariaHidden />
                </div>

                <div className="text-center max-w-2xl mx-auto space-y-8 backdrop-blur-sm bg-slate-900/30 p-8 rounded-2xl border border-white/5 shadow-2xl mb-12">
                    <h1
                        id="home-page-title"
                        ref={headingRef}
                        tabIndex={-1}
                        className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 text-transparent bg-clip-text drop-shadow-sm"
                    >
                        Ready to Play?
                    </h1>

                    <div className="space-y-4 text-lg text-slate-200 font-light leading-relaxed">
                        <p>
                            Challenge your vocabulary in this modern take on the classic game.
                        </p>
                        <p>
                            <span className="text-red-300 font-semibold">{maxIncorrectGuesses} mistakes</span> and it's game over on {DIFFICULTY_CONFIG[difficulty].label}.
                        </p>
                    </div>

                    <div className="pt-4 flex flex-col items-center gap-6">
                        {hasSavedProgress && (
                            <section
                                className="w-full rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-5 text-left shadow-lg shadow-emerald-500/5"
                                aria-labelledby="saved-progress-title"
                            >
                                <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Saved Progress</p>
                                <h2 id="saved-progress-title" className="mt-3 text-2xl font-bold text-white">Continue where you left off</h2>
                                <p className="mt-2 text-sm text-slate-200">
                                    Resume your current round or start a brand-new game.
                                </p>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <Button
                                        onClick={handleResume}
                                        className="focus-ring px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/20"
                                    >
                                        Resume Game
                                    </Button>
                                    <Button
                                        onClick={handlePlay}
                                        className="focus-ring px-6 py-3 rounded-xl font-bold text-white bg-slate-800/80 border border-white/10"
                                    >
                                        New Game
                                    </Button>
                                </div>
                            </section>
                        )}

                        <section className="w-full space-y-4" aria-labelledby="difficulty-heading">
                            <h2 id="difficulty-heading" className="text-xs uppercase tracking-[0.3em] text-cyan-200">Choose Difficulty</h2>
                            <div className="grid gap-3 md:grid-cols-3">
                                {difficultyEntries.map(([level, config]) => {
                                    const isSelected = difficulty === level;

                                    return (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => dispatch(setDifficulty(level))}
                                            aria-pressed={isSelected}
                                            className={`rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                                                isSelected
                                                    ? 'focus-ring border-cyan-300 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                                                    : 'focus-ring border-white/10 bg-slate-950/40 hover:border-cyan-400/40 hover:bg-slate-900/50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-white">{config.label}</span>
                                                <span className={`text-xs uppercase tracking-[0.2em] ${isSelected ? 'text-cyan-200' : 'text-slate-300'}`}>
                                                    {config.maxIncorrectGuesses} tries
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm text-slate-200">{config.description}</p>
                                            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-300">
                                                {config.minLength}-{config.maxLength} letters
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {!hasSavedProgress && (
                            <Button
                                onClick={handlePlay}
                                disabled={isLoadingRound}
                                className="focus-ring group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-3">
                                    {isLoadingRound ? 'LOADING ROUND...' : 'PLAY NOW'}
                                    {!isLoadingRound && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                </span>
                            </Button>
                        )}

                        {isLoadingRound && (
                            <p className="text-sm text-cyan-200 tracking-wide" aria-live="polite">
                                Fetching a {DIFFICULTY_CONFIG[difficulty].label.toLowerCase()} round with a fresh dictionary hint...
                            </p>
                        )}

                        <Link
                            to="/help"
                            className="focus-ring rounded-lg text-slate-300 hover:text-cyan-300 transition-colors duration-300 text-sm font-medium flex items-center gap-2 group"
                        >
                            <span>How to play</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
