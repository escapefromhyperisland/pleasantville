let endScene = document.getElementById('end-scene');

let text, attr_text;
let crates = JSON.parse(sessionStorage.getItem('found'));
let amount = crates.length;
let positions = [
    '0 0.25 -3',
    '0 0.75 -3',
    '0 1.25 -3',
    '0 1.75 -3',
    '0 2.25 -3'
]
const addFoundBoxes = () => {

    for (let i=0; i<crates.length; i++) {

        let crate = document.createElement('a-box')
        crate.setAttribute('foo', '')
        crate.setAttribute('id', crates[i])
        crate.setAttribute('class', 'tape')
        crate.setAttribute('material', 'src:#asset_crate; repeat: 1 1')
        crate.setAttribute('height', 0.5)
        crate.setAttribute('width', 0.5)
        crate.setAttribute('depth', 0.5)
        crate.setAttribute('position', positions[i])
        crate.setAttribute('dynamic-body', '')
        crate.setAttribute('hoverable', '')
        crate.setAttribute('grabbable', '')
        crate.setAttribute('stretchable', '')
        crate.setAttribute('draggable', '')
        crate.setAttribute('event-set__hoveron', '_event: hover-start; material.opacity: 0.7; transparent: true')
        crate.setAttribute('event-set__hoveroff', '_event: hover-end; material.opacity: 1; transparent: false')

        endScene.appendChild(crate)
    }
}

createKey = () => {

    let key = document.createElement('a-gltf-model')

    key.setAttribute('foo', '')
    key.setAttribute('id', 'key')
    key.setAttribute('src', '#asset_key')
    key.setAttribute('class', 'tape')
    key.setAttribute('position', '-5 10 -11.7')
    key.setAttribute('rotation', ' 180 0 0')
    key.setAttribute('scale', '0.3 0.3 0.3')
    key.setAttribute('dynamic-body', '')
    key.setAttribute('hoverable', '')
    key.setAttribute('grabbable', '')
    key.setAttribute('stretchable', '')
    key.setAttribute('draggable', '')
    key.setAttribute('event-set__hoveron', '_event: hover-start; material.opacity: 0.7; transparent: true')
    key.setAttribute('event-set__hoveroff', '_event: hover-end; material.opacity: 1; transparent: false')

    endScene.appendChild(key)
}
const addKey = () => {

    createKey();

    let keyHole = document.getElementById('key-hole')
    keyHole.setAttribute('visible', 'true')
    keyHole.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 2000; loop: true; easing: linear')
}

const boxDelivered = (nr) => {

    currentCrate = document.getElementById(nr);
    
    for( var i = 0; i < crates.length; i++){ 
        
        if ( crates[i] === nr) { 
            crates.splice(i, 1); 
            i--; 
        }
    }

    endScene.removeChild(currentCrate)
    
    if (crates.length === 0) {

        document.getElementById('speech').setAttribute('scale', '0.7 0.2 0.1');

        if(amount < 5) {
            speak('Why didnt you bring me all my crates? Oh well, I guess you can still continue to the Medium')
        } else {
            speak('Wow! You found all my crates in there. Now you can continue to the Medium')
        }
        addKey()
        
    } else {    
        speak('Where are the rest of my crates?')

        setTimeout(() => {  
            speak(`Bring me ${crates.length} more crates`)
          }, 4000)
    }
}

let speak = (words) => {

text = document.getElementById('speech-text');
attr_text = text.getAttribute('text');

attr_text.value = words;
text.setAttribute('text', attr_text);
document.getElementById('speech-bubble').setAttribute('visible', 'true');
}

addFoundBoxes();

