AFRAME.registerComponent('camera-text', {
  schema: {
    target: { type: 'selector', default: '' },
  },
  init: function () {
    const el = this.el;
    const data = this.data;
    this.showText = function () {
      data.target.object3D.visible = true;
      el.removeAttribute('camera-text');
    };

    el.addEventListener('click', this.showText);
  },
  remove: function () {
    this.el.removeEventListener('click', this.showText);
  },
});

AFRAME.registerComponent('change-perspective', {
  schema: {
    target: { type: 'selector', default: '' },
    text: { type: 'selector', default: '' },
  },
  init: function () {
    const self = this;
    this.eventHandlerFn = function () {
      if (self.data.target.object3D.position.y < 1) {
        self.data.target.object3D.position.y += 1.2;
        self.el.emit('perspective');
        const spotlight = document.querySelector('#spot-1');
        self.el.sceneEl.removeChild(spotlight);
        const newLight = document.createElement('a-light');
        newLight.setAttribute('id', 'spot-2');
        newLight.setAttribute('type', 'spot');
        newLight.setAttribute('color', 'red');
        newLight.setAttribute('intensity', '20');
        newLight.setAttribute('position', '-3.2 3 -4.5');
        newLight.setAttribute('rotation', '-45 0 0');
        self.el.sceneEl.appendChild(newLight);
        self.data.text.setAttribute(
          'value',
          'Follow the light! \n Second task: Invisible.'
        );
      } else if (self.data.target.object3D.position.y === 1.6) {
        self.data.target.object3D.position.y -= 1.2;
      }
    };
  },
  update: function (oldData) {
    const el = this.el;
    el.removeEventListener('click', this.eventHandlerFn);
    el.addEventListener('click', this.eventHandlerFn);
  },
});

AFRAME.registerComponent('fade-away', {
  schema: {
    fadein: { type: 'selector', default: '' },
    text: { type: 'selector', default: '' },
  },
  update: function () {
    const el = this.el;
    const data = this.data;
    el.sceneEl.addEventListener('perspective', function () {
      el.addEventListener('click', function () {
        el.setAttribute('animation', {
          property: 'material.opacity',
          from: 1,
          to: 0,
          dur: 1500,
        });
        data.fadein.setAttribute('animation', {
          property: 'opacity',
          from: 0,
          to: 1,
          dur: 3000,
        });
        setTimeout(function () {
          const spotlight = document.querySelector('#spot-2');
          el.sceneEl.removeChild(spotlight);
          const newLight = document.createElement('a-light');
          newLight.setAttribute('id', 'spot-3');
          newLight.setAttribute('type', 'spot');
          newLight.setAttribute('color', 'red');
          newLight.setAttribute('intensity', '20');
          newLight.setAttribute('position', '3.5 3.3 -4.5');
          newLight.setAttribute('rotation', '-45 0 0');
          el.sceneEl.appendChild(newLight);
          data.text.setAttribute(
            'value',
            'Follow the light! \n Third task: When pigs fly...'
          );
        }, 5000);

        el.emit('invisible');
      });
    });
  },
});

AFRAME.registerComponent('fly', {
  schema: {
    target: { type: 'selector', default: '' },
    fadein: { type: 'selector', default: '' },
    medium: { type: 'selector', default: '' },
    speech: { type: 'selector', default: '' },
    speechText: { type: 'selector', default: '' },
    text: { type: 'selector', default: '' },
  },

  update: function (oldData) {
    const el = this.el;
    const data = this.data;
    el.sceneEl.addEventListener('invisible', function () {
      el.addEventListener('collide', function (event) {
        let id = event.detail.body.el.getAttribute('id');
        if (id === 'grounded-pig') {
          const flyingPig = document.createElement('a-gltf-model');
          flyingPig.setAttribute('src', '#pig');
          flyingPig.setAttribute('position', { x: 4, y: 3, z: -4.5 });
          flyingPig.setAttribute('body', { type: 'static' });
          flyingPig.setAttribute('scale', { x: 0.5, y: 0.5, z: 0.5 });
          flyingPig.setAttribute('animation', {
            property: 'rotation',
            to: { x: 0, y: 360, z: 0 },
            dur: 2000,
            loop: true,
            easing: 'linear',
          });
          el.sceneEl.removeChild(data.target);
          el.sceneEl.appendChild(flyingPig);

          data.fadein.setAttribute('animation', {
            property: 'opacity',
            from: 0,
            to: 1,
            dur: 2000,
          });

          setTimeout(function () {
            const spotlight = document.querySelector('#spot-3');
            el.sceneEl.removeChild(spotlight);
            const newLight = document.createElement('a-light');
            newLight.setAttribute('id', 'spot-4');
            newLight.setAttribute('type', 'spot');
            newLight.setAttribute('color', 'red');
            newLight.setAttribute('intensity', '20');
            newLight.setAttribute('position', '4.5 3 0');
            newLight.setAttribute('rotation', '-45 -90 0');
            el.sceneEl.appendChild(newLight);
            data.medium.object3D.visible = true;
            data.speech.object3D.visible = true;
            data.speechText.object3D.visible = true;
            data.text.setAttribute(
              'value',
              'Follow the light! \n The Medium will see you now!'
            );
          }, 5000);
          el.emit('flying');
        }
      });
    });
  },
});

