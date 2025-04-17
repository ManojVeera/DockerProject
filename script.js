const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const boxSize = 20; // Size of each grid square
const canvasSize = 500; // Canvas width and height
let snake = [{ x: 200, y: 200 }]; // Snake starting position
let direction = 'RIGHT'; // Initial direction
let food = generateFood();
let score = 0;

// Event listener for keypress
document.addEventListener('keydown', changeDirection);

// Game loop
setInterval(updateGame, 150);

function updateGame() {
  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();
  checkCollision();
}

function clearCanvas() {
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, canvasSize, canvasSize);
}

function moveSnake() {
  const head = { ...snake[0] };
  
  if (direction === 'RIGHT') head.x += boxSize;
  else if (direction === 'LEFT') head.x -= boxSize;
  else if (direction === 'UP') head.y -= boxSize;
  else if (direction === 'DOWN') head.y += boxSize;

  snake.unshift(head);

  // Check if snake ate food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop(); // Remove tail
  }
}

function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });
}

function generateFood() {
  const foodX = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
  const foodY = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
  return { x: foodX, y: foodY };
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function changeDirection(event) {
  const keyPressed = event.key;
  if (keyPressed === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  else if (keyPressed === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  else if (keyPressed === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  else if (keyPressed === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
}

function checkCollision() {
  const head = snake[0];

  // Check wall collision
  if (
    head.x < 0 || 
    head.x >= canvasSize || 
    head.y < 0 || 
    head.y >= canvasSize
  ) {
    alert(`Game Over! Score: ${score}`);
    resetGame();
  }

  // Check self-collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      alert(`Game Over! Score: ${score}`);
      resetGame();
    }
  }
}

function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = 'RIGHT';
  score = 0;
  food = generateFood();
}
