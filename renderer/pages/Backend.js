

const button = document.querySelector('button');
    const recorder = new MicRecorder({
      bitRate: 128
    });

    button.addEventListener('click', startRecording);

    function startRecording() {
      recorder.start().then(() => {
        button.textContent = 'Stop recording';
        button.classList.toggle('btn-danger');
        button.removeEventListener('click', startRecording);
        button.addEventListener('click', stopRecording);
      }).catch((e) => {
        console.error(e);
      });
    }

    function stopRecording() {
      recorder.stop().getMp3().then(([buffer, blob]) => {
        console.log(buffer, blob);
        const file = new File(buffer, 'music.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });

        const li = document.createElement('li');
        const player = new Audio(URL.createObjectURL(file));
        player.controls = true;
        li.appendChild(player);
        document.querySelector('#playlist').appendChild(li);

        button.textContent = 'Start recording';
        button.classList.toggle('btn-danger');
        button.removeEventListener('click', stopRecording);
        button.addEventListener('click', startRecording);
      }).catch((e) => {
        console.error(e);
      });
    }