AFRAME.registerComponent('tarot', {
  schema: {
    message1: { type: 'selector', default: '' },
    message2: { type: 'selector', default: '' },
    text: { type: 'selector', default: '' },
  },
  update: function () {
    const el = this.el;
    const data = this.data;
    el.sceneEl.addEventListener('flying', function () {
      el.addEventListener('click', function (event) {
        const tarotCard1 = document.createElement('a-plane');
        tarotCard1.setAttribute('id', 'tarotcard-1');
        tarotCard1.setAttribute('src', '#tarot-1');
        tarotCard1.setAttribute('height', '0.5');
        tarotCard1.setAttribute('width', '0.3');
        tarotCard1.setAttribute('position', '4 1 0');
        tarotCard1.setAttribute('rotation', '-90 -90 0');
        tarotCard1.setAttribute('animation', {
          property: 'material.color',
          from: '#FF0000',
          to: '#FFFF00',
          loop: true,
          dir: 'alternate',
          dur: 1500,
        });
        el.sceneEl.appendChild(tarotCard1);

        const tarotCard2 = document.createElement('a-plane');
        tarotCard2.setAttribute('id', 'tarotcard-2');
        tarotCard2.setAttribute('src', '#tarot-2');
        tarotCard2.setAttribute('height', '0.5');
        tarotCard2.setAttribute('width', '0.3');
        tarotCard2.setAttribute('position', '4 1 0.5');
        tarotCard2.setAttribute('rotation', '-90 -90 0');
        el.sceneEl.appendChild(tarotCard2);

        const tarotCard3 = document.createElement('a-plane');
        tarotCard3.setAttribute('id', 'tarotcard-3');
        tarotCard3.setAttribute('src', '#tarot-3');
        tarotCard3.setAttribute('height', '0.5');
        tarotCard3.setAttribute('width', '0.3');
        tarotCard3.setAttribute('position', '4 1 1');
        tarotCard3.setAttribute('rotation', '-90 -90 0');
        el.sceneEl.appendChild(tarotCard3);

        const qrCode = document.createElement('a-image');
        qrCode.setAttribute('id', 'qr-code');
        qrCode.setAttribute('src', '#qr');
        qrCode.setAttribute('scale', '0.4 0.4 0.4');
        qrCode.setAttribute('position', '4.19 2 1.4');
        qrCode.setAttribute('rotation', '0 90 0');
        qrCode.setAttribute('flip-card', {
          card1: '#tarotcard-1',
          card2: '#tarotcard-2',
          card3: '#tarotcard-3',
          marker1: '#marker-1',
          marker2: '#marker-2',
          marker3: '#marker-3',
          camRig: '#camera-rig',
          endMessage: '#end-message',
        });
        el.sceneEl.appendChild(qrCode);

        data.message1.object3D.visible = false;
        data.message2.object3D.visible = true;
        data.text.setAttribute(
          'value',
          'Follow the cards! \n Have a PLEASANT trip.'
        );
      });
    });
  },
});

AFRAME.registerComponent('flip-card', {
  schema: {
    card1: { type: 'selector', default: '' },
    card2: { type: 'selector', default: '' },
    card3: { type: 'selector', default: '' },
    marker1: { type: 'selector', default: '' },
    marker2: { type: 'selector', default: '' },
    marker3: { type: 'selector', default: '' },
    camRig: { type: 'selector', default: '' },
    endMessage: { type: 'selector', default: '' },
  },
  update: function () {
    const el = this.el;
    const data = this.data;

    data.card1.addEventListener('click', function () {
      data.marker1.object3D.visible = true;
      data.card1.object3D.visible = false;
      data.card2.setAttribute('animation', {
        property: 'material.color',
        from: '#FF0000',
        to: '#FFFF00',
        loop: true,
        dir: 'alternate',
        dur: 1500,
      });
      data.card2.addEventListener('click', function () {
        data.marker2.object3D.visible = true;
        data.card2.object3D.visible = false;
        data.card3.setAttribute('animation', {
          property: 'material.color',
          from: '#FF0000',
          to: '#FFFF00',
          loop: true,
          dir: 'alternate',
          dur: 1500,
        });
        data.card3.addEventListener('click', function () {
          data.marker3.object3D.visible = true;
          data.card3.object3D.visible = false;
          data.camRig.setAttribute('movement-controls', {
            constrainToNavMesh: false,
          });
          data.endMessage.addEventListener('click', function () {
            window.parent.postMessage('nextLevel');
          });
        });
      });
    });
  },
});
