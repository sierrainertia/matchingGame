const cards = document.querySelectorAll(".card");
const timer = document.querySelector(".timer");

let hasGameStarted = false;
let cardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let second = 0,
  minute = 0;
let interval;

function flipcard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (hasGameStarted === false) {
    hasGameStarted = true;
    startTimer();
  }

  if (cardFlipped === false) {
    cardFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  // if first card matches second card call disable card function, else call unflipcards function
  let isMatch = firstCard.dataset.cardType === secondCard.dataset.cardType;
  isMatch ? disableCards() : unFlipCards();

  // check for win
  setTimeout(function () {
    if (document.querySelectorAll(".card.flip").length === 18) {
      congrats();
      clearInterval(interval);
    }
  }, 600);
  return;
}

// disable cards from flipping by removing event listeners
function disableCards() {
  firstCard.removeEventListener("click", flipcard);
  secondCard.removeEventListener("click", flipcard);

  resetBoard();
}

// un flip cards feature flip cards to back by removing flip class
function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

// reset board
function resetBoard() {
  [cardFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// shuffle card order -> IIFE
function shuffle() {
  cards.forEach((card) => {
    let randomCardPosition = Math.floor(Math.random() * 18);
    card.style.order = randomCardPosition;
  });
}

shuffle();

// timer functionality
function startTimer() {
  console.log("timer started");

  function tick() {
    timer.innerHTML = `${minute} minutes and ${second} seconds`;
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }

    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }
  tick();
  interval = setInterval(tick, 1000);
}

// add game completed alert
congrats = () => {
  window.alert(`Congrats! You finished in ${timer.innerHTML} 🎉🎉`);
};

//restart game functionality
function restartGame() {
  // set game started back to false
  hasGameStarted = false;

  // reset board
  resetBoard();

  // remove class .flip from all cards
  cards.forEach((card) => card.classList.remove("flip"));

  // shuffle cards
  setTimeout(() => {
    shuffle();
  }, 500);

  //   re-add event listener
  cards.forEach((card) => card.addEventListener("click", flipcard));

  // set timer back to 0
  clearInterval(interval);
  (second = 0), (minute = 0);
  timer.innerHTML = `${minute} Minutes and ${second} Seconds`;
}

cards.forEach((card) => card.addEventListener("click", flipcard));
