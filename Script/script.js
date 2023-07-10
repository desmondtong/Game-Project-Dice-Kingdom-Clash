// Declaring selector
const body = document.querySelector("body");
const startMenu = document.querySelector(".start-menu");
const gameScreen = document.querySelector(".game-screen");
const playBtn = document.querySelector(".play-btn");

const counter = document.querySelectorAll(".counter");
const powerDiceDeck = document.querySelector(".power-dice-deck");
const powerDiceBtn = document.querySelector("#power-dice-btn");

const cannons = {
  p1Cannon: document.querySelector("#p1-cannon"),
  p1CannonBtn: document.querySelector("#p1-cannon-btn"),
  p2Cannon: document.querySelector("#p2-cannon"),
  p2CannonBtn: document.querySelector("#p2-cannon-btn"),
};

const towers = {
  p1Tower: document.querySelector("#p1-tower"),
  p2Tower: document.querySelector("#p2-tower"),
};

const p1Name = document.querySelector("#p1Name");
const p2Name = document.querySelector("#p2Name");

// Initialize variables
const timeEachRound = 10;
let round = 1;
let currPlayer = 1;
let gameTime = timeEachRound;

// Function
function init() {
  round = 1;
  currPlayer = 1;
  gameTime = timeEachRound;

  for (el of counter) {
    el.classList.add("inactive");
  }

  powerDiceDeck.classList.add("inactive");
  powerDiceBtn.classList.add("disabled");

  cannons.p2Cannon.classList.add("inactive");
  cannons.p2CannonBtn.classList.add("disabled");

  for (tower of Object.values(towers)) {
    tower.innerHTML = generateTower();
  }
}

function generateTower() {
  let tower = [];
  for (let i = 0; i < 50; i++) {
    tower.push(
      `<img src="../Assets/dice-1/dice-${Math.ceil(
        Math.random() * 6
      )}.png" class="dice-png" />`
    );
  }
  return tower.join("");
}

// Event button
playBtn.addEventListener("click", function () {
  startMenu.classList.add("hidden");
  body.style.background = "url(' ')";
  body.style.backgroundColor = "var(--pastel-brown)";

  gameScreen.classList.remove("hidden");
});

init();
