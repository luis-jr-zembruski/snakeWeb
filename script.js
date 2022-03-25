let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let score = 0
let level = 300
let dificulty = 10
let snake = []
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction = 'right'

function createFoods() {
  let x = Math.floor(Math.random() * 15 + 1) * box
  let y = Math.floor(Math.random() * 15 + 1) * box
  return { x, y }
}

let food = createFoods()

function createBG() {
  context.fillStyle = 'lightgreen'
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'green'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function drawFood() {
  context.fillStyle = 'red'
  context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', getKeyPressHandler)
function getKeyPressHandler(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left'

  if (event.keyCode == 38 && direction != 'down') direction = 'up'

  if (event.keyCode == 39 && direction != 'left') direction = 'right'

  if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

function verifyBordersCollisionWithSnake() {
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
  if (snake[0].x < 0 * box && direction == 'left') snake[0].x = 15 * box
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
  if (snake[0].y < 0 * box && direction == 'up') snake[0].y = 15 * box
}

function verifyEndGame() {
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo)
      alert('Game Over!!! Score: ' + score)
    }
  }
}

function refreshScoreAndDificulty() {
  score++
  clearInterval(jogo)
  level -= dificulty
  jogo = setInterval(initGame, level)
  food = createFoods()
}

function initGame() {
  createBG()
  createSnake()
  drawFood()
  verifyBordersCollisionWithSnake()
  verifyEndGame()

  let snakeY = snake[0].y
  let snakeX = snake[0].x

  if (direction == 'right') snakeX += box
  if (direction == 'left') snakeX -= box
  if (direction == 'up') snakeY -= box
  if (direction == 'down') snakeY += box

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop()
  } else {
    refreshScoreAndDificulty()
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

alert('Lets go!')
let jogo = setInterval(initGame, 300)
