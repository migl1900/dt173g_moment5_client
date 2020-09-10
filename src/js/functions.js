// JavaScript Guess a random number copied from https://guess-the-number-project.netlify.app/

function updateRange() {
    const rangeOutput = document.getElementById("rangeOutput");
  
    rangeOutput.innerText = `${low} - ${high}`;
    rangeOutput.style.marginLeft = low + "%";
    rangeOutput.style.marginRight = 100 - high + "%";
    rangeOutput.classList.add("flash");
  
    const lowValue = document.getElementById("low");
    lowValue.style.flex = low + "%";
    lowValue.style.background = "#ef7b54";
  
    const space = document.getElementById("space");
    space.style.flex = high - low + "%";
    space.style.background = "#83E1D0";
  
    const highValue = document.getElementById("high");
    if (high == 100) highValue.style.flex = 0;
    highValue.style.flex = 100 - high + "%";
    highValue.style.background = "#ef7b54";
  }
  
  function gameEnded() {
    document.getElementById("newGameButton").style.display = "inline";
    document.getElementById("inputBox").setAttribute("readonly", "readonly"); // (attr name, attr value)
  }
  
  function newGame() {
    window.location.reload();
  }
  
  function init() {
    computerGuess = Math.floor(Math.random() * 100 + 1);
    document.getElementById("newGameButton").style.display = "none";
    document.getElementById("gameArea").style.display = "none";
  }
  
  function startGameView() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
  }