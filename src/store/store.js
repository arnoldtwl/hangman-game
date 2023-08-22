import { configureStore, createSlice } from "@reduxjs/toolkit";
import { getRandomWordWithHints } from "../utils/utils";

// Get a random word with hints
const randomWordWithHint = getRandomWordWithHints();

// Initial state of the hangman slice
const initialState = {
    category: null,
    word: randomWordWithHint.word,
    hint: randomWordWithHint.hint,
    correctGuesses: [],
    incorrectGuesses: [],
    status: "Playing",
    showHelp: false,
    showHint: false,
};

// Define a slice for hangman game
const hangmanSlice = createSlice({
    name: "hangman",
    initialState,
    reducers: {
        makeGuess: (state, action) => {
            const letter = action.payload;
            // Add the guessed letter to the correct or incorrect guesses based on whether it's in the word
            if (state.word.includes(letter)) {
                state.correctGuesses.push(letter);
            } else {
                state.incorrectGuesses.push(letter);
            }
        },
        restartGame: (state, action) => {
            // Restart the game with a new category and reset all state
            state.category = action.payload;
            const newRandomWordWithHint = getRandomWordWithHints(state.category);
            state.word = newRandomWordWithHint.word;
            state.hint = newRandomWordWithHint.hint;
            state.correctGuesses = [];
            state.incorrectGuesses = [];
            state.status = "Playing";
            state.showHint = false;
        },
        toggleHelp: (state) => {
            // Toggle the help visibility
            state.showHelp = !state.showHelp;
        },
        gameWon: (state) => {
            // Set the game status to won
            state.status = "You have won!";
        },
        gameLost: (state) => {
            // Set the game status to lost
            state.status = "You have lost!";
        },
        toggleHint: (state) => {
            // Toggle the hint visibility
            state.showHint = !state.showHint;
        },
        selectCategory: (state, action) => {
            // Select a new category and reset the game state accordingly
            state.category = action.payload;
            const randomWordWithHint = getRandomWordWithHints(state.category);
            state.word = randomWordWithHint.word;
            state.hint = randomWordWithHint.hint;
            state.correctGuesses = [];
            state.incorrectGuesses = [];
            state.status = "Playing";
            state.showHint = false;
        },
    },
});

// Export the action creators
export const { makeGuess, restartGame, toggleHelp, gameWon, gameLost, toggleHint, selectCategory } = hangmanSlice.actions;

// Configure the Redux store with the hangman slice reducer
const store = configureStore({
    reducer: {
        hangman: hangmanSlice.reducer,
    },
});

export default store; 