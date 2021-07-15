navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia || navigator.msGetUserMedia;

// Select the elements 
const video = document.getElementById('video')
const audio = document.getElementById('audio')
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
let model;

// MODEL params : 
const defaultParams = {
    flipHorizontal: false,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "large",
    bboxLineWidth: "2",
    fontSize: 17,
};

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia(
                { video: {} }
                , 
                // Stream : is the information that we get from the computer webcam 
                stream => {
                    video.srcObject = stream;
                    video.style.height = "720px";
                    video.style.width = "720px";
                    setInterval(startDetection,3000);
                },
                err => console.log(err)
            )
        }
}); 


handTrack.load(defaultParams).then(lmodel => {
    model = lmodel; 
})


// Prediction 
async function startDetection() {
    const predictions = await model.detect(video); 

    if(predictions.length > 0) {
        audio.play();
        console.log(predictions)
    }

    // model.renderPredictions(predictions, canvas, context, video);
}
