export const DIFFICULTY_CONFIG = {
  easy: {
    label: "Easy",
    description: "Shorter words with more chances",
    minLength: 3,
    maxLength: 5,
    maxIncorrectGuesses: 8,
    partRevealThresholds: [2, 4, 5, 6, 7, 8],
  },
  medium: {
    label: "Medium",
    description: "Balanced words and classic pressure",
    minLength: 6,
    maxLength: 8,
    maxIncorrectGuesses: 6,
    partRevealThresholds: [1, 2, 3, 4, 5, 6],
  },
  hard: {
    label: "Hard",
    description: "Longer words with fewer chances",
    minLength: 9,
    maxLength: 12,
    maxIncorrectGuesses: 5,
    partRevealThresholds: [0, 1, 2, 3, 4, 5],
  },
};

export const DEFAULT_DIFFICULTY = "medium";

export function getDifficultyConfig(difficulty = DEFAULT_DIFFICULTY) {
  return DIFFICULTY_CONFIG[difficulty] ?? DIFFICULTY_CONFIG[DEFAULT_DIFFICULTY];
}
