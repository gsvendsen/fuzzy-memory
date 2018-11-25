const memoryBoard = document.querySelector('.memory-board');
const bellSound = document.querySelector('.bell');
const finishSound = document.querySelector('.complete');

var cardCount = 15;
var finishedPairs = 0;

let isRestarting = false;

// Template object of memory board map
const cardTypes = {
  'one': 0,
  'two': 0,
  'three': 0,
  'four': 0,
  'five': 0,
  'six': 0,
  'seven': 0,
  'eight': 0,
}

// Default new object copied from the template
let newTypes = JSON.parse(JSON.stringify(cardTypes));

// Fetches random item in memory map that isnt picked twice already
const randomProperty =  (obj)=> {
  var keys = Object.keys(obj)
  var randomKey = keys[Math.floor(Math.random() * (keys.length) ) + 0];
  if(obj[randomKey] == 2){
    return randomProperty(obj);
  } else {
    obj[randomKey] += 1;
    return randomKey;
  }
};

// Creates memory cards on memory board at start
const startBoard = () => {
  for(i=0; i <= cardCount; i++){
    const newCardContainer = document.createElement('div')
    const newCard = document.createElement('div');

    newCardContainer.setAttribute('class', 'memory-card-container');
    newCard.setAttribute('class', 'memory-card hidden');

    newCardContainer.appendChild(newCard);


    let randomCardType = randomProperty(newTypes);

    newCard.dataset.cardType = randomCardType;
    memoryBoard.appendChild(newCardContainer);
  }
}

const playButton = document.querySelector('.play-btn');
playButton.addEventListener('click', ()=>{
  if(audio.paused) {
    audio.play();
    audio.volume = 0.7;
  }

  playButton.classList.add('active');
  memoryBoard.classList.remove('no-play');
  memoryBoard.classList.add('started');
});

startBoard();



const memoryCards = document.querySelectorAll('.memory-card-container');
let selectedAmount = 0;

// Resets all selected cards back to hidden
const resetCards = ()=>{
  const selectedCards = document.querySelectorAll('.selected');
  selectedCards.forEach((selectedCard) => {
    selectedCard.classList.add('hidden');
    selectedCard.classList.remove('selected');
  })
  selectedAmount = 0;
}

// Eventlistener for all memory cards when clicked
memoryCards.forEach((memoryCard) => {
  memoryCard.addEventListener('click', ()=>{

    if(memoryCard.children[0].classList.contains('finished') || isRestarting){

    } else if (selectedAmount == 2 || memoryCard.children[0].classList.contains('selected')) {

      // When a valid card is selected
    } else {

      selectedAmount++;
      let memoryChild = memoryCard.children[0];
      memoryChild.classList.remove('hidden');
      memoryChild.classList.add('selected');



      const selectedCards = document.querySelectorAll('.selected');

      // Compare if two cards are selected
      if(selectedCards.length == 2){
        let card1 = selectedCards[0];
        let card2 = selectedCards[1];

        // If cards match
        if(card1.dataset.cardType == card2.dataset.cardType){

          if(bellSound.playing) {
            bellSound.stop();
          }

          memoryBoard.classList.add('finish-border');
          setTimeout(()=>{
            memoryBoard.classList.remove('finish-border');
          }, 1500)

          bellSound.play();
          bellSound.volume = 0.05;
          card1.classList.add('finished');
          card2.classList.add('finished');
          card1.parentElement.classList.add('no-bg');
          card2.parentElement.classList.add('no-bg');


          card1.classList.remove('selected');
          card2.classList.remove('selected');
          selectedAmount = 0;
          finishedPairs += 1;

          // If all cards are finished
          if(finishedPairs == 8){
            setTimeout(restart, 2500);
          }

          // If cards did not match
        } else {
          setTimeout(resetCards, 1000);
          }
        }
      }
  })
})

// Restarts the entire board
const restart = () => {

  countDown();

  isRestarting = true;

  selectedAmount = 0;

  newTypes = JSON.parse(JSON.stringify(cardTypes));

  memoryCards.forEach((card)=>{
    card.children[0].classList.remove('finished');
    card.children[0].classList.remove('selected');
    card.children[0].classList.add('hidden');
    card.classList.add("spin");
    card.classList.remove('no-bg');


    finishedPairs = 0;

    setTimeout(function(){
      let randomCardType = randomProperty(newTypes);
      card.children[0].dataset.cardType = randomCardType;
      card.classList.remove("spin");
      isRestarting = false;
    }, 1000);
  })
}

// Audio logic
const audio = document.querySelector('.audio');
const restartButton = document.querySelector('.restart-btn');

const countBorder = document.querySelector('.count-border');
const rect = document.querySelector('rect');

var timer;
let countingDown = false;

const countDown = () => {

  clearTimeout(timer)

  if(rect.classList.contains("count-down")){
    rect.classList.remove("count-down");
  }

  setTimeout(function(){
    rect.classList.add("count-down")
  },500);

  timer = setTimeout(restart, 36000);

}

const timerRestart = () => {
  var timer = setTimeout(function(){
    restart();
  }, 36000);
}

const stop = () => {
  clearTimeout(timer);
}


playButton.addEventListener('click', countDown);

restartButton.addEventListener('click', restart);
