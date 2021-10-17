let randomNumber = getRandom();
let score = 0;
const gussingHistory = [];
let highscore = 0;
const numberOfTries = 9;

function getRandom() {
    return Math.random() * 101;
}

function getNum() {
    let guessedNumber = document.getElementById('guessField').value;
    return guessedNumber;
}

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function () {
    console.log(randomNumber)
       let guessedNumber = getNum()
        if (guessedNumber === 0) {
            document.querySelector("h1").textContent = "The number must bet between 0 - 100";
        } else if (guessedNumber === "") {
            document.querySelector("h1").textContent = "You must enter a valid number";
        } else if (guessedNumber > randomNumber) {
            document.querySelector("h1").textContent = "Too High!";
        } else if (guessedNumber < randomNumber) {
            document.querySelector("h1").textContent = "Too Low";
        } else if (guessedNumber === randomNumber) {
            document.querySelector("h1").textContent =  document.querySelector("h1").textContent = "Winner!";
        }
});