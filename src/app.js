import { Hangman } from "./utils.js";
import { API_KEY } from "../dist/API_KEY_FILES.js";

const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
let game1;

const getPuzzle = async (wordCount) => {
    const response = await fetch(`${API_KEY}=${wordCount}`);

    if (response.status === 200) {
        const data = await response.json();
        return data.puzzle;
    } else {
        throw new Error('Unable to get puzzle');
    }
};

const render = () => {
    puzzleEl.innerHTML = '';
    guessesEl.textContent = game1.statusMessage;

    game1.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span');
        letterEl.textContent = letter;
        puzzleEl.appendChild(letterEl);
    });
};

const startGame = async () => {
    const puzzle = await getPuzzle('2');
    game1 = new Hangman(puzzle, 5);
    render();
};

document.querySelector('#reset').addEventListener('click', startGame);

startGame();

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode);
    game1.makeGuess(guess);
    render();
});

window.handleGuess = (letter) => {
    game1.makeGuess(letter);
    render();
};