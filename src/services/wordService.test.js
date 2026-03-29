import {
  extractDefinitionHint,
  getPlayableWordWithHint,
  normalizeWord,
} from './wordService';

function createJsonResponse(body, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
  };
}

describe('wordService', () => {
  test('normalizes supported words and phrases', () => {
    expect(normalizeWord('apple', 'easy')).toBe('APPLE');
    expect(normalizeWord('ice-cream', 'medium')).toBe('ICE CREAM');
  });

  test('rejects unsupported words', () => {
    expect(normalizeWord('hi', 'easy')).toBeNull();
    expect(normalizeWord('abc123', 'easy')).toBeNull();
    expect(normalizeWord('hello!', 'easy')).toBeNull();
  });

  test('rejects words outside the selected difficulty band', () => {
    expect(normalizeWord('apple', 'medium')).toBeNull();
    expect(normalizeWord('encyclopedia', 'hard')).toBe('ENCYCLOPEDIA');
    expect(normalizeWord('encyclopedia', 'medium')).toBeNull();
  });

  test('extracts the first usable dictionary definition', () => {
    const hint = extractDefinitionHint([
      {
        meanings: [
          {
            definitions: [
              { definition: '  A fruit that grows on trees.  ' },
            ],
          },
        ],
      },
    ]);

    expect(hint).toBe('A fruit that grows on trees.');
  });

  test('returns null for malformed dictionary responses', () => {
    expect(extractDefinitionHint({})).toBeNull();
    expect(extractDefinitionHint([{ meanings: [] }])).toBeNull();
  });

  test('retries invalid API words and returns an API-backed round', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse(['12']))
      .mockResolvedValueOnce(createJsonResponse(['apple']))
      .mockResolvedValueOnce(createJsonResponse([
        {
          meanings: [
            {
              definitions: [{ definition: 'A fruit that grows on trees.' }],
            },
          ],
        },
      ]));

    await expect(getPlayableWordWithHint('easy', fetchMock)).resolves.toEqual({
      word: 'APPLE',
      hint: 'A fruit that grows on trees.',
      source: 'api',
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  test('falls back to local words when the API keeps failing', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
    const round = await getPlayableWordWithHint('hard', fetchMock);

    expect(round.source).toBe('local');
    expect(round.word).toMatch(/^[A-Z ]+$/);
    expect(round.word.replace(/ /g, '').length).toBeGreaterThanOrEqual(9);
    expect(round.word.replace(/ /g, '').length).toBeLessThanOrEqual(12);
    expect(round.hint).toEqual(expect.any(String));
    expect(round.error).toBe('network down');
  });
});
