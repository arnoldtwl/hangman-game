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
    expect(normalizeWord('apple')).toBe('APPLE');
    expect(normalizeWord('ice-cream')).toBe('ICE CREAM');
  });

  test('rejects unsupported words', () => {
    expect(normalizeWord('hi')).toBeNull();
    expect(normalizeWord('abc123')).toBeNull();
    expect(normalizeWord('hello!')).toBeNull();
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

    await expect(getPlayableWordWithHint(fetchMock)).resolves.toEqual({
      word: 'APPLE',
      hint: 'A fruit that grows on trees.',
      source: 'api',
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  test('falls back to local words when the API keeps failing', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
    const round = await getPlayableWordWithHint(fetchMock);

    expect(round.source).toBe('local');
    expect(round.word).toMatch(/^[A-Z ]+$/);
    expect(round.hint).toEqual(expect.any(String));
    expect(round.error).toBe('network down');
  });
});
