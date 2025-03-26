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
let ballSpeedX = 5;
let ballSpeedY = -5;

//Carregar sons para os enventos do jogo aula 6
const hitBrickSound = new Audio('sounds/hitting-brick.wav');
const hitPaddleSound = new Audio('sounds/hitting-paddle.wav');
const hitWallSound = new Audio('sounds/hitting-wall.wav');
const loseSound = new Audio('sounds/lose.mp3');
const victorySound = new Audio('sounds/victory.wav');
const backgroundMusic = new Audio('sounds/background.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

//Array que armazenara os blocos
//Arrays são estruturas de dados que armazenam multiplos valores eme uma unica variavel
//Aqui, estamos criando uma matriz bidimensional para organizar os blocos em linhas e colunas
const bricks = []; //Define o jogo como Bricks (eu acho)

for (let c = 0; c < brickColumnCount; c++) { //Para (for) definir c menor que as colunas de tijolos
  bricks[c] = []; //Define c como bricks
  for (let r = 0; r < brickRowCount; r++) { //Para definir r menor que as colunas de tijolos
    let brickX = brickOffsetLeft + c * (brickWidth + brickColumnSpacing); //brickX igual brickOffsetLeft mais c e brickWidth mais brickColumnSpacing
    let brickY = brickOffsetTop + r * (brickHeight + brickRowSpacing);
    bricks[c][r] = { x: brickX, y: brickY, status: 1 };
  }
}

//Definição de cores para cada coluna
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD700", "#00CED1", "#9400D3", "#FF4500", "#7FFF00", "#DC143C"];


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
    ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
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
  drawBricks();
  moveBall();
  collisionDetection();
  requestAnimationFrame(update);
}

