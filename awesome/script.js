/* =========================================================
   DOM ELEMENTS
========================================================= */
const magicBtn      = document.getElementById("magicBtn");
const startBtn      = document.getElementById("startBtn");
const scoreEl       = document.getElementById("score");
const countdownEl   = document.getElementById("countdown");
const levelEl       = document.getElementById("level");
const levelUpMsg    = document.getElementById("levelUpMsg");

/* =========================================================
   GAME STATE
========================================================= */
let score = 0;
let level = 1;
let timeLeft = 10;
let timerInterval;

/* =========================================================
   GAME INITIALIZER
========================================================= */
function resetGame() {
  score = 0;
  level = 1;
  timeLeft = 10;

  scoreEl.textContent = score;
  levelEl.textContent = level;
  countdownEl.textContent = timeLeft;
  countdownEl.classList.remove("flash");

  magicBtn.style.display = "block";
  magicBtn.className = ""; // reset scaling classes
}

/* =========================================================
   GAME TIMER
========================================================= */
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;

    if (timeLeft <= 3) countdownEl.classList.add("flash");
    else countdownEl.classList.remove("flash");

    if (timeLeft <= 0) endGame();

  }, 1000);
}

/* =========================================================
   END GAME
========================================================= */
function endGame() {
  clearInterval(timerInterval);
  magicBtn.style.display = "none";
  countdownEl.classList.remove("flash");

  alert(`Time's up! Score: ${score}`);
}

/* =========================================================
   MAGIC BUTTON CLICK EVENT
========================================================= */
magicBtn.addEventListener("click", (event) => {
  updateScore();
  maybeLevelUp();
  moveMagicButton();
  createParticles(event.clientX, event.clientY);
});

/* Increase Score */
function updateScore() {
  score++;
  scoreEl.textContent = score;
}

/* Level Up Every 5 Clicks */
function maybeLevelUp() {
  if (score % 5 !== 0) return;

  level++;
  levelEl.textContent = level;
  showLevelUpMsg();

  // scale class (level-2, level-3, …)
  magicBtn.className = `level-${level}`;
}

/* Randomly Move the Button */
function moveMagicButton() {
  const x = Math.random() * (window.innerWidth - magicBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - magicBtn.offsetHeight - 150);

  magicBtn.style.left = `${x}px`;
  magicBtn.style.top = `${y}px`;
}

/* =========================================================
   LEVEL UP ANIMATION
========================================================= */
function showLevelUpMsg() {
  levelUpMsg.style.display = "block";
  levelUpMsg.classList.remove("animate");

  // force restart animation
  void levelUpMsg.offsetWidth;

  levelUpMsg.classList.add("animate");

  setTimeout(() => {
    levelUpMsg.style.display = "none";
  }, 1000);
}

/* =========================================================
   PARTICLE EFFECT
========================================================= */
function createParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    p.style.left = `${x}px`;
    p.style.top = `${y}px`;

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 50 + 30;

    p.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    p.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 600);
  }
}

/* =========================================================
   START BUTTON EVENT
========================================================= */
startBtn.addEventListener("click", () => {
  resetGame();
  startTimer();
});
