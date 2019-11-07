/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values 
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Set message
const setMessage = (msg, color) => {
  message.textContent = msg;
  message.style.color = color;
}

// Game Over
const gameOver = (won, msg) => {
  // Set color
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input 
  guessInput.disabled = true;
  // Change border and text color
  guessInput.style.borderColor = color;
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Random Num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Listen for guess
guessBtn.addEventListener('click', () => {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else {
    // Check if won
    if (guess === winningNum) {
      // Game over - won
      gameOver(true, `${winningNum} is correct, YOU WIN!`);
        
    } else {
      // Wrong number
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        // Game over - lost
        gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

      } else {
        // Game continues - answer wrong

        // Tell user its the wrong number
        guessInput.style.borderColor = 'red';
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

        // Clear input
        guessInput.value = '';
      }
    }   
  }
});

// Play again event listener
game.addEventListener('mousedown', (e) => {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});