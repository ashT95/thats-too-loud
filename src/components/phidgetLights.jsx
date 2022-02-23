/* eslint-disable no-undef */

import { useEffect, useRef, useState } from "react";

var ch = [];
var openPromiseList = [];

function PhidgetLights(props) {
  const { maxVol } = props;
  const [value, setValue] = useState(0);
  const [index, setIndex] = useState(0);
  const [attached, setAttached] = useState(false);

  const audValue = (Math.round((maxVol / 140) * 150)) / 10;
  const whole = Math.floor(audValue);
  const decimal = audValue - whole;

  useEffect(() => {
    let interval;

    console.log(audValue, whole, decimal, index);
    
    if (attached) {
      interval = setInterval(() => {
        if (index < whole) {
          if (value < 1.000000) {
            setValue((value) => value + 0.100000);
            ch[index].setDutyCycle(value);
          } else {
            setIndex((index) => index + 1);
            setValue(0.000000);
          }
        } else if (index == whole) {
          if (decimal) {
            if (value < decimal) {
              setValue((value) => value + 0.100000);
              ch[index].setDutyCycle(value);
            }
          }
        }
      }, 10);
    }
    else {
      setValue(0.000000);
    }

    return () => clearInterval(interval);
  }, [value, whole, decimal, index, maxVol, attached]);

  useEffect(() => {
    const phidgetConnection = new phidget22.Connection(8989, "localhost");

    for (let i = 0; i < 15; i++) {
      ch.push(new phidget22.DigitalOutput());
    }

    const phidgetDevices = [];

    phidgetConnection
      .connect()
      .then(() => {
        console.log("Connected to Phidgets");

        for (let i = 0; i < 15; i++) {
          ch[i].setDeviceSerialNumber(637638);
          ch[i].setHubPort(0);
          //ch[i].setIsHubPortDevice(true);
          ch[i].setChannel(i);
          ch[i].onAttach = onAttachHandler;
          ch[i].onDetach = onDetachHandler;

          openPromiseList.push(ch[i].open(5000));

          Promise.all(openPromiseList)
            .then(() => {
              openPromiseList[i].setDutyCycle(0.000000);
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
      phidgetDevices.forEach((pd) => pd.close());
      phidgetConnection.close();
    };
  }, []);

  function onAttachHandler(ch) {
    var deviceSerialNumber = ch.getDeviceSerialNumber();
    console.log(deviceSerialNumber);
    setAttached(true);
  }

  function onDetachHandler(ch) {
    var deviceSerialNumber = ch.getDeviceSerialNumber();
    console.log(deviceSerialNumber);
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

export default PhidgetLights;
