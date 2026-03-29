import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from './App';
import { createAppStore } from './store/store';

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

test('loads a round, shows the game loading state, and displays the definition hint', async () => {
  const store = createAppStore();
  const user = userEvent.setup();
  const randomWordRequest = createDeferred();

  global.fetch = vi.fn((url) => {
    if (url.includes('random-word-api')) {
      return randomWordRequest.promise;
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

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  await user.click(screen.getByRole('button', { name: /play now/i }));

  expect(await screen.findByText(/Preparing your next word/i)).toBeInTheDocument();

  randomWordRequest.resolve(createJsonResponse(['apple']));

  await waitFor(() => {
    expect(screen.queryByText(/Preparing your next word/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Local fallback round active/i)).not.toBeInTheDocument();
  });

  await user.click(screen.getByRole('button', { name: /hint/i }));

  expect(await screen.findByText(/Definition Hint/i)).toBeInTheDocument();
  expect(screen.getByText(/A fruit that grows on trees\./i)).toBeInTheDocument();
});
