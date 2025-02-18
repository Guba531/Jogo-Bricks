//Obtemos o elemento <canvas> do HTML pelo seu id
const canvas = document.getElementById('gameCanvas'); //Tipo do documento

//Criamos o contexto 2D, que será usado para desenhar no canvas
const ctx = canvas.getContext('2d'); //Documento em 2d

// Exibimos uma mensagem no console para confirmar que o jogo está configurado corretamente
console.log("O jogo está configurado e pronto para iniciar!"); //Mensagem no console

//Variaveis para controlar a posição e o movimento do paddle
let paddleX = 350; // Valor do paddleX
const paddleWidth = 100; // Valor do paddleWidth
const paddleHeight = 10; //Valor do paddleHeight
const paddleSpeed = 7; //Velocidade do paddle
let isMovingLeft = false; //Movimento do paddle para esquerda
let isMovingRight = false; //Movimento do paddle para a direita

//Configuração dos blocos
const brickRowCount = 5; //Linha dos tijolos
const brickColumnCount = 10; //Coluna dos tijolos
const brickWidth = 60; //Largura dos tijolos
const brickHeight = 20; //Tamanho dos tijolos
const brickColumnSpacing = 15; //Valor do espaço entre os tijolos
const brickRowSpacing = 7; //Valor do espaço entre as linhas de tijolos
const brickOffsetTop = 30; //Valor do espaço entre o topo e os tijolos
const brickOffsetLeft = 30; //Valor do espaço entre a esquerda e tijolos

//Variaveis da bola
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballRadius = 8;
let ballSpeedX = 4;
let ballSpeedY = 4;

//Carregar sons para os enventos do jogo aula 6
const hitBrickSound = new Audio('sounds/hitting-brick.wav');
const hitPaddleSound = new Audio('sounds/hitting-paddle.wav');
const hitWallSound = new Audio('sounds/hitting-wall.wav');
const loseSound = new Audio('sounds/lose.mp3');
//Array que armazenara os blocos
//Arrays são estruturas de dados que armazenam multiplos valores eme uma unica variavel
//Aqui, estamos criando uma matriz bidimensional para organizar os blocos em linhas e colunas
const bricks = []; //Define o jogo como Bricks (eu acho)

for (let c = 0; c < brickColumnCount; c++) { //Para (for) definir c menor que as colunas de tijolos
  bricks[c] = []; //Define c como bricks
  for (let r = 0; r < brickRowCount; r++) { //Para definir r menor que as colunas de tijolos
    let brickX = brickOffsetLeft + c * (brickWidth + brickColumnSpacing); //brickX igual brickOffsetLeft mais c e brickWidth mais brickColumnSpacing
    let brickY = brickOffsetTop + r * (brickHeight + brickColumnSpacing);
    bricks[c][r] = { x: brickX, y: brickY, status: 1 };
  }
}

//Definição de cores para cada coluna
const colors = ["#3333FF", "#FF0000", "#00FF00", "#FFFF00", "#FF9900", "#9900FF", "#660066", "#33CCFF", "#FFFF99"];


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
    ctx.fillRect(paddleX, 550, 100, 10);
 }


//Função para limpar o canvas antes de redesenhar
function clearCanvas() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
}



//Inicia o loop de atualização
 function update() {
  clearCanvas();
  movePaddle();
  drawPaddle();
  drawBall();
  requestAnimationFrame(update);
}

//Eventos de Teclado para ativar o movimento
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    isMovingLeft = true;
    console.log(`Tecla pressionada: ${e.key}`);
    console.log(`isMovingLeft: ${isMovingLeft}, isMovingRight: ${isMovingRight}`); 
  }
  if (e.key === 'ArrowRight' || e.key === 'd') 
    isMovingRight = true;
    console.log(`Tecla pressionada ${e.key}`);
    console.log(`isMovingLeft: ${isMovingLeft}, isMovingRight: ${isMovingRight}`);
  }
);

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

//Função para desenhar bola
function drewBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI *2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
//Inicia o loop de atualização
update();