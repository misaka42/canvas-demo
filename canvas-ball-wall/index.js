const canvas = document.getElementById('canvas');
const canvasBall = document.getElementById('canvas-ball');
const context = canvas.getContext('2d');
const contextBall = canvasBall.getContext('2d');
const pre = document.getElementById('pre');

const ball = {
  fps: 30,
  canvas: {
    width: 800,
    height: 600,
  },
  radius: 10,
  x: 30,
  y: 30,
  vx: 10,
  vy: 4,
  color: '#000',
  draw: function() {
    context.clearRect(0,0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
};

function init () {
  canvas.width = ball.canvas.width;
  canvas.height = ball.canvas.height;
  canvas.style.width = canvas.width / 2 + 'px';
  canvas.style.height = canvas.height / 2 + 'px';

  canvasBall.width = ball.radius * 2 + 4;
  canvasBall.height = ball.radius * 2 + 4;
  canvasBall.style.width = canvasBall.width / 2 + 'px';
  canvasBall.style.height = canvasBall.height / 2 + 'px';

  setInterval(refresh, 1000 / ball.fps);
}

function refresh () {
  const size = ball.radius * 2 + 4;

  const imageData = context.getImageData(ball.x - ball.radius - 2, ball.y - ball.radius - 2, ball.radius * 2 + 4, ball.radius * 2 + 4);
  const data = imageData.data;
  contextBall.putImageData(imageData, 0, 0);

  // top
  for (let i = 0; i < size; i++) {
    let hasColor = 0;
    hasColor += data[i * 4] // r
    hasColor += data[i * 4 + 1] // g
    hasColor += data[i * 4 + 2] // b
    if (hasColor) {
      ball.vy = -ball.vy;
    }
  }

  if (ball.y + ball.vy + ball.radius > ball.canvas.height || ball.y + ball.vy - ball.radius < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx + ball.radius > ball.canvas.width || ball.x + ball.vx - ball.radius < 0) {
    ball.vx = -ball.vx;
  }

  ball.x += ball.vx;
  ball.y += ball.vy;

  pre.textContent = JSON.stringify(ball, null, 4);

  ball.draw();
}

init();