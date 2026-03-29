# Hangman Game

## Description
This is a modern implementation of the classic Hangman game. The game features a sleek UI, keyboard and screen-reader support, dictionary-powered hints, difficulty levels, sound effects, progress saving, and a score system to make each round more engaging.

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
   npm run dev
   ```

5. **Access the game**: Open your browser and navigate to the local Vite URL shown in the terminal, usually `http://localhost:5173`.

6. **Enjoy the game!**

## Keybindings

- **F1**: Help
- **F2**: Reveal Hint
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
- **Dictionary API Integration**: The game fetches random words from the [Random Word API](https://random-word-api.herokuapp.com/word) and dictionary definitions from the [Free Dictionary API](https://api.dictionaryapi.dev/api/v2/entries/en/) for hint content, with a local fallback if the APIs are unavailable.
- **Difficulty Levels**: Choose between Easy, Medium, and Hard, each with its own word-length range and number of allowed mistakes.
- **Keyboard Support**: Use your physical keyboard or the on-screen keyboard to make guesses.
- **Definition Hints**: Reveal a random letter and show a dictionary definition to help solve the word.
- **Points System**: Earn points for correct guesses and completed words.
- **High Score**: Track your highest score.
- **Sound Effects**: Hear feedback for correct guesses, incorrect guesses, wins, and losses, with a persistent mute toggle.
- **Progress Save**: Resume unfinished games automatically after leaving or refreshing the app once at least one letter has been guessed.
- **Accessibility**: Includes keyboard-accessible navigation, screen-reader announcements, improved focus states, reduced-motion support, and stronger contrast handling.

## Migration

This project was migrated from Create React App to Vite for faster builds and improved development experience.

## Future Enhancements

- **Expanded Statistics**: Add deeper lifetime stats such as total wins, losses, best streaks, and average score.
- **More Game Modes**: Introduce alternate challenge modes such as timed rounds or survival mode.
- **Achievement System**: Reward players for milestones such as win streaks, no-hint victories, or perfect rounds.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
