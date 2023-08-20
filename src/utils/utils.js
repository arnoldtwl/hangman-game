// utils.js
const wordsWithHints = [
  { word: "EMERSON", hint: "A famous American essayist and poet." },
  { word: "REACT", hint: "A popular JavaScript library for building user interfaces." },
  { word: "INDIVIDUALISM", hint: "A social theory favoring freedom of action for individuals over collective or state control." },
  { word: "HANGMAN", hint: "A game where you guess letters to try to figure out a word." }, 
  { word: "JAVASCRIPT", hint: "A programming language that conforms to the ECMAScript specification." },
  { word: "LIBRARY", hint: "A collection of resources used to develop software." },
  { word: "CODING", hint: "The process of assigning a code to something for the purposes of classification or identification." },
  { word: "DEVELOPER", hint: "A person or company that creates new software products." },
  { word: "COMPUTER", hint: "An electronic device that stores and processes data." },
  { word: "PROGRAMMING", hint: "The process of designing and building an executable computer program to accomplish a specific computing result." }
];

export function getRandomWordWithHints() {
  const randomIndex = Math.floor(Math.random() * wordsWithHints.length);
  return wordsWithHints[randomIndex];
}

