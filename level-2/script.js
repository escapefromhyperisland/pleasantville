const postcardWrapper = document.querySelector(".postcard");
const postcard = document.querySelector(".postcard-inner");
const modalWrapper = document.querySelector(".modal-wrapper");
const modal = document.querySelector(".modal");
const wake = document.querySelector("#wake");
const hint = document.querySelector("#hint");
const hintText = document.querySelector("#hint-text");
const input1 = document.querySelector("#word-1");
const input2 = document.querySelector("#word-2");
const input3 = document.querySelector("#word-3");
const closeModal = document.querySelector("#cancel");
const player = document.querySelector("[camera]");
const ambience = new Audio("./assets/sounds/ambience.wav");
const words = ["apple", "rabies", "bay"];

player.addEventListener("collide", function (e) {
  let id = e.detail.body.el.getAttribute("id");
  if (id === "door") {
    modalWrapper.style.display = "flex";
    hint.addEventListener("click", function () {
      if (input1.value == "" && input2.value == "" && input3.value == "") {
        hintText.innerHTML = "Look for the scannable codes.";
      }
    });
    wake.addEventListener("click", function () {
      const word1 = input1.value.toLowerCase();
      const check1 = document.querySelector("#check-1");
      const word2 = input2.value.toLowerCase();
      const check2 = document.querySelector("#check-2");
      const word3 = input3.value.toLowerCase();
      const check3 = document.querySelector("#check-3");

      if (word1 == words[0]) {
        document.querySelector(".reveal-1").innerHTML = "An";
        document.querySelector(".reveal-2").innerHTML = "a day";
        setCorrect(input1, check1);
      } else if (word1 != words[0]) {
        setIncorrect(check1);
      }
      if (word2 == words[1]) {
        document.querySelector(".reveal-3").innerHTML = "keeps";
        setCorrect(input2, check2);
      } else if (word2 != words[1]) {
        setIncorrect(check2);
      }
      if (word3 == words[2]) {
        document.querySelector(".reveal-4").innerHTML = "at";
        setCorrect(input3, check3);
      } else if (word3 != words[2]) {
        setIncorrect(check3);
      }
      if (word1 == words[0] && word2 == words[1] && word3 == words[2]) {
        setTimeout(function () {
          document.body.style.opacity = "0";
          ambience.pause();
        }, 1000);
        setTimeout(function () {
          window.parent.postMessage("nextLevel");
        }, 2000);
      }

      function setIncorrect(check) {
        check.innerHTML = "𐄂";
        check.classList = "wrong";
      }

      function setCorrect(input, check) {
        input.readOnly = true;
        check.innerHTML = "✓";
        check.classList = "right";
      }

      hint.addEventListener("click", function () {
        if (word1 != words[0] && word2 != words[1] && word2 != words[2]) {
          hintText.innerHTML = "Each number corresponds to a key word.";
        } else if (word1 != words[0]) {
          hintText.innerHTML = "Get the ball rolling! Feeling choked up?";
        } else if (word2 != words[1]) {
          hintText.innerHTML = "What is Venus looking at? Be bold!";
        } else if (word3 != words[2]) {
          hintText.innerHTML = "Those columns don't look too heavy.. Zoom in and focus on the details.";
        }
      });
    });

    closeModal.addEventListener("click", function () {
      modalWrapper.style.display = "none";
      hintText.innerHTML = "";
    });
  }
});

postcard.addEventListener("click", function () {
  postcardWrapper.style.opacity = "0";
  setTimeout(function () {
    postcardWrapper.remove();
  }, 1000);
  ambience.play();
  ambience.loop = true;
});