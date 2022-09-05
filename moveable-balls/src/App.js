import { useState } from 'react';
import './App.css';
import Canvas from './components/Canvas'; 

function App() {
  const intialBallObjects = [
    { x: 25, y: 25, r: 15, color: "#ff0000" },
    { x: 140, y: 140, r: 15, color: "#00ff00" },
  ];

  const [ballObjects, setBallObjects] = useState(intialBallObjects);

  return (
    <div className="App">
     <Canvas ballObjects={ballObjects} updateBallObjects={setBallObjects} />
    </div>
  );
}

export default App;
