// Declaring selector
const body = document.querySelector("body");
const startMenu = document.querySelector(".start-menu");
const gameScreen = document.querySelector(".game-screen");
const playBtn = document.querySelector(".play-btn");

const timer = document.querySelector(".timer");
const counter = document.querySelectorAll(".counter");
const powerDiceDeck = document.querySelector(".power-dice-deck");
const powerDiceBtn = document.querySelector("#power-dice-btn");

const playerCannon = document.querySelector("#player-cannon");
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

const towerHp = {
  p1Hp: document.querySelector("#p1-hp"),
  p2Hp: document.querySelector("#p2-hp"),
};

const p1Name = document.querySelector("#p1Name");
const p2Name = document.querySelector("#p2Name");

// Initialize variables
const timeEachRound = 5;
const maxHP = 50;
let interval, randomPowerDice, takeDamage, towerArr;
let cannonDice = [];
let round = 1;
let currPlayer = 1;
let gameTime = timeEachRound;

// Function
function init() {
  round = 1;
  currPlayer = 1;
  gameTime = timeEachRound;

  for (let el = 1; el < counter.length; el++) {
    counter[el].classList.add("inactive");
  }

  timer.textContent = gameTime;

  powerDiceDeck.classList.add("inactive");
  powerDiceBtn.classList.add("disabled");

  cannons.p2Cannon.classList.add("inactive");
  cannons.p2CannonBtn.classList.add("disabled");

  for (tower of Object.values(towers)) {
    tower.innerHTML = generateTower(maxHP);
  }

  towerHp.p1Hp.textContent = maxHP;
  towerHp.p2Hp.textContent = maxHP;

  cannons.p1CannonDice.innerHTML = generateCannonDice(1);
  cannons.p2CannonDice.innerHTML = generateCannonDice(2);
}

function generateTower(maxHP) {
  let content = [];
  for (let i = 0; i < maxHP; i++) {
    content.push(
      `<img src="../Assets/dice/dice-${Math.ceil(
        Math.random() * 6
      )}.png" class="dice-png" />`
    );
  }
  return content.join("\n");
}

function generateCannonDice(player) {
  cannonDice[0] = Math.ceil(Math.random() * 6);
  cannonDice[1] = Math.ceil(Math.random() * 6);
  return `<img src="../Assets/brown dice/${cannonDice[0]}.png" class="brown-dice-png" />
      <p class="cannon-dice">X</p>
      <img src="../Assets/brown dice/${cannonDice[1]}.png" class="brown-dice-png" />
      <p class="cannon-dice">=</p>
      <p class="cannon-dice" id="p${player}-shots">?</p>`;
}

// function displayStartMsg(p1, p2) {
//   document.querySelector("main .display-msg").innerHTML = `<h1>
//   <span class="display-msg">START!</span><br />${p1} VS ${p2}
// </h1>`;
// }

function gameTimer() {
  interval = setInterval(() => {
    if (
      (timer.textContent == 0 && round <= 8) ||
      cannons[`p${currPlayer}CannonBtn`].classList.contains("disabled")
    ) {
      timer.textContent = gameTime;
      switchPlayer();
    } else if (timer.textContent > 0 && round <= 8) {
      timer.textContent--;
    } else {
      timer.textContent = 0;
      console.log(`TIMER STOP`);
      clearInterval(interval);
    }
  }, 1000);
  // add condtion when HP = 0 then timer stop!!
}

function switchPlayer() {
  // disable current player button
  cannons[`p${currPlayer}Cannon`].classList.add("inactive");
  cannons[`p${currPlayer}CannonBtn`].classList.add("disabled");

  // update round counter
  if (currPlayer === 2 && round < 8) {
    counter[round].classList.remove("inactive");
    round++;
    console.log(`now is round ${round}`);
  } else if (currPlayer === 2 && round === 8) {
    console.log("GAME FINISHED");
    round++;
    return;
  }

  // switch player
  currPlayer = currPlayer === 1 ? 2 : 1;
  console.log(`SWITCHED TO PLAYER ${currPlayer}`);

  // enable power dice deck
  if (round === 3 || round === 6) {
    cannons["p1Cannon"].classList.add("inactive");
    cannons["p1CannonBtn"].classList.add("disabled");
    cannons["p2Cannon"].classList.add("inactive");
    cannons["p2CannonBtn"].classList.add("disabled");

    powerDiceDeck.classList.remove("inactive");
    powerDiceBtn.classList.remove("disabled");

    // init powert dice deck
    for (let i = 1; i <= 4; i++) {
      document.querySelector(`#power-dice-${i}`).classList.remove("chosen");
    }

    clearInterval(interval);
    return;
  }

  // enable next player button
  cannons[`p${currPlayer}Cannon`].classList.remove("inactive");
  cannons[`p${currPlayer}CannonBtn`].classList.remove("disabled");
}

function attackTower(nosOfShots) {
  takeDamage = currPlayer === 1 ? 2 : 1;
  towerHp[`p${takeDamage}Hp`].textContent = Math.max(
    towerHp[`p${takeDamage}Hp`].textContent - nosOfShots,
    0
  );

  towerArr = towers[`p${takeDamage}Tower`].innerHTML.split("\n");
  towerNew = towerArr.splice(0, towerArr.length - nosOfShots).join("\n");
  towers[`p${takeDamage}Tower`].innerHTML = towerNew;

  if (towerHp[`p${takeDamage}Hp`].textContent == 0) {
    clearInterval(interval);
    console.log(`PLAYER ${currPlayer} WIN!!`);
    return true;
  }
}

function powerDice() {
  randomPowerDice = Math.ceil(Math.random() * 4);
  document
    .querySelector(`#power-dice-${randomPowerDice}`)
    .classList.add("chosen");

  switch (randomPowerDice) {
    case 1:
      console.log("dice1");
      break;
    case 2:
      console.log("dice2");
      break;
    case 3:
      console.log("dice3");
      break;
    case 4:
      console.log("dice4");
      break;
  }
}

// Event button
playBtn.addEventListener("click", function () {
  e.preventDefault();
  if (e.target.tagName !== "BUTTON") return;

  startMenu.classList.add("hidden");
  body.style.background = "url(' ')";
  body.style.backgroundColor = "var(--pastel-brown)";

  gameScreen.classList.remove("hidden");

  // displayStartMsg(p1Name, p2Name);
  init();
  gameTimer();
});

powerDiceBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.tagName !== "BUTTON") return;

  powerDiceDeck.classList.add("inactive");
  powerDiceBtn.classList.add("disabled");

  powerDice();

  // after roll power dice then enable currPlayer button
  cannons[`p${currPlayer}Cannon`].classList.remove("inactive");
  cannons[`p${currPlayer}CannonBtn`].classList.remove("disabled");

  gameTimer();
});

playerCannon.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.tagName !== "BUTTON") return;

  // disable button after click & stop time
  cannons[`p${currPlayer}CannonBtn`].classList.add("disabled");
  clearInterval(interval);

  // updated cannon dice equation
  cannons[`p${currPlayer}CannonDice`].innerHTML =
    generateCannonDice(currPlayer);
  document.querySelector(`#p${currPlayer}-shots`).textContent =
    cannonDice[0] * cannonDice[1];

  if (attackTower(cannonDice[0] * cannonDice[1])) return;

  gameTimer();
});

init();
gameTimer();
