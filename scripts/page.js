function sizeElements() { // banner, canvas
  // position canvas below banner
  var height = document.getElementById('banner').offsetHeight;
  var canvas = document.getElementById('canvas');
  canvas.style.marginTop = height + "px";
  let h = height + "px"; // todo delete this line and next

  var screenHeight = window.innerHeight - height;
  canvas.height = screenHeight;
  canvas.width = window.innerWidth;
  return 0;
}

function mousePosition(event, windowcanvas) {
  var canvas = windowcanvas;
  var canvasDomRect = canvas.getBoundingClientRect();
  var xPos = canvasDomRect.x
  var yPos = canvasDomRect.y
  var xMouse = event.clientX; // get mouse position
  var yMouse = event.clientY;
  var xRel = xMouse - xPos; // subtract for relative position
  var yRel = yMouse - yPos;
  // return needed x and y coord
  return {
    x: xRel,
    y: yRel
  };
}


// REMEMBER, DOWNWARD IS POSITIVE, UPWARD IS NEGATIVE
// let ballarr = []
// const gravity = -100;
const friction = -10;
let xMax = -1; // TODO set somewhere!!! (maybe in sizeElements()) TODO update on resize
let yMax = -1; // TODO set somewhere!!! (maybe in sizeElements()) TODO update on resize



// Methods to deal with Ball objects and user interaction
function newBall(evt, element, arr) {
  var canvas = element;
  var pos = mousePosition(evt, element); // get mouse position
  // draw a circle there
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var newBall = new Ball(pos.x, pos.y, element); // instantiate ball with random color
    // add Ball to array of existing objects
    arr.push(newBall);
    newBall.draw();
  }
}

function updateBalls(ball_array, canvas) {
  // console.log("update Balls has been called!!!!"); // debug statement
  var ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < ball_array.length; i++) {
    ball = ball_array[i];
    ball.updatePosition(); // TODO get xMax and yMax
    ball.draw();
  }
}


var banner = document.getElementById('banner');
var canvas = document.getElementById('canvas');
sizeElements(banner, canvas);
let xEnd = canvas.offsetWidth;
let yEnd = canvas.offsetHeight;


var canvas = document.getElementById("canvas");
let balls = []
balls.push(new Ball(0, 1, canvas))
balls.push(new Ball(1, 2, canvas))
balls.push(new Ball(2, 3, canvas))

for (i = 0; i < balls.length; i++) {
  balls[i].draw();
  var message = balls[i].ballHello();
  // console.log("Ball " + i + ": " + message); // for debug purposes
}

let count = 0;

canvas.addEventListener("click", function(event) {
  newBall(event, canvas, balls);
}, false);
window.setInterval(function() {
  updateBalls(balls, canvas);
}, 30);

// use jquery to resize elements on window resize
$(document).ready(function(){
  $(window).resize(function(){
    sizeElements();
  });
});
