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