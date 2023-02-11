const canvas = document.getElementById('mainCanvas');
const context = canvas.getContext('2d');

const canvasWidth = canvas.width = 600;
const canvasHeight = canvas.height = 600;

const spriteImage = new Image();
spriteImage.src = '/assets/fox_sprite.png';

function animate() {
    context.clearRect(0, 0, canvasHeight, canvasWidth);
    // context.fillRect(100,50,100,100);
    context.drawImage(spriteImage, 0, 0, canvas.width, canvas.height );
    requestAnimationFrame(animate);
}
animate();