
const hideInstructions = () => {
    document.querySelector('#start').style = 'display: none;'
}

document.querySelector('#start-button').addEventListener('click', hideInstructions)

const openGates = () => {
    gate1.setAttribute('rotation', '0 90 0')
    gate1.setAttribute('position', '5.2 -1.6 -7')
    gate2.setAttribute('rotation', '0 -100 0')
    gate2.setAttribute('position', '4.9 -1.6 -9.7')
}

    const URL = "./";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam

    // document.querySelector('#start-camera').addEventListener('click', init)

    async function init() {

        document.querySelector('#start').style = 'display: none;'

        console.log('start')
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

        let gate1 = document.getElementById('gate1');
        let gate2 = document.getElementById('gate2')

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
                }, 7000)
                
                webcam.stop();
            // const classPrediction =
            //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            // labelContainer.childNodes[i].innerHTML = classPrediction;

            // document.getElementById('boxes').setAttribute('position', '-5 0 -1.5');

            // character = document.createElement("a-box");
            // character.setAttribute('static-body','');
      
            // character.setAttribute('height',2);
            // character.setAttribute('width',1);
      
            // // character.setAttribute('look-at', '#camera');
            // character.setAttribute('rotation','0 45 10');
            // character.setAttribute('id', 'character');
            // character.setAttribute('on-gaze','');
            // character.setAttribute('position','-25.5 1.2 -20');
            // character.setAttribute('color', 'red')
            // // character.setAttribute('src', '#asset_character');
            // // character.setAttribute('animation-mixer', 'clip: *;')
            // character.setAttribute('shadow', "type: basic")
            // // entity.appendChild(character); 
            // document.getElementById('scene').appendChild(character); 
      
}
        }
    }

