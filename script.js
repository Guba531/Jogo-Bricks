//Obtemos o elemento <canvas> do HTML pelo seu id
const canvas = document.getElementById('gameCanvas');

//Criamos o contexto 2D, que será usado para desenhar no canvas
const ctx = canvas.getContext('2d');

// Exibimos uma mensagem no console para confirmar que o jogo está configurado corretamente
console.log("O jogo está configurado e pronto para iniciar!");