let randomNumber = getRandom();
let score = 10;
let highscore = 0;
let imagePaths = [
  "images/0030.png",
  "images/0031.png",
  "images/0032.png",
  "images/0033.png",
  "images/0034.png",
  "images/0035.png",
  "images/0036.png",
  "images/0037.png",
  "images/0038.png",
  "images/0039.png"
]

function getRandom() {
    return Math.trunc(Math.random() * 101);
}

function getNum() {
    let guessedNumber = document.getElementById('guessField').value;
    return guessedNumber;
}

function clearTextFiled() {
    let guessedNumber = document.getElementById('guessField').value = "";
}

function updateTryHistory(guessedNumber) {
    const paragraph = document.createElement("P");
    const text = document.createTextNode(guessedNumber);
    let parentDiv = document.getElementById("guessedScores");
    paragraph.appendChild(text);
    parentDiv.appendChild(paragraph);
}

function updateScore() {
    score -= 1;
    const scoreLabel = document.getElementById(score);
    scoreLabel.src = "images/1f6ab.png";
}

function resetAllLives() {
  if score < 10 {
    for (let index = 0; 0 < 10; index++) {
      let scoreLabel = document.getElementById(index);
      scoreLabel.src = imagePaths[index];
    }
  }
}

const submitButton = document.getElementById('guessButton');
submitButton.addEventListener('click', function () {
       let guessedNumber = getNum();
       console.log(guessedNumber)
       console.log(randomNumber);
      updateTryHistory(guessedNumber);

        if (guessedNumber.length === 0) {
            const image = document.getElementById("image");
            image.src = "images/speak_no_evil_monkey.gif";
        } else {
            guessedNumber = Number(getNum())

            if (guessedNumber === 0) {
                const image = document.getElementById("image");
                image.src = "images/woman_facepalming.gif";
                updateScore();
            }

            if (guessedNumber > 100 || guessedNumber < 1) {
                const image = document.getElementById("image");
                image.src = "images/woman_facepalming.gif";
                updateScore();
            }

            if (randomNumber < guessedNumber) {
                const image = document.getElementById("image");
                image.src = "images/backhand_index_pointing_down.gif";
                updateScore();
            }

            if (randomNumber > guessedNumber) {
                const image = document.getElementById("image");
                image.src = "images/backhand_index_pointing_up.gif";
                updateScore();
            }

            if (guessedNumber === randomNumber) {
                const image = document.getElementById("image");
                image.src = "images/trophy.gif";
                initConfetti();
                const canvas = document.getElementById("canvas");
                canvas.style.opacity = 1;
                render();
                updateGuessButtonWinnerStyle();
            }

            if (0 === score) {
              const image = document.getElementById("image");
                image.src = "images/bomb.gif";
                const promptLabel = document.getElementById("promptLabel")
                promptLabel.textContent = "Game Over"
            }
    }
    clearTextFiled()
});

const resetButton = document.getElementById('button2');
resetButton.addEventListener("click", function() {
const canvas = document.getElementById("canvas");
canvas.style.opacity = 0;

const image = document.getElementById("image");
image.src = "images/face_with_rolling_eyes.gif";
const promptLabel = document.getElementById("promptLabel");
promptLabel.textContent = "Test your luck!";
updateGuessButtonResetStyle();
score = 10;
resetAllLives()

let parentDiv = document.getElementById("guessedScores");
parentDiv.replaceChildren([]);
})

























//-----------Var Inits--------------
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 600;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [{ front: 'red', back: 'darkred' },
{ front: 'green', back: 'darkgreen' },
{ front: 'blue', back: 'darkblue' },
{ front: 'yellow', back: 'darkyellow' },
{ front: 'orange', back: 'darkorange' },
{ front: 'pink', back: 'darkpink' },
{ front: 'purple', back: 'darkpurple' },
{ front: 'turquoise', back: 'darkturquoise' }];


//-----------Functions--------------
resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30) },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1 },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1 },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50) } });
  }
};

//---------Render-----------
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetto
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  if (confetti.length <= 10) initConfetti();
  window.requestAnimationFrame(render);
};

//----------Resize----------
window.addEventListener('resize', function () {
  resizeCanvas();
});


// RANGE SLIDER?
// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value
//
// // Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//   output.innerHTML = this.value;
// }

// RESET?
// const head2 = document.getElementById('resetButton')
//
// head2.addEventListener('click', function () {
//
//   document.querySelector('body').style.backgroundColor = "#627881"
//   document.querySelector('p').textContent = 'New Game!'
//   document.querySelector('p').style.fontSize = '100px'
// });

// HIGH SCORE?
