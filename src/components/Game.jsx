import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeGuess, restartGame, resetGame, gameWon, gameLost } from '../store/store';
import HangmanFigure from './HangmanFigure';
import Keyboard from './Keyboard';
import Scoreboard from './Scoreboard';
import Header from './Header';
import WordToGuess from './WordToGuess';
import Button from '../utils/button'; // Correct import

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
                <div className="text-2xl font-bold">Points: {points}</div>
                <div className="text-xl">High Score: {highScore}</div>
            </div>
            <HangmanFigure />
            {status === "Not Started" ? (
                <Button onClick={handlePlay} className="bg-green-500 text-white hover:bg-green-600 mt-4">Play</Button>
            ) : (
                <>
                    <WordToGuess />
                    {status === "Playing" ? (
                        <>
                            <Keyboard onGuess={handleGuess} guessedLetters={[...correctGuesses, ...incorrectGuesses]} handleRestart={handleRestart} />
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
