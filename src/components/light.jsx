import React, { useState, useEffect } from "react";
import LightAnim from "./assets/timer-light-on.webm";
import Result from "./result";

export default function Light(props) {
  const [active, setActive] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [alreadyPlayed, setAlreadyPlayed] = useState([]);

  
  var temp = alreadyPlayed;

  temp.push("num" + active);

  useEffect(() => {
    let interval;
 
    if (isActive) {
      interval = setInterval(() => {
      
        setActive((active) => active + 1);
        
        if(active < 5){
            setAlreadyPlayed(temp)
        }
        else{
              setAlreadyPlayed([])
        }
        
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [active]);

  function stopTimer() {
      setIsActive(false);
      setActive(0);
      
  }

  return <div>
    <div>
    { alreadyPlayed.includes("num1") && (
          <video className= "num1" autoPlay muted>
          <source src = {LightAnim} type="video/webm"/>
          </video>
    )} 
    { alreadyPlayed.includes("num2") && (
          <video className= "num2" autoPlay muted>
          <source src = {LightAnim} type="video/webm"/>
          </video>
    )} 
    { alreadyPlayed.includes("num3") && (
          <video className= "num3" autoPlay muted>
          <source src = {LightAnim} type="video/webm"/>
          </video>
    )} 
    { alreadyPlayed.includes("num4") && (
          <video className= "num4" autoPlay muted>
          <source src = {LightAnim} type="video/webm"/>
          </video>
    )} 
    { alreadyPlayed.includes("num5") && (
          <video className= "num5" autoPlay muted>
          <source src = {LightAnim} type="video/webm"/>
          </video>
    )} 
    

    </div>
     {active > 5 && stopTimer ( 
           
     )}
      
      </div>;
}
