import * as React from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

export default function App() {
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url; //sets the audio of the audio element to whatever it was that we recorded
    audio.controls = true;
    document.body.appendChild(audio); //makes the audio available for us to work with.
  };

  return (
    <div>
     <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <br />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
      <br />
    </div>
  );
}



