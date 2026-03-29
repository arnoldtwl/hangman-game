import {
  createAppStore,
  gameWon,
  makeGuess,
  resetGame,
  restartGame,
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

  test('starts a new API-backed round and records the source', async () => {
    global.fetch = vi.fn((url) => {
      if (url.includes('random-word-api')) {
        return Promise.resolve(createJsonResponse(['apple']));
      }

      if (url.includes('/entries/en/apple')) {
        return Promise.resolve(createJsonResponse([
          {
            meanings: [
              {
                definitions: [{ definition: 'A fruit that grows on trees.' }],
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
      word: 'APPLE',
      hint: 'A fruit that grows on trees.',
      isLoadingRound: false,
      roundSource: 'api',
      status: 'Playing',
    });
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

    const store = createAppStore();

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
  });
});
