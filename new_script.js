const { useRef, useEffect } = React;

// Necessary to resize canvas (from Pete Corey's blog post) for diverse pixel ranges.
// http://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/
const getPixelRatio = (context) => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};

// Blob-style canvas component with all functionality baked in.
const Canvas = ({ numBalls }) => {
  let ref = useRef();
  let ballObjects = [
    { x: 25, y: 25, r: 15, color: "#ff0000" },
    { x: 40, y: 140, r: 15, color: "#00ff00" },
  ];
  let pointerActive = false; // becomes true after pointerDown, and false on pointerUp
  let selectedBall = null; // the ball that is currently being moved

  // Determine pointer location relative to canvas.
  const pointerLocation = (event) => {
    const rect = document.getElementById("canvas").getBoundingClientRect();
    let coordinates = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    // let coordinates = {x: 5, y: 10};
    // console.log(event.clientX)
    // console.log(rect)
    return coordinates;
  };

  // Moves the balls
  const pointerDown = (e) => {
    const coordinates = pointerLocation(e);
    const coordinatesLog = `x:${coordinates.x}, y:${coordinates.y}`;
    console.log("pointer down on canvas @ " + coordinatesLog);
    pointerActive = true;
    return null;
  };
  const pointerMove = () => {
    if (pointerActive) console.log("Pointer is moving");
    return null;
  };
  const pointerUp = () => {
    console.log("Pointer was released");
    pointerActive = false;
    return null;
  };

  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext("2d");
    // set up canvas dimensions (again, code from Pete Corey, see earlier citation)
    let ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    let height = getComputedStyle(canvas)
      .getPropertyValue("height")
      .slice(0, -2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // attach event handlers
    canvas.onpointerdown = pointerDown;
    canvas.onpointermove = pointerMove;
    canvas.onpointerup = pointerUp;

    // render each ball object
    for (ball of ballObjects) {
      context.save();
      context.fillStyle = ball.color;
      context.beginPath();
      context.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
      context.fill();
      context.restore();
    }
  });

  return <canvas ref={ref} id="canvas"></canvas>;
};

const App = () => {
  return <Canvas numBalls={1} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
