/* eslint-disable no-undef */

import { useEffect, useRef, useState } from "react";


var ch = [];
var openPromiseList = [];
let randomNum = 0;
let lastNum;

function IdleLights(props) {
  const [value, setValue] = useState(0.000000);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [attached, setAttached] = useState(false);

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
      if (attached) {
        if (randomNum == 0) {
          Chase();
        }  else if (randomNum == 1) {
          seconds % 2 == 0 ? BreatheIn() : BreatheOut();
        }
      } else {
        setValue(0.000000);
      }
    },
    randomNum == 1 ? 100 : 7
  );

  useEffect(() => {
    const phidgetConnection = new phidget22.Connection(8989, "localhost");

    const phidgetDevices = [];

    phidgetConnection
      .connect()
      .then(() => {


        for (let i = 0; i < 15; i++) {
          ch.push(new phidget22.DigitalOutput());
        }

        for (let i = 0; i < ch.length; i++) {
          ch[i].setDeviceSerialNumber(637638);
          ch[i].setHubPort(0);
          //ch[i].setIsHubPortDevice(true);
          ch[i].setChannel(i);
          ch[i].onAttach = onAttachHandler;
          ch[i].onDetach = onDetachHandler;

          openPromiseList.push(ch[i].open(5000));

          Promise.all(openPromiseList)
            .then(() => {
              ch[i].setDutyCycle(0.000000);
            })
            .catch((err) => {
              console.error("Error opening LED: " + err);
            });
        }
      })
      .catch((err) => {
        console.error("Error during connect: " + err);
      });

    return () => {
      ch.forEach((ch) => ch.setDutyCycle(0.000000));
      ch.forEach((ch) => ch.close());
      phidgetDevices.forEach((pd) => pd.close());
      phidgetConnection.close();
    };
  }, []);

  function onAttachHandler(ch) {
    var deviceSerialNumber = ch.getDeviceSerialNumber();
    setAttached(true);
  }

  function onDetachHandler(ch) {
    var deviceSerialNumber = ch.getDeviceSerialNumber();
    setAttached(false);
  }

  function Chase() {
    if (index < ch.length) {
      if (value < 1.000000) {
        setValue((value) => value + 0.100000);
        ch[index].setDutyCycle(value);

        if (index !== 0) {
          ch[index - 1].setDutyCycle(1 - value);
        } else {
          ch[ch.length - 1].setDutyCycle(1 - value);
        }
      } else {
        setIndex((index) => index + 1);
        setValue(0.000000);
      }
    } else {
      setIndex(0);
    }
  }

  function Even() {
   ch[0].setDutyCycle(1.000000);
   ch[2].setDutyCycle(1.000000);
   ch[4].setDutyCycle(1.000000);
   ch[6].setDutyCycle(1.000000);
   ch[8].setDutyCycle(1.000000);
   ch[10].setDutyCycle(1.000000);
   ch[12].setDutyCycle(1.000000);
   ch[14].setDutyCycle(1.000000);

   ch[1].setDutyCycle(0.000000);
   ch[3].setDutyCycle(0.000000);
   ch[5].setDutyCycle(0.000000);
   ch[7].setDutyCycle(0.000000);
   ch[9].setDutyCycle(0.000000);
   ch[11].setDutyCycle(0.000000);
   ch[13].setDutyCycle(0.000000);
   ch[15].setDutyCycle(0.000000);
  }

  function Odd() {
    ch[0].setDutyCycle(0.000000);
    ch[2].setDutyCycle(0.000000);
    ch[4].setDutyCycle(0.000000);
    ch[6].setDutyCycle(0.000000);
    ch[8].setDutyCycle(0.000000);
    ch[10].setDutyCycle(0.000000);
    ch[12].setDutyCycle(0.000000);
    ch[14].setDutyCycle(0.000000);
 
    ch[1].setDutyCycle(1.000000);
    ch[3].setDutyCycle(1.000000);
    ch[5].setDutyCycle(1.000000);
    ch[7].setDutyCycle(1.000000);
    ch[9].setDutyCycle(1.000000);
    ch[11].setDutyCycle(1.000000);
    ch[13].setDutyCycle(1.000000);
    ch[15].setDutyCycle(1.000000);
  }

  function BreatheIn() {
    if (value < 1.000000) {
      setValue((value) => value + 0.100000);
      ch.forEach((ch) => ch.setDutyCycle(value));
    } else {
      setValue(1.000000);
    }
  }

  function BreatheOut() {
    if (value > 0.000000) {
      setValue((value) => value - 0.100000);
      ch.forEach((ch) => ch.setDutyCycle(value));
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
