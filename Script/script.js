// Declaring selector
const body = document.querySelector("body");
const startMenu = document.querySelector(".start-menu");
const gameScreen = document.querySelector(".game-screen");
const playBtn = document.querySelector(".play-btn");

const timer = document.querySelector(".timer");
const counter = document.querySelectorAll(".counter");
const powerDiceDeck = document.querySelector(".power-dice-deck");
const powerDiceBtn = document.querySelector("#power-dice-btn");

const cannons = {
  p1Cannon: document.querySelector("#p1-cannon"),
  p1CannonBtn: document.querySelector("#p1-cannon-btn"),
  p1CannonDice: document.querySelector("#p1-cannon-dice"),
  p2Cannon: document.querySelector("#p2-cannon"),
  p2CannonBtn: document.querySelector("#p2-cannon-btn"),
  p2CannonDice: document.querySelector("#p2-cannon-dice"),
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

  timer.textContent = `0:${gameTime}`;

  powerDiceDeck.classList.add("inactive");
  powerDiceBtn.classList.add("disabled");

  cannons.p2Cannon.classList.add("inactive");
  cannons.p2CannonBtn.classList.add("disabled");

  for (tower of Object.values(towers)) {
    tower.innerHTML = generateTower();
  }

  cannons.p1CannonDice.innerHTML = generateCannonDice();
  cannons.p2CannonDice.innerHTML = generateCannonDice();
}

function generateTower() {
  let content = [];
  for (let i = 0; i < 50; i++) {
    content.push(
      `<img src="../Assets/dice-1/dice-${Math.ceil(
        Math.random() * 6
      )}.png" class="dice-png" />`
    );
  }
  return content.join("");
}

function generateCannonDice() {
  return `<img src="../Assets/brown dice/${Math.ceil(
    Math.random() * 6
  )}.png" class="brown-dice-png" />
    <p class="cannon-dice">X</p>
    <img src="../Assets/brown dice/${Math.ceil(
      Math.random() * 6
    )}.png" class="brown-dice-png" />
    <p class="cannon-dice">=</p>
    <p class="cannon-dice" id="p1-shots">?</p>`;
}

// Event button
playBtn.addEventListener("click", function () {
  startMenu.classList.add("hidden");
  body.style.background = "url(' ')";
  body.style.backgroundColor = "var(--pastel-brown)";

  gameScreen.classList.remove("hidden");
});

init();
