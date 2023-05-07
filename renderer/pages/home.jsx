import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
const core = require('@magenta/music/node/core');
const music_rnn = require('@magenta/music/node/music_rnn');

function Home() {

  const TWINKLE_TWINKLE = {
    notes: [
      {pitch: 60, startTime: 0.0, endTime: 0.5},
      {pitch: 60, startTime: 0.5, endTime: 1.0},
      {pitch: 67, startTime: 1.0, endTime: 1.5},
      {pitch: 67, startTime: 1.5, endTime: 2.0},
      {pitch: 69, startTime: 2.0, endTime: 2.5},
      {pitch: 69, startTime: 2.5, endTime: 3.0},
      {pitch: 67, startTime: 3.0, endTime: 4.0},
      {pitch: 65, startTime: 4.0, endTime: 4.5},
      {pitch: 65, startTime: 4.5, endTime: 5.0},
      {pitch: 64, startTime: 5.0, endTime: 5.5},
      {pitch: 64, startTime: 5.5, endTime: 6.0},
      {pitch: 62, startTime: 6.0, endTime: 6.5},
      {pitch: 62, startTime: 6.5, endTime: 7.0},
      {pitch: 60, startTime: 7.0, endTime: 8.0},
    ],
    totalTime: 8
  };

  const DRUMS = {
 notes: [
      {pitch: 60, startTime: 0.0, endTime: 0.5, isDrum: true},
      {pitch: 60, startTime: 0.5, endTime: 1.0, isDrum: true},
      {pitch: 67, startTime: 1.0, endTime: 1.5, isDrum: true},
      {pitch: 67, startTime: 1.5, endTime: 2.0, isDrum: true},
      {pitch: 69, startTime: 2.0, endTime: 2.5, isDrum: true},
      {pitch: 69, startTime: 2.5, endTime: 3.0, isDrum: true},
      {pitch: 67, startTime: 3.0, endTime: 4.0, isDrum: true},
      {pitch: 65, startTime: 4.0, endTime: 4.5, isDrum: true},
      {pitch: 65, startTime: 4.5, endTime: 5.0, isDrum: true},
      {pitch: 64, startTime: 5.0, endTime: 5.5, isDrum: true},
      {pitch: 64, startTime: 5.5, endTime: 6.0, isDrum: true},
      {pitch: 62, startTime: 6.0, endTime: 6.5, isDrum: true},
      {pitch: 62, startTime: 6.5, endTime: 7.0, isDrum: true},
      {pitch: 60, startTime: 7.0, endTime: 8.0, isDrum: true},
    ],
    // quantizationInfo: {stepsPerQuarter: 4},
    // tempos: [{time: 0, qpm: 120}],
    totalQuantizedSteps: 8
  };
  
  const rnn_steps = 100;
  const rnn_temperature = 1.5;

  useEffect(() => {

    let melodyPlayer = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');
    melodyPlayer.initialize();

    let rnnPlayer = new core.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
    rnnPlayer.setTempo(60);

    let drumPlayer = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn');
    drumPlayer.initialize();

    let rnnDrum = new core.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/jazz_kit');
    // rnnDrum.setTempo(60);

    let player = new core.Player();
    player.start(DRUMS);


function play2() {
  if (rnnDrum.isPlaying()) {
    rnnDrum.stop();
    return;
  }
  
  const qns = core.sequences.quantizeNoteSequence(DRUMS, 4);
  console.log(qns)
  drumPlayer
  .continueSequence(qns, rnn_steps, rnn_temperature)
  // .then((sample) => {
  //   rnnDrum.start(sample);
  //   // console.log(sample)
  // });
}
  
          
  // melody generation

  function play() {
    if (rnnPlayer.isPlaying()) {
      rnnPlayer.stop();
      return;
    }
  
  const qns = core.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);
  console.log(qns)
  // melodyPlayer
  // .continueSequence(qns, rnn_steps, rnn_temperature)
  // .then((sample) => {
  //   sample.notes.forEach(n => n.program = 0);
  //   sample.notes.forEach(n => n.endTime += 8);
  //   // console.log(sample)
  //   let finalSample = [];
  //   sample.notes.map((n, idx) => {
  //     finalSample.push(n)

  //     if(n.quantizedStartStep % 8 == 0){

  //       let newNote1 = {
  //         pitch: n.pitch-=16,
  //         quantizedStartStep: sample.notes[idx].quantizedStartStep,
  //         quantizedEndStep: sample.notes[idx].quantizedStartStep + 8, 
  //         program: n.program = 19}
  //       finalSample.push(newNote1)

  //       let newNote2 = {
  //         pitch: n.pitch+=8,
  //         quantizedStartStep: sample.notes[idx].quantizedStartStep,
  //         quantizedEndStep: sample.notes[idx].quantizedStartStep + 16, 
  //         program: n.program = 73}
  //       finalSample.push(newNote2)
  //     }

  //     // if (n.quantizedStartStep % 2 == 0) {
  //     //   let newNote3 = {
  //     //     pitch: n.pitch-=16,
  //     //     quantizedStartStep: sample.notes[idx].quantizedStartStep,
  //     //     quantizedEndStep: sample.notes[idx].quantizedStartStep + 2, 
  //     //     program: n.program = "drums",
  //     //     isDrum: n.isDrum=true};
  //     //   finalSample.push(newNote3)
  //     // }

  //   });
  //   sample.notes = finalSample;
  //   rnnPlayer.start(sample);
  // });
}

  play();
  play2();


  }, [])




  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center'>
        <img className='ml-auto mr-auto' src='/images/logo.png' />
        <span>⚡ Electron ⚡</span>
        <span>+</span>
        <span>Next.js</span>
        <span>+</span>
        <span>tailwindcss</span>
        <span>=</span>
        <span>💕 </span>
      </div>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        <Link href='/next'>
          <a className='btn-blue'>Go to next page</a>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Home;
