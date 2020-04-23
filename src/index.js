const studyBtn = document.getElementById('study-btn');
const playBtn = document.getElementById('play-btn');
const studying = document.getElementById('studying');
const playing = document.getElementById('playing');

// let study = false;
// let play = false;

// -------------- STUDY --------------

function clickedStudyToggle() {
  studyBtn.classList.toggle("clicked");
  studyBtn.classList.toggle("option-btn");
  playBtn.classList.value = "option-btn";
};

studyBtn.addEventListener("click", clickedStudyToggle)

function displayStudyToggle() {
  studying.classList.toggle("none");
  studying.classList.toggle("show");
  playing.classList.value = "none";
};

studyBtn.addEventListener("click", displayStudyToggle);


// ----- Shows dictionary entries -----
function displayStudyWords(DICTIONARY) {
  DICTIONARY.map(word => {
      let dChar = document.createElement("div");
      dChar.className = "display-char"

      const writer = HanziWriter.create(dChar, word.character, {
        width: 45,
        height: 45,
        padding: 5
      });

      let entries = document.getElementById("entries");
      let entry = document.createElement("div");
      entry.className = "entry";
      let dDef = document.createElement("div");
      dDef.className = "definition";
      dDef.innerHTML = word.definition;
      
      entry.appendChild(dChar);
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
}

playBtn.addEventListener("click", clickedPlayToggle)

function displayPlayToggle() {
  playing.classList.toggle("none");
  playing.classList.toggle("show");
  studying.classList.value = "none";
};

playBtn.addEventListener("click", displayPlayToggle);


