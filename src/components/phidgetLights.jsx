/* eslint-disable no-undef */

import { useEffect, useRef, useState } from "react";


function PhidgetLights(props) {
  const { maxVol, tower } = props;
  const [value, setValue] = useState(0);
  const [index, setIndex] = useState(0);

  const audValue = (Math.round((maxVol / 140) * 150)) / 10;
  const whole = Math.floor(audValue);
  const decimal = audValue - whole;

  useEffect(() => {
    let interval;

    if (maxVol) {
      interval = setInterval(() => {
        if (index < whole) {
          if (value < 1.000000) {
            setValue((value) => value + 0.100000);
            tower[index].setDutyCycle(value);
          } else {
            setIndex((index) => index + 1);
            setValue(0.000000);
          }
        } else if (index == whole) {
          if (decimal) {
            if (value < decimal) {
              setValue((value) => value + 0.100000);
              tower[index].setDutyCycle(value);
            }
          }
        }
      }, 10);
    }
    else {
      setValue(0.000000);
      for(let i = 0;i < tower.length;i++){
        tower[i].setDutyCycle(0.000000);
      }
    }

    return () => clearInterval(interval);
  }, [value, whole, decimal, index, maxVol]);

  return <div></div>;
}

export default PhidgetLights;