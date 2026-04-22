// all declacred globally, when set in functions they are still stored globally

let characters = [];
const weight = "weight";
const height = "height";
let gameResult = ""; 
let playerCharacter = [];
let computerCharacter = [];
let chosenStat = "";

let gameState = "idle";

let playerScore = 0;
let computerScore = 0;


console.log("JS file is connected!");

// GET ELEMENTS

const playerCard = document.getElementById("player");
const computerCard = document.getElementById("computer");

const playerName = document.getElementById("player-name");
const computerName = document.getElementById("computer-name");

const playerWeightButton = document.getElementById("player-weight-btn");
const computerWeightButton = document.getElementById("computer-weight-btn");

const playerHeightButton = document.getElementById("player-height-btn");
const computerHeightButton = document.getElementById("computer-height-btn");

const result = document.getElementById("result"); 

const scoreBoard = document.getElementById("score-board");

// BUTTONS

const startButton = document.getElementById("start-game");
const drawButton = document.getElementById("draw-card");
const endButton = document.getElementById("end-game");
const againButton = document.getElementById("play-again");

// SET INITIAL PLAY STATE 

playerCard.classList.add("flipped");
computerCard.classList.add("flipped");

loadCharacters();

// LOAD API
// SET UP GAME
async function loadCharacters() {
  try {
    let URL = 'https://pokeapi.co/api/v2/pokemon?limit=200';

    const response = await fetch(URL);
    const data = await response.json();

    console.log("data.results:", data.results)

    const promises = data.results.map(pokemon =>
      fetch(pokemon.url)
      .then(res => res.json())
    );

    characters = await Promise.all(promises);

    console.log("Total characters:", characters.length);
    console.log("Example pokemon:", characters[0]);

    setUpGame(); 

  } catch (error) {
    console.log("Something went wrong:", error);
  };
};

// EVENT LISTENERS FOR BUTTONS
// CHOSEN STAT ALLOCATION

function setUpGame() {

  updateUI();
  setGameDisabled(true);

  const statButton = document.querySelectorAll("#player .stat-btn");

  statButton.forEach( btn => {
    btn.addEventListener('click', () => {
      chosenStat = btn.dataset.stat;
      compareStats(chosenStat);
    });
  });

  startButton.addEventListener("click", startGame);
  drawButton.addEventListener("click", drawCards);
  endButton.addEventListener("click", endGame);
  againButton.addEventListener("click", resetGame);

};

function startGame() {

  gameState = "playing";

  playerScore = 0;
  computerScore = 0;

  updateScore(playerScore, computerScore);
  setGameDisabled(false);

  console.log("Game started");

  updateUI();

};


function resetGame() {
  gameState = "idle";

  playerScore = 0;
  computerScore = 0;

  scoreBoard.textContent = "0 - 0";
  result.textContent = "";

  setGameDisabled(true);

  console.log("Game reset");

  updateUI();
}


// UPDATE USER INTERFACE

function updateUI() {
  if (gameState === "idle") {
    startButton.style.display = "block";
    drawButton.style.display = "none";
    endButton.style.display = "none";
    againButton.style.display = "none";
  } else if (gameState === "playing") {
    startButton.style.display = "none";
    drawButton.style.display = "block";
    endButton.style.display = "block";
    againButton.style.display = "none"; 
  } else if (gameState === "finished") {
    startButton.style.display = "none";
    drawButton.style.display = "none";
    endButton.style.display = "none";
    againButton.style.display = "block";
  };
};



// GENERATE A RANDOM CHARACTER

function randomCharacter () {
  let randomChar;

  while(true) {
    const randomInteger = Math.floor(Math.random() * characters.length);
    randomChar = characters[randomInteger];

    if (randomChar && 
      randomChar[weight] !== null &&
      randomChar[weight] !== undefined ) {
      return randomChar;
    }
  }
};

// ALLOCATES CHARACTER, FLIPS CARD

function drawCards() {

  if (gameState !== "playing") return;

  resetCards();

  console.log("drawing cards...");

  playerCharacter = randomCharacter();
  computerCharacter = randomCharacter();

  playerCard.classList.remove("flipped");

  let playerWeightStatistic = playerCharacter[weight];
  let computerWeightStatistic = computerCharacter[weight];
  let playerHeightStatistic = playerCharacter[height];
  let computerHeightStatistic = computerCharacter[height];

  console.log("Player weight:", playerWeightStatistic);
  console.log("Computer weight:", computerWeightStatistic);

  playerName.textContent = playerCharacter.name;
  playerWeightButton.textContent = `Weight: ${playerWeightStatistic}`;
  playerHeightButton.textContent = `Height: ${playerHeightStatistic}`;
  
  computerName.textContent = computerCharacter.name;
  computerWeightButton.textContent = `Weight: ${computerWeightStatistic}`;
  computerHeightButton.textContent = `Height: ${computerHeightStatistic}`;
};


// THIS IS CALLED IN SET UP GAME, CHOSEN STAT COMPARISON,
// CALLS SHOWRESULT, UPDATESCORE, DISABLES GAME

function compareStats(chosenStat) {

  if (gameState !== "playing") return;

  let playerStat = playerCharacter[chosenStat];
  let computerStat = computerCharacter[chosenStat];

  console.log("About to compare statistics...");

  if (playerStat > computerStat) {
    gameResult = "Player has won!";
    playerScore += 1;
  } else if (playerStat < computerStat) {
    gameResult = "Computer has won!"
    computerScore += 1;
  } else {
    gameResult = "It's a draw!";
  };

  console.log("Player Score:", playerScore);
  console.log("Computer Score:", computerScore);

  showResult(gameResult);

  updateScore(playerScore, computerScore);

  if( playerScore >= 5 || computerScore >= 5 ) {
    endGame();
  };

};


// DISABLES GAME BUTTONS

function setGameDisabled(state) {
  const statButtons = document.querySelectorAll(".stat-btn");
  statButtons.forEach(btn => btn.disabled = state);

  drawButton.disabled = state;
}

function resetCards() {

  console.log("resetting the cards");

  playerCard.classList.add("flipped");
  computerCard.classList.add("flipped");
  result.textContent = "";
}

// DISPLAYS RESULT, FLIPS COMPUTER CARD

function showResult(gameResult) {

  console.log("result:", gameResult);
  result.textContent = gameResult;

  computerCard.classList.remove("flipped")

};

// UPDATE SCOREBOARD, CHECK IF THERE'S A WINNER

function updateScore(playerScore, computerScore) {

  console.log("reveal score");

  scoreBoard.textContent = `${playerScore} - ${computerScore}`;

};


function endGame() {
  gameState = "finished";

  setGameDisabled(true);

  checkWinner(playerScore, computerScore);

  console.log("Game ended");

  updateUI();
};



// CHECK IF SCORE IS AT 5 FOR EITHER 

function checkWinner(playerScore, computerScore) {
  console.log("checking if there is a winner!");

  if (playerScore > computerScore) {
    result.textContent = "Player has won overall!";
  } else if (computerScore > playerScore) {
    result.textContent = "Computer has won overall!";
  } else {
    result.textContent = "It is a draw overall!";
  };

};
