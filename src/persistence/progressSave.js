const PROGRESS_SAVE_STORAGE_KEY = 'hangman-progress-save';
const PROGRESS_SAVE_VERSION = 1;

const SAVEABLE_FIELDS = [
  'word',
  'hint',
  'correctGuesses',
  'incorrectGuesses',
  'status',
  'showHint',
  'hintsUsed',
  'hintPenalty',
  'points',
  'streak',
  'highScore',
  'difficulty',
  'maxIncorrectGuesses',
  'roundSource',
  'lastGameWon',
];

function isStringArray(value) {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
}

export function isValidSavedProgress(value) {
  if (!value || typeof value !== 'object') {
    return false;
  }

  if (value.version !== PROGRESS_SAVE_VERSION || typeof value.game !== 'object' || !value.game) {
    return false;
  }

  const game = value.game;

  return (
    typeof game.word === 'string' &&
    typeof game.hint === 'string' &&
    isStringArray(game.correctGuesses) &&
    isStringArray(game.incorrectGuesses) &&
    game.status === 'Playing' &&
    typeof game.showHint === 'boolean' &&
    typeof game.hintsUsed === 'number' &&
    typeof game.hintPenalty === 'number' &&
    typeof game.points === 'number' &&
    typeof game.streak === 'number' &&
    typeof game.highScore === 'number' &&
    typeof game.difficulty === 'string' &&
    typeof game.maxIncorrectGuesses === 'number' &&
    (typeof game.roundSource === 'string' || game.roundSource === null) &&
    typeof game.lastGameWon === 'boolean'
  );
}

export function extractSaveableProgress(state) {
  const gameState = Object.fromEntries(
    SAVEABLE_FIELDS.map((field) => [field, state[field]]),
  );

  return {
    version: PROGRESS_SAVE_VERSION,
    game: gameState,
  };
}

export function loadSavedProgress() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(PROGRESS_SAVE_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    return isValidSavedProgress(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

export function saveProgress(state) {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = extractSaveableProgress(state);
  window.localStorage.setItem(PROGRESS_SAVE_STORAGE_KEY, JSON.stringify(payload));
}

export function clearSavedProgress() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(PROGRESS_SAVE_STORAGE_KEY);
}

export { PROGRESS_SAVE_STORAGE_KEY, PROGRESS_SAVE_VERSION };
