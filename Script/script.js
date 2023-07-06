const body = document.querySelector("body");
const startMenu = document.querySelector(".start-menu");
const gameScreen = document.querySelector(".game-screen");
const startBtn = document.querySelector(".start-btn");
const tutoBtn = document.querySelector(".tutorial-btn");

startBtn.addEventListener("click", function () {
  startMenu.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  body.style.backgroundImage = "url('')";
});
