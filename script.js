const url = 'https://hp-api.onrender.com/api/characters/students'

let characters = [];
const stat = "yearOfBirth";
let gameResult = ""; 


async function loadCharacters() {
  try {
    const response = await fetch(url);
    characters = await response.json();

    console.log("Chracters array:", characters);
    console.log("Characters length:", characters.length);

    randomCharacter();
    const drawButton = document.getElementById("draw-btn");
    drawButton.addEventListener('click', playRound);

  } catch (error) {
    console.log("Something went wrong:", error);
  };
};

loadCharacters();

// it isn't about where the fuction is defined it's where it's called

function randomCharacter () {
  let randomChar;
  console.log("Characters length:", characters.length);

  while(true) {
    const randomInteger = Math.floor(Math.random() * characters.length);
    randomChar = characters[randomInteger];

    if (randomChar[stat] !== null && randomChar[stat] !== undefined) {
      return randomChar;
    }
  }
};


function playRound() {

  const playerName = document.getElementById("player-name");
  const playerStat = document.getElementById("player-stat");
  const computerName = document.getElementById("computer-name");
  const computerStat = document.getElementById("computer-stat");
  const result = document.getElementById("result");  
  

  let playerCharacter = randomCharacter();
  let computerCharacter = randomCharacter();

  let playerStatistic = playerCharacter[stat];
  let computerStatistic = computerCharacter[stat];

  playerName.textContent = playerCharacter.name;
  playerStat.textContent = playerStatistic;
  computerName.textContent = computerCharacter.name;
  computerStat.textContent = computerStatistic;

  // older cahracter wins
  if (playerStatistic < computerStatistic) {
    gameResult = "Player has won!";
  } else if (playerCharacter[stat] > computerCharacter[stat]) {
    gameResult = "Computer has won!"
  } else {
    gameResult = "It's a draw!";
  };

  result.textContent = gameResult;

};
