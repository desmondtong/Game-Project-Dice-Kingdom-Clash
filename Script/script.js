const body = document.querySelector("body");
const startMenu = document.querySelector(".start-menu");
const gameScreen = document.querySelector(".game-screen");
const overlay = document.querySelector(".overlay");

const startBtn = document.querySelector(".start-btn");
const tutoBtn = document.querySelector(".tutorial-btn");

startBtn.addEventListener("click", function () {
  overlay.classList.remove("hidden");
});

tutoBtn.addEventListener("click", function () {
  overlay.classList.remove("hidden");
});
