const appleSound = new Audio("media/plop.wav");

let apples = 0;

AFRAME.registerComponent("apple-function", {
  init: function () {
    const el = this.el;
    this.el.addEventListener("click", getApple);
    function getApple() {
      appleSound.play();
      el.setAttribute("visible", "false");
      apples++;
      document.querySelector("#apples-text").innerText = apples;
      el.removeEventListener("click", getApple);
      if (apples === 5) {
        document.querySelector(".speechbubble").style.display = "block";
        document.querySelector("#speechbubble-text").innerHTML =
          "<i>Mary:</i> Thank you dear. <br>I remember I met someone, someone who tried to figure out a riddle. <br>It was long ago but it's still stuck in my mind, maybe you know the right answer. <br><br>I don't have wings, but I can fly. <br>I don't have eyes, but I will cry! <br>What am I? Look for me! <br><br>Press ESC to click ->";
        document.querySelector("#cloud").setAttribute("visible", "true");
      }
    }
  },
});

AFRAME.registerComponent("cloud-function", {
  init: function () {
    const el = this.el;
    this.el.addEventListener("click", function () {
      document.querySelector("#camera").setAttribute("camera", "active", false);
      document.querySelector("#second-camera").setAttribute("active", true);
      document.querySelector(".speechbubble").style.display = "block";
      document.querySelector(".speechbubble").style.bottom = "50%";
      document.querySelector("#speechbubble-text").innerHTML =
        "<i>Mary:</i> Where did the Tarot cards come from? Well I don’t know anything about this, I like corn though. <br>It seems that someone is pointing you to the medium, she'll give you all the answers you seek. <br>Take the shortcut through the corn field.";
      document
        .querySelector("#speechbubble-button")
        .removeEventListener("click", conversationHandler);
      document
        .querySelector("#speechbubble-button")
        .addEventListener("click", finishLevel);
    });
  },
});
