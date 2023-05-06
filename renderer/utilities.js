const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20]
}

const meshColours = ["purple", "red", "orange", "plum", "yellow"]

export const drawHand = (predictions, ctx) => {
    if(predictions.length > 0){
        predictions.forEach((prediction) => {
            const landmarks = prediction.landmarks;
            var colourCounter = 0;

            for (const [finger, keys] of Object.entries(fingerJoints)) {
                for(var i = 0; i < keys.length - 1; i++){
                    const firstPointIndex = fingerJoints[finger][i];
                    const secondPointIndex = fingerJoints[finger][i + 1];

                    ctx.beginPath();
                    ctx.moveTo(landmarks[firstPointIndex][0],landmarks[firstPointIndex][1]);
                    ctx.lineTo(landmarks[secondPointIndex][0],landmarks[secondPointIndex][1]);
                    ctx.strokeStyle = meshColours[colourCounter];
                    ctx.lineWidth = 4;
                    ctx.stroke();

                }
                colourCounter++;
            }

            landmarks.forEach((landmark) => {
                const x = landmark[0];
                const y = landmark[1];
                ctx.beginPath();
                ctx.arc(x, y, 7, 0, 3*Math.PI);

                ctx.fillStyle = "indigo";
                ctx.fill();
            });
        });
    }
}