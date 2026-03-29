import {
  PROGRESS_SAVE_STORAGE_KEY,
  PROGRESS_SAVE_VERSION,
  clearSavedProgress,
  extractSaveableProgress,
  isValidSavedProgress,
  loadSavedProgress,
  saveProgress,
} from './progressSave';

describe('progress save helpers', () => {
  const validState = {
    word: 'BANANA',
    hint: 'A long curved fruit.',
    correctGuesses: ['B'],
    incorrectGuesses: ['X'],
    status: 'Playing',
    showHint: true,
    hintsUsed: 1,
    hintPenalty: 5,
    points: 12,
    streak: 1,
    highScore: 20,
    difficulty: 'medium',
    maxIncorrectGuesses: 6,
    roundSource: 'api',
    lastGameWon: false,
  };

  test('returns null when no saved progress exists', () => {
    expect(loadSavedProgress()).toBeNull();
  });

  test('loads valid saved progress', () => {
    const payload = {
      version: PROGRESS_SAVE_VERSION,
      game: validState,
    };

    window.localStorage.setItem(PROGRESS_SAVE_STORAGE_KEY, JSON.stringify(payload));

    expect(loadSavedProgress()).toEqual(payload);
  });

  test('ignores invalid saved progress', () => {
    window.localStorage.setItem(PROGRESS_SAVE_STORAGE_KEY, JSON.stringify({
      version: 999,
      game: validState,
    }));

    expect(loadSavedProgress()).toBeNull();
    expect(isValidSavedProgress({ version: PROGRESS_SAVE_VERSION, game: { status: 'Playing' } })).toBe(false);
  });

  test('saves the expected fields', () => {
    saveProgress(validState);

    expect(loadSavedProgress()).toEqual({
      version: PROGRESS_SAVE_VERSION,
      game: validState,
    });
    expect(extractSaveableProgress(validState)).toEqual({
      version: PROGRESS_SAVE_VERSION,
      game: validState,
    });
  });

  test('clears saved progress', () => {
    saveProgress(validState);
    clearSavedProgress();

    expect(window.localStorage.getItem(PROGRESS_SAVE_STORAGE_KEY)).toBeNull();
  });
});
