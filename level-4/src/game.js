
const getRandomNumbers = (w, h) => {

    let randomWidth = Math.floor(Math.random() * w)
    let randomHeigth = Math.floor(Math.random() * h)

    var free1=randomHeigth,free2=randomWidth;
    while(maze[free1][free2] != 1){
      free1--;
      if(free1 <= 0){
        free1 = height-2;
        free2--;
      }
    }

    let width = free2
    let heigth = free1

    return [width, heigth]
}

const addBox = (color) => {

    let boxLocation = getRandomNumbers(width, height);

    let box = document.createElement("a-box");
    box.setAttribute('static-body','');
    box.setAttribute('id', color);
    box.setAttribute('height', 1);
    box.setAttribute('width', 1);
    box.setAttribute('depth', 1);
    box.setAttribute('rotation','0 45 0');
    box.setAttribute('src','#asset_crate');
    box.setAttribute('position', (3*(boxLocation[0]-(width-1)*.5))+' 1 '+(3*(boxLocation[1]-(height-1)*.5)))

    return box;
}

{/* <a-cylinder position="1 0.75 -3" radius="0.5" height="0.05" color="#FFC65D" shadow rotation="90 0 0" animation="property: rotation; dur: 5000; dir: alternate; loop: true; easing: linear; to:  0  0 360;"></a-cylinder> */}

const addBoxes = (width, height) => {
    console.log('add boxes')

    var scene = document.getElementById('scene');

    const boxes = ['orange', 'yellow', 'blue', 'green', 'purple']

    for (let i = 0; i < boxes.length; i++) {
        scene.appendChild(addBox(boxes[i]))
        console.log(addBox(boxes[i]))
    }

}


let addDoor = () => {
  // Set final portal position
  var free1=maze_height-1,free2=maze_width-1;
  while(maze[free1][free2] != 1){
    free1--;
    if(free1 <= 0){
      free1 = maze_height-1;
      free2--;
    }
  }

  // door
  var box_price = document.createElement("a-box");
      box_price.setAttribute('static-body','');
      box_price.setAttribute('look-at','#camera');
      box_price.setAttribute('src','#door');
      box_price.setAttribute('id','price');
      box_price.setAttribute('height',3);
      box_price.setAttribute('width',3);
      box_price.setAttribute('depth',1);
      box_price.setAttribute('rotation','0 45 0');
      box_price.setAttribute('position',(3*(free2-(maze_width-1)*.5))+' 1.5 '+(3*(free1-(maze_height-1)*.5)));

      scene.appendChild(box_price);


      console.log('door was added at ' + (3*(free2-(maze_width-1)*.5))+' 1 '+(3*(free1-(maze_height-1)*.5)))

}


setTimeout(() => {  
  document.getElementById('skip').style = "display: flex;";
}, (60000 * 3)) // show after 3 min