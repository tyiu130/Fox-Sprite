let playerState = 'sit';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const canvas = document.getElementById('mainCanvas');
//getContext - returns a drawing context on the canvas
const context = canvas.getContext('2d');

//capital letters bc it is a global variable
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

//to bring an image to a javascript object
const playerImage = new Image();
playerImage.src = '/assets/shadow_dog.png';
//width of shadow dog sheet = 6875 / 12 columns
//height of sheet = 5230 / 10 rows 
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY = 0;



let gameFrame = 0;
const staggerFrames = 5;

const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j=0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y:positionY});
    }
    spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations);

//animation loop
function animate(){
    //specifies what area on the canvas we want to clear
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length; 
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    // context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    //source x, y, w, h = where you want to cut from original sheet
    //dx, y, w, h = where you want the cut out sheet to be displayed on canvas
    //image you want to draw and coordinates for image placement, pass in globle width and height variables to ensure whole image fits in canvas
    context.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    if (gameFrame % staggerFrames == 0){
        if (frameX < 6) frameX++;
        else frameX = 0;
    }
    


    gameFrame++;
    //runs function we passed to it - by using animate (Line 14) it will continuously run this function
    requestAnimationFrame(animate)
};
animate();