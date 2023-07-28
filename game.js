const cardsContainer = document.getElementById("cards");
let cards = [];
let Card1 ,Card2;
let lockBoard = false;
let score = 0;
let tries = 0;
document.getElementById("score").textContent = "Score: " + score;
document.getElementById("tries").textContent = "Tries: " + tries

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    console.log(cards);
    shuffleCards(cards);
    gencards(cards);
  });
  
  // function shuffleCards(cards) {
  //   for (let i = cards.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [cards[i], cards[j]] = [cards[j], cards[i]];
  //   }
  // }
  
function shuffleCards() {
  let CI = cards.length;
  let RandI;
  let tempV;
  while (CI !== 0) {
    RandI = Math.floor(Math.random() * CI);
    CI--;
    tempV = cards[CI];
    cards[CI] = cards[RandI];
    cards[RandI] = tempV;
  }
  console.log(cards);
}


function gencards() {
  for(let card of cards ) {
    const cardElem = document.createElement("div")
    cardElem.classList.add("card")
    cardElem.setAttribute("data-name",card.name)
    cardElem.innerHTML = `  
    <div class="front">
    
    </div>
    <div class="back">
    <img class="front-image" src=${card.image}>
    </div>`
    cardsContainer.appendChild(cardElem)
    cardElem.addEventListener("click",flipC)
    cardElem.addEventListener("touch",flipC)
  }
}


function flipC() {

  if(lockBoard) return;
  if(this === Card1) { return; }

  this.classList.add("flipped");

  if(!Card1){
    Card1 = this;
    return;
  }
  Card2 = this;
  lockBoard = true;
  tries++;
  CFM();
  console.log("this is flipc"+ lockBoard);
}

function CFM() { 
  let isMatch = Card1.dataset.name === Card2.dataset.name
  
  if(isMatch){
    DC()
    // Card1.style.visibility = "hidden";
    // Card2.style.visibility = "hidden";
    document.getElementById("score").textContent = "Score: " + score;
    
  }
  else{
    console.log("this is else cfm"+ lockBoard)
    document.getElementById("tries").textContent = "Tries: " + tries
    unflipCards()
  }
    
}

function unlockBoard() {
  Card1 = null;
  Card2 = null;
  lockBoard = false ;
  console.log(lockBoard); 
}
function DC() {
  console.log("this is dc"+ lockBoard)
  Card1.removeEventListener ("click",flipC)
  Card2.removeEventListener ("click",flipC)
  Card2.removeEventListener ("touch",flipC)
  Card2.removeEventListener ("touch",flipC)
  score++;
  end();
  unlockBoard()
}

function unflipCards() {
  console.log("this is unflip"+ lockBoard)
  setTimeout(() => {

    Card1.classList.remove("flipped");
    Card2.classList.remove("flipped");
    unlockBoard();
  }
  , 1000);

}

function end(){
  if(score === 9)
    startConfetti() 

}



function restart() {
  console.log("this is restart"+ lockBoard)
  document.getElementById('score').textContent = "Score: " + 0;
  score = 0;
  shuffleCards()
  document.getElementById("cards").innerHTML = '';
  gencards()
  unlockBoard()
  tries = 0 
  document.getElementById("tries").textContent = "Tries: " + 0 ; 
}