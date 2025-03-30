let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer_score");

const scoreboard_div = document.querySelector(".score-board");
const result_Div = document.querySelector(".result");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const reset_div = document.getElementById("reset");
const resut_print = document.querySelector(".results");

function randomNumber(min = 1, max = 3) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// rock =1 , paper =2, scissor =3
function win() {
  userScore++;
  userScore_span.innerHTML = userScore;
  resut_print.innerHTML = "  <p>You Won</p> ";
}

function lose() {
  computerScore++;
  computerScore_span.innerHTML = computerScore;
  resut_print.innerHTML = " <p>You lose</p> ";
}

function draw() {
  userScore++;
  computerScore++;
  computerScore_span.innerHTML = computerScore;
  userScore_span.innerHTML = userScore;
  resut_print.innerHTML = "  <p>Draw</p> ";
}

function game(userChoice) {
  const machine = randomNumber();
  var src = document.getElementById("resultComputer");

  // image display for machine
  if (machine == 1) {
    src.innerHTML =
      ' <img src="assets/rock.png" height="100px" width="100px"/>';
  }

  if (machine == 2) {
    src.innerHTML =
      ' <img src="assets/paper.png" height="100px" width="100px" />';
  }

  if (machine == 3) {
    src.innerHTML =
      ' <img src="assets/scissors.png" height="100px" width="100px" />';
  }

  // logic for win draw and lose
  switch (true) {
    case machine === userChoice:
      draw();
      break;
    case machine === 1 && userChoice === 2:
    case machine === 2 && userChoice === 3:
    case machine === 3 && userChoice === 1:
      win();
      break;
    case machine === 1 && userChoice === 3:
    case machine === 2 && userChoice === 1:
    case machine === 3 && userChoice === 2:
      lose();
      break;
  }
}

// User game
function main() {
  rock_div.addEventListener("click", () => {
    game(1);

    var src = document.getElementById("resultHuman");

    src.innerHTML =
      ' <img src="assets/rock.png"  height="100px" width="100px">';
  });

  paper_div.addEventListener("click", () => {
    game(2);

    var src = document.getElementById("resultHuman");

    src.innerHTML =
      ' <img src="assets/paper.png"  height="100px" width="100px">';
  });

  scissors_div.addEventListener("click", () => {
    game(3);

    var src = document.getElementById("resultHuman");

    src.innerHTML =
      ' <img src="assets/scissors.png"  height="100px" width="100px">';
  });

  // reset game
  reset_div.addEventListener("click", () => {
    resetScore();
  });
}

main();
