const memoryBoard = document.querySelector('.memory-board');

var cardCount = 15;
var finishedPairs = 0;

let cardTypes = {
  'heart': 0,
  'skull': 0,
  'test': 0,
  'dog': 0,
  'cat': 0,
  'dollar': 0,
  'horse': 0,
  'apple': 0,
}

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

for(i=0; i <= cardCount; i++){
  const newCardContainer = document.createElement('div')
  const newCard = document.createElement('div');

  newCardContainer.setAttribute('class', 'memory-card-container');
  newCard.setAttribute('class', 'memory-card hidden');

  newCardContainer.appendChild(newCard);


  let randomCardType = randomProperty(cardTypes);

  newCard.dataset.cardType = randomCardType;
  memoryBoard.appendChild(newCardContainer);
}


  const memoryCards = document.querySelectorAll('.memory-card-container');
  let selectedAmount = 0;

  const resetCards = ()=>{
    const selectedCards = document.querySelectorAll('.selected');
    console.log(selectedCards)
    selectedCards.forEach((selectedCard) => {
      selectedCard.classList.add('hidden');
      selectedCard.classList.remove('selected');
    })
    selectedAmount = 0;
  }


  memoryCards.forEach((memoryCard) => {
    memoryCard.addEventListener('click', ()=>{
      if(memoryCard.children[0].classList.contains('finished')){
        console.log("Already done!");
      } else {
        if(selectedAmount == 2 || memoryCard.children[0].classList.contains('selected')){
          console.log("Already picked two!");
        } else {
          selectedAmount++;
          let memoryChild = memoryCard.children[0];
          memoryChild.classList.remove('hidden');
          memoryChild.classList.add('selected');

          const selectedCards = document.querySelectorAll('.selected');

          console.log(selectedAmount)
          if(selectedCards.length == 2){
            let card1 = selectedCards[0];
            let card2 = selectedCards[1];

            if(card1.dataset.cardType == card2.dataset.cardType){
              card1.classList.add('finished');
              card2.classList.add('finished');
              card1.classList.remove('selected');
              card2.classList.remove('selected');
              selectedAmount = 0;
              finishedPairs += 1;
              if(finishedPairs == 8){
                finish();
              }
            } else {
              console.log(card1.dataset.cardType)
              setTimeout(resetCards, 1000);
            }
          }
        }
      }
    })
  })

  const finish = ()=>{
    memoryCards.forEach((card)=>{
      card.children[0].classList.add('finished');
      finishedPairs = 8;
    })
    setTimeout(function(){ window.alert("You finished good job!") }, 100)
  }
