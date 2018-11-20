const memoryBoard = document.querySelector('.memory-board');

var cardCount = 15;

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

memoryCards.forEach((memoryCard) => {
  memoryCard.addEventListener('click', ()=>{
    
    let memoryChild = memoryCard.children[0];

    memoryChild.classList.remove('hidden');
  })
})
