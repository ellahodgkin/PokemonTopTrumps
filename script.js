// all declacred globally, when set in functions they are still stored globally

let characters = [];
const weight = "weight";
const height = "height";
let gameResult = ""; 
let playerCharacter = [];
let computerCharacter = [];
let chosenStat = "";

let playerScore = 0;
let computerScore = 0;


console.log("JS file is connected!");

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

//const statButton = document.getElementsByClassName("stat-btn");

playerCard.classList.add("flipped");
computerCard.classList.add("flipped");


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

loadCharacters();


function setUpGame() {

  const drawButton = document.getElementById("draw-btn");
  drawButton.addEventListener('click', drawCards);

  const statButton = document.querySelectorAll("#player .stat-btn");

  console.log("stat button:", statButton);
  // node list of buttons

  statButton.forEach( btn => {
    btn.addEventListener('click', () => {
      chosenStat = btn.dataset.stat;
      compareStats(chosenStat);
    });
  });

};


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


function drawCards() {

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



function compareStats(chosenStat) {

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
    setGameDisabled(true);
  };

};

function setGameDisabled(state) {
  const statButtons = document.querySelectorAll(".stat-btn");
  statButtons.forEach(btn => btn.disabled = state);

  const drawButton = document.getElementById("draw-btn");
  drawButton.disabled = state;
}

function resetCards() {

  console.log("resetting the cards");

  playerCard.classList.add("flipped");
  computerCard.classList.add("flipped");
  result.textContent = "";
}



function showResult(gameResult) {

  console.log("result:", gameResult);
  result.textContent = gameResult;

  computerCard.classList.remove("flipped")

};

function updateScore(playerScore, computerScore) {

  console.log("reveal score");

  scoreBoard.textContent = `${playerScore} - ${computerScore}`;

  checkWinner(playerScore, computerScore);
};

function checkWinner(playerScore, computerScore) {
  console.log("checking if there is a winner!");


  if (playerScore >= 5) {
    result.textContent = "Player has won overall!";
  } else if (computerScore >= 5) {
    result.textContent = "Computer has won overall!"
  } else {
    return;
  };

};
