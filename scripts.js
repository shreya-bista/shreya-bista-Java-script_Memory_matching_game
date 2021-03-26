const cards = document.querySelectorAll('.card');

let has_flipped_card = false;
let lock_board = false;
let first_card, second_card;

// flips the card when clicked.
function flipCard() {
  if (lock_board) return;
  if (this === first_card) return;

  this.classList.add('flip');

  //Waits until another card is flipped and the variables manages the flip state. 
  if (!has_flipped_card) {
    has_flipped_card = true;
    first_card = this;

    return;
  }

  // On the second clicks, checks to see if it’s a match by accessing both cards dataset.
  second_card = this;
  checkForMatch();
}

/*Checks and lock cards so that it avoids cards getting flipped at the same time in the 
case if same card encountered.*/
function checkForMatch() {
  let isMatch = first_card.dataset.framework === second_card.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  first_card.removeEventListener('click', flipCard);
  second_card.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lock_board = true;

  setTimeout(() => {
    first_card.classList.remove('flip');
    second_card.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [has_flipped_card, lock_board] = [false, false];
  [first_card, second_card] = [null, null];
}

// Suffles cards.
/*Iterates through total no of cards in the game and generate a random 
number between 0 and 11 and assign it.*/
(function shuffle() {
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));