//Obtemos o elemento <canvas> do HTML pelo seu id
const canvas = document.getElementById('gameCanvas');

//Criamos o contexto 2D, que será usado para desenhar no canvas
const ctx = canvas.getContext('2d');

// Exibimos uma mensagem no console para confirmar que o jogo está configurado corretamente
console.log("O jogo está configurado e pronto para iniciar!");

//Variaveis para controlar a posição e o movimento do paddle
let paddleX = 350;
const paddleWidth = 100;
const paddleHeight = 10;
const paddleSpeed = 7;
let isMovingLeft = false;
let isMovingRight = false;

//Configuração dos blocos
const brickRowCount = 5;
const brickColumnCount = 10;
const brickWidth = 60;
const brickHeight = 20;
const brickColumnSpacing = 15;
const brickRowSpacing = 7;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

//Array que armazenara os blocos
//Arrays são estruturas de dados que armazenam multiplos valores eme uma unica variavel
//Aqui, estamos criando uma matriz bidimensional para organizar os blocos em linhas e colunas
const bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    let brickX = brickOffsetLeft + c * (brickWidth + brickColumnSpacing);
    let brickY = brickOffsetTop + r * (brickHeight + brickColumnSpacing);
    bricks[c][r] = { x: brickX, y: brickY, status: 1 };
  }
}

//Definição de cores para cada coluna
const colors = ["#3333FF", "#XX0000", "#00FF00", "#xxxxxx", "#xxFF00", "#xx9900", "#xx00FF", "#660066", "#33CCFF", "#FFFF99"];


//Função para desenhar os blocos na tela
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickColumnSpacing) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickRowSpacing) + brickOffsetTop;


        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        
        ctx.fillStyle = colors[c % colors.length];
        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
      }
    }
  }
    
}
//Função para desenhar o paddle 
function drawPaddle() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(350, 550, 100, 10);
 }

//Função para mover o paddle
function movePaddle() {
  if (isMovingLeft && paddleX > 0) {
    paddleX -= paddleSpeed;
  }
  if (isMovingRight && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  }
 }

//Função para limpar o canvas antes de redesenhar
function clearCanvas() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Função principal que atualiza a tela
function update() {
clearCanvas();
drawPaddle();
requestAnimationFrame(update);
}

//Inicia o loop de atualização
 function update() {
  clearCanvas();
  movePaddle();
  drawPaddle();
  requestAnimationFrame(update);
}

//Eventos de Teclado para ativar o movimento
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    isMovingLeft = true;
    console.log(`Tecla pressionada: ${e.key}`);
    console.log(`isMovingLeft: ${isMovingLeft}, isMovingRight: ${isMovingRight}`); 
  }
  if (e.key === 'd') {
    isMovingRight = true;
    console.log(`Tecla pressionada ${e.key}`);
    console.log(`isMovingLeft: ${isMovingLeft}, isMovingRight: ${isMovingRight}`);
  }
});

//Eventos de Teclado para desativar o movimento
document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    isMovingLeft = false;
} 
 if (e.key === 'ArrowRight' || e.key === 'd') {
  isMovingRight = false;
}
});

/* Os eventos keydownsão keyupusados ​​para detectar quando uma tecla é pressionada e quando ela é solta,
permitindo controlar ações no jogo, como movimentação de personagens ou objetos.*/
//Função para mover o paddle
function movePaddle() {
  if (isMovingLeft && paddleX > 0) {
    paddleX -= paddleSpeed;
  }
  if (isMovingRight && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  }
  console.log("Posição X do Paddle:", paddleX);
}

//Inicia o loop de atualização
update(); 