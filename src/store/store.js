import { configureStore, createSlice } from "@reduxjs/toolkit";
import { getRandomWordWithHints } from "../utils/utils";

const randomWordWithHint = getRandomWordWithHints();

const initialState = {
    word: randomWordWithHint.word,
    hint: randomWordWithHint.hint,
    correctGuesses: [],
    incorrectGuesses: [],
    status: "Not Started",
    showHelp: false,
    showHint: false,
    hintsUsed: 0,
    maxHints: 3,
    points: 0,
    streak: 0,
    highScore: 0,
    lastGameWon: false,
};

const hangmanSlice = createSlice({
    name: "hangman",
    initialState,
    reducers: {
        makeGuess: (state, action) => {
            const letter = action.payload;
            if (state.word.includes(letter)) {
                state.correctGuesses.push(letter);
                const letterCount = state.word.split('').filter(l => l === letter).length;
                let points = 0;
                if (letterCount === 1) points = 1;
                else if (letterCount === 2) points = 2;
                else if (letterCount >= 3) points = 3;

                state.streak += 1;
                let multiplier = 1;
                if (state.streak >= 3 && state.streak <= 4) multiplier = 2;
                else if (state.streak >= 5 && state.streak <= 6) multiplier = 3;
                else if (state.streak >= 7) multiplier = 4;

                state.points += points * multiplier;
                state.points += 10;
            } else {
                state.incorrectGuesses.push(letter);
                state.streak = 0;
                state.points -= 5;
            }
        },
        restartGame: (state) => {
            const newRandomWordWithHint = getRandomWordWithHints();
            state.word = newRandomWordWithHint.word;
            state.hint = newRandomWordWithHint.hint;
            state.correctGuesses = [];
            state.incorrectGuesses = [];
            state.status = "Playing";
            state.showHint = false;
            state.hintsUsed = 0;
            state.streak = 0;
            if (!state.lastGameWon) {
                state.points = 0;
            }
        },
        resetGame: (state) => {
            const { word, hint } = getRandomWordWithHints();
            return {
                ...state,
                word,
                hint,
                correctGuesses: [],
                incorrectGuesses: [],
                status: 'Playing', // Set status to "Playing"
                points: 0, // Reset points to 0
                hintsUsed: 0,
                showHint: false,
                highScore: state.highScore, // Keep high score
            };
        },
        setNotStarted: (state) => {
            state.status = "Not Started";
        },
        toggleHelp: (state) => {
            state.showHelp = !state.showHelp;
        },
        gameWon: (state) => {
            state.status = "You have won!";
            const wordLength = state.word.length;
            if (wordLength >= 3 && wordLength <= 4) state.points += 50;
            else if (wordLength >= 5 && wordLength <= 6) state.points += 100;
            else if (wordLength >= 7 && wordLength <= 8) state.points += 150;
            else if (wordLength >= 9) state.points += 200;

            if (state.points > state.highScore) {
                state.highScore = state.points;
            }
            state.lastGameWon = true;
        },
        gameLost: (state) => {
            state.status = "You have lost!";
            state.lastGameWon = false;
        },
        toggleHint: (state) => {
            state.showHint = !state.showHint;
        },
        revealHint: (state) => {
            if (state.hintsUsed < state.maxHints && state.points >= 10) {
                const unrevealedLetters = state.word.split('').filter(letter => !state.correctGuesses.includes(letter) && letter !== ' ');
                if (unrevealedLetters.length > 0) {
                    const hintLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
                    state.correctGuesses.push(hintLetter);
                    state.hintsUsed += 1;
                    state.points -= 10;
                }
            }
        },
    },
});

export const { makeGuess, restartGame, resetGame, setNotStarted, toggleHelp, gameWon, gameLost, toggleHint, revealHint } = hangmanSlice.actions;

const store = configureStore({
    reducer: {
        hangman: hangmanSlice.reducer,
    },
});

export default store;