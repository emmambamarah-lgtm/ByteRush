document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const homeScreen = document.getElementById("home-screen");

  startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    homeScreen.style.display = "block";
  });
});