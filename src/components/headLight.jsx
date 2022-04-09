/* eslint-disable no-undef */

import { useEffect} from "react";

let headLight;

function HeadLight() {
  
  useEffect(() => {
    const phidgetConnection = new phidget22.Connection(8989, "localhost");

    headLight = new phidget22.DigitalOutput();

    phidgetConnection
      .connect()
      .then(() => {
        console.log("Connected to Phidgets");

          headLight.setDeviceSerialNumber(637638);
          headLight.setHubPort(0);
          headLight.setChannel(15);
          headLight.onAttach = onAttachHandler;
          headLight.onDetach = onDetachHandler;

          openPromiseList.push(headLight.open(5000));

          Promise.all(openPromiseList)
            .then(() => {
              headLight.setDutyCycle(1.000000);
            })
            .catch((err) => {
              console.error("Error opening LED: " + err);
            });
        
      })
      .catch((err) => {
        console.error("Error during connect: " + err);
      });

    return () => {
      headLight.setDutyCycle(0.000000);
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
  }
  return <div></div>;
}

export default HeadLight;