//Eventos de Teclado para ativar o movimento
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    isMovingLeft = true;
    console.log(`Tecla pressionada: ${e.key}`);
    console.log(`isMovingLeft: ${isMovingLeft}, isMovingRight: ${isMovingRight}`); 
  }
  if (e.key === 'ArrowRight' || e.key === 'd') {
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

/* Os eventos keydown são key up usados ​​para detectar quando uma tecla é pressionada e quando ela é solta,
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
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI *2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

//Função para detectar colisão entre a bola e os blocos
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (
          ballX > b.x &&
          ballX < b.x + brickWidth &&
          ballY > b.y &&
          ballY < b.y + brickHeight
        ) {
          ballSpeedY = -ballSpeedY; //inverte a direção da bola
          b.status = 0; //remove o bloco ao acertar
          hitBrickSound.play(); //reproduz o som da colisão
          if (checkWin()) return; //verifica se venceu apos destruir o bloco
        }
      }
    }
  }
}

//Função de mover a bola e verificar colisões aula 6 ou 7
function moveBall() {
  //Previsão da proxima posição da bola
 let nextBallX = ballX + ballSpeedX;
  let nextBallY = ballY + ballSpeedY;

  // verificação da colisão com paredes laterais
  if (nextBallX + ballRadius > canvas.width) { // Se a bola atingir o lado direito
    ballX = canvas.width - ballRadius; // Ajusta a posição para ficar dentro da tela
    ballSpeedX = -Math.abs(ballSpeedX); // Inverte a direção horizontal
    hitWallSound.play(); // Reproduz o som da colisão
  }

  if (nextBallX - ballRadius < 0) { // Se a bola atingir o lado esquerdo
    ballX = ballRadius; // Ajusta a posição para ficar dentro da tela
    ballSpeedX = Math.abs(ballSpeedX); // Inverte a direção horizontal
    hitWallSound.play(); // Reproduz o som da colisão
  } 

  //Verificação de colisão com o topo da tela
  if (nextBallY - ballRadius < 0) { //Se a bola atingir o topo
    ballY = ballRadius; // Ajusta a posição para não ultrapassar o topo
    ballSpeedY = Math.abs(ballSpeedY); //Inverte a direção vertical
    hitWallSound.play();
  }

  //Verificação de colisão com o paddle usando interpolação (evita atravessar o paddle)
  if (
    ballY + ballRadius <= 530 && // A bola ainda não passou pelo paddle
    nextBallY + ballRadius >= 530 && // A proxima posição da bola cruzaria o paddle
    ballX > paddleX && // A bola esta dentro da largura do paddle
    ballX < paddleX + paddleWidth
  ) {
    ballY = 530 - ballRadius; // Ajusta a posição da bola pra cima do paddle
    ballSpeedY = -Math.abs(ballSpeedY);

    //Efeito angular no rebote (faz a bola mudar de direção dependendo de onde bateu no paddle)
    let impactPoint = ballX - (paddleX + paddleWidth / 2); //Distancia do centro do paddle
    let normalizedImpact = impactPoint / (paddleWidth / 2); // Normaliza o impacto (-1 a 1)
    ballSpeedX = normalizedImpact * 5; //Define nova velocidade horizontal

    hitPaddleSound.play(); // Reproduz som da colisão com o paddle
  }

  //  Verificação se a bola cair na parte inferior do canvas (perde vida)
  if (nextBallY + ballRadius > canvas.height) {
    console.log("Voce perdeu!");
    loseGame(); // chama a função que trata o fim do jogo
  }

  //Atualiza a posição da bola com os valores previstos
  ballX = nextBallX;
  ballY = nextBallY;
}

let gameLost = false;

// função para verificar derrota
function loseGame() {
  backgroundMusic.pause();
  loseSound.play();
  gameLost = true; // define que o jogo acabou

  // limpa a tela e exibe mensagem de derrota
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FF0000"; // cor do texto
  ctx.font = "40px Arial";
  ctx.fillText("Você perdeu!", canvas.width / 2 - 100, canvas.height / 2);
  ctx.fillText("Tente novamente!", canvas.width / 2 - 100, canvas.height / 2 + 50);
}

// variavel para indicar se o jogo foi vencido
let gameWon = false;

// **Função para exibir tela de vitoria**
function winGame() {
  backgroundMusic.pause(); // Para musica de fundo
  victorySound.play(); // Toca som de vitoria
  gameWon = true;

  // limpa a tela e exibe mensagem de vitoria
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
  ctx.fillStyle = "#00FF00"; // Cor do texto
  ctx.font = "40px Arial";
  ctx.fillText("Voce Venceu!", canvas.width / 2 - 100, canvas.height / 2);
  ctx.fillText("Parabens!", canvas.width / 2 - 100, canvas.height / 2 + 50);
  return;
}

// função para verificar a vitoria
function checkWin() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        return false; // ainda ha blocos ativos, o jogo continua
      }
    }
  }
  winGame(); // chame a função de vitoria se todos os blocos foram destruidos
  return true;
}

// Evento de clique para garantir que o áudio comece a ser reproduzido
document.addEventListener("click", function() {
  // Desbloquear todos os sons no primeiro clique
  hitBrickSound.play().catch(()=>{}); hitBrickSound.pause(); hitBrickSound.currentTime = 0;
  hitPaddleSound.play().catch(()=>{}); hitPaddleSound.pause(); hitPaddleSound.currentTime = 0;
  hitWallSound.play().catch(()=>{}); hitWallSound.pause(); hitWallSound.currentTime = 0;
  loseSound.play().catch(()=>{}); loseSound.pause(); loseSound.currentTime = 0;
  victorySound.play().catch(()=>{}); victorySound.pause(); victorySound.currentTime = 0;
  backgroundMusic.play().catch(()=>{}); backgroundMusic.pause(); backgroundMusic.currentTime = 0;

  // Agora que todos estão desbloqueados, pode iniciar a música de fundo
  backgroundMusic.play().catch(error => {
      console.log("Reprodução de áudio bloqueada:", error);
  });
}, { once: true });
// Ouvinte de evento acionado apenas uma vez

//Inicia o loop de atualização
update();
