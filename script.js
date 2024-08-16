const boxes = document.querySelectorAll(".button");
const newGame = document.querySelector(".newGame");
const reset = document.querySelector(".reset");
const congratulation = document.querySelector(".Congratulation");
const container2 = document.querySelector(".container2");
const container = document.querySelector(".container");
const text = document.querySelector(".text");
const choice1 = document.querySelector(".choice1");
const choice2 = document.querySelector(".choice2");
const buttons = document.querySelector(".boxes");
const startGame = document.querySelector(".startGame");
const startGame2 = document.querySelector(".startGame2");
const back = document.querySelector(".back");

let turn = true;
let count = 0;
let moves = [];

let winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

startGame2.addEventListener("click", () => {
  startGame2.style.backgroundColor = "rgb(255, 255, 145)";
  startGame2.style.color = "red";
  startGame2.innerText = "Select the any option";
  startGame2.style.cursor = "default";
  console.log(startGame2);
});

const X_O = () => {
  startGame2.classList.add("hide");
  console.log(startGame2);
  console.log(startGame);
};
const choice = () => {
  buttons.classList.add("hide");
  text.classList.remove("hide");
  container.classList.remove("hide");
};

const start_game = () => {
  startGame.addEventListener("click", () => {
    choice();
  });
};

choice1.addEventListener("click", () => {
  X_O();
  start_game();
  if (turn) {
    turn = true;
    console.log(turn);
  } else {
    turn = true;
    console.log(turn);
  }
});
choice2.addEventListener("click", () => {
  X_O();
  start_game();
  if (turn) {
    turn = false;
    console.log(turn);
  }
});

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    console.log(`Count = ${count}`);
    count++;
    if (turn) {
      console.log(index);
      console.log(turn);
      box.innerText = "X";
      box.style.color = "rgb(70, 128, 128)";
      turn = false;
    } else {
      console.log(index);
      console.log(turn);
      box.innerText = "O";
      box.style.color = "orange";
      turn = true;
    }
    moves.push(index);
    box.disabled = true;

    if (count === 9) {
      draw();
    }
    winnerChecker();
  });
});

let winnerChecker = (index) => {
  for (let pattern of winPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        let value = moves.push(index);
        congratulation.style.color = "green";
        container.classList.add("hide");
        container2.classList.remove("hide");
        text.classList.add("hide");
        congratulation.innerText = pos1 + " \t Won";
      }
    }
  }
};

const draw = () => {
  container2.classList.remove("hide");
  congratulation.innerText = "Match Draw";
  congratulation.style.color = "black";
  container.classList.add("hide");
  text.classList.add("hide");
  count = 0;
};

const dublicateStartGame = () => {
  startGame2.classList.remove("hide");
  startGame2.innerText = "START GAME";
  startGame2.style.backgroundColor = "rgb(249, 249, 66)";
  startGame2.style.color = "black";
  startGame2.style.cursor = "pointer";
};
const newGamereset = () => {
  for (let box of boxes) {
    container2.classList.add("hide");
    buttons.classList.remove("hide");
    text.classList.add("hide");
    container.classList.add("hide");
    box.innerText = "";
    turn = true;
    box.disabled = false;
    count = 0;
  }
  dublicateStartGame();
};

newGame.addEventListener("click", newGamereset);
reset.addEventListener("click", newGamereset);

back.addEventListener("click", () => {
  if (moves.length > 0) {
    const lastIndex = moves.pop();
    const lastBox = boxes[lastIndex];
    lastBox.innerText = "";
    lastBox.disabled = false;
    count--;
    turn = !turn;
  }
});
