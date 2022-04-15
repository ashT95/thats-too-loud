/* eslint-disable no-undef */

import { useEffect, useRef, useState } from "react";

let randomNum = 0;
let lastNum;

function IdleLights(props) {
  const {tower, meterPage, active} = props;
  const [value, setValue] = useState(0.000000);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useInterval(() => {
    do {
      randomNum = Math.floor(Math.random() * 2);
    } while (randomNum == lastNum);
    lastNum = randomNum;
  }, 10000);

  useInterval(() => {
    if (randomNum !== 0) {
      if (seconds < 10) {
        setSeconds((seconds) => seconds + 1);
      } else {
        setSeconds(0);
      }
    }
  }, 1000);

  useInterval(
    () => {
      if(!active){
        if (!meterPage) {
          if (randomNum == 0) {
            Chase();
          }  else if (randomNum == 1) {
            seconds % 2 == 0 ? BreatheIn() : BreatheOut();
          }
        } else {
          setValue(0.000000);
          for(let i = 0;i < tower.length;i++){
            tower[i].setDutyCycle(0.000000);
          }
        }
      }
    },
    randomNum == 1 ? 100 : 7
  );


  function Chase() {
    if (index < tower.length) {
      if (value < 1.000000) {
        setValue((value) => value + 0.100000);
        tower[index].setDutyCycle(value);

        if (index !== 0) {
          tower[index - 1].setDutyCycle(1 - value);
        } else {
          tower[tower.length - 1].setDutyCycle(1 - value);
        }
      } else {
        setIndex((index) => index + 1);
        setValue(0.000000);
      }
    } else {
      setIndex(0);
    }
  }

  function BreatheIn() {
    if (value < 1.000000) {
      setValue((value) => value + 0.100000);
      tower.forEach((tower) => tower.setDutyCycle(value));
    } else {
      setValue(1.000000);
    }
  }

  function BreatheOut() {
    if (value > 0.000000) {
      setValue((value) => value - 0.100000);
      tower.forEach((tower) => tower.setDutyCycle(value));
    } else {
      setValue(0.000000);
    }
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return <div></div>;
}

export default IdleLights;
