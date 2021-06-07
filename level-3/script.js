const marysHouse = document.querySelector(".house");
const input = document.querySelector("#password");
const message = document.querySelector("#message");
const pattern = document.querySelector(".modal");
const patternImage = document.querySelector("#pattern-image");

const firstChallengeHandler = () => {
  window.location.href = "maryshouse.html";
};

const closePattern = () => {
  pattern.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == pattern) {
    pattern.style.display = "none";
  }
};

const getPattern = (src) => {
  pattern.style.display = "block";
  patternImage.src = src;
};

const showHouse = () => {
  console.log(input.value);
  if (input.value.toLowerCase() === "mary") {
    closePattern();
    marysHouse.style.display = "inline-block";
    message.innerText = "You are ready! Go to her house, before its to late.";
  } else if (input.value.toLowerCase().includes("m")) {
    closePattern();
    message.innerText = "You are on the right way!";
  } else {
    closePattern();

    message.innerText = "You are not ready to meet her just yet..";
    marysHouse.style.display = "none";
  }
};

//MARYS HOUSE

const speechbubbleText = document.querySelector("#speechbubble-text");
const speechbubble = document.querySelector(".speechbubble");

conversations = [
  "<i>Me:</i> I am looking for someone. <br>Have you noticed anything?",
  "<i>Mary:</i> I might have heard something about someone, let me think. <br><br>I am about to make an apple pie, can you get some apples for me? <br>5 would be enough.",
  "<i>Mary:</i> Thank you dear. I remember I met someone, someone who tried to figure out a riddle. It was long ago but it's still stuck in my mind, maybe you know the right answer. I don't have wings, but I can fly. I don't have eyes, but I will cry!What am I? Look for me!",
  "<i>Mary:</i> I don’t know anything about that. It seems that someone is pointing to the medium, she'll give you all the answers you seek. Take the shortcut through the corn field.",
];
let times = 0;

const conversationHandler = () => {
  if (times === 2) {
    speechbubble.style.display = "none";
  } else {
    speechbubbleText.innerHTML = conversations[times];
    times++;
  }
};

const finishLevel = () => {
  window.parent.postMessage("nextLevel");
};

// Background music

window.onload = async function makeNoise() {
  //start up the audio machinery
  await Tone.start();

  const distortion = new Tone.Distortion(0.5).toDestination();

  const player = new Tone.Player({
    url: "media/base.wav",
    loop: true,
  }).connect(distortion);
  player.volume.value = -25;

  await Tone.loaded();
  player.start();
};
