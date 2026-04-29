document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const homeScreen = document.getElementById("home-screen");
  const htmlCard = document.getElementById("html-arena-card");

  if (startButton) {
    startButton.addEventListener("click", function () {
      startScreen.style.display = "none";
      homeScreen.style.display = "block";
    });
  }

  if (htmlCard) {
    htmlCard.addEventListener("click", function () {
      window.location.href = "html-arena.html";
    });
  }
  const xpDisplay = document.getElementById("xp-value");

if (xpDisplay) {
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  xpDisplay.innerText = xp;
}
if (level === 1) {
  title.innerText = "Mission 1: Create a Heading";
  task.innerHTML = `
    Type this exact HTML code:<br><br>
    <strong>&lt;h1&gt;Hello World&lt;/h1&gt;</strong>
  `;
}
else if (level === 2) {
  title.innerText = "Mission 2: Create a Paragraph";
  task.innerHTML = `
    Type this exact HTML code:<br><br>
    <strong>&lt;p&gt;I love coding&lt;/p&gt;</strong>
  `;
}
});