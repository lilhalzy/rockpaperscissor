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
const endGameModal = document.querySelector('#endGameModal');
const endGameMsg = document.querySelector('#endGameMsg');
const overlay = document.querySelector('#overlay');
const restartBtn = document.querySelector('#restartBtn');

rockBtn.addEventListener('click', () => {
  handleClick('ROCK');
});
paperBtn.addEventListener('click', () => {
  handleClick('PAPER');
});
scissorsBtn.addEventListener('click', () => {
  handleClick('SCISSORS');
});
restartBtn.addEventListener('click', restartGame);
overlay.addEventListener('click', (e) => e.preventDefault());


function handleClick(humanSelection) {
  if (gameOver()) {
    openEndGameModal();
    return;
  }

  const aiSelection = roulette();
  playRound(humanSelection, aiSelection);
  updateChoices(humanSelection, aiSelection);
  updateScore();

  if (gameOver()) {
    openEndGameModal();
    setFinalMsg();
  }
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

function openEndGameModal() {
    endGameModal.classList.add('active');
    overlay.classList.add('active');
  }

  function closeEndGameModal() {
    endGameModal.classList.remove('active');
    overlay.classList.remove('active');
  }
  
  function setFinalMsg() {
    endGameMsg.textContent =
      humanScore > aiScore
        ? (endGameMsg.textContent = 'Human won!')
        : (endGameMsg.textContent = 'Ur ded');
  }
  
  function restartGame() {
    humanScore = 0;
    aiScore = 0;
  
    scoreInfo.textContent = 'Choose your weaponz';
    scoreMessage.textContent = 'First to shoot 5 points wins the game';
    humanScorePara.textContent = 'Human: 0';
    aiScorePara.textContent = 'AI: 0';
  
    humanSign.textContent = '❔';
    aiSign.textContent = '❔';
  
    closeEndGameModal();
  }
  