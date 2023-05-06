// 0. Install fingerpose npm install fingerpose
// 1. Add Use State
// 2. Import emojis and finger pose import * as fp from "fingerpose";
// 3. Setup hook and emoji object
// 4. Update detect function for gesture handling
// 5. Add emoji display to the screen

import React, { useRef, useState, useEffect } from "react";

// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "../utilities"; 

import * as fp from "fingerpose";
// import victory from "./victory.png"; // TODO
// import thumbs_up from "./thumbs_up.png"; // TODO

function Camrecognize() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  const runHandpose = async () => {
    const net = await handpose.load()
    console.log("[+] handpose is loaded")
    setInterval(() => {detect(net)}, 500)
  }

  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState===4){
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      console.log(hand);

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  }

  runHandpose();

  return (
    <React.Fragment>
      <div>
        {cameraOn && <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }
          }
          videoConstraints={{ facingMode: "user" }}
        />}

        {cameraOn && <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />}

        {/* NEW STUFF */}

        <button className='btn-blue' onClick={() => setCameraOn(!cameraOn)} style={{
          position: 'absolute',
          top: 10,
          left: 10
        }}>
          {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>

      </div>
    </React.Fragment>
  );
}

export default Camrecognize;