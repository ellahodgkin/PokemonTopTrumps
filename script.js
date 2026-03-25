// all declacred globally, when set in functions they are still stored globally

let characters = [];
const weight = "weight";
const height = "height";
let gameResult = ""; 
let playerCharacter = [];
let computerCharacter = [];
let chosenStat = "";



console.log("JS file is connected!");

const playerName = document.getElementById("player-name");
const computerName = document.getElementById("computer-name");

const playerWeightButton = document.getElementById("player-weight-btn");
const computerWeightButton = document.getElementById("computer-weight-btn");

const playerHeightButton = document.getElementById("player-height-btn");
const computerHeightButton = document.getElementById("computer-height-btn");

const result = document.getElementById("result"); 

//const statButton = document.getElementsByClassName("stat-btn");


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

  const statButton = document.querySelectorAll(".stat-btn");

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

  console.log("drawing cards...");

  playerCharacter = randomCharacter();
  computerCharacter = randomCharacter();

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


  // compareStats(playerWeightStatistic, computerWeightStatistic);
}



function compareStats(chosenStat) {

  let playerStat = playerCharacter[chosenStat];
  let computerStat = computerCharacter[chosenStat];

  console.log("playerStat:", playerStat);

  console.log("About to compare statistics...");

  if (playerStat > computerStat) {
    gameResult = "Player has won!";
  } else if (playerStat < computerStat) {
    gameResult = "Computer has won!"
  } else {
    gameResult = "It's a draw!";
  };

  console.log("result:", gameResult);
  result.textContent = gameResult;

  // what each stat button calls
  //compares who won
  // showResult()

  // updateScrore()
};

function showResult(result) {
  // reveal card
  // display result 
};

function updateScore() {
  // increments scrore variable and updates display
  // checkWinner()
};

function checkWinner() {
  // checks first to 5
}