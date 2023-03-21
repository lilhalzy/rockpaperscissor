// Logic
let humanScore = 0;
let aiScore = 0;
let roundWinner = '';

function playRound(humanSelection, aiSelection) {
  if (humanSelection === aiSelection) {
    roundWinner = 'Tie';
  }
  if (
    (humanSelection === 'ROCK' && aiSelection === 'SCISSORS') ||
    (humanSelection === 'SCISSORS' && aiSelection === 'PAPER') ||
    (humanSelection === 'PAPER' && aiSelection === 'ROCK')
  ) {
    humanScore++;
    roundWinner = 'Human';
  }
  if (
    (aiSelection === 'ROCK' && humanSelection === 'SCISSORS') ||
    (aiSelection === 'SCISSORS' && humanSelection === 'PAPER') ||
    (aiSelection === 'PAPER' && humanSelection === 'ROCK')
  ) {
    aiScore++;
    roundWinner = 'AI';
  }
}

// Generate random weapon
function roulette() {
  let randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return 'ROCK';
    case 1:
      return 'PAPER';
    case 2:
      return 'SCISSORS';
  }
}

function gameOver() {
  return humanScore === 5 || aiScore === 5;
}
// UI

const scoreInfo = document.querySelector('#scoreInfo');
const scoreMessage = document.querySelector('#scoreSubtitle');
const humanScorePara = document.querySelector('#humanScore');
const aiScorePara = document.querySelector('#aiScore');
const humanSign = document.querySelector('#humanSign');
const aiSign = document.querySelector('#aiSign');
const rockBtn = document.querySelector('#rockBtn');
const paperBtn = document.querySelector('#paperBtn');
const scissorsBtn = document.querySelector('#scissorsBtn');

rockBtn.addEventListener('click', () => {
  handleClick('ROCK');
});
paperBtn.addEventListener('click', () => {
  handleClick('PAPER');
});
scissorsBtn.addEventListener('click', () => {
  handleClick('SCISSORS');
});


function handleClick(humanSelection) {
  if (gameOver()) {
    openEndGameModal();
    return;
  }

  const aiSelection = roulette();
  playRound(humanSelection, aiSelection);
  updateChoices(humanSelection, aiSelection);
  updateScore();

}

function updateChoices(humanSelection, aiSelection) {
  switch (humanSelection) {
    case 'ROCK':
      humanSign.textContent = '🪨';
      break;
    case 'PAPER':
      humanSign.textContent = '📃';
      break;
    case 'SCISSORS':
      humanSign.textContent = '✂️';
      break;
  }
  switch (aiSelection) {
    case 'ROCK':
      aiSign.textContent = '🪨';
      break;
    case 'PAPER':
      aiSign.textContent = '📃';
      break;
    case 'SCISSORS':
      aiSign.textContent = '✂️';
      break;
  }
}
