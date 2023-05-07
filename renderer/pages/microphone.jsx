import * as React from 'react';
import { WavRecorder } from "webm-to-wav-converter";
export default function App() {
  const wavRecorder = new WavRecorder();
 

  return (
    <div>
      <br />
      <button onClick={() => wavRecorder.start()}>Start</button>
      <button onClick={() => wavRecorder.stop()}>Stop</button>
      <button onClick={() => wavRecorder.download('myFile.wav',true, { sampleRate:  96000 })}>Download</button>
      <br />
    </div>
  );
}
