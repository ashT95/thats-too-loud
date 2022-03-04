import React, { useState, useEffect } from "react";
import { Fade, Reveal} from "react-awesome-reveal";
import Dangerous from "./assets/result-dangerous.webm";
import Faint from "./assets/result-faint.webm";
import Loud from "./assets/result-loud.webm";
import Moderate from "./assets/result-moderate.webm";
import Soft from "./assets/result-soft.webm";
import VeryLoud from "./assets/result-very-loud.webm";
import StartAgainVideo from "./assets/start-again.webm";
import { keyframes } from "@emotion/react";

export default function Result(props) {
  const { maxVol } = props;
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      if (count < maxVol) {
        setCount((count) => count + 1);
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
    setCount(0);
  }, [count, maxVol]);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const show = 
  keyframes`
  from {
    opacity: 0;

  }

  to {
    opacity: 1;

  }
`;

const hide =  keyframes`
from {
  opacity: 1;

}

to {
  opacity: 0;

}
`;

  return (
    <div>
      {seconds < 6 && (
        <div>
          <div className="Result">
            <Reveal keyframes={seconds < 5 ? show : hide}  >
              <video autoPlay muted>
                {maxVol > 0 && maxVol <= 30 && (
                  <source src={Faint} type="video/webm" />
                )}
                {maxVol > 30 && maxVol <= 50 && (
                  <source src={Soft} type="video/webm" />
                )}
                {maxVol > 50 && maxVol <= 70 && (
                  <source src={Moderate} type="video/webm" />
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
            </Reveal>
          </div>

          <Reveal keyframes={seconds < 5 ? show : hide} delay={250} >
            <div
              className="Reading"
              style={{ height: "1920px", width: "1080px" }}
            >
              <div className="MaxDBReading3D">{count}</div>
              <div className="MaxDBReading"> {count}</div>
            </div>
          </Reveal>
        </div>
      )}
      {seconds >= 6 && (
        
        <div className="startAgainVideo">
        <Fade >
          <video autoPlay muted>
            <source src={StartAgainVideo} type="video/webm" />
          </video>
        </Fade>
        </div>
      )}
    </div>
  );
}
