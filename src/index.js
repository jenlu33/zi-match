
const studyBtn = document.getElementById('study-btn');
const playBtn = document.getElementById('play-btn');
const studying = document.getElementById('studying');
const playing = document.getElementById('playing');
const newGameBtn = document.getElementById('new-game-btn');
const board = document.getElementById("board")

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


let cards = [];
let charCards = [];
let defCards = [];

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
  }
  cards = { charCards, defCards };
  return cards;
};

// playBtn.addEventListener("click", createCards(DICTIONARY));

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
  
  cards.charCards.map(card => {
    const charCon = document.getElementById("char-container");
    const char = document.createElement("div");
    
    charCon.className = "char-container"
    char.id = card.id;
    char.className = "card";
    ch = card.character;
    
    for (let i = 0; i < ch.length; i++) {
      const writer = HanziWriter.create(char, ch[i], {
        width: 25,
        height: 25,
        padding: 0
      });
      charCon.appendChild(char)
    };
    board.append(charCon)
  });

  let shuffleDef = shuffle(cards.defCards); 

  shuffleDef.map(card => {
    const defCon = document.getElementById("def-container");
    const def = document.createElement("div");

    defCon.className = "def-container"
    def.id = card.id;
    def.className = "card";

    def.innerHTML = card.definition;
    defCon.appendChild(def)
    board.appendChild(defCon)
  })
};

// playBtn.addEventListener("click", displayCards(cards));

function startGame() {
  
  
  // if (document.getElementsByClassName("charCard")) {
  //   charCard = document.getElementsByClassName("charCard");
  //   charCard.parentNode = board;
  //   console.log(charCard.parentNode);
    
  // }
  // charCard.parentNode.removeChild(charCard);
  createCards(DICTIONARY);
  displayCards();

  
  board.addEventListener("click", e => {select(e)});
 
};

newGameBtn.addEventListener("click", startGame());

let currentCard;
let nextCard;

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
    }
  }
  
  if (currentCard && nextCard){
    compare(currentCard, nextCard);
    currentCard = null;
    nextCard = null;
  }
};

function compare(currentCard, nextCard) {
    if (currentCard.id === nextCard.id){
      currentCard.classList.toggle("match");
      nextCard.classList.toggle("match");
      setTimeout(() => {
        currentCard.classList.toggle("hide");
        nextCard.classList.toggle("hide");
      }, 500)
    } else {
      currentCard.classList.toggle("no-match");
      nextCard.classList.toggle("no-match");
      setTimeout(() => {
        currentCard.classList.value = "card";
        nextCard.classList.value = "card";
      }, 500)
    }
};

function endGame() {

};

function restart() {

};



