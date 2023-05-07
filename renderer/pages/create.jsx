import React, { useEffect, useState } from 'react'
import Tuner from './next'
import Link from 'next/link'
const core = require('@magenta/music/node/core');
const music_rnn = require('@magenta/music/node/music_rnn');

const rnn_steps = 400;
const rnn_temperature = 1;

let velocities = [1, 0, 0, 0];

const fontSelection = [[40, 41, 42, 43], [68, 73, 60, 70], [56, 59, 57, 58]];

let avoidChord = [6, 8, 11];

let fontIdx = 1;

let melodyPlayer = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');
let rnnPlayer = new core.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
let rnnPlayer2 = new core.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');

const TWINKLE_TWINKLE = {
    notes: [
      { pitch: 60, startTime: 0.0, endTime: 0.5},
      { pitch: 60, startTime: 0.5, endTime: 1.0},
      { pitch: 67, startTime: 1.0, endTime: 1.5},
      { pitch: 67, startTime: 1.5, endTime: 2.0},
      { pitch: 69, startTime: 2.0, endTime: 2.5},
      { pitch: 69, startTime: 2.5, endTime: 3.0},
      { pitch: 67, startTime: 3.0, endTime: 4.0},
      { pitch: 65, startTime: 4.0, endTime: 4.5},
      { pitch: 65, startTime: 4.5, endTime: 5.0},
      { pitch: 64, startTime: 5.0, endTime: 5.5},
      { pitch: 64, startTime: 5.5, endTime: 6.0},
      { pitch: 62, startTime: 6.0, endTime: 6.5},
      { pitch: 62, startTime: 6.5, endTime: 7.0},
      { pitch: 60, startTime: 7.0, endTime: 8.0},
    ],
    totalTime: 8
};



// melody generation
async function generateAISeq(seq=TWINKLE_TWINKLE) {
    if (rnnPlayer.isPlaying()) {
        rnnPlayer.stop();
        return;
    }

    const qns = core.sequences.quantizeNoteSequence(seq, 4);
    melodyPlayer
    .continueSequence(qns, rnn_steps, rnn_temperature)
    .then(sample => {

        sample.notes.forEach(n => {
        n.program = fontSelection[fontIdx][0]
        n.pitch += 4
        n.velocity *= velocities[0]
        });
        for (let i = 0; i < TWINKLE_TWINKLE.length; i++) {
            n = TWINKLE_TWINKLE[i];
        }

        let finalSample = [];

        sample.notes.map((n, idx) => {
            finalSample.push(n)

            if (n.quantizedStartStep % 2 == 0) {
                let flag = false;
                let newNote0;
                avoidChord.forEach(i => flag &= (Math.abs(n.pitch - 5) % i != 0))
                newNote0 = {
                    pitch: !flag ? n.pitch -= 5 : n.pitch -= 8,
                    quantizedStartStep: sample.notes[idx].quantizedStartStep,
                    quantizedEndStep: sample.notes[idx].quantizedEndStep += 1,
                    program: n.program = fontSelection[fontIdx][1],
                    velocity: n.velocity *= velocities[1]
                }
                finalSample.push(newNote0)
            }

            if (n.quantizedStartStep % 8 == 0) {
                let flag = false;
                let newNote1;
                avoidChord.forEach(i => flag &= (Math.abs(n.pitch - 13) % i != 0))
                newNote1 = {
                    pitch: !flag ? n.pitch -= 12 : n.pitch -= 8,
                    quantizedStartStep: sample.notes[idx].quantizedStartStep,
                    quantizedEndStep: sample.notes[idx].quantizedEndStep += 8,
                    program: n.program = fontSelection[fontIdx][2],
                    velocity: n.velocity *= velocities[2]
                }
                finalSample.push(newNote1)
            }

            if (n.quantizedStartStep % 16 == 0) {
                let newNote2 = {
                pitch: n.pitch -= 17,
                quantizedStartStep: sample.notes[idx].quantizedStartStep,
                quantizedEndStep: sample.notes[idx].quantizedStartStep + 16,
                program: n.program = fontSelection[fontIdx][3],
                velocity: n.velocity *= velocities[3]
                }
                finalSample.push(newNote2)
            }
        })

    sample.notes = finalSample;

    rnnPlayer.start(sample);

    })
}

