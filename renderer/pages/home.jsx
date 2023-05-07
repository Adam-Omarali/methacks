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
    quantizationInfo: {stepsPerQuarter: 4},
    tempos: [{time: 0, qpm: 60}],
    totalQuantizedSteps: 8
  };

  let fontSelection = [[40,41,42,43],[68,73,60,70],[56,59,57,58]];

  let avoidChord = [2,6,8];

  let fontIdx = 0;
  
  const rnn_steps = 200;
  const rnn_temperature = 1.5;

  useEffect(() => {

    let melodyPlayer = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');
    melodyPlayer.initialize();

    let rnnPlayer = new core.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
    rnnPlayer.setTempo(80);

    let drumPlayer = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn');
    drumPlayer.initialize();

    let rnnDrum = new core.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/jazz_kit');
    // rnnDrum.setTempo(60);

    // let player = new core.Player();
    // player.start(DRUMS);


// function play2() {
//   if (rnnDrum.isPlaying()) {
//     rnnDrum.stop();
//     return;
//   }
  
//   const qns = core.sequences.quantizeNoteSequence(DRUMS, 4);
//   console.log(qns)
//   drumPlayer
//   .continueSequence(qns, rnn_steps, rnn_temperature)
  // .then((sample) => {
  //   rnnDrum.start(sample);
  //   // console.log(sample)
  // });
// }
  
          
  // melody generation

function play() {
  if (rnnPlayer.isPlaying()) {
    rnnPlayer.stop();
    return;
  }
  
  const qns = core.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);
  console.log(qns)
  melodyPlayer
  .continueSequence(qns, rnn_steps, rnn_temperature)
  .then((sample) => {
    sample.notes.forEach(n => n.program = fontSelection[fontIdx][0], n => n.pitch+=3);
    // console.log(sample)
    let finalSample = [];
    sample.notes.map((n, idx) => {
      finalSample.push(n)

      if(n.quantizedStartStep % 2 == 0){
        var flag = false;
        let newNote0;
        avoidChord.forEach(i => flag &= (Math.abs(n.pitch - 5) % i != 0))
        if(!flag){
          newNote0 = {
            pitch: n.pitch-=5,
            quantizedStartStep: sample.notes[idx].quantizedStartStep,
            quantizedEndStep: sample.notes[idx].quantizedEndStep+=1,
            program: n.program = fontSelection[fontIdx][1],
            performance: n.velocity-=20
          }
        }else{
          newNote0 = {
            pitch: n.pitch-=8,
            quantizedStartStep: sample.notes[idx].quantizedStartStep,
            quantizedEndStep: sample.notes[idx].quantizedEndStep+=1,
            program: n.program = fontSelection[fontIdx][1],
            performance: n.velocity-=20
          }
        }

      finalSample.push(newNote0)
    }

    if(n.quantizedStartStep % 8 == 0){

      var flag = false;
        let newNote1;
        avoidChord.forEach(i => flag &= (Math.abs(n.pitch - 13) % i != 0))
        if(!flag){
          newNote1 = {
            pitch: n.pitch-=13,
            quantizedStartStep: sample.notes[idx].quantizedStartStep,
            quantizedEndStep: sample.notes[idx].quantizedEndStep+=8,
            program: n.program = fontSelection[fontIdx][2],
            performance: n.velocity-=20
          }
        }else{
          newNote1 = {
            pitch: n.pitch-=16,
            quantizedStartStep: sample.notes[idx].quantizedStartStep,
            quantizedEndStep: sample.notes[idx].quantizedEndStep+=8,
            program: n.program = fontSelection[fontIdx][2],
            performance: n.velocity-=20
          }
        }
        finalSample.push(newNote1)
    }

    if (n.quantizedStartStep % 16 == 0) {
      let newNote2 = {
        pitch: n.pitch-=16,
        quantizedStartStep: sample.notes[idx].quantizedStartStep,
        quantizedEndStep: sample.notes[idx].quantizedStartStep + 16,
        program: n.program = fontSelection[fontIdx][3],
        performance: n.velocity-=30}
        finalSample.push(newNote2)
    }

      // let drumNote1 = {
      //   pitch: n.pitch=50,
      //   quantizedStartStep: n.startTime,
      //   quantizedEndStep: n.startTime+=2,
      //   program: n.program = "drums",
      //   isDrum: n.isDrum=true};
      //   finalSample.push(drumNote1)

        // let drumNote2 = {
        //   pitch: n.pitch=50,
        //   quantizedStartStep: quantizedStartStep,
        //   quantizedEndStep: quantizedStartStep + 1, 
        //   program: n.program = "drums",
        //   isDrum: n.isDrum=true};
        // finalSample.push(drumNote2)

    });
    sample.notes = finalSample;
    rnnPlayer.start(sample);
    // rnnPlayer.start(DRUMS);
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
