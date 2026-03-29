import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './index.css';
import { clearSavedProgress, saveProgress } from './persistence/progressSave';
import { setHasSavedProgress } from './store/store';

let previousSavedSnapshot = null;

store.subscribe(() => {
  const state = store.getState().hangman;
  const hasGuessedAtLeastOneLetter =
    state.correctGuesses.length > 0 || state.incorrectGuesses.length > 0;

  if (state.status === 'Playing' && !state.isLoadingRound && hasGuessedAtLeastOneLetter) {
    const snapshot = JSON.stringify({
      word: state.word,
      hint: state.hint,
      correctGuesses: state.correctGuesses,
      incorrectGuesses: state.incorrectGuesses,
      showHint: state.showHint,
      hintsUsed: state.hintsUsed,
      hintPenalty: state.hintPenalty,
      points: state.points,
      streak: state.streak,
      highScore: state.highScore,
      difficulty: state.difficulty,
      maxIncorrectGuesses: state.maxIncorrectGuesses,
      roundSource: state.roundSource,
      lastGameWon: state.lastGameWon,
    });

    if (snapshot !== previousSavedSnapshot) {
      saveProgress(state);
      previousSavedSnapshot = snapshot;
      if (!state.hasSavedProgress) {
        store.dispatch(setHasSavedProgress(true));
      }
    }
    return;
  }

  if (state.status === 'Playing' && !state.isLoadingRound && !hasGuessedAtLeastOneLetter) {
    clearSavedProgress();
    previousSavedSnapshot = null;
    if (state.hasSavedProgress) {
      store.dispatch(setHasSavedProgress(false));
    }
    return;
  }

  if (state.status === 'You have won!' || state.status === 'You have lost!') {
    clearSavedProgress();
    previousSavedSnapshot = null;
    if (state.hasSavedProgress) {
      store.dispatch(setHasSavedProgress(false));
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
