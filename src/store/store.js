import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRandomWordWithHints } from "../utils/utils";
import { getPlayableWordWithHint } from "../services/wordService";

const fallbackWordWithHint = getRandomWordWithHints();

const createRoundState = ({ keepPoints = false } = {}) => ({
    word: fallbackWordWithHint.word,
    hint: fallbackWordWithHint.hint,
    correctGuesses: [],
    incorrectGuesses: [],
    status: "Playing",
    showHint: false,
    hintsUsed: 0,
    hintPenalty: 0,
    streak: 0,
    isLoadingRound: true,
    roundSource: null,
    roundError: null,
    ...(keepPoints ? {} : { points: 0 }),
});

export const resetGame = createAsyncThunk("hangman/resetGame", async () => {
    return getPlayableWordWithHint();
});

export const restartGame = createAsyncThunk(
    "hangman/restartGame",
    async (_, { getState }) => {
        const { lastGameWon } = getState().hangman;
        const round = await getPlayableWordWithHint();

        return {
            ...round,
            keepPoints: lastGameWon,
        };
    },
);

const initialState = {
    word: fallbackWordWithHint.word,
    hint: fallbackWordWithHint.hint,
    correctGuesses: [],
    incorrectGuesses: [],
    status: "Not Started",
    showHelp: false,
    showHint: false,
    hintsUsed: 0,
    hintPenalty: 0,
    maxHints: 3,
    points: 0,
    streak: 0,
    highScore: 0,
    lastGameWon: false,
    isLoadingRound: false,
    roundSource: null,
    roundError: null,
};

const hangmanSlice = createSlice({
    name: "hangman",
    initialState,
    reducers: {
        makeGuess: (state, action) => {
            const letter = action.payload;

            // Prevent duplicate guesses from artificially adding points or penalties
            if (state.correctGuesses.includes(letter) || state.incorrectGuesses.includes(letter)) {
                return;
            }
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
        setNotStarted: (state) => {
            state.status = "Not Started";
            state.points = 0;
            state.isLoadingRound = false;
            state.roundSource = null;
            state.roundError = null;
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

            // Deduct accumulated hint penalty
            state.points -= state.hintPenalty;

            if (state.points > state.highScore) {
                state.highScore = state.points;
            }
            state.lastGameWon = true;
        },
        gameLost: (state) => {
            state.status = "You have lost!";
            state.points = 0;
            state.lastGameWon = false;
        },
        toggleHint: (state) => {
            state.showHint = !state.showHint;
        },
        revealHint: (state) => {
            const unrevealedLetters = state.word.split('').filter(letter => !state.correctGuesses.includes(letter) && letter !== ' ');
            if (unrevealedLetters.length > 0) {
                const currentHintCost = 5 * (state.hintsUsed + 1);

                const hintLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
                state.correctGuesses.push(hintLetter);

                state.hintsUsed += 1;
                state.hintPenalty += currentHintCost;
            }

            state.showHint = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetGame.pending, (state) => {
                Object.assign(state, {
                    ...createRoundState(),
                    highScore: state.highScore,
                    lastGameWon: false,
                });
            })
            .addCase(resetGame.fulfilled, (state, action) => {
                Object.assign(state, {
                    ...state,
                    word: action.payload.word,
                    hint: action.payload.hint,
                    isLoadingRound: false,
                    roundSource: action.payload.source,
                    roundError: action.payload.error ?? null,
                });
            })
            .addCase(resetGame.rejected, (state, action) => {
                Object.assign(state, {
                    ...createRoundState(),
                    word: fallbackWordWithHint.word,
                    hint: fallbackWordWithHint.hint,
                    isLoadingRound: false,
                    roundSource: "local",
                    roundError: action.error.message ?? "Unable to start a new round",
                    highScore: state.highScore,
                    lastGameWon: false,
                });
            })
            .addCase(restartGame.pending, (state) => {
                Object.assign(state, {
                    ...createRoundState({ keepPoints: state.lastGameWon }),
                    points: state.lastGameWon ? state.points : 0,
                    highScore: state.highScore,
                    lastGameWon: state.lastGameWon,
                });
            })
            .addCase(restartGame.fulfilled, (state, action) => {
                Object.assign(state, {
                    ...state,
                    word: action.payload.word,
                    hint: action.payload.hint,
                    points: action.payload.keepPoints ? state.points : 0,
                    isLoadingRound: false,
                    roundSource: action.payload.source,
                    roundError: action.payload.error ?? null,
                });
            })
            .addCase(restartGame.rejected, (state, action) => {
                Object.assign(state, {
                    ...createRoundState({ keepPoints: state.lastGameWon }),
                    word: fallbackWordWithHint.word,
                    hint: fallbackWordWithHint.hint,
                    points: state.lastGameWon ? state.points : 0,
                    isLoadingRound: false,
                    roundSource: "local",
                    roundError: action.error.message ?? "Unable to restart the round",
                    highScore: state.highScore,
                    lastGameWon: state.lastGameWon,
                });
            });
    },
});

export const { makeGuess, setNotStarted, toggleHelp, gameWon, gameLost, toggleHint, revealHint } = hangmanSlice.actions;

export const createAppStore = () => configureStore({
    reducer: {
        hangman: hangmanSlice.reducer,
    },
});

const store = createAppStore();

export default store;
