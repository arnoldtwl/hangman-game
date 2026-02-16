import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotStarted, resetGame } from '../store/store';
import HangmanFigure from './HangmanFigure';
import Button from '../utils/Button';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setNotStarted());
    }, [dispatch]);

    const handlePlay = () => {
        dispatch(resetGame());
        navigate('/game');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative pt-24">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[100px]" />
            </div>



            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 animate-fade-in-up">
                <div className="mb-12 transform hover:scale-105 transition-transform duration-500">
                    <HangmanFigure />
                </div>

                <div className="text-center max-w-2xl mx-auto space-y-8 backdrop-blur-sm bg-slate-900/30 p-8 rounded-2xl border border-white/5 shadow-2xl mb-12">
                    <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-sm">
                        Ready to Play?
                    </h2>

                    <div className="space-y-4 text-lg text-slate-300 font-light leading-relaxed">
                        <p>
                            Challenge your vocabulary in this modern take on the classic game.
                        </p>
                        <p>
                            <span className="text-red-400 font-semibold">6 mistakes</span> and it's game over.
                        </p>
                    </div>

                    <div className="pt-4 flex flex-col items-center gap-6">
                        <Button
                            onClick={handlePlay}
                            className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center gap-3">
                                PLAY NOW
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </Button>

                        <Link
                            to="/help"
                            className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium flex items-center gap-2 group"
                        >
                            <span>How to play</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
