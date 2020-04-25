
const studyBtn = document.getElementById('study-btn');
const playBtn = document.getElementById('play-btn');
const studying = document.getElementById('studying');
const playing = document.getElementById('playing');
const newGameBtn = document.getElementById('new-game-btn');

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

function createCards(DICTIONARY) {
  let charCards = [];
  let defCards = [];
  const dictionary = DICTIONARY.slice();
  
  for (let i = 0; i < 6; i++){
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
    let board = document.getElementById("board");
    let char = document.createElement("div");
    
    char.id = card.id;
    char.className = "charCard";
    ch = card.character;
    
    for (let i = 0; i < ch.length; i++) {
      const writer = HanziWriter.create(char, ch[i], {
        width: 30,
        height: 30,
        padding: 0
      });
      board.appendChild(char);
    };
    
  });

  let shuffleDef = shuffle(cards.defCards); 

  shuffleDef.map(card => {
    let board = document.getElementById("board");
    let def = document.createElement("div");

    def.id = card.id;
    def.className = "defCard";

    def.innerHTML = card.definition;
    board.appendChild(def)
  })
};

// playBtn.addEventListener("click", displayCards(cards));

function newGame() {
  
  board = document.getElementById("board")
  // if (document.getElementsByClassName("charCard")) {
  //   charCard = document.getElementsByClassName("charCard");
  //   charCard.parentNode = board;
  //   console.log(charCard.parentNode);
    
  // }
  // charCard.parentNode.removeChild(charCard);
  createCards(DICTIONARY);
  displayCards();
  // console.log(cards);
  
};



