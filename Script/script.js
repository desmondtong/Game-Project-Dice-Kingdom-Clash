// Declaring selector
const body = document.querySelector("body");
const startMenu = document.querySelector(".start-menu");
const gameScreen = document.querySelector(".game-screen");

const playBtn = document.querySelectorAll(".play-btn");
const exitBtn = document.querySelectorAll(".exit-btn");
const resumeBtn = document.querySelector(".resume-btn");

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

const resultMsg = document.querySelector(".result-msg");

// Initialize variables
const timeEachRound = 10;
const maxHP = 50;
let interval, randomPowerDice, takeDamage, towerArr, towerNew, hpHeal, healed;
let resultDisplayed, pauseDisplayed;
let cannonDice = [];
let round = 1;
let currPlayer = 1;
let gameTime = timeEachRound;
let playerName = {};

// Function
function init() {
  round = 1;
  currPlayer = 1;
  gameTime = timeEachRound;
  resultDisplayed = false;
  pauseDisplayed = false;

  for (let el = 1; el < counter.length; el++) {
    counter[el].classList.add("inactive");
  }

  timer.textContent = gameTime;

  powerDiceDeck.classList.add("inactive");
  powerDiceBtn.classList.add("disabled");

  cannons.p1Cannon.classList.remove("inactive");
  cannons.p1CannonBtn.classList.remove("disabled");
  cannons.p2Cannon.classList.add("inactive");
  cannons.p2CannonBtn.classList.add("disabled");

  for (const tower of Object.values(towers)) {
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

function startGame(e) {
  e.preventDefault();
  if (e.target.tagName !== "BUTTON") return;

  playerName = {
    p1Name: document.querySelector("#p1Name").value,
    p2Name: document.querySelector("#p2Name").value,
  };

  startMenu.classList.add("hidden");
  body.style.background = "url(' ')";
  body.style.backgroundColor = "var(--pastel-brown)";

  gameScreen.classList.remove("hidden");

  // displayStartMsg(p1Name, p2Name);
  init();
  gameTimer();
}

function gameTimer(pause = false) {
  interval = setInterval(() => {
    if (pause) {
      if (round === 3 || round === 6) return;
    }

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
      displayResult(true);
      clearInterval(interval);
    }
  }, 1000);
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

    // init power dice deck
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
  // check if can ricochet
  if (towers[`p${currPlayer}Tower`].classList.contains("ricochet")) {
    takeDamage = currPlayer;
  } else {
    takeDamage = currPlayer === 1 ? 2 : 1;
  }
  // check if have shield
  if (towers[`p${takeDamage}Tower`].classList.contains("shield")) {
    nosOfShots = Math.ceil(nosOfShots / 2);
  }

  towerHp[`p${takeDamage}Hp`].textContent = Math.max(
    towerHp[`p${takeDamage}Hp`].textContent - nosOfShots,
    0
  );

  // update tower dice
  updateTower(nosOfShots);

  // remove power dice class
  towers[`p${takeDamage}Tower`].classList.remove("shield");
  towers[`p${currPlayer}Tower`].classList.remove("ricochet");

  if (towerHp[`p${takeDamage}Hp`].textContent == 0) {
    clearInterval(interval);

    displayResult();
    return true;
  }
}

function powerDice() {
  randomPowerDice = Math.ceil(Math.random() * 4);
  document
    .querySelector(`#power-dice-${randomPowerDice}`)
    .classList.add("chosen");

  switch (randomPowerDice) {
    case 1: // shield dice
      console.log(`${currPlayer} gets Shield Dice!`);
      towers[`p${currPlayer}Tower`].classList.add("shield");
      break;
    case 2: // ricochet dice
      console.log(`${currPlayer} gets Ricochet Dice!`);
      // add rico class to opponent
      towers[`p${currPlayer === 1 ? 2 : 1}Tower`].classList.add("ricochet");
      break;
    case 3: // heal dice
      console.log(`${currPlayer} gets Heal Dice!`);
      hpHeal = Math.max(Math.ceil(Math.random() * 20), 10);
      towerHp[`p${currPlayer}Hp`].textContent = Math.min(
        Number(towerHp[`p${currPlayer}Hp`].textContent) + hpHeal,
        maxHP
      );
      updateTower(hpHeal, true);
      break;
    case 4: // swap dice
      console.log(`${currPlayer} gets Swap Dice!`);
      a = [towerHp.p1Hp.textContent, towerHp.p2Hp.textContent];
      towerHp.p1Hp.textContent = a[1];
      towerHp.p2Hp.textContent = a[0];

      b = [towers.p1Tower.innerHTML, towers.p2Tower.innerHTML];
      towers.p1Tower.innerHTML = b[1];
      towers.p2Tower.innerHTML = b[0];
      break;
  }
}

function updateTower(hp, heal = false) {
  if (heal) {
    console.log("healing...HTML");
    towerNew =
      towers[`p${currPlayer}Tower`].innerHTML + "\n" + generateTower(hp);
    towers[`p${currPlayer}Tower`].innerHTML = towerNew;
  } else {
    towerArr = towers[`p${takeDamage}Tower`].innerHTML.split("\n");
    towerNew = towerArr.splice(0, towerArr.length - hp).join("\n");
    towers[`p${takeDamage}Tower`].innerHTML = towerNew;
  }
}

function displayResult(tie = false) {
  if (tie) {
    resultMsg.innerText = `IT'S A TIE!`;
    new bootstrap.Modal(document.querySelector("#resultModal")).show();
    resultDisplayed = true;
  } else {
    resultMsg.textContent = playerName[`p${currPlayer}Name`] + " WIN THE GAME!";
    new bootstrap.Modal(document.querySelector("#resultModal")).show();
    resultDisplayed = true;
  }
}

// Event button
for (const btn of playBtn) [btn.addEventListener("click", startGame)];

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

for (const btn of exitBtn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName !== "BUTTON") return;

    startMenu.classList.remove("hidden");
    body.style.background = "url('../Assets/start-menu.png')";
    body.style.backgroundSize = "cover";

    gameScreen.classList.add("hidden");
  });
}

resumeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.tagName !== "BUTTON") return;

  pauseDisplayed = false;
  gameTimer(true);
});

document.addEventListener("keydown", function (e) {
  // e.preventDefault();

  if (pauseDisplayed) return;
  if (
    e.key === "Escape" &&
    !gameScreen.classList.contains("hidden") &&
    resultDisplayed === false
  ) {
    clearInterval(interval);
    pauseDisplayed = true;
    new bootstrap.Modal(document.querySelector("#pauseModal")).show();
  }
});

init();
// gameTimer();
