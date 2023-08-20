// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { getRandomWordWithHints } from "../utils/utils";

const randomWordWithHint = getRandomWordWithHints();

const initialState = {
    word: randomWordWithHint.word,
    hint: randomWordWithHint.hint,
    correctGuesses: [],
    incorrectGuesses: [],
    status: "Playing",
    showHelp: false,
    showHint: false,
};

const hangmanSlice = createSlice({
    name: "hangman",
    initialState,
    reducers: {
        makeGuess: (state, action) => {
            const letter = action.payload;
            if (state.word.includes(letter)) {
                state.correctGuesses.push(letter);
            } else {
                state.incorrectGuesses.push(letter);
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
        },
        toggleHelp: (state) => {
            state.showHelp = !state.showHelp;
        },
        gameWon: (state) => {
            state.status = "You have won!";
        },
        gameLost: (state) => {
            state.status = "You have lost!";
        },
        toggleHint: (state) => {
            state.showHint = !state.showHint;
        },
    },
});

export const { makeGuess, restartGame, toggleHelp, gameWon, gameLost, toggleHint } = hangmanSlice.actions;

const store = configureStore({
    reducer: {
        hangman: hangmanSlice.reducer,
    },
});

export default store;