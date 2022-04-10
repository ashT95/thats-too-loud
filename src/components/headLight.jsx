/* eslint-disable no-undef */

import { useEffect } from "react";

var openPromiseList = [];
var ch = [];

function HeadLight() {
  useEffect(() => {
    const phidgetConnection = new phidget22.Connection(8989, "localhost");
    const phidgetDevices = [];

    phidgetConnection
      .connect()
      .then(() => {
        console.log("Connected to Phidgets");

        for (let i = 0; i < 16; i++) {
          ch.push(new phidget22.DigitalOutput());
        }

        ch[15].setDeviceSerialNumber(637638);
        ch[15].setHubPort(0);
        //ch[0].setIsHubPortDevice(true);
        ch[15].setChannel(15);

        ch[15].onAttach = onAttachHandler;
        ch[15].onDetach = onDetachHandler;

        openPromiseList.push(ch[15].open(5000));

        Promise.all(openPromiseList)
          .then(() => {
            ch[15].setState(true);
          })
          .catch((err) => {
            console.error("Error opening LED: " + err);
          });
      })
      .catch((err) => {
        console.error("Error during connect: " + err);
      });

    return () => {
      ch[15].close();
      phidgetDevices.forEach((pd) => pd.close());
      phidgetConnection.close();
    };
  }, []);

  function onAttachHandler(ch) {
    var deviceSerialNumber = ch.getDeviceSerialNumber();
  }

  function onDetachHandler(ch) {
    var deviceSerialNumber = ch.getDeviceSerialNumber();
  }


  return <div></div>;
}

export default HeadLight;
