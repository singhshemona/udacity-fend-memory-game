/*
 * ----Create a list that holds all of your cards
 */
 const cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
 "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle","fa fa-diamond",
 "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle",
 "fa fa-paper-plane-o", "fa fa-cube"];

 function makeCard(card) {
     return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 }


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// shuffle from - http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function start() {
   startTimer();
   let deck = document.querySelector('.deck');
   let cardHTML = shuffle(cards).map(function(card) {
     return makeCard(card);
   });

  deck.innerHTML = cardHTML.join('');

  let allCards = document.querySelectorAll('.card');
  let openCards = [];

 allCards.forEach(function(card) {
   card.addEventListener('click', function(e) {
     if (
       !card.classList.contains('open') &&
       !card.classList.contains('show') &&
       !card.classList.contains('match')
     ) {
       openCards.push(card);
       card.classList.add('open', 'show');

       if (openCards.length == 2) {
         moveCount();
         if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[0].classList.add('open');
          openCards[0].classList.add('show');
          openCards[1].classList.add('match');
          openCards[1].classList.add('open');
          openCards[1].classList.add('show');
          openCards = [];
          winGame();
        } else {
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show');
            });
            openCards = [];
          }, 700);
       }
      }
     }
   });
 });
 }

// move counting total
 let moves = 0;
 let moveCounter = document.querySelector('.moves');
 let stars = document.querySelector('.stars');
 let one = document.querySelector('.one');
 let two = document.querySelector('.two');

 function moveCount() {
   moves++;
   moveCounter.innerHTML = moves;

   // stars count

   if (moves > 10  && moves <= 20) {
       one.style.display = "none";
   } else if (moves > 30){
     two.style.display = "none";
   }
 }

// timer

 let timer = document.querySelector('.timer');
 var timing;
 let second = 0;


 function startTimer() {

   timing = window.setInterval(function() {
   timer.innerHTML = second + " seconds";
   second++;
   }, 1000);
 }

 // working with DOM timing

 function resetTimer() {
   clearInterval(timing);
   console.log(timing);
 }
 document.querySelector('.restart').addEventListener('click', resetTimer);


 // modal - https://www.w3schools.com/w3css/w3css_modal.asp

 let matchedCards = document.getElementsByClassName('match');
 let modal = document.querySelector('.modal');
 let totalTime = document.querySelector('.totalTime');
 let starRating = document.querySelector('.starRating');
 let totalMoves =  document.querySelector('.totalMoves');

 function winGame() {
   if (matchedCards.length === 16) {
     modal.style.display = "block";
     starRating.innerHTML = stars.innerHTML;
     totalMoves.innerHTML = moveCounter.innerHTML;
     totalTime.innerHTML = timer.innerHTML;
   }
   console.log(matchedCards);
 }

 let span = document.getElementsByClassName("close")[0];

 span.onclick = function() {
     modal.style.display = "none";

   };
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
   };
 document.querySelector('.button').addEventListener('click', playAgain);
 document.querySelector('.button').addEventListener('click', resetTimer);
 document.querySelector('.restart').addEventListener('click', playAgain);

 function playAgain() {
   modal.style.display = "none";
   moves = 0;
   moveCounter.innerHTML = 0;
   one.style.visibility = 'visible';
   two.style.visibility = 'visible';
   start();
 }

start();
