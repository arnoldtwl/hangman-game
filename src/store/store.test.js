import {
  clearSavedGame,
  createAppStore,
  gameWon,
  loadSavedGame,
  makeGuess,
  resetGame,
  restartGame,
  setDifficulty,
} from './store';

function createJsonResponse(body, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
  };
}

describe('hangman store async rounds', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('defaults to medium difficulty and lets players change it before a round', () => {
    const store = createAppStore();

    expect(store.getState().hangman.difficulty).toBe('medium');
    expect(store.getState().hangman.maxIncorrectGuesses).toBe(6);

    store.dispatch(setDifficulty('hard'));

    expect(store.getState().hangman.difficulty).toBe('hard');
    expect(store.getState().hangman.maxIncorrectGuesses).toBe(5);
    expect(store.getState().hangman.status).toBe('Not Started');
  });

  test('starts a new API-backed round and records the source', async () => {
    global.fetch = vi.fn((url) => {
      if (url.includes('random-word-api')) {
        return Promise.resolve(createJsonResponse(['banana']));
      }

      if (url.includes('/entries/en/banana')) {
        return Promise.resolve(createJsonResponse([
          {
            meanings: [
              {
                definitions: [{ definition: 'A long curved fruit.' }],
              },
            ],
          },
        ]));
      }

      return Promise.reject(new Error(`Unexpected URL: ${url}`));
    });

    const store = createAppStore();
    const dispatchPromise = store.dispatch(resetGame());

    expect(store.getState().hangman.isLoadingRound).toBe(true);
    expect(store.getState().hangman.status).toBe('Playing');

    await dispatchPromise;

    expect(store.getState().hangman).toMatchObject({
      word: 'BANANA',
      hint: 'A long curved fruit.',
      isLoadingRound: false,
      roundSource: 'api',
      status: 'Playing',
      difficulty: 'medium',
      maxIncorrectGuesses: 6,
    });
  });

  test('requests words using the selected difficulty', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse(['apple']))
      .mockResolvedValueOnce(createJsonResponse(['encyclopedia']))
      .mockResolvedValueOnce(createJsonResponse([
        {
          meanings: [
            {
              definitions: [{ definition: 'A reference work containing articles.' }],
            },
          ],
        },
      ]));

    const store = createAppStore();
    store.dispatch(setDifficulty('hard'));

    await store.dispatch(resetGame());

    expect(store.getState().hangman.word).toBe('ENCYCLOPEDIA');
    expect(store.getState().hangman.difficulty).toBe('hard');
    expect(store.getState().hangman.maxIncorrectGuesses).toBe(5);
  });

  test('falls back to local data when API requests fail', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('offline'));

    const store = createAppStore();

    await store.dispatch(resetGame());

    expect(store.getState().hangman.isLoadingRound).toBe(false);
    expect(store.getState().hangman.roundSource).toBe('local');
    expect(store.getState().hangman.roundError).toBe('offline');
  });

  test('preserves score when restarting after a win', async () => {
    const store = createAppStore();
    store.dispatch(setDifficulty('easy'));

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse(['cat']))
      .mockResolvedValueOnce(createJsonResponse([
        {
          meanings: [
            {
              definitions: [{ definition: 'A small domesticated feline.' }],
            },
          ],
        },
      ]))
      .mockResolvedValueOnce(createJsonResponse(['dog']))
      .mockResolvedValueOnce(createJsonResponse([
        {
          meanings: [
            {
              definitions: [{ definition: 'A domesticated canine animal.' }],
            },
          ],
        },
      ]));

    await store.dispatch(resetGame());
    store.dispatch(makeGuess('C'));
    store.dispatch(makeGuess('A'));
    store.dispatch(makeGuess('T'));
    store.dispatch(gameWon());

    const winningScore = store.getState().hangman.points;

    await store.dispatch(restartGame());

    expect(store.getState().hangman.word).toBe('DOG');
    expect(store.getState().hangman.points).toBe(winningScore);
    expect(store.getState().hangman.roundSource).toBe('api');
    expect(store.getState().hangman.difficulty).toBe('easy');
  });

  test('hydrates and clears saved game state', () => {
    const store = createAppStore();

    store.dispatch(loadSavedGame({
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
      highScore: 25,
      difficulty: 'medium',
      maxIncorrectGuesses: 6,
      roundSource: 'api',
      lastGameWon: false,
    }));

    expect(store.getState().hangman).toMatchObject({
      word: 'BANANA',
      correctGuesses: ['B'],
      incorrectGuesses: ['X'],
      hasSavedProgress: true,
      status: 'Playing',
    });

    store.dispatch(clearSavedGame());

    expect(store.getState().hangman.hasSavedProgress).toBe(false);
  });
});
