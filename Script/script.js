const body = document.querySelector("body");
const startMenu = document.querySelector(".start-menu");
const gameScreen = document.querySelector(".game-screen");
const playBtn = document.querySelector(".play-btn");

const p1Name = document.querySelector("#p1Name");
const p2Name = document.querySelector("#p2Name");

playBtn.addEventListener("click", function () {
  startMenu.classList.add("hidden");
  body.style.background = "url(' ')";

  gameScreen.classList.remove("hidden");

  // gameScreen.innerText = `${p1Name.value} VS ${p2Name.value}`;
});
