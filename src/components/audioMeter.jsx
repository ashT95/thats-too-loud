import React, { useRef, useEffect, useState } from "react";
import Result from "./result";
import PopUpCanvas from "./popUpCanvas";
import PhidgetLights from "./phidgetLights";

let average = 0;
let maxVol = 0;

const AudioMeter = (props) => {
  const { audiodata, tower} = props;
  const [averageArray, setAverageArray] = useState([]);
  const [counter, setCounter] = useState(0);
  const canvasRef = useRef(null);
  

  const temp = averageArray;
  temp.push(average);

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

  const draw = (canvasRef, audiodata) => {
    const canvas = canvasRef.current;

    canvas.width = 120;
    const length = audiodata.length;
    let total = 0;

    for (const item of audiodata) {
      total += ((audiodata[item] / 255.0) * 140);
      average = total / length;
      const y = (average / 140.0) * 1270;
  
      {
        counter < 5 && (canvas.height = y) ;
      }
      {
        counter >= 5 && (canvas.height = 0);
      }
    }
  };

  useEffect(() => {
    setAverageArray(temp);
    {
      counter < 5 && (maxVol = Math.round(Math.max(...averageArray)));
    }

    let animationFrameId;

    const render = () => {
      draw(canvasRef, audiodata);
      
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <div>

      <div className="volumeMeter">
        <canvas className="can" ref={canvasRef} {...props} />
      </div>

      <div className="maxMeter">
        <PopUpCanvas maxVol={maxVol} />
      </div>

      <div className="phidgetLights">
    {  <PhidgetLights maxVol={maxVol} tower = {tower}/>  }
      </div>

      <div className="Result">
        {counter >= 5 && <Result maxVol={maxVol} />}
      </div>
    </div>
  );
};

export default AudioMeter;
