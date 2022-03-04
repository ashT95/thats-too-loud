import "./base.css";
import React, { useState, useEffect } from "react";
import AudioAnalyser from "./audioAnalyser";
import StartButton from "./assets/button-start.png";
import AttractScreen from "./assets/attract.webm";
import { Fade } from "react-awesome-reveal";
import DecibelGradation from "./assets/decivel-meter-level-gradation.png";
import Meter from "./assets/decibelMeter.png";
import DecibelTitle from "./assets/title-decibel-meter.webm";
import Countdown from "./assets/countdown.webm";
import Light from "./light";
import startAgain from "./assets/button-start-again.png";
import IdleLights from "./idleLights";


export default function Base() {
  const [audio, setAudio] = useState(null);
  const [active, setActive] = useState(false);
  const [startpage, setStartpage] = useState(true);
  const [meterPage, setMeterPage] = useState(false);
  const [mainCounter, setMainCounter] = useState(0);
  const [videoCounter, setVideoCounter] = useState(0);
  const [buttonCounter, setButtonCounter] = useState(0);

  let content = require("./data.json");

  useEffect(() => {
    let interval;

    if (!active && videoCounter < 10) {
      interval = setInterval(() => {
        setVideoCounter((videoCounter) => videoCounter + 1);
      }, 1000);
    } else if (active) {
      setVideoCounter(0);
    }

    if (active && buttonCounter < 11) {
      interval = setInterval(() => {
        setButtonCounter((buttonCounter) => buttonCounter + 1);
      }, 1000);
    } else if (buttonCounter >= 11) {
      interval = setInterval(() => {
        setMainCounter((mainCounter) => mainCounter + 1);
      }, 1000);
    }

    if (mainCounter >= content.resetTimer) {
      window.location.reload(false);
    }

    return () => clearInterval(interval);
  }, [active, videoCounter, buttonCounter, mainCounter]);



  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudio(audio);
    setActive(true);

  };

  const stopMicrophone = () => {
    setAudio(null);
    setActive(false);
  };

  function start() {
    setStartpage(false);
    setMeterPage(true);
    setVideoCounter(0);
    setButtonCounter(0);
    setMainCounter(0);
  }

  function again() {
    stopMicrophone();
    setVideoCounter(0);
    setButtonCounter(0);
    setMainCounter(0);
  }

  return (
    <div className="Background">
      {startpage && (
        <div>
          <IdleLights /> 
          <Fade duration={1000}>
            <div>
              <video autoPlay loop muted>
                <source src={AttractScreen} type="video/webm" />
              </video>

              <button className="startButton" onClick={start}>
                <img src={StartButton} alt="Start Button" />
              </button>
            </div>
          </Fade>
        </div>
      )}

      {meterPage && (
        <div className="ScreamScreen">
          <link
            rel="preload"
            as="font"
            href="/fonts/IndustryInc-Base.woff"
            type="font/woff"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="preload"
            as="font"
            href="/fonts/IndustryInc-3D.woff"
            type="font/woff"
            crossOrigin="anonymous"
          ></link>
          <Fade duration={1000}>
            <img
              src={DecibelGradation}
              alt="GradationImg"
              id="decibelGradation"
            />
            <img src={Meter} alt="DecibelMeter" id="decibelMeter" />
            <video autoPlay muted>
              <source src={DecibelTitle} type="video/webm" />
            </video>
          </Fade>
          {videoCounter >= 2 && (
            <Fade duration={1000}>
              <video
                className="countdown"
                autoPlay
                muted
                onEnded={getMicrophone}
              >
                <source src={Countdown} type="video/webm" />
              </video>
            </Fade>
          )}
        </div>
      )}

      {active && (
        <div className="MeasureVol">
          <Light />
          <div>
            <AudioAnalyser audio = {audio}/> 
          </div>
        </div>
      )}

      {buttonCounter >= 11 && (
        <Fade duration={1000}>
          <button className="StartAgain" onClick={again}>
            <img src={startAgain} alt="Start Again" />
          </button>
        </Fade>
      )}
    </div>
  );
}
