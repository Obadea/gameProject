"use strict";
// Selecting elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let playing, scores, currentScore, activePlayer;

// Starting Conditions
const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEL.classList.add("hidden");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
  document.querySelector(`.player--${0}`).classList.remove("player--winner");
  document.querySelector(`.player--${1}`).classList.remove("player--winner");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    // 3.Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    //   score[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //   2.Check if player's score is >= 100
    if (scores[activePlayer] >= newTarget) {
      // Finish the game
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // notification
      document.querySelector(".notification").style.animation =
        "notification 5s ease-in-out 1";
      if (activePlayer === 0) {
        document.querySelector(
          ".notificationMSG"
        ).textContent = `Player1 won!!🎉🏆`;
      } else if (activePlayer === 1) {
        document.querySelector(
          ".notificationMSG"
        ).textContent = `Player2 won!!🎉🏆`;
      }
      ////////////////////////////////////
    } else {
      //   Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
btnNew.addEventListener("click", function () {
  // notification
  document.querySelector(".notification").style.animation = "reset";
});

// settings
const rulesBtn = document.querySelector(".rules");
const settingBtn = document.querySelector(".settings");
const rules = document.querySelector(".rulesArticle");
const overlay = document.querySelector(".overlay");
const closeWindow = document.querySelector(".closeWindow");
const setting = document.querySelector(".setup");
const settingsCloseWindow = document.querySelector(".closeWindow2");

// show rules
rulesBtn.addEventListener("click", function () {
  rules.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

// close rules
const closeWindowfx = function () {
  rules.classList.add("hidden");
  overlay.classList.add("hidden");
};
closeWindow.addEventListener("click", closeWindowfx);
overlay.addEventListener("click", closeWindowfx);

document.addEventListener("keydown", function (esc) {
  if (esc.key === "Escape") {
    closeWindowfx();
    hideSetting();
  }
});

// show settings
settingBtn.addEventListener("click", function () {
  setting.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

const hideSetting = function () {
  setting.classList.add("hidden");
};
// hide Settings
settingsCloseWindow.addEventListener("click", function () {
  hideSetting();
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", function () {
  hideSetting();
});

// change target
const target = document.getElementById("target");
const targetValue = target.value;
const check = document.querySelector(".check");
const domTarget = document.querySelector(".domTarget");
const targetNotice = document.querySelector(".targetNotice");
let newTarget;
// check if its a number
check.addEventListener("click", function () {
  newTarget = Number(target.value);
  // console.log(newTarget, typeof newTarget);
  if (newTarget && newTarget > 1) {
    domTarget.textContent = newTarget;
    // hide Settings
    hideSetting();
    overlay.classList.add("hidden");
  } else {
    // show targetNotice
    targetNotice.classList.toggle("hidden");
    // console.log("input Number only");
  }
});
