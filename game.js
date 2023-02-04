// Get canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 500;
canvas.height = 500;

// Set initial snake properties
let x = 250;
let y = 250;
let dx = 10;
let dy = 0;
let prevDx = 0;
let prevDy = 0;

// Set initial food properties
let foodX = Math.floor(Math.random() * canvas.width / 10) * 10;
let foodY = Math.floor(Math.random() * canvas.height / 10) * 10;

// Keep track of the snake's body
let tail = [];

// Keep track of the score
let score = 0;

// Move the snake automatically at a regular interval
setInterval(function() {
  x += dx;
  y += dy;

  // Check if the snake has hit a boundary or its own tail
  if (x >= canvas.width || x < 0 || y >= canvas.height || y < 0 || tail.some(function(element) { return element[0] === x && element[1] === y; })) {
    // Reset the game
    x = 250;
    y = 250;
    dx = 10;
    dy = 0;
    tail = [];
    score = 0;
    foodX = Math.floor(Math.random() * canvas.width / 10) * 10;
    foodY = Math.floor(Math.random() * canvas.height / 10) * 10;
  }

  // Check if the snake has consumed the food
  if (x === foodX && y === foodY) {
    foodX = Math.floor(Math.random() * canvas.width / 10) * 10;
    foodY = Math.floor(Math.random() * canvas.height / 10) * 10;
    tail.push([x, y]);
    score++;
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake's tail
  for (let i = 0; i < tail.length; i++) {
    ctx.fillRect(tail[i][0], tail[i][1], 10, 10);
  }

  // Add the current position of the snake's head to the tail
  tail.unshift([x, y]);

  // Remove the last element of the tail if the tail is longer than the snake
  if (tail.length > 1) {
    tail.pop();
  }

  // Draw the snake's head
  ctx.fillRect(x, y, 10, 10);

  // Draw the food object
  ctx.fillRect(foodX, foodY, 10, 10);

  // Display the score
  ctx.fillText('Score: ' + score, 10, canvas.height - 10);
  
  }, 100);
  
  // Listen for arrow key events
  document.addEventListener('keydown', function(event) {
  switch (event.code) {
  case 'ArrowLeft':
  if (prevDx !== 10) {
  dx = -10;
  dy = 0;
  prevDx = -10;
  prevDy = 0;
  }
  break;
  case 'ArrowUp':
  if (prevDy !== 10) {
  dx = 0;
  dy = -10;
  prevDx = 0;
  prevDy = -10;
  }
  break;
  case 'ArrowRight':
  if (prevDx !== -10) {
  dx = 10;
  dy = 0;
  prevDx = 10;
  prevDy = 0;
  }
  break;
  case 'ArrowDown':
  if (prevDy !== -10) {
  dx = 0;
  dy = 10;
  prevDx = 0;
  prevDy = 10;
  }
  break;
  }
  });
