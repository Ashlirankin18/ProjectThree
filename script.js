let randomNumber = getRandom();
let score = 10;
const guessingHistory = [];
let highscore = 0;
const numberOfTries = 9;

function getRandom() {
    return Math.trunc(Math.random() * 101);
}

function getNum() {
    let guessedNumber = document.getElementById('guessField').value;
    return guessedNumber;
}

function updateTryHistory(guessedNumber) {
    const paragraph = document.createElement("P");
    const text = document.createTextNode(guessedNumber);
    let parentDiv = document.getElementById("historySection");
    paragraph.appendChild(text);
    parentDiv.appendChild(paragraph);
}

function updateScore() {
    score -= 1;
    //Update score label.
}

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function () {
       let guessedNumber = Number(getNum());
      updateTryHistory(guessedNumber);
        if (guessedNumber === 0) {
            document.querySelector("h1").textContent = "The number must bet between 0 - 100";
            updateScore();
        } else if (guessedNumber === "") {
            document.querySelector("h1").textContent = "You must enter a valid number";
        } else if (guessedNumber > randomNumber) {
            document.querySelector("h1").textContent = "Too High!";
            updateScore();
        } else if (guessedNumber < randomNumber) {
            document.querySelector("h1").textContent = "Too Low";
            updateScore();
        } else if (guessedNumber === randomNumber) {
            document.querySelector("h1").textContent = "Winner!";
        }
});