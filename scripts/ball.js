class Ball {
  static gravity = 15; // was 1
  static maxradius = 50;

  constructor(x, y, canvas) {
    this.canvas = canvas; // reference to the canvas we are drawing on
    this.x = x;
    this.y = y;
    this.xMax = canvas.width;  // TODO update on resize
    this.yMax = canvas.height;  // TODO update on resize
    this.radius = this.randomRadius();
    this.color = this.randomColor();
    this.xVel = this.randomX();
    this.yVel = Ball.gravity;
  }

  draw() {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  updatePosition() {
    let change = this.changeDirection();
    // X first case: the ball is hitting a boundary
    if (change.x === true) {
      // first sub case: ball perfectly meets boundary so reverse motion
      if ((this.x + this.xVel + this.radius === this.xMax) || this.x + this.xVel - this.radius === 0) {
        this.x = this.x + this.xVel;
      } else { // second sub case: ball needs to move farther after reversing motion
        if (this.xVel > 0) {
          this.x = 2 * (this.xMax - this.radius) - this.xVel - this.x;
        } else {
          this.x = 2 * this.radius - this.xVel - this.x;
        }
      }
      this.xVel = this.xVel * -1;
    }
    // Y first case: the ball is hitting a boundary
    if (change.y === true) {
      // first sub case: ball perfectly meets boundary so reverse motion
      if ((this.y + this.yVel + this.radius === this.yMax) || (this.y + this.yVel - this.radius === 0)) {
        this.y = this.y + this.yVel;
      } else { // second sub case: ball needs to move farther after reversing motion
        if (this.yVel > 0) {
          this.y = 2 * (this.yMax - this.radius) - this.yVel - this.y;
        } else {
          this.y = 2 * this.radius - this.yVel - this.y;
        }
      }
      this.yVel = this.yVel * -1;
    }

    // second case: ball can continue motion
    if (change.x === false) {
      this.x = this.x + this.xVel;
    }
    if (change.y === false) {
      this.y = this.y + this.yVel;
    }
    // this.applyGravity();
  } // end of updatePosition

  applyGravity() {
    // check that conditions are proper
    if (this.y !== this.yMax) {
      // apply gravity
      this.yVel = this.Vel + this.gravity;
    } else {
      if (this.yVel !== 0) {
         this.yVel = this.Vel + this.gravity;// apply gravity
      }
    }
  }

  // This function is for debug purposes.
  ballHello() {
    message = "I am a ball at (" + this.x + ", " + this.y + ")";
    return message;
  }

  randomX() {
    let x = 1;
    // positive or negative
    if (Math.random() < 0.5) {
      x = x * -1;
    }
    x = x * Math.floor(Math.random() * 10); // integer
    return x;
  }

  changeDirection() {
    let outputX = false;
    let outputY = false;

    // x
    if (this.xVel < 0) {
      if (this.x + this.xVel - this.radius <= 0) {
        outputX = true;
      }
    } else {
      if (this.x + this.xVel + this.radius >= this.xMax) {
        outputX = true;
      }
    }

    // y
    if (this.yVel < 0) {
      if (this.y + this.yVel - this.radius <= 0) {
        outputY = true;
      }
    } else {
      if (this.y + this.yVel + this.radius >= this.yMax) {
        outputY = true;
      }
    }

    return {
      x: outputX,
      y: outputY
    };
  } // end of changeDirection

  // Create a random rgb, this will be used for the next ball.
  randomColor() {
    let r = Math.floor(266 * Math.random());
    let g = Math.floor(266 * Math.random());
    let b = Math.floor(266 * Math.random());
    let color = 'rgb(' + r + ', ' + g + ', ' + b +')';
    return color;
  } // end of randomColor

  randomRadius() {
    let radius = Math.floor(Ball.maxradius * Math.random());
    return radius;
  }
} // End Ball class
