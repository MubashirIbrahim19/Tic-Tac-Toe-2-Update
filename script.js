const boxes = document.querySelectorAll(".button");
const newGame = document.querySelector(".newGame");
const reset = document.querySelector(".reset");
const congratulation = document.querySelector(".Congratulation");
const container2 = document.querySelector(".container2");
const container = document.querySelector(".container");
const text = document.querySelector(".text");
const choice1 = document.querySelector(".choice1");
const choice2 = document.querySelector(".choice2");
const startGame = document.querySelector(".startGame");
const back = document.querySelector(".back");
const players_box = document.querySelector(".players_box");
const input1 = document.querySelector(".name1");
const input2 = document.querySelector(".name2");
let player1 = "";
let player2 = "";
let userChoice1 = "";
let userChoice2 = "";
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

const X_O = () => {
  startGame.classList.remove("startGame2");
  startGame.innerText = "START GAME";
};

const removeTheHide = () => {
  players_box.classList.add("hide");
  text.classList.add("hide");
  container.classList.remove("hide");
};

const start_game = () => {
  userChoice1 = choice1.value.toUpperCase();
  userChoice2 = choice2.value.toUpperCase();
  player1 = input1.value;
  player2 = input2.value;

  if (
    isValidChoice(userChoice1) &&
    isValidChoice(userChoice2) &&
    player1 != player2 &&
    userChoice1 !== userChoice2 &&
    userChoice1.length === 1 &&
    userChoice2.length === 1
  ) {
    removeTheHide();
  } else {
    startGame.classList.add("startGame2");
    startGame.innerText = "Input is empty or Incorrect";
  }
};

input1.addEventListener("click", () => {
  X_O();
});

input2.addEventListener("click", () => {
  X_O();
});

const isValidChoice = (myChoice) => {
  return (
    myChoice === "X" || myChoice === "O" || myChoice === "o" || myChoice === "x"
  );
};
startGame.addEventListener("click", start_game);

choice1.addEventListener("click", () => {
  X_O();
  if (turn) {
    turn = false;
  }
});
choice2.addEventListener("click", () => {
  X_O();
  if (turn) {
    turn = true;
  } else {
    turn = true;
  }
});
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    count++;
    if (turn) {
      console.log(index);

      box.innerText = userChoice1;

      box.style.color = "#f8ac07";
      turn = false;
    } else {
      console.log(index);

      box.innerText = userChoice2;

      box.style.color = "#2c6fff";
      turn = true;
    }

    box.disabled = true;
    if (count === 9) {
      draw();
    }
    winnerChecker();
  });
});

let winnerChecker = () => {
  for (let pattern of winPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        container.classList.add("hide");
        container2.classList.remove("hide");
        text.classList.add("hide");
        if (pos1 === userChoice1) {
          congratulation.innerText = `${player1} Won`;
        } else {
          congratulation.innerText = `${player2} Won`;
          congratulation.style.color = "red";
        }
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

const newGamereset = () => {
  for (let box of boxes) {
    container2.classList.add("hide");
    text.classList.remove("hide");
    container.classList.add("hide");
    players_box.classList.remove("hide");

    box.innerText = "";
    turn = true;
    box.disabled = false;
    input1.value = "";
    input2.value = "";
    choice1.value = "";
    choice2.value = "";

    count = 0;
  }
};

newGame.addEventListener("click", newGamereset);
reset.addEventListener("click", newGamereset);

back.addEventListener("click", () => {
  if (moves.length > 0) {
    const lastIndex = moves.pop();

    boxes[lastIndex].innerText = "";
    boxes[lastIndex].disabled = false;
    count--;
    turn = !turn;
  }
});
