const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//gambar latar belakang
const backgroundImage = new Image();
backgroundImage.src = 'asset/background1.jpg';

//gambar pemain
const playerImage = new Image();
playerImage.src = 'asset/IdleBrazil.png';

//gambar bola
const ballImage = new Image();
ballImage.src = 'asset/Ball 01.png';

//gambar gawang
const goalImage = new Image();
goalImage.src = 'asset/goal.png';

//gambar musuh
const enemyImage = new Image();
enemyImage.src = 'asset/IdleBrazil.png'; 

//memastikan semua gambar telah dimuat
let imagesLoaded = 0;
const totalImages = 5;

function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        console.log("Semua gambar dimuat, siap bermain!");
    }
}

backgroundImage.onload = checkAllImagesLoaded;
playerImage.onload = checkAllImagesLoaded;
ballImage.onload = checkAllImagesLoaded;
goalImage.onload = checkAllImagesLoaded;
enemyImage.onload = checkAllImagesLoaded;

// player, musuh, dan bola
const player = { x: 100, y: 450, width: 50, height: 50, speed: 5, isJumping: false, jumpSpeed: 0 };
const enemy = { x: 800, y: 450, width: 50, height: 50, speed: 2 }; // Musuh otomatis
const ball = { x: 300, y: 500, radius: 15, vx: 3, vy: -3 };

// Gawang
const goals = [
    { x: 50, y: 450, width: 50, height: 100 }, // Gawang kiri
    { x: canvas.width - 100, y: 450, width: 50, height: 100 } // Gawang kanan
];

let gameRunning = false;
let score = 0; // Menyimpan skor

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawEnemy() {
    ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height); // Menggambar (musuh)
}

function drawBall() {
    ctx.drawImage(ballImage, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}

function drawGoals() {
    goals.forEach(goal => {
        ctx.drawImage(goalImage, goal.x, goal.y, goal.width, goal.height);
    });
}

function updateBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Memantul jika mengenai bagian Atas atau bawah canpas
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.vy = -ball.vy;
    }

    // Memantul dari sisi kiri atau kanan
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        ball.vx = -ball.vx;
    }

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // Pantulan bola dari pemain
    if (
        ball.x + ball.radius > player.x &&
        ball.x - ball.radius < player.x + player.width &&
        ball.y + ball.radius > player.y &&
        ball.y - ball.radius < player.y + player.height
    ) {
        ball.vx = -ball.vx; // Pantulan horizontal
        ball.vy = -ball.vy; // Pantulan vertikal
    }

    // Pantulan bola dari musuh
    if (
        ball.x + ball.radius > enemy.x &&
        ball.x - ball.radius < enemy.x + enemy.width &&
        ball.y + ball.radius > enemy.y &&
        ball.y - ball.radius < enemy.y + enemy.height
    ) {
        ball.vx = -ball.vx; // Pantulan horizontal
        ball.vy = -ball.vy; // Pantulan vertikal
    }


    // Memeriksa jika bola memasuki gawang
    goals.forEach(goal => {
        if (
            ball.x + ball.radius > goal.x &&
            ball.x - ball.radius < goal.x + goal.width &&
            ball.y + ball.radius > goal.y &&
            ball.y - ball.radius < goal.y + goal.height
        ) {
            score++; // Menambah skor
            resetBall(); // Mengatur ulang posisi bola
            updateScoreDisplay(); // Memperbarui skor di layar
        }
    });
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = 3 * (Math.random() > 0.5 ? 1 : -1);
    ball.vy = -3;
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = `Score = ${score}`;
}