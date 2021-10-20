let randomNumber = getRandom();
let score = 10;
const guessingHistory = [];
let highscore = 0;
const numberOfTries = 9;


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


function updateGuessButtonWinnerStyle() {
  const guessButton = document.getElementById('guessButton');
  guessButton.style.color = "white";
  guessButton.disabled = true;
  guessButton.style.backgroundColor = "red";
}

function updateGuessButtonResetStyle() {
  const guessButton = document.getElementById('guessButton');
  guessButton.style.color = "white";
  guessButton.disabled = false;
  guessButton.style.backgroundColor = "gold";
}

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
    paragraph.style.textAlign = "left";
    paragraph.style.float = "left";
    paragraph.style.marginLeft = "60px";
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

const submitButton = document.getElementById('guessButton');
submitButton.addEventListener('click', function () {
       let guessedNumber = getNum();
       console.log(guessedNumber)
       console.log(randomNumber);
      updateTryHistory(guessedNumber);
      
        if (guessedNumber.length === 0) {
            const image = document.getElementById("image");
            image.src = "images/speak_no_evil_monkey.gif";
            const promptLabel = document.getElementById("promptLabel")
            promptLabel.textContent = "Please enter a valid number"
        } else if (guessedNumber > 100 || guessedNumber < 1) {
          const image = document.getElementById("image");
          image.src = "images/woman_facepalming.gif";
          const promptLabel = document.getElementById("promptLabel")
            promptLabel.textContent = "Number must be between 1 - 100"
          updateScore();
      }else {
            guessedNumber = Number(getNum())

            if (guessedNumber === 0) {
                const image = document.getElementById("image");
                image.src = "images/woman_facepalming.gif";
                const promptLabel = document.getElementById("promptLabel")
                promptLabel.textContent = "Number must be between 0 - 100!"
                updateScore();
            } 
            
            if (randomNumber < guessedNumber) {
                const image = document.getElementById("image");
                image.src = "images/backhand_index_pointing_down.gif";
                const promptLabel = document.getElementById("promptLabel")
                promptLabel.textContent = "Lower"
                updateScore();
            }
            
            if (randomNumber > guessedNumber) {
                const image = document.getElementById("image");
                image.src = "images/backhand_index_pointing_up.gif";
                const promptLabel = document.getElementById("promptLabel")
                promptLabel.textContent = "Higher"
                updateScore();
            } 
    
            if (guessedNumber === randomNumber) {
                const image = document.getElementById("image");
                image.src = "images/trophy.gif";
                const canvas = document.getElementById("canvas");
                const promptLabel = document.getElementById("promptLabel");
                promptLabel.textContent = "Winner!";
                initConfetti();
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
})


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
