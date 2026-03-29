import { getRandomWordWithHints } from "../utils/utils";
import { getDifficultyConfig } from "../config/difficulty";

const RANDOM_WORD_BATCH_SIZE = 12;
const RANDOM_WORD_API_URL = `https://random-word-api.herokuapp.com/word?number=${RANDOM_WORD_BATCH_SIZE}`;
const DICTIONARY_API_BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const MAX_API_ATTEMPTS = 5;
const SUPPORTED_WORD_PATTERN = /^[A-Z]+(?: [A-Z]+)*$/;

function cleanDefinition(definition) {
  if (typeof definition !== "string") {
    return "";
  }

  return definition.replace(/\s+/g, " ").trim();
}

export function normalizeWord(rawWord, difficulty) {
  if (typeof rawWord !== "string") {
    return null;
  }

  const trimmedWord = rawWord.trim();

  if (!trimmedWord) {
    return null;
  }

  const normalizedWord = trimmedWord.replace(/[-_]+/g, " ").replace(/\s+/g, " ").toUpperCase();
  const condensedLength = normalizedWord.replace(/ /g, "").length;
  const { minLength, maxLength } = getDifficultyConfig(difficulty);

  if (
    condensedLength < minLength ||
    condensedLength > maxLength ||
    !SUPPORTED_WORD_PATTERN.test(normalizedWord)
  ) {
    return null;
  }

  return normalizedWord;
}

export function extractDefinitionHint(dictionaryEntries) {
  if (!Array.isArray(dictionaryEntries)) {
    return null;
  }

  for (const entry of dictionaryEntries) {
    if (!Array.isArray(entry?.meanings)) {
      continue;
    }

    for (const meaning of entry.meanings) {
      if (!Array.isArray(meaning?.definitions)) {
        continue;
      }

      for (const definitionEntry of meaning.definitions) {
        const cleanedDefinition = cleanDefinition(definitionEntry?.definition);

        if (cleanedDefinition) {
          return cleanedDefinition;
        }
      }
    }
  }

  return null;
}

async function fetchRandomWords(fetchImpl) {
  const response = await fetchImpl(RANDOM_WORD_API_URL);

  if (!response.ok) {
    throw new Error(`Random word request failed with status ${response.status}`);
  }

  const words = await response.json();

  if (!Array.isArray(words) || !words.every((word) => typeof word === "string")) {
    throw new Error("Random word response was malformed");
  }

  return words;
}

async function fetchDefinitionHint(fetchImpl, word) {
  const response = await fetchImpl(`${DICTIONARY_API_BASE_URL}${encodeURIComponent(word)}`);

  if (!response.ok) {
    throw new Error(`Dictionary request failed with status ${response.status}`);
  }

  const dictionaryEntries = await response.json();
  const definition = extractDefinitionHint(dictionaryEntries);

  if (!definition) {
    throw new Error("Dictionary response did not include a usable definition");
  }

  return definition;
}

export async function getPlayableWordWithHint(difficulty, fetchImpl = fetch) {
  let lastError = null;

  for (let attempt = 0; attempt < MAX_API_ATTEMPTS; attempt += 1) {
    try {
      const rawWords = await fetchRandomWords(fetchImpl);
      const normalizedWord = rawWords
        .map((rawWord) => normalizeWord(rawWord, difficulty))
        .find(Boolean);

      if (!normalizedWord) {
        throw new Error("Random word batch did not contain a playable word");
      }

      const definitionHint = await fetchDefinitionHint(fetchImpl, normalizedWord.toLowerCase());

      return {
        word: normalizedWord,
        hint: definitionHint,
        source: "api",
      };
    } catch (error) {
      lastError = error;
    }
  }

  let fallbackWord = getRandomWordWithHints(undefined, difficulty);
  let normalizedFallbackWord = normalizeWord(fallbackWord.word, difficulty);

  for (let attempt = 0; attempt < MAX_API_ATTEMPTS && !normalizedFallbackWord; attempt += 1) {
    fallbackWord = getRandomWordWithHints(undefined, difficulty);
    normalizedFallbackWord = normalizeWord(fallbackWord.word, difficulty);
  }

  return {
    word: normalizedFallbackWord ?? fallbackWord.word,
    hint: fallbackWord.hint,
    source: "local",
    error: lastError?.message ?? "API word resolution failed",
  };
}
