/* ===============================
   BACKGROUND MUSIC UNLOCK
================================= */

const bgMusic = document.getElementById("bg-music");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
    bgMusic.play().catch(() => {});
    document.getElementById("letter").scrollIntoView({ behavior: "smooth" });
});


/* ===============================
   FLOATING HEARTS CANVAS
================================= */

const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#ff4d6d";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2,
                          this.x - this.size, this.y + this.size / 3,
                          this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3,
                          this.x + this.size / 2, this.y - this.size / 2,
                          this.x, this.y);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    update() {
        this.y -= this.speed;
    }
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        hearts.push(new Heart());
    }

    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();
        if (heart.y < -20) hearts.splice(index, 1);
    });

    requestAnimationFrame(animateHearts);
}

animateHearts();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


/* ===============================
   MINI GAME 1 - CATCH THE HEART
================================= */

const gameArea = document.getElementById("heartGameArea");
const scoreDisplay = document.getElementById("score");
const startGameBtn = document.getElementById("startGameBtn");

let score = 0;
let gameInterval;

function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "absolute";
    heart.style.fontSize = "30px";
    heart.style.cursor = "pointer";
    heart.style.left = Math.random() * 200 + "px";
    heart.style.top = Math.random() * 200 + "px";

    heart.addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = score;
        heart.remove();
    });

    gameArea.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}

startGameBtn.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = 0;
    clearInterval(gameInterval);

    gameInterval = setInterval(createHeart, 800);

    setTimeout(() => {
        clearInterval(gameInterval);
        alert("Waktu habis 🤍 Score kamu: " + score);
    }, 15000);
});


/* ===============================
   MINI GAME 2 - QUIZ
================================= */

const quizOptions = document.querySelectorAll(".quiz-option");
const quizResult = document.getElementById("quizResult");

quizOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (option.textContent === "Kamu") {
            quizResult.textContent = "Jawaban paling bener 🤍 tentu aja kamu.";
        } else {
            quizResult.textContent = "Hehe lucu, tapi jawabannya tetap kamu 🤍";
        }
    });
});


/* ===============================
   FINAL SECTION BUTTONS
================================= */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const finalMessage = document.getElementById("finalMessage");

yesBtn.addEventListener("click", () => {
    finalMessage.textContent = "Yeay 🤍 sekarang peluk virtual dulu sini.";
    heartExplosion();
});

noBtn.addEventListener("mouseover", () => {
    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * window.innerWidth + "px";
    noBtn.style.top = Math.random() * window.innerHeight + "px";
});


/* ===============================
   HEART EXPLOSION EFFECT
================================= */

function heartExplosion() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            hearts.push(new Heart());
        }, i * 50);
    }
}
