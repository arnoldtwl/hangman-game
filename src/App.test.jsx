import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from './App';
import { createAppStore } from './store/store';
import { SOUND_STORAGE_KEY } from './audio/AudioProvider';

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
  expect(screen.getByText(/6 chances left/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /^B$/i }));
  await user.click(screen.getByRole('button', { name: /hint/i }));

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

  await screen.findByText(/5 chances left/i);
  expect(screen.getByTestId('hangman-head')).toBeInTheDocument();

  for (const letter of ['B', 'F', 'G', 'H', 'J']) {
    await user.click(screen.getByRole('button', { name: new RegExp(`^${letter}$`, 'i') }));
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

  await screen.findByText(/8 chances left/i);
  expect(screen.queryByTestId('hangman-head')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /^B$/i }));
  expect(screen.queryByTestId('hangman-head')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /^C$/i }));
  expect(screen.getByTestId('hangman-head')).toBeInTheDocument();
  expect(screen.queryByTestId('hangman-body')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /^D$/i }));
  expect(screen.queryByTestId('hangman-body')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /^F$/i }));
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
  await screen.findByText(/6 chances left/i);

  await user.click(screen.getByRole('button', { name: /^B$/i }));

  expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
});
