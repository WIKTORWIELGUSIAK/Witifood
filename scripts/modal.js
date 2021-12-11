const modalBtn = document.querySelector(".modal-btn");
const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");
const body = document.getElementsByTagName("body");
const tabs = document.querySelectorAll("[data-tab-button]");
const tabContents = document.querySelectorAll("[data-tab-content]");
modalBtn.addEventListener("click", function () {
  modalBg.classList.add("bg-active");
});

modalClose.addEventListener("click", function () {
  modalBg.classList.remove("bg-active");
});

window.onclick = function (e) {
  if (e.target == modalBg) {
    modalBg.classList.remove("bg-active");
  }
};

document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "Escape") {
    modalBg.classList.remove("bg-active");
  }
});
