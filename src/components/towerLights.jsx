/* eslint-disable no-undef */

import { useEffect, useState } from "react";
import Base from "./base";

const tower = [];
let led;
var openPromiseList = [];
let length;

function TowerLights(props) {
  const [attached, setAttached] = useState(false);
  
  useEffect(() => {
    const phidgetConnection = new phidget22.Connection(8989, "localhost");
    length = 16;

    for (let i = 0; i < length; i++) {
      if(i !== length - 1){
        tower.push(new phidget22.DigitalOutput());
      } else {
        led = new phidget22.DigitalOutput();
      }    
    }

    phidgetConnection
      .connect()
      .then(() => {
        console.log("Connected to Phidgets");

        led.setDeviceSerialNumber(637638);
        led.setHubPort(0);
        //led.setIsHubPortDevice(true);
        led.setChannel(length - 1);

        led.open(5000)
          .then(() => {
            led.setState(true);
          })
          .catch((err) => {
            console.error("Error opening LED: " + err);
          });
        

        for (let i = 0; i < tower.length; i++) {
          tower[i].setDeviceSerialNumber(637638);
          tower[i].setHubPort(0);
          //tower[i].setIsHubPortDevice(true);
          tower[i].setChannel(i);
          tower[i].onAttach = onAttachHandler;
          tower[i].onDetach = onDetachHandler;

          openPromiseList.push(tower[i].open(5000));

          Promise.all(openPromiseList)
            .then(() => {
              tower[i].setDutyCycle(0.000000);
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
      tower.forEach((tower) => tower.setDutyCycle(0.000000));
      tower.forEach((tower) => tower.close());
      led.close();
      phidgetConnection.close();
    };
  }, []);

  function onAttachHandler(tower) {
    var deviceSerialNumber = tower.getDeviceSerialNumber();
    setAttached(true);
  }

  function onDetachHandler(tower) {
    var deviceSerialNumber = tower.getDeviceSerialNumber();
    setAttached(false);
  }


  return (
    <div>
      <Base tower={tower} />
    </div>);
}

export default TowerLights;