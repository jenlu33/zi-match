const studyBtn = document.getElementById('study-btn');
const playBtn = document.getElementById('play-btn');
const studying = document.getElementById('studying');
const playing = document.getElementById('playing');

// let study = false;
// let play = false;

// ------- STUDY -------

function clickedStudyToggle() {
  studyBtn.classList.toggle("clicked");
  studyBtn.classList.toggle("option-btn");
  playBtn.classList.value = "option-btn";
}

studyBtn.addEventListener("click", clickedStudyToggle)

function displayStudyToggle() {
  studying.classList.toggle("none");
  studying.classList.toggle("show");
  playing.classList.value = "none";
};

studyBtn.addEventListener("click", displayStudyToggle);

function studyWords(DICTIONARY) {

  if (studying.classList.value === "none") {
    DICTIONARY.map(word => {
      console.log(word.character);
      const writer = HanziWriter.create('display-dictionary', word.character, {
        width: 45,
        height: 45,
        padding: 5

      });
      // wordsList.append(character);
      // wordsList.append(definition);
    });
  };
};

// ------- PLAY -------

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


