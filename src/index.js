
const studyBtn = document.getElementById('study-btn');
const playBtn = document.getElementById('play-btn');
const studying = document.getElementById('studying');
const playing = document.getElementById('playing');
const newGameBtn = document.getElementById('new-game-btn');
const board = document.getElementById("board");


// -------------- STUDY --------------

function clickedStudyToggle() {
  studyBtn.classList.toggle("clicked");
  studyBtn.classList.toggle("option-btn");
  playBtn.classList.value = "option-btn";
};

studyBtn.addEventListener("click", clickedStudyToggle);

function displayStudyToggle() {
  studying.classList.toggle("none");
  studying.classList.toggle("show");
  playing.classList.value = "none";
};

studyBtn.addEventListener("click", displayStudyToggle);

function displayStudyWords(DICTIONARY) {
  DICTIONARY.map(word => {
    let entries = document.getElementById("entries");
    let dChar = document.createElement("div");
    let entry = document.createElement("div");
    
    dChar.className = "display-char"
    entry.className = "entry";
    entry.id = "entry"
  
    chars = word.character;
    for(let i = 0; i < chars.length; i++) {
      const writer = HanziWriter.create(dChar, chars[i], {
        width: 45,
        height: 45,
        padding: 0
      });
      entry.appendChild(dChar);
    };

    let dDef = document.createElement("div");
    dDef.className = "definition";
    dDef.innerHTML = word.definition;

    let dPronounce = document.createElement("div");
    dPronounce.className = "pronounciation";
    dPronounce.innerHTML = word.pronounciation;

    entry.appendChild(dPronounce);
    entry.appendChild(dDef);
    entries.appendChild(entry);
    
  });
};

studyBtn.addEventListener("click", displayStudyWords(DICTIONARY));

// -------------- PLAY --------------

let cards;
let charCards = [];
let defCards = [];
// let ids = [];
let currentCard;
let nextCard;
let count = 0;

function clickedPlayToggle() {
  playBtn.classList.toggle("clicked");
  playBtn.classList.toggle("option-btn");
  studyBtn.classList.value = "option-btn";
};

playBtn.addEventListener("click", clickedPlayToggle);

function displayPlayToggle() {
  playing.classList.toggle("none");
  playing.classList.toggle("show");
  studying.classList.value = "none";
};

playBtn.addEventListener("click", displayPlayToggle);


function createCards(DICTIONARY) {
  let charCards = [];
  let defCards = [];
  const dictionary = DICTIONARY.slice();
  
  for (let i = 0; i < 9; i++){
    const length = dictionary.length;
    let card =  dictionary[Math.floor(Math.random() * length)];
    charCards.push({id: card.id, character:card.character});
    defCards.push({ id: card.id, definition:card.definition});
    dictionary.splice(dictionary.indexOf(card), 1);
    count ++;
  }
  cards = { charCards, defCards };
};

function shuffle(defCards){
  shuffled = defCards.slice(0);
  
  for(let i = shuffled.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i);
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  };
  return shuffled;
}

function displayCards() {
  
  const charCon = document.createElement("div");
  cards.charCards.map(card => {
    const char = document.createElement("div");
    
    charCon.id = "char-container";
    charCon.className = "char-container";
    char.id = card.id;
    char.className = "card";
    ch = card.character;
    
    for (let i = 0; i < ch.length; i++) {
      const writer = HanziWriter.create(char, ch[i], {
        width: 25,
        height: 25,
        padding: 0
      });
    };
    charCon.appendChild(char)
  });
  board.append(charCon)

  let shuffleDef = shuffle(cards.defCards); 

  const defCon = document.createElement("div")
  shuffleDef.map(card => {
    const def = document.createElement("div");

    defCon.id = "def-container";
    defCon.className = "def-container";
    def.id = card.id;
    def.className = "card";

    def.innerHTML = card.definition;
    defCon.appendChild(def)
  })
  board.appendChild(defCon)
};

function startGame() {
  if (document.getElementsByClassName("card") != undefined) {
    restart();
  }

  createCards(DICTIONARY);
  displayCards();
  board.addEventListener("click", e => {select(e)});
  
};

function select(e) {
  selected = e.target;
  let id = e.target.id;
  newId = parseInt(id, 10);
  
  if ( newId == false || Number.isNaN(newId) ) {
    // console.log("not a number");
  } else {
    e.target.classList.toggle("select")
    
    if (!currentCard){
      currentCard = selected;
    } else {
      nextCard = selected;
    };
  };
  
  if (currentCard && nextCard){
    compare(currentCard, nextCard);
    currentCard = null;
    nextCard = null;
  };
};

function compare(currentCard, nextCard) {
  if (currentCard.id === nextCard.id){
    currentCard.classList.toggle("match");
    nextCard.classList.toggle("match");
    setTimeout(() => {
      currentCard.classList.toggle("hide");
      nextCard.classList.toggle("hide");
    }, 500);
    count -= 1;
    console.log(count);
    if (count === 0){
      endGame();
    }
  } else {
    currentCard.classList.toggle("no-match");
    nextCard.classList.toggle("no-match");
    setTimeout(() => {
      currentCard.classList.value = "card";
      nextCard.classList.value = "card";
    }, 500);
  };
};

function endGame() {
  console.log("you win!");
  const modal = document.createElement("div");
  modal.className = "hide-modal";
  
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.innerHTML = "Good job!"
  
  modal.appendChild(modalContent);
  board.appendChild(modal);
  setTimeout(() => {
    
    modal.className = "show-modal";
  }, 1000)

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.className = "hide-modal";
    }
  }

};

function restart() {
  while (board.firstChild) {
    board.removeChild(board.lastChild);
  };
  currentCard = null;
  nextCard = null;
  count = 0;
};



