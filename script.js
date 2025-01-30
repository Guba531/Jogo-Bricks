//Obtemos o elemento <canvas> do HTML pelo seu id
const canvas = document.getElementById('gameCanvas');

//Criamos o contexto 2D, que será usado para desenhar no canvas
const ctx = canvas.getContext('2d');

// Exibimos uma mensagem no console para confirmar que o jogo está configurado corretamente
console.log("O jogo está configurado e pronto para iniciar!");

//Variaveis para controlar a posição e o movimento do paddle
let paddle = 350;
const paddleWidth = 100;
const paddleHeight = 10;
const paddleSpeed = 7;
let isMovingLeft = false;
let isMovingRight = false;

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
update() {
  clearCanvas();
  movePaddle();
  drawPaddle();
  requestAnimaLionFrame(update);
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