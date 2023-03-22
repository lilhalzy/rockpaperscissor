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
const gameOverSound = document.querySelector('#gameOverSound');
const gameOverClickSound = document.querySelector('#gameOverClickSound');
const btnSound = document.querySelector('#btnSound');
const victorySound = document.querySelector('#victorySound');

rockBtn.addEventListener('click', () => {
  handleClick('ROCK');
  btnSound.volume = 0.6;
  btnSound.play();
});
paperBtn.addEventListener('click', () => {
  handleClick('PAPER');
  btnSound.volume = 0.6;
  btnSound.play();
});
scissorsBtn.addEventListener('click', () => {
  handleClick('SCISSORS');
  btnSound.volume = 0.6;
  btnSound.play();
});
restartBtn.addEventListener('click', restartGame);
overlay.addEventListener('click', (e) => e.preventDefault());


function handleClick(humanSelection) {
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

function updateScore() {
    if (roundWinner === 'Tie') {
      scoreInfo.textContent = "It's a tie!";
    } else if (roundWinner === 'Human') {
      scoreInfo.textContent = 'uwu u got that right!';
    } else if (roundWinner === 'AI') {
      scoreInfo.textContent = 'NO! AI is smarter!';
    }
  
    humanScorePara.textContent = `Score: ${humanScore}`;
    aiScorePara.textContent = `Score: ${aiScore}`;
  }
  
  function updateScoreMsg(winner, humanSelection, aiSelection) {
    if (winner === 'Human') {
      scoreMessage.textContent = `${capitalFirstLetter(
        humanSelection
        )} beats ${aiSelection.toLowerCase()}`;
        return;
    }
    
    if (winner === 'AI') {
        scoreMessage.textContent = `${capitalFirstLetter(
            humanSelection
            )} is beaten by ${aiSelection.toLowerCase()}`;
      return;
    }
    
    scoreMessage.textContent = `${capitalFirstLetter(
        humanSelection
        )} ties with ${aiSelection.toLowerCase()}`;
        return;
    }
    function capitalFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    
    function openEndGameModal() {
        endGameModal.classList.add('active');
        overlay.classList.add('active');
        if (roundWinner == 'AI') {
            gameOverSound.volume = 0.4;
            gameOverSound.play();
        } else {
            victorySound.volume = 0.6
            victorySound.play();
        }
        // block double-click/spam-click event that will cause weird auto-select and sidebar
        overlay.style.userSelect = 'none';
      }
    
    function closeEndGameModal() {
        endGameModal.classList.remove('active');
        overlay.classList.remove('active');
        gameOverClickSound.volume = 0.6;
    gameOverClickSound.play();
  }
  
  function setFinalMsg() {
    endGameMsg.textContent =
      humanScore > aiScore
        ? (endGameMsg.textContent = 'Human won!')
        : (endGameMsg.textContent = 'Ur ded');
    restartBtn.textContent = `${capitalFirstLetter('start over')}`
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