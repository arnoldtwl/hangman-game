# Hangman Game

## Description
This is a modern implementation of the classic Hangman game. The game features a sleek UI, keyboard support, and a points system to make the game more engaging.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/hangman-game.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd hangman-game
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Access the game**: Open your browser and navigate to `http://localhost:3000`.

6. **Enjoy the game!**

## Keybindings

- **F1**: Help
- **F2**: Toggle Hint
- **F5**: Restart Game

## Points System

- 1 point for each correct letter guess that appears only once in the word
- 2 points for each correct letter guess that appears twice in the word
- 3 points for each correct letter guess that appears three or more times in the word
- 50 points for completing a 3-4 letter word
- 100 points for completing a 5-6 letter word
- 150 points for completing a 7-8 letter word
- 200 points for completing a 9-letter or longer word
- 10 points for each correct guess that keeps the hangman alive
- -5 points for each incorrect guess
- -10 points for using a hint
- **Losing the game resets your current score to 0** (High Score is retained)

## Features

- **Modern UI**: A sleek and modern user interface.
- **Keyboard Support**: Use your physical keyboard to make guesses.
- **Hints**: Reveal hints to help guess the word (costs points).
- **Points System**: Earn points for correct guesses and completed words.
- **High Score**: Track your highest score.

## Migration

This project was migrated from Create React App to Vite for faster builds and improved development experience.

## Future Enhancements

- **Full Dictionary API Integration**: Replace the static category lists with dynamic word generation using the [Random Word API](https://random-word-api.herokuapp.com/word) for words and [Free Dictionary API](https://api.dictionaryapi.dev/api/v2/entries/en/) to provide definitions as hints.
- **Difficulty Levels**: Introduce different difficulty levels with more complex words and fewer attempts.
- **Sound Effects**: Add sound effects for correct guesses, incorrect guesses, winning, and losing.
- **Word Categories**: Allow players to choose categories of words, such as animals, countries, movies, etc.
- **Progress Save**: Enable users to save and continue their game later.
- **Accessibility**: Ensure the game is fully accessible, including keyboard navigation, screen reader support, and color contrast.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.