const postcardWrapper = document.querySelector(".postcard");
const postcard = document.querySelector(".postcard-inner");
const modalWrapper = document.querySelector(".modal-wrapper");
const modal = document.querySelector(".modal");
const wake = document.querySelector("#wake");
const closeModal = document.querySelector("#cancel");
const player = document.querySelector("[camera]");
const word1 = "apple";
const word2 = "rabies";
const word3 = "bay";
const ambience = new Audio("./assets/sounds/ambience.wav");
const error = new Audio("./assets/sounds/error.wav");

player.addEventListener("collide", function (e) {
  let id = e.detail.body.el.getAttribute("id");
  if (id === "door") {
    modalWrapper.style.display = "flex";
    wake.addEventListener("click", function () {
      const input1 = document.querySelector("#word-1").value;
      const input2 = document.querySelector("#word-2").value;
      const input3 = document.querySelector("#word-3").value;
      if (input1 == word1 && input2 == word2 && input3 == word3) {
        document.body.style.opacity = "0";
        ambience.pause();
      } else {
        modal.classList.add("wobble");
        modal.style.background = "#e72b49";
        error.play();
        setTimeout(function () {
          modal.classList.remove("wobble");
          modal.style.background = "#222";
        }, 500);
      }
    });
    closeModal.addEventListener("click", function () {
      modalWrapper.style.display = "none";
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
