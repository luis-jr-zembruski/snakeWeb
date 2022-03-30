let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let score = 0
let timeInitial = 300
let dificulty = 10
let snake = []
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction = 'right'

function createFoods() {
  let x = (y = Math.floor(Math.random() * 15 + 1) * box)
  return { x, y }
}

let food = createFoods()

function createGameBackground() {
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

function changeDirectionSnakeToLeft() {
  if (direction != 'right') direction = 'left'
}

function changeDirectionSnakeToRight() {
  if (direction != 'left') direction = 'right'
}

function changeDirectionSnakeToUp() {
  if (direction != 'down') direction = 'up'
}

function changeDirectionSnakeToDown() {
  if (direction != 'up') direction = 'down'
}

const directionsStrategy = {
  "ArrowLeft": changeDirectionSnakeToLeft,
  "ArrowRight": changeDirectionSnakeToRight,
  "ArrowUp": changeDirectionSnakeToUp,
  "ArrowDown": changeDirectionSnakeToDown
}

document.addEventListener('keydown', getKeyPressHandler)
function getKeyPressHandler(event) {
  directionsStrategy[event.key]()
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
      clearInterval(game)
      alert('Game Over!!! Score: ' + score)
    }
  }
}

function refreshScore() {
  score++
  food = createFoods()
}

function refreshDificulty() {
  clearInterval(game)
  timeInitial -= dificulty
  game = setInterval(initGame, timeInitial)
}

function createMovimentationRight(snake) {
  let newSnake = {
    x: (snake.x += box),
    y: snake.y
  }
  return newSnake
}

function createMovimentationLeft(snake) {
  let newSnake = {
    x: (snake.x -= box),
    y: snake.y
  }
  return newSnake
}

function createMovimentationUp(snake) {
  let newSnake = {
    x: snake.x,
    y: (snake.y -= box)
  }
  return newSnake
}

function createMovimentationDown(snake) {
  let newSnake = {
    x: snake.x,
    y: (snake.y += box)
  }
  return newSnake
}

const movimentationStrategy = {
  "right": createMovimentationRight,
  "left": createMovimentationLeft,
  "up": createMovimentationUp,
  "down": createMovimentationDown
}

function initGame() {
  createGameBackground()
  createSnake()
  drawFood()
  verifyBordersCollisionWithSnake()
  verifyEndGame()

  let newSnake = {
    x: snake[0].x,
    y: snake[0].y
  }

  movimentationStrategy[direction](newSnake)

  if (newSnake.x != food.x || newSnake.y != food.y) {
    snake.pop()
  } else {
    refreshScore()
    refreshDificulty()
  }

  let newHead = {
    x: newSnake.x,
    y: newSnake.y
  }

  snake.unshift(newHead)
}

alert('Lets go!')
let game = setInterval(initGame, timeInitial)
