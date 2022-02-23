import React, { useRef, useEffect, useState } from "react";
import highScore from "./assets/bg-high-score.png";
import PhidgetLights from "./phidgetLights";

const PopUpCanvas = (props) => {
  const { maxVol } = props;
  const [counter, setCounter] = useState(0);
  const canvasRef = useRef(null);

  let y = 0;

  const [top, setTop] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval;

    if (counter < 5) {
      interval = setInterval(() => {
        setCounter((counter) => counter + 1);
      }, 1000);
    } else {
      setCounter(5);
    }

    return () => clearInterval(interval);
  }, [counter]);

  const draw = (context, height, width) => {
    context.lineWidth = 20;
    context.strokeStyle = "black";
    context.fillStyle = "white";
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, 0);

    y = (count / 140.0) * 1270;

    {
      counter < 5 && context.fillRect(0, y, 140, 4);
    }

    context.stroke();
  };

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      if (count < maxVol) {
        setCount((count) => count + 1);
        setTop((top) => top + 1);
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [count, maxVol]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext("2d");

    let animationFrameId;

    const render = () => {
      draw(context, height, width);

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <div>
      
      <div>
        <div>
          <canvas height="1270px" width="1080px" ref={canvasRef} {...props} />
        </div>
        <div className="highScoreBubble" style={{ top: (top / 140) * 1270 }}>
          <img src={highScore} alt="High Score" />
          <div className="highScore">{count}</div>
          <div className="highScore3D">{count}</div>
        </div>
        
      </div>
    </div>
  );
};

export default PopUpCanvas;
