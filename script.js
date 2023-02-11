const canvas = document.getElementById('mainCanvas');
const context = canvas.getContext('2d');

const canvasWidth = canvas.width = 200;
const canvasHeight = canvas.height = 200;

const spriteImage = new Image();
spriteImage.src = '/assets/fox_sprite.png';

const spriteWidth = 32;
const spriteHeight = 32;

let gameFrame = 0;
let staggerFrame = 18;

const spriteAnimations = [];

const spriteStates = [
    {
        name:'idle',
        frames: 5,
    },
    {
        name: 'look',
        frames: 12,
    },
    {
        name: 'run',
        frames: 8,
    },
    {
        name: 'jump',
        frames: 11,
    },
    {
        name: 'scared',
        frames: 5,
    },
    {
        name: 'rest',
        frames: 6,
    },
    {
        name: 'fall',
        frames: 7,
    }
];

spriteStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i = 0; i < state.frames; i++){
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y:positionY});
    }
    spriteAnimations[state.name] = frames;
});


function animate() {
    context.clearRect(0, 0, canvasHeight, canvasWidth);
    let position = Math.floor(gameFrame/staggerFrame) % spriteAnimations['idle'].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations['idle'].loc[position].y;
    context.drawImage(spriteImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, canvas.width, canvas.height );


    if (gameFrame % staggerFrame == 0 ){
        if (frameX < 4) frameX++;
        else frameX = 0;
    }
    gameFrame++;


    requestAnimationFrame(animate);
}
animate();