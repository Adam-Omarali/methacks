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

function Camrecognize() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [emoji, setEmoji] = useState(null);
  const images = { thumbs_up: "/images/thumbs_up.png", victory: "/images/victory.png" };


  const runHandpose = async () => {
    const net = await handpose.load()
    console.log("[+] handpose is loaded")
    setInterval(() => { detect(net) }, 500)
  }

  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator(
          [
            fp.Gestures.VictoryGesture,
            fp.Gestures.ThumbsUpGesture
          ]
        )

        const gesture = await GE.estimate(hand[0].landmarks, 8)
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map((prediction) => prediction.score);
          const maxConfidence = confidence.indexOf(Math.max.apply(null, confidence));
          setEmoji(gesture.gestures[maxConfidence].name);
          console.log(emoji)
        }
      }

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

        {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )}

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