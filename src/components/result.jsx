import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Dangerous from "./assets/result-dangerous.webm";
import Faint from "./assets/result-faint.webm";
import Loud from "./assets/result-loud.webm";
import Moderate from "./assets/result-moderate.webm";
import Soft from "./assets/result-soft.webm";
import VeryLoud from "./assets/result-very-loud.webm";

export default function Result(props) {
  const { maxVol} = props;
  const [count, setCount] = useState(0);
  

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      if ( count < maxVol) {
        setCount((count) => count + 1);
      } else {
        clearInterval(interval);
        
      }
    }, 10);

    return () => clearInterval(interval);
    setCount(0);
  }, [count, maxVol]);

  return (
    <div >
      
       
      <div className="Result">
      <Fade duration={1000} >
        <video autoPlay muted>
          {maxVol > 0 && maxVol <= 30 && (
            <source src={Faint} type="video/webm" />
          )}
          {maxVol > 30 && maxVol <= 50 && (
            <source src={Soft} type="video/webm" />
          )}
          {maxVol > 50 && maxVol <= 70 && (
            <source src={Moderate} type="video/webm"/>
          )}
          {maxVol > 70 && maxVol <= 90 && (
            <source src={Loud} type="video/webm" />
          )}
          {maxVol > 90 && maxVol <= 120 && (
            <source src={VeryLoud} type="video/webm" />
          )}
          {maxVol > 120 && maxVol <= 140 && (
            <source src={Dangerous} type="video/webm" />
          )}
        </video>
        </Fade>
      </div>
     
      <Fade duration={1000} delay={200}>
        <div className="Reading">
          <div className="MaxDBReading3D">{count}</div>
          <div className="MaxDBReading"> {count}</div>
        </div>
      </Fade>
      
    </div>
  );
}
