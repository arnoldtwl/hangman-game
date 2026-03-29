import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from './App';
import { createAppStore } from './store/store';
import { SOUND_STORAGE_KEY } from './audio/AudioProvider';
import { PROGRESS_SAVE_STORAGE_KEY, PROGRESS_SAVE_VERSION } from './persistence/progressSave';

function createJsonResponse(body, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
  };
}

function createDeferred() {
  let resolve;

  const promise = new Promise((resolver) => {
    resolve = resolver;
  });

  return { promise, resolve };
}

function seedSavedProgress(overrides = {}) {
  const payload = {
    version: PROGRESS_SAVE_VERSION,
    game: {
      word: 'BANANA',
      hint: 'A long curved fruit.',
      correctGuesses: ['B'],
      incorrectGuesses: ['X'],
      status: 'Playing',
      showHint: false,
      hintsUsed: 0,
      hintPenalty: 0,
      points: 12,
      streak: 1,
      highScore: 25,
      difficulty: 'medium',
      maxIncorrectGuesses: 6,
      roundSource: 'api',
      lastGameWon: false,
      ...overrides,
    },
  };

  window.localStorage.setItem(PROGRESS_SAVE_STORAGE_KEY, JSON.stringify(payload));
}

function getChanceBadgeText(expectedText) {
  return screen.getByText(expectedText, { selector: 'span' });
}

async function findChanceBadgeText(expectedText) {
  return screen.findByText(expectedText, { selector: 'span' });
}

function getGuessButton(letter) {
  return screen.getByRole('button', { name: new RegExp(`^guess letter ${letter}$`, 'i') });
}

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

