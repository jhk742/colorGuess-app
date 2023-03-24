"use strict";

const rgb = document.getElementById("color-display");
const reset = document.getElementById("reset");
const container = document.getElementById("container");
const lives = document.querySelector(".lives");
const mode = document.querySelectorAll(".mode");

let difficulty;
let [red, green, blue] = ["#000", "#000", "#000"];
let remainingLives;
let play = false;

const randomRGB = function () {
  const red = Math.floor(Math.random() * 255 + 1);
  const green = Math.floor(Math.random() * 255 + 1);
  const blue = Math.floor(Math.random() * 255 + 1);
  return [red, green, blue];
};

const checkMatch = function (clicked, answer) {
  if (
    clicked[0] === answer[0] &&
    clicked[1] === answer[1] &&
    clicked[2] === answer[2]
  )
    return true;
  return false;
};

mode.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const btn = e.target;
    const otherBtn = btn.nextElementSibling
      ? btn.nextElementSibling
      : btn.previousElementSibling;

    if (!btn.classList.contains("selected")) {
      btn.classList.toggle("selected");
      otherBtn.classList.toggle("selected");
    }

    difficulty = btn.textContent;
  });
});

reset.addEventListener("click", function (e) {
  play = true;
  remainingLives = difficulty === "Easy" ? 6 : 3;
  console.log(remainingLives);
  rgb.innerHTML = "RGB";
  lives.textContent = `Lives: ${remainingLives}`;
  lives.classList.remove("hidden");

  [red, green, blue] = randomRGB();
  rgb.insertAdjacentText("beforeend", `(${red}, ${green}, ${blue})`);

  const specialSquare = Math.floor(Math.random() * 6);
  const squares = Array.from(container.children);
  squares.map((sq, i) => {
    if (i === specialSquare)
      sq.style.backgroundColor = `rgb(${red},${green},${blue})`;
    if (i !== specialSquare) {
      const [r, g, b] = randomRGB();
      return (sq.style.backgroundColor = `rgb(${r},${g},${b})`);
    }
  });
});

container.addEventListener("click", function (e) {
  if (play) {
    const clicked = e.target
      .getAttribute("style")
      .match(/\d+/g)
      .map((numbers) => +numbers);

    if (checkMatch(clicked, [red, green, blue]) && remainingLives >= 1) {
      lives.textContent = `you win! press 'new colors' to play again!`;
      play = false;
    }
    if (!checkMatch(clicked, [red, green, blue]) && remainingLives >= 1) {
      console.log(`incorrect`);
      remainingLives--;
      lives.textContent = `Lives: ${remainingLives}`;
    }
    if (remainingLives === 0) {
      lives.textContent = `out of lives, you lose!`;
      document
        .querySelectorAll(".square")
        .forEach((sq) => (sq.style.backgroundColor = "#fff"));
      play = false;
    }
  }
});
