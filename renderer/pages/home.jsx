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
  
  const rnn_steps = 100;
  const rnn_temperature = 2;

  useEffect(() => {
    // const player = new core.Player();
    // let rnnPlayer = new core.Player();
    // rnnPlayer.start(TWINKLE_TWINKLE);

    let rnnPlayer = new core.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
    rnnPlayer.setTempo(100);

    let musicR = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
    musicR.initialize();
    
    // Create a player to play the sequence we'll get from the model.
    
    function play() {
      if (rnnPlayer.isPlaying()) {
        rnnPlayer.stop();
        return;
      }
          
      // The model expects a quantized sequence, and ours was unquantized:
      const qns = core.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);
      musicR
      .continueSequence(qns, rnn_steps, rnn_temperature)
      .then((sample) => {
        sample.notes.forEach(n => n.program = 36);
        rnnPlayer.start(sample);
      });
    }

    play();
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
