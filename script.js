// Initialize ALL global variables here
let inputs;
let gameOver;
let tries = 0;
let letterAdded;
// allTheWords = []
// This code here selects a random word
const wordList = [
  "vis",
  "toeter",
  "developer",
  "telefoon",
  "moeder",
  "snoer",
  "geeuw"
];
const wordPicker = () => {
  let word = wordList[Math.floor(Math.random() * wordList.length)];
  console.log("wat ben ik?", word);
  return word;
};

const wordGuessed = function(word, inputs) {
  const remaining = word.filter(function(letter) {
    return !inputs.includes(letter);
  });
  return remaining.length === 0;
};

const winTheGame = function() {
  document.querySelector(".win").style.display = "block";
  gameOver = true;
};

const loseGame = function() {
  document.querySelector(".lose").style.display = "block";
  gameOver = true;
};

const letters = function(word, inputs) {
  let wrongLetters = inputs.filter(function(letter) {
    return !word.includes(letter);
  });
  document.querySelector(".guessed_letters").innerHTML = wrongLetters.join(" ");
};

const theWord = function(word, inputLetterWords) {
  let display = word.map(function(letter) {
    if (inputLetterWords.includes(letter)) {
      letterAdded = letter;
      return letter;
    } else {
      return "_";
    }
  });
  document.querySelector(".the_word").innerHTML = display.join(" ");
};

const guessLetter = function() {
  if (gameOver) {
    return;
  }
  const input1 = document.querySelector("input").value;
  document.querySelector("input").value = "";

  if (inputs.includes(input1) || input1 === "") {
    return;
  }

  if (!word.includes(input1)) {
    tries++;
    document.querySelector(".lives span").innerHTML = 5 - tries;
    console.log(tries);
  }

  inputs.push(input1);
  theWord(word, inputs);
  letters(word, inputs);

  if (wordGuessed(word, inputs)) {
    winTheGame();
  } else if (tries >= 5) {
    loseGame();
  }
};

function beginTheGameWithPlayer() {
  gameOver = false;
  document.querySelector(".win").style.display = "none";
  document.querySelector(".lose").style.display = "none";
  document.querySelector("input").value = "";

  word = wordPicker(wordList).split("");
  document.querySelector(".lose p span").innerHTML = `"${word.join("")}"`;

  tries = 0;
  document.querySelector(".lives span").innerHTML = 5;

  inputs = [];
  theWord(word, inputs);
  letters(word, inputs);
}

// const guessLetterByClick = function() {
//   console.log("a is clicked");
//   const input1 = "a";
//   document.querySelector("input").value = "";

//   if (inputs.includes(input1) || input1 === "") {
//     return;
//   }

//   if (!word.includes(input1)) {
//     tries++;

//     document.querySelector(".lives span").innerHTML = 5 - tries;
//   }

//   inputs.push(input1);
//   theWord(word, inputs);
//   letters(word, inputs);

//   if (wordGuessed(word, inputs)) {
//     winTheGame();
//   } else if (tries >= 5) {
//     loseGame();
//   }
// };
// const btns = document.getElementById("a");
// console.log(btns);
// const btnsArr = Array.prototype.slice.call(btns);
// console.log(btnsArr);

// btns.addEventListener("click", guessLetterByClick);

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".guess").addEventListener("click", guessLetter);
  document
    .querySelector(".restart")
    .addEventListener("click", beginTheGameWithPlayer);
  beginTheGameWithPlayer();
});

const functions = {
  wordPicker: wordPicker,
  guessLetter: guessLetter,
  theWord: theWord
};

module.exports = functions;
