/* eslint-disable no-undef */

import { useEffect } from "react";

function HeadLight() {
  useEffect(() => {
    const phidgetConnection = new phidget22.Connection(8989, "localhost");
    const phidgetDevices = [];

    phidgetConnection
      .connect()
      .then(() => {
        console.log("Connected to Phidgets");

        const led = new phidget22.DigitalOutput();
        led.setDeviceSerialNumber(637638);
        led.setHubPort(0);
        //led.setIsHubPortDevice(true);
        led.setChannel(15);

        led
          .open(3000)
          .then(() => {
            phidgetDevices.push(led);
            led.setState(true);
          })
          .catch((err) => {
            console.error("Error opening LED: " + err);
          });
      })
      .catch((err) => {
        console.error("Error during connect: " + err);
      });

    return () => {
      phidgetDevices.forEach((pd) => pd.close());
      phidgetConnection.close();
    };
  }, []);

  return <div></div>;
}

export default HeadLight;