export default function Create() {
    const [melodySeq, setMelodySeq] = useState()
    const [melodyFinal, setMelodyFinal] = useState()
    const [kickSeq, setKickSeq] = useState()
    const [snareSeq, setSnareSeq] = useState()
    const [hihatSeq, setHihatSeq] = useState()
    
    //   const DRUMS = {
    //  notes: [
    //       {pitch: 60, startTime: 0.0, endTime: 0.5, isDrum: true},
    //       {pitch: 60, startTime: 0.5, endTime: 1.0, isDrum: true},
    //       {pitch: 67, startTime: 1.0, endTime: 1.5, isDrum: true},
    //       {pitch: 67, startTime: 1.5, endTime: 2.0, isDrum: true},
    //       {pitch: 69, startTime: 2.0, endTime: 2.5, isDrum: true},
    //       {pitch: 69, startTime: 2.5, endTime: 3.0, isDrum: true},
    //       {pitch: 67, startTime: 3.0, endTime: 4.0, isDrum: true},
    //       {pitch: 65, startTime: 4.0, endTime: 4.5, isDrum: true},
    //       {pitch: 65, startTime: 4.5, endTime: 5.0, isDrum: true},
    //       {pitch: 64, startTime: 5.0, endTime: 5.5, isDrum: true},
    //       {pitch: 64, startTime: 5.5, endTime: 6.0, isDrum: true},
    //       {pitch: 62, startTime: 6.0, endTime: 6.5, isDrum: true},
    //       {pitch: 62, startTime: 6.5, endTime: 7.0, isDrum: true},
    //       {pitch: 60, startTime: 7.0, endTime: 8.0, isDrum: true},
    //     ],
    //     quantizationInfo: {stepsPerQuarter: 4},
    //     tempos: [{time: 0, qpm: 60}],
    //     totalQuantizedSteps: 8
    //   };

    let pitch = ["E#4", "C4", "D4", "E4", "F#4", "G4"];
    let duration = [80, 60, 90, 40, 30, 100];
    let basePitch = [36, 48, 60, 72];
    let pitchLetter = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

//   const EXAMPLE = {
//     notes: [seqGen(duration)],
//     totalTime: 8
//   }

    function returnPitch(i, pitch) {
        let alt = pitch[i].substring(pitch[i].length - 1);
        let baseNote = basePitch[alt - 2];
        let add;
        if (pitch[i].length == 3) {
            add = pitchLetter.indexOf(pitch[i].substring(0, 2));
        }
        else {
            add = pitchLetter.indexOf(pitch[i].substring(0));
        }
        let note;
        return note = baseNote + add + 12;
    }

    function seqGen(duration, pitch) {
        let startT = [];
        let endT = [];
        let cnt = 0;
        let newSeq = []
        for (let i = 0; i < duration.length; i++) {
            cnt += duration[i];
            if (i == 0) {
            startT[i] = 0;
            } else {
            startT[i] = endT[i - 1];
            }
            endT[i] = cnt;
        }

        for (let i = 0; i < duration.length; i++) {
            newSeq.push({ pitch: returnPitch(i, pitch), startTime: startT[i], endTime: endT[i] })
        }
        return newSeq
    }
    
    // useEffect(() => {

    //     generateAISeq();
            
    // }, [])

    useEffect(() => {
        if(melodySeq){
            let duration = []
            let pitch = []
            melodySeq.map(note => {
                duration.push(note.duration)
                pitch.push(note.pitch)
            })

            let seq = seqGen(duration, pitch)

            let final = {
                notes: seq,
                totalTime: Math.ceil(seq[seq.length - 1].endTime)
            }
            setMelodyFinal(final)
            rnnPlayer.start(final)
        }
    }, [melodySeq])

  return (
    <div className='flex flex-col justify-center h-screen'>
        <div className='w-full flex justify-evenly'>
            <Tuner drums={false} instrument={"Melody"} setSeq={setMelodySeq}/>
            <Tuner drums={true} instrument={"Snare"} setSeq={setSnareSeq}/>
            <Tuner drums={true} instrument={"Kick"} setSeq={setKickSeq}/>
            <Tuner drums={true} instrument={"Hi Hat"} setSeq={setHihatSeq}/>
        </div>
        <div className='mt-1 w-full flex-wrap flex justify-center' onClick={() => rnnPlayer.start(melodyFinal)}>
            <button className='text-white font-bold px-4 py-2 rounded bg-green-600'>Listen</button>
        </div>
        <div className='mt-1 w-full flex-wrap flex justify-center' onClick={() => melodySeq ? generateAISeq(melodySeq) : generateAISeq()}>
            <button className='text-white font-bold px-4 py-2 rounded bg-blue-600'>Generate</button>
        </div>
        <div className='mt-1 w-full flex-wrap flex justify-center'>
            <Link href={"/home"}>
                <a className='text-white font-bold px-4 py-2 rounded bg-black-600'>Home</a>
            </Link>
        </div>
    </div>
    )
}
