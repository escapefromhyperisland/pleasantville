const URL = "./";

let model, webcam, labelContainer, maxPredictions;

const hideInstructions = () => {
    document.querySelector('#start').style = 'display: none;'
}

document.querySelector('#start-button').addEventListener('click', hideInstructions)

const openGates = () => {

    let gate1 = document.getElementById('gate1');
    let gate2 = document.getElementById('gate2');

    gate1.setAttribute('rotation', '0 90 0')
    gate1.setAttribute('position', '5.2 -1.6 -7')
    gate2.setAttribute('rotation', '0 -100 0')
    gate2.setAttribute('position', '4.9 -1.6 -9.7')
}

// Load the image model and setup the webcam
async function init() {

    // document.querySelector('#start').style = 'display: none;'

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {

    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability.toFixed(2) > 0.8 && prediction[i].className == 'Coffee') {
            coffee = true;
            
            document.getElementById('boxes').setAttribute('visible', 'true');

            setTimeout(() => {  
                speak('Thats better, Now if you take these crates with you I will then open the gates.')
                document.getElementById('camera-container').style = 'display: none;'
            }, 500)
            
            setTimeout(() => {  
                document.getElementById('speech-bubble').setAttribute('visible', 'false');
            }, 10000)
            
            webcam.stop();
}
    }
}

setTimeout(() => {  
    document.getElementById('skip').style = "display: flex;";
}, (60000 * 3)) // show after 3 min