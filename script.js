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
  updateScoreMsg(roundWinner, humanSelection, aiSelection);
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