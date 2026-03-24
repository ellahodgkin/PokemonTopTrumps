
let characters = [];
const weight = "weight";
let gameResult = ""; 

console.log("JS file is connected!");

async function loadCharacters() {
  try {
    let URL = 'https://pokeapi.co/api/v2/pokemon?limit=200';

    const response = await fetch(URL);
    const data = await response.json();

    console.log("data.results:", data.results)

    // .map() goes through every item and does something to it
    // pokemon = "i"
    // pokemon.url = fetch each individual url 
    // .then() when response comes back convert it to json
    // promise = array of 200 unfinished fetch requests

    const promises = data.results.map(pokemon =>
      fetch(pokemon.url)
      .then(res => res.json())
    );

    // Promise.all = takes 200 and waits for each of them to finish
    // hands back an array of 200 results in order which gets stored in characters
    characters = await Promise.all(promises);

    const drawButton = document.getElementById("draw-btn");
    drawButton.addEventListener('click', playRound);

    console.log("Total characters:", characters.length);
    console.log("Example pokemon:", characters[0]);

  } catch (error) {
    console.log("Something went wrong:", error);
  };
};

loadCharacters();

// it isn't about where the fuction is defined it's where it's called

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

const playerName = document.getElementById("player-name");
const computerName = document.getElementById("computer-name");

const playerWeightButton = document.getElementById("player-weight-btn");
const computerWeightButton = document.getElementById("computer-weight-btn")

const result = document.getElementById("result"); 


function playRound() {

  console.log("Playing a round...");

  let playerCharacter = randomCharacter();
  let computerCharacter = randomCharacter();

  let playerWeightStatistic = playerCharacter[weight];
  let computerWeightStatistic = computerCharacter[weight];

  console.log("Player weight:", playerWeightStatistic);
  console.log("Copmuter weight:", computerWeightStatistic);

  playerWeightButton.textContent = `Weight: ${playerWeightStatistic}`;
  playerName.textContent = playerCharacter.name;
  computerName.textContent = computerCharacter.name;
  computerWeightButton.textContent = `Weight: ${computerWeightStatistic}`;

  // older cahracter wins
  if (playerWeightStatistic > computerWeightStatistic) {
    gameResult = "Player has won!";
  } else if (playerWeightStatistic < computerWeightStatistic) {
    gameResult = "Computer has won!"
  } else {
    gameResult = "It's a draw!";
  };

  result.textContent = gameResult;

};
