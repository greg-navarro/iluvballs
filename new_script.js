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
    { x: 140, y: 140, r: 15, color: "#00ff00" },
  ];
  let pointerActive = false; // becomes true after pointerDown, and false on pointerUp
  let selectedBall = null; // the ball that is currently being moved
  let ratio = 1;

  // Determine pointer location relative to canvas.
  const pointerLocation = (event) => {
    const rect = document.getElementById("canvas").getBoundingClientRect();
    let coordinates = {
      x: (event.clientX - rect.x) * ratio,
      y: (event.clientY - rect.top) * ratio,
    };
    return coordinates;
  };

  // Canvas-specific event handlers
  // On pointerDown events: get mouse location and attempt to select a ball.
  const pointerDown = (e) => {
    const coordinates = pointerLocation(e);
    const coordinatesLog = `x:${coordinates.x}, y:${coordinates.y}`;
    console.log("pointer down on canvas @ " + coordinatesLog);
    // determine if the mouse is over any balls
    for (ball of ballObjects) {
      if (
        coordinates.x < ball.x - ball.r ||
        coordinates.x > ball.x + ball.r ||
        coordinates.y < ball.y - ball.r ||
        coordinates.y > ball.y + ball.r
      ) {
        // do nothing, ball is not located under pointer
        console.log(
          `we did not find a ball {${ball.x}, ${ball.y}, ${ball.r}} {${coordinates.x}}, ${coordinates.y}} `
        );
      } else {
        // select ball
        selectedBall = ball;
        pointerActive = true;
        console.log("we found a ball");
      }
    }
    return null;
  };

  // On pointerMove events: if a ball is selecteed get mouse location and move the ball to center on the mouse position.
  const pointerMove = (e) => {
    if (pointerActive) {
      const coordinates = pointerLocation(e);
      const coordinatesLog = `x:${coordinates.x}, y:${coordinates.y}`;
      console.log("pointer MOVING on canvas @ " + coordinatesLog);
      // get mouse location
      // const coordinates = pointerLocation(e);
      // reset ball location to mouse location
      selectedBall.x = coordinates.x / ratio;
      selectedBall.y = coordinates.y / ratio;
      // clear the canvas and redraw the balls
      renderBalls();
    }
    return null;
  };

  // On pointerUp events: if a ball is selected then set that variable to null to halt any updates.
  const pointerUp = (e) => {
    const coordinates = pointerLocation(e);
    const coordinatesLog = `x:${coordinates.x}, y:${coordinates.y}`;
    console.log("pointer released on canvas @ " + coordinatesLog);
    pointerActive = false;
    selectedBall = null;
    return null;
  };

  // Render the current balls onto the canvas.
  const renderBalls = () => {
    let canvas = ref.current;
    let context = canvas.getContext("2d");
    // clear screen of existing balls
    context.clearRect(0, 0, canvas.width, canvas.height);
    // render those balls!
    for (ball of ballObjects) {
      context.save();
      context.fillStyle = ball.color;
      context.beginPath();
      context.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
      context.fill();
      context.restore();
    }
  };

  // once the canvas is loaded re-size the canvas via JS api (for resolution), attach event handlers, and render images.
  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext("2d");
    // set up canvas dimensions (again, code from Pete Corey, see earlier citation)
    ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    let height = getComputedStyle(canvas)
      .getPropertyValue("height")
      .slice(0, -2);
    console.log(`ratio ${ratio}`);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // canvas.width = window.innerWidth
    // canvas.height = window.innerHeight

    // attach event handlers
    canvas.onpointerdown = pointerDown;
    canvas.onpointermove = pointerMove;
    canvas.onpointerup = pointerUp;

    renderBalls();
  }); // of useEffect in Canvas component

  return (
    <canvas
      ref={ref}
      id="canvas"
      style={{
        width: "500px",
        height: "500px",
        border: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    ></canvas>
  );
}; // end of Canvas component

const App = () => {
  return <Canvas numBalls={1} />;
};

ReactDOM.render(<App />, document.getElementById("root"));