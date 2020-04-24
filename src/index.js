const studyBtn = document.getElementById('study-btn');
const playBtn = document.getElementById('play-btn');
const studying = document.getElementById('studying');
const playing = document.getElementById('playing');
const newGame = document.getElementById('new-game-btn');

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


// let charCards = [];
// let defCards = [];
let cards = [];

function createCards(DICTIONARY) {
  charCards = [];
  defCards = [];
  cards = [];
  const dictionary = DICTIONARY.slice();
  
  for (let i = 0; i < 6; i++){
    const length = dictionary.length;
    let card =  dictionary[Math.floor(Math.random() * length)];
    cards.push(card.character);
    cards.push(card.definition);

    dictionary.splice(dictionary.indexOf(card), 1);
  }
  // console.log(charCards);
  // console.log(defCards);
  console.log(cards);
  
};

let deck = [];
function shuffle(cards){
  deck = []

  for(let i = cards.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i);
    deck.push(charCards[i])
  };
  console.log(deck);
};

newGame.addEventListener("click", shuffle(cards));

function displayCards(charCards) {
  

  // cards.map(card => {
  //   let board = document.getElementById("board");
  //   let char = document.createElement("div");
  //   let def = document.createElement("div");

  //   char.id = card.id;
  //   def.id = card.id;
  //   char.className = "charCard";
  //   def.className = "defCard";

  //   chars = card.character;
  //   for (let i = 0; i < chars.length; i++) {
  //     const writer = HanziWriter.create(char, chars[i], {
  //       width: 30,
  //       height: 30,
  //       padding: 0
  //     });
  //     board.appendChild(char);
  //   };
  //   def.innerHTML = card.definition;
  //   board.appendChild(def)
  // });
};

// playBtn.addEventListener("click", displayCards(charCards))




