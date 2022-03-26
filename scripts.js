const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const content = document.getElementById("content");
let result = document.getElementById("result");
let counter = document.getElementById("counter");
const counterArray = ["3", "2", "1", "Gooo!"];
let timeOnArray = [];
let timeOffArray = [];
let divArray = [];
let winningNumber = null;

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);

function start() {
  startBtn.classList.add("start-btn-disabled");
  startBtn.classList.remove("enabled");
  startBtn.disabled = true;
  stopBtn.classList.add("enabled");
  stopBtn.classList.remove("stop-btn-disabled");
  stopBtn.disabled = false;

  countDown();

  setTimeout(() => {
    if (divArray.length < 1) {
      createGrid();
    }

    resetBoard();

    result.innerText = `Catch ${getWinningNumber()}!`;
  }, 3000);

  setTimeout(() => {
    move();
  }, 4000);
}

function move() {
  let level = parseInt(document.getElementById("levelDrop").value);

  for (let i = 0; i < divArray.length; i++) {
    timerId = setTimeout(() => {
      divArray[i].classList.add("on");
    }, (i + 1) * level);

    timeOnArray.push(timerId);

    if (i < divArray.length - 1) {
      timerId = setTimeout(() => {
        divArray[i].classList.remove("on");
      }, (i + 2) * level);
    }
    timeOffArray.push(timerId);
  }
}

function resetBoard() {
  for (let i = 0; i < divArray.length; i++) {
    if (divArray[i].classList.contains("on")) {
      divArray[i].classList.remove("on");
    }
  }
}

function resetTimeArrays() {
  for (let i = 0; i < timeOnArray.length; i++) {
    clearTimeout(timeOnArray[i]);
  }

  for (let i = 0; i < timeOffArray.length; i++) {
    clearTimeout(timeOffArray[i]);
  }
}

function isWinningNumber() {
  let results = false;
  for (let i = 0; i < divArray.length; i++) {
    if (
      divArray[i].classList.contains("on") &&
      winningNumber === parseInt(divArray[i].innerHTML)
    ) {
      results = true;
    }
  }
  return results;
}

function stop() {
  resetTimeArrays();

  if (isWinningNumber()) {
    alert("Good job champ");
    result.innerText = "Good Job!";
    startBtn.classList.remove("start-btn-disabled");
    startBtn.classList.add("enabled");
    startBtn.disabled = false;
    stopBtn.classList.remove("enabled");
    stopBtn.classList.add("stop-btn-disabled");
    stopBtn.disabled = true;
    return;
  }
  alert("Sorry, but you are a looser");
  result.innerText = "Good luck next time";
  startBtn.classList.remove("start-btn-disabled");
  startBtn.classList.add("enabled");
  startBtn.disabled = false;
  stopBtn.classList.remove("enabled");
  stopBtn.classList.add("stop-btn-disabled");
  stopBtn.disabled = true;
}

function createGrid() {
  for (let i = 0; i < 100; i++) {
    let newDiv = document.createElement("div");
    newDiv.innerText = `${i + 1}`;
    content.appendChild(newDiv);
  }
  divArray = document.querySelectorAll("div");
}

function countDown() {
  for (let i = 0; i < counterArray.length; i++) {
    setTimeout(() => {
      counter.innerHTML = counterArray[i];
    }, i * 1000);
  }
}

function getWinningNumber() {
  winningNumber = Math.floor(Math.random() * divArray.length);
  return winningNumber;
}
