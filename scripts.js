const cards = document.querySelectorAll(".card");

let cardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipcard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!cardFlipped) {
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
(function shuffle() {
  cards.forEach((card) => {
    let randomCardPosition = Math.floor(Math.random() * 18);
    card.style.order = randomCardPosition;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipcard));