test('renders difficulty choices, starts a medium round, and displays the definition hint', async () => {
  const store = createAppStore();
  const user = userEvent.setup();
  const randomWordRequest = createDeferred();

  global.fetch = vi.fn((url) => {
    if (url.includes('random-word-api')) {
      return randomWordRequest.promise;
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

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(screen.getByRole('button', { name: /easy/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /medium/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /hard/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /mute sound effects/i })).toBeInTheDocument();
  expect(screen.getByText(/6 mistakes/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /play now/i }));

  expect(await screen.findByText(/Preparing your next word/i)).toBeInTheDocument();

  randomWordRequest.resolve(createJsonResponse(['banana']));

  await waitFor(() => {
    expect(screen.queryByText(/Preparing your next word/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Local fallback round active/i)).not.toBeInTheDocument();
  });

  expect(screen.getAllByText(/Medium/i).length).toBeGreaterThan(0);
  expect(getChanceBadgeText(/6 of 6 chances left/i)).toBeInTheDocument();

  await user.click(getGuessButton('B'));
  await user.click(screen.getByRole('button', { name: /reveal hint for 5 points/i }));

  expect(await screen.findByText(/Definition Hint/i)).toBeInTheDocument();
  expect(screen.getByText(/A long curved fruit\./i)).toBeInTheDocument();
  expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
});

test('lets players switch difficulty before starting and updates the allowed mistakes copy', async () => {
  const store = createAppStore();
  const user = userEvent.setup();

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  await user.click(screen.getByRole('button', { name: /hard/i }));

  expect(screen.getByText(/5 mistakes/i)).toBeInTheDocument();
});

test('hard mode loses after the fifth incorrect guess', async () => {
  const store = createAppStore();
  const user = userEvent.setup();

  global.fetch = vi.fn((url) => {
    if (url.includes('random-word-api')) {
      return Promise.resolve(createJsonResponse(['encyclopedia']));
    }

    if (url.includes('/entries/en/encyclopedia')) {
      return Promise.resolve(createJsonResponse([
        {
          meanings: [
            {
              definitions: [{ definition: 'A reference work containing articles.' }],
            },
          ],
        },
      ]));
    }

    return Promise.reject(new Error(`Unexpected URL: ${url}`));
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  await user.click(screen.getByRole('button', { name: /hard/i }));
  await user.click(screen.getByRole('button', { name: /play now/i }));

  await findChanceBadgeText(/5 of 5 chances left/i);
  expect(screen.getByTestId('hangman-head')).toBeInTheDocument();

  for (const letter of ['B', 'F', 'G', 'H', 'J']) {
    await user.click(getGuessButton(letter));
  }

  expect(await screen.findByText(/You have lost!/i)).toBeInTheDocument();
});

test('easy mode uses two extra guesses before the first two figure parts appear', async () => {
  const store = createAppStore();
  const user = userEvent.setup();

  global.fetch = vi.fn((url) => {
    if (url.includes('random-word-api')) {
      return Promise.resolve(createJsonResponse(['tulip']));
    }

    if (url.includes('/entries/en/tulip')) {
      return Promise.resolve(createJsonResponse([
        {
          meanings: [
            {
              definitions: [{ definition: 'A spring-blooming flower.' }],
            },
          ],
        },
      ]));
    }

    return Promise.reject(new Error(`Unexpected URL: ${url}`));
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  await user.click(screen.getByRole('button', { name: /easy/i }));
  await user.click(screen.getByRole('button', { name: /play now/i }));

  await findChanceBadgeText(/8 of 8 chances left/i);
  expect(screen.queryByTestId('hangman-head')).not.toBeInTheDocument();

  await user.click(getGuessButton('B'));
  expect(screen.queryByTestId('hangman-head')).not.toBeInTheDocument();

  await user.click(getGuessButton('C'));
  expect(screen.getByTestId('hangman-head')).toBeInTheDocument();
  expect(screen.queryByTestId('hangman-body')).not.toBeInTheDocument();

  await user.click(getGuessButton('D'));
  expect(screen.queryByTestId('hangman-body')).not.toBeInTheDocument();

  await user.click(getGuessButton('F'));
  expect(screen.getByTestId('hangman-body')).toBeInTheDocument();
});

test('mute toggle persists across remounts', async () => {
  const user = userEvent.setup();
  const firstStore = createAppStore();
  const { unmount } = render(
    <Provider store={firstStore}>
      <App />
    </Provider>,
  );

  await user.click(screen.getByRole('button', { name: /mute sound effects/i }));

  expect(window.localStorage.getItem(SOUND_STORAGE_KEY)).toBe('true');
  expect(screen.getByRole('button', { name: /unmute sound effects/i })).toBeInTheDocument();

  unmount();

  const secondStore = createAppStore();
  render(
    <Provider store={secondStore}>
      <App />
    </Provider>,
  );

  expect(screen.getByRole('button', { name: /unmute sound effects/i })).toBeInTheDocument();
});

test('muted state suppresses gameplay audio', async () => {
  const store = createAppStore();
  const user = userEvent.setup();

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

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  await user.click(screen.getByRole('button', { name: /mute sound effects/i }));
  await user.click(screen.getByRole('button', { name: /play now/i }));
  await findChanceBadgeText(/6 of 6 chances left/i);

  await user.click(getGuessButton('B'));

  expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
});

test('shows resume prompt and restores a saved in-progress game', async () => {
  seedSavedProgress();
  const store = createAppStore();
  const user = userEvent.setup();

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(screen.getByText(/Continue where you left off/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /resume game/i }));

  expect(await findChanceBadgeText(/5 of 6 chances left/i)).toBeInTheDocument();
  expect(screen.getByText(/12/)).toBeInTheDocument();
});

test('new game clears saved progress and starts fresh', async () => {
  seedSavedProgress();
  const store = createAppStore();
  const user = userEvent.setup();

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

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  await user.click(screen.getByRole('button', { name: /new game/i }));
  await findChanceBadgeText(/6 of 6 chances left/i);

  expect(window.localStorage.getItem(PROGRESS_SAVE_STORAGE_KEY)).toBeNull();
  expect(screen.queryByText(/Continue where you left off/i)).not.toBeInTheDocument();
});

test('does not save a fresh round before any letters are guessed', async () => {
  const firstStore = createAppStore();
  const user = userEvent.setup();

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

  const { unmount } = render(
    <Provider store={firstStore}>
      <App />
    </Provider>,
  );

  await user.click(screen.getByRole('button', { name: /play now/i }));
  await findChanceBadgeText(/6 of 6 chances left/i);

  expect(window.localStorage.getItem(PROGRESS_SAVE_STORAGE_KEY)).toBeNull();

  unmount();
  window.history.pushState({}, '', '/');

  const secondStore = createAppStore();
  render(
    <Provider store={secondStore}>
      <App />
    </Provider>,
  );

  expect(screen.queryByText(/Continue where you left off/i)).not.toBeInTheDocument();
});

test('renders skip navigation and announces gameplay updates accessibly', async () => {
  const store = createAppStore();
  const user = userEvent.setup();

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

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /play now/i }));
  await findChanceBadgeText(/6 of 6 chances left/i);

  await user.click(screen.getByRole('button', { name: /^guess letter b$/i }));
  expect(await screen.findByText(/Correct guess: B\./i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /reveal hint for 5 points/i }));
  expect(await screen.findByText(/Hint revealed\. Definition shown\./i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /hide definition hint/i })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /hide definition hint/i }));
  expect(await screen.findByRole('button', { name: /show definition hint/i })).toBeInTheDocument();
});

test('respects reduced-motion preference at the document level', () => {
  const originalMatchMedia = window.matchMedia;

  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  const store = createAppStore();

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(document.documentElement.dataset.reducedMotion).toBe('true');

  window.matchMedia = originalMatchMedia;
});
