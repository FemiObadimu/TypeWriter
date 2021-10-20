const toggle = document.getElementById("toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => nav.classList.toggle("active"));

const Typewriter = function (txtElement, words, wait = 2000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.IsDeleting = false;
};

// type method
Typewriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];

  if (this.IsDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  let typeSpeed = 100;
  if (this.IsDeleting) {
    typeSpeed /= 2;
  }

  if (!this.IsDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.IsDeleting = true;
  } else if (this.IsDeleting && this.txt === "") {
    this.IsDeleting = false;
    this.wordIndex++;
    typeSpeed = 100;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init on DOM load

document.addEventListener("DOMContentLoaded", init);

// initialize

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new Typewriter(txtElement, words, wait);
}
