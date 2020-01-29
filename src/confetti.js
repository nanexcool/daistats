let canvas;
let ctx;
let W;
let H;
let mp = 150;
let particles = [];
let angle = 0;
let raining = false;

const particleColors = {
  colorOptions: [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "pink",
    "SlateBlue",
    "lightblue",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson"
  ],
  colorIndex: 0,
  colorIncrementer: 0,
  colorThreshold: 10,
  getColor: function() {
    if (this.colorIncrementer >= 10) {
      this.colorIncrementer = 0;
      this.colorIndex++;
      if (this.colorIndex >= this.colorOptions.length) {
        this.colorIndex = 0;
      }
    }
    this.colorIncrementer++;
    return this.colorOptions[this.colorIndex];
  }
};

function confettiParticle(color) {
  this.x = Math.random() * W;
  this.y = Math.random() * H - H;
  this.r = RandomFromTo(10, 30);
  this.d = Math.random() * mp + 10;
  this.color = color;
  this.tilt = Math.floor(Math.random() * 10) - 10;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = this.r / 2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
    ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
    return ctx.stroke();
  };
}

const requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function draw() {
  ctx.clearRect(0, 0, W, H);
  const results = [];
  for (let i = 0; i < mp; i++) {
    results.push(particles[i].draw());
  }

  angle += 0.01;
  for (let i = 0; i < mp; i++) {
    const particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2;
    particle.x += Math.sin(angle);
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.x > W + 20 || particle.x < -20 || particle.y > H) {
      if (i % 5 > 0 || i % 2 === 0) {
        reposition(
          particle,
          Math.random() * W,
          -10,
          Math.floor(Math.random() * 10) - 20
        );
      } else {
        if (Math.sin(angle) > 0) {
          reposition(
            particle,
            -20,
            Math.random() * H,
            Math.floor(Math.random() * 10) - 20
          );
        } else {
          reposition(
            particle,
            W + 20,
            Math.random() * H,
            Math.floor(Math.random() * 10) - 20
          );
        }
      }
    }
  }

  return results;
}

function RandomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function reposition(particle, xCoordinate, yCoordinate, tilt) {
  particle.x = xCoordinate;
  particle.y = yCoordinate;
  particle.tilt = tilt;
}

export default {
  rain() {
    if (raining) return;
    raining = true;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = W = window.innerWidth;
    canvas.height = H = window.innerHeight;
    particles = [];
    for (let i = 0; i < mp; i++) {
      particles.push(new confettiParticle(particleColors.getColor()));
    }
    (function animloop() {
      requestAnimFrame(animloop);
      return draw();
    })();
  }
};
