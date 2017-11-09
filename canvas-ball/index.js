const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const ball = {
  fps: 60,
  canvas: {
    width: 400,
    height: 300,
  },
  radius: 10,
  x: 30,
  y: 30,
  vx: 10,
  vy: 6,
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
  canvas.style.width = ball.canvas.width / 2 + 'px';
  canvas.style.height = ball.canvas.height / 2 + 'px';

  setInterval(refresh, 1000 / ball.fps);
}

function refresh () {
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y + ball.vy > ball.canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > ball.canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }

  ball.draw();
}

init();