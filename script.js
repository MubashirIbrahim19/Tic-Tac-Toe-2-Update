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
const startGame2 = document.querySelector(".startGame2");
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
startGame2.addEventListener("click", () => {
  startGame2.style.backgroundColor = "rgb(255, 255, 145)";
  startGame2.style.color = "red";
  startGame2.innerText = "Input is empty or incorrect";
  startGame2.style.cursor = "default";
  console.log(startGame2.innerText);
  console.log(startGame2);
});

const X_O = () => {
  startGame2.classList.add("hide");
  console.log(startGame2);
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
  console.log(`Player1 Name :${player1}`);
  console.log(`Player2 Name :${player2}`);
  if (
    isValidChoice(userChoice1) &&
    isValidChoice(userChoice2) &&
    isValidChoice(player1) &&
    isValidChoice(player2) &&
    player1 != player2 &&
    userChoice1 !== userChoice2 &&
    userChoice1.length === 1 &&
    userChoice2.length === 1
  ) {
    removeTheHide();
  } else {
    startGame2.classList.remove("hide");
  }
};

input1.addEventListener("click", () => {
  X_O();
  console.log("remove");
});

input2.addEventListener("click", () => {
  X_O();
});

const isValidChoice = (myChoice) => {
  console.log(myChoice || "null");
  return (
    myChoice === "X" ||
    myChoice === "O" ||
    myChoice === "o" ||
    myChoice === "x" ||
    myChoice === player1 ||
    myChoice === player2
  );
};
startGame.addEventListener("click", start_game);

choice1.addEventListener("click", () => {
  X_O();
  if (turn) {
    turn = false;
    console.log(turn);
    console.log(player1);
  }
});
choice2.addEventListener("click", () => {
  X_O();
  if (turn) {
    turn = true;
    console.log(turn);
    console.log(player2);
  } else {
    turn = true;
    console.log(turn);
  }
});
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    console.log(`Count = ${count}`);
    count++;
    if (turn) {
      console.log(userChoice1);
      console.log(index);
      console.log(turn);
      box.innerText = userChoice1;
      console.log(box.innerText);
      box.style.color = "#f8ac07";
      turn = false;
      console.log(player1);
    } else {
      console.log(userChoice2);
      console.log(index);
      console.log(turn);
      box.innerText = userChoice2;
      console.log(box.innerText);
      box.style.color = "#2c6fff";
      turn = true;
      console.log(player2);
    }
    moves.push(index);
    console.log(moves);
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
    console.log(pattern);
    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        container.classList.add("hide");
        container2.classList.remove("hide");
        text.classList.add("hide");
        if (pos1 === userChoice1) {
          congratulation.innerText = `${player1} Won`;
          console.log(userChoice1);
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
    console.log(players_box);
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
    console.log(lastIndex);
    boxes[lastIndex].innerText = "";
    boxes[lastIndex].disabled = false; 
    count--; 
    turn = !turn; 
  }
});
