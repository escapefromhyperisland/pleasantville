const title = document.querySelector(".title");
const instructions = document.querySelector(".instructions");
const moveOnText = document.querySelector(".move-on");
const wide = document.querySelector(".wide");
const narrow = document.querySelector(".narrow");
const cards = document.querySelector(".cards");
const postcard = document.querySelector(".postcard-wrapper");
const text = document.querySelector(".postcard-text-wrapper");

window.addEventListener("keydown", showTitle);
console.log(instructions);
function showTitle(e) {
  if (e.key === "Enter") {
    instructions.style.display = "none";
    title.style.display = "block";
    window.removeEventListener("keydown", showTitle);
    window.addEventListener("keydown", showNarrow);
  }
}

function showNarrow(e) {
  if (e.key === "Enter") {
    title.style.display = "none";
    wide.style.display = "none";
    narrow.style.display = "block";
    cards.style.display = "block";
    window.removeEventListener("keydown", showNarrow);
    cards.addEventListener("click", showPostcard);
  }
}

function showPostcard() {
  cards.removeEventListener("click", showPostcard);
  postcard.style.display = "flex";
  text.style.display = "flex";
  cards.style.display = "none";
  moveOnText.style.display = "block";
  window.addEventListener("keydown", moveOn);
}

function moveOn(e) {
  if (e.key === "Enter") {
    window.parent.postMessage("nextLevel");
  }
}

// Background music
const introSound = new Audio("pleasantville.wav");
introSound.play();
