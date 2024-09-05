import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeGuess, restartGame, resetGame, gameWon, gameLost } from '../store/store';
import HangmanFigure from './HangmanFigure';
import Keyboard from './Keyboard';
import Scoreboard from './Scoreboard';
import Header from './Header';
import WordToGuess from './WordToGuess';
import Button from '../utils/Button'; // Correct import
import { Link } from 'react-router-dom'; // Import Link for navigation

const Game = () => {
    const dispatch = useDispatch();
    const { word, correctGuesses, incorrectGuesses, status, showHint, hint, points, highScore } = useSelector((state) => state.hangman);

    const handleGuess = (letter) => {
        if (status === "Playing") {
            dispatch(makeGuess(letter));
        }
    };

    const handleRestart = () => {
        dispatch(restartGame());
    };

    const handlePlay = () => {
        dispatch(restartGame());
    };

    useEffect(() => {
        if (incorrectGuesses.length === 6) {
            dispatch(gameLost());
        }

        if (word.split("").every((letter) => correctGuesses.includes(letter) || letter === " ")) {
            dispatch(gameWon());
        }
    }, [correctGuesses, incorrectGuesses, word, dispatch]);

    return (
        <div className="hangman-container min-h-screen flex flex-col items-center justify-center p-8 pt-40"> {/* Adjust padding-top */}
            <Header />
            <div className="points-display">
                <div className="text-2xl font-bold">Score: {points}</div>
                <div className="text-xl">High Score: {highScore}</div>
            </div>
            <HangmanFigure />
            {status === "Not Started" ? (
                <div className="text-center mt-8">
                    <h2 className="text-2xl font-bold mb-4">Welcome to Hangman Game!</h2>
                    <p className="mb-4">Guess the word letter by letter. Incorrect guesses will add a part to the hangman figure. Six incorrect guesses result in losing the game.</p>
                    <p className="mb-4">Good luck and have fun!</p>
                    <Button onClick={handlePlay} className="bg-green-500 text-white hover:bg-green-600 mt-4 play-button">Play</Button>
                    <p className="mt-4"><Link to="/help" className="text-blue-500 hover:underline">Need more help? Click here</Link></p>
                </div>
            ) : (
                <>
                    <WordToGuess />
                    {status === "Playing" ? (
                        <>
                            <Keyboard onGuess={handleGuess} guessedLetters={[...correctGuesses, ...incorrectGuesses]} handleRestart={handleRestart} />
                            <div className="text-center mt-8">
                                <p className="mb-4">Use the on-screen keyboard or your physical keyboard to make guesses. You can also use the following shortcuts:</p>
                                <ul className="list-disc list-inside mb-4">
                                    <li><strong>F1:</strong> Open Help</li>
                                    <li><strong>F2:</strong> Reveal a Hint (costs 10 points, max 3 hints per word)</li>
                                    <li><strong>F5:</strong> Restart Game</li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <Scoreboard status={status === "Not Started" ? "" : status} onRestart={handleRestart} />
                    )}
                    {showHint && <div className="hint text-center mt-2 text-lg text-gray-700">{hint}</div>}
                </>
            )}
        </div>
    );
};

export default Game;
