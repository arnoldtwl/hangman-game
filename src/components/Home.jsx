import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotStarted, resetGame } from '../store/store';
import Header from './Header';
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
        <div className="homepage-container min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            <Header />
            <div className="mt-20 mb-8">
                <HangmanFigure />
            </div>
            <div className="text-center max-w-2xl mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                    Welcome to Hangman Game!
                </h2>
                <div className="space-y-4 mb-8">
                    <p className="text-lg text-slate-300">
                        Guess the word letter by letter. Incorrect guesses will add a part to the hangman figure.
                    </p>
                    <p className="text-lg text-slate-300">
                        Six incorrect guesses result in losing the game.
                    </p>
                    <p className="text-lg font-semibold text-cyan-400">
                        Good luck and have fun!
                    </p>
                </div>
                <Button 
                    onClick={handlePlay} 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-12 py-3 rounded-lg text-lg font-semibold shadow-xs hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                >
                    Play Now
                </Button>
                <p className="mt-6">
                    <Link 
                        to="/help" 
                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 underline-offset-4 hover:underline"
                    >
                        Need more help? Click here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default HomePage;
