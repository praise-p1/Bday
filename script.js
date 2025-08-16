// Select candles & flames
const candles = document.querySelectorAll(".candle .flame");
const relightBtn = document.getElementById("relight");

// Confetti setup
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];

// Function to create confetti pieces
function createConfetti() {
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 10,
      color:
        "hsl(" +
        Math.floor(Math.random() * 360) +
        ",100%,50%)",
      tilt: Math.random() * 10 - 10
    });
  }
}

// Draw confetti
function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
    ctx.fillStyle = c.color;
    ctx.fill();
  });

  updateConfetti();
}

// Update confetti position
function updateConfetti() {
  confetti.forEach((c) => {
    c.y += c.d * 0.2;
    if (c.y > confettiCanvas.height) {
      c.y = -10;
      c.x = Math.random() * confettiCanvas.width;
    }
  });
}

function startConfetti() {
  createConfetti();
  setInterval(drawConfetti, 20);
}

// Blow out candles
candles.forEach((flame) => {
  flame.addEventListener("click", () => {
    flame.style.display = "none"; // Hide flame
    if ([...candles].every((f) => f.style.display === "none")) {
      startConfetti(); // Start celebration when all out
    }
  });
});

// Relight button
relightBtn.addEventListener("click", () => {
  candles.forEach((flame) => (flame.style.display = "block"));
  confetti = [];
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
});
