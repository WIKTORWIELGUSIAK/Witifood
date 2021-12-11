function carousel() {
  let i = 0;
  let time = 1000;
  // document.slide.src = images[i];
  // // if (i < images.length - 1) {
  // //   i++;
  // // } else {
  // //   i = 0;
  // // }

  setTimeout("carousel()", time);
}

window.onload = carousel;
