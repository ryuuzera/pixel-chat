import FloorSprite from "./floor-sprite.js";
import { resolution, square } from "./sizes.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

ctx.fillStyle = "gray";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const img = new Image();
img.src = "./img/map.png";

const playerImg = new Image();
playerImg.src = "./img/player/weird.png";
playerImg.style = "transform: scale(2.5)";

const tamanhoTela = {
  height: 20,
  width: 30,
};

var spritesPlayer = {
  vertical: 64,
  horizontal: 20,
  coluna: 18,
  linha: 1,
};

const background = new FloorSprite({
  position: {
    x: -10,
    y: 0,
  },
  image: img,
  ctx: ctx,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const parado = {
  direita: [0, 1, 2, 3, 4, 5],
  tras: [6, 7, 8, 9, 10, 11],
  esquerda: [12, 13, 14, 15, 16, 17],
  frente: [18, 19, 20, 21, 22, 23],
};

let time = 0;
let direction = "frente";

const animate = () => {
  window.requestAnimationFrame(animate);
  background.draw();
  ctx.drawImage(
    playerImg,
    resolution * spritesPlayer.coluna, // -- calculei aqui e descobri q 32 é cada quqdrado vezes o a coluna que quer selecionar
    resolution * 2 * spritesPlayer.linha, // aqui muda, vericalmente é a cada 64 cada linha, ai so multiplicar pela linha
    playerImg.width / spritesPlayer.vertical + 4, //adicionei +4 pq tava cortando parte da imagem do player
    playerImg.height / spritesPlayer.horizontal,
    (square * tamanhoTela.width) / 2, // posicao q o boneco vai estar horizontalmente
    (square * tamanhoTela.height) / 2, // posicao q o boneco vai estar verticalmente
    (playerImg.width / 56) * 2.5,
    (playerImg.height / 20) * 2.5
  );

  const frame = Math.round(time / 40)

  if (keys.w.pressed) {
    background.position.y += 0.0625;
    direction = "tras"
  }
  if (keys.a.pressed) {
    background.position.x += 0.0625;
    direction = "esquerda"
  }
  if (keys.s.pressed) {
    background.position.y -= 0.0625;
    direction = "frente"
  }
  if (keys.d.pressed) {
    background.position.x -= 0.0625;
    direction = "direita";
  }

  spritesPlayer.coluna = parado[direction][frame];

  if (time >= 200) time = 0;

  time++;
};
animate();

window.addEventListener("keydown", (e) => {
  spritesPlayer.linha = 2;
  const key = e.key.toUpperCase();
  switch (key) {
    case "W":
      keys.w.pressed = true;
      break;
    case "A":
      keys.a.pressed = true;
      break;
    case "S":
      keys.s.pressed = true;
      break;
    case "D":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", () => {
  spritesPlayer.linha = 1;
  keys.w.pressed = false;
  keys.a.pressed = false;
  keys.s.pressed = false;
  keys.d.pressed = false;
});
