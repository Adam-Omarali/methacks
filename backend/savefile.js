import { createFFmpeg } from '@ffmpeg/ffmpeg';

export default async function convertWebmToMp3(webmBlob) {
    const ffmpeg = createFFmpeg({ corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
    log: false });
    await ffmpeg.load();
  
    const inputName = 'input.webm';
    const outputName = 'output.mp3';
  
    ffmpeg.FS('writeFile', inputName, await fetch(webmBlob).then((res) => res.arrayBuffer()));
  
    await ffmpeg.run('-i', inputName, outputName);
  
    const outputData = ffmpeg.FS('readFile', outputName);
    const outputBlob = new Blob([outputData.buffer], { type: 'audio/mp3' });
  
    return outputBlob;
}