let canvas;
let snow = [];
let gravity;
let zOff = 0;
let spritesheet;
let textures = [];
let canvasWidth, canvasHeight;

function preload() {
    spritesheet = loadImage('../assets/images/flakes16.png');
}

function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    canvas = createCanvas(canvasWidth - 8, canvasHeight);
    canvas.style('position', 'fixed');
    canvas.style('left', '0');
    canvas.style('top', '0');
    canvas.style('z-index', '-1');
    canvas.style('width', '100%');
    canvas.style('height', '100%');
    // canvas.style('overflow', 'hidden');

    gravity = createVector(0, 0.3);

    for (let x = 0; x < spritesheet.width; x += 16) {
        for (let y = 0; y < spritesheet.height; y += 16) {
            let img = spritesheet.get(x, y, 16, 16);
            image(img, x, y);
            textures.push(img);
        }
    }

    for (let i = 0; i < 500; i++) {
        let x = random(width);
        let y = random(height);
        let design = random(textures);
        snow.push(new Snowflake(x, y, design));
    }
}

function windowResized() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(0);
    zOff += 0.1;

    for (flake of snow) {
        let xOff = flake.pos.x / width;
        let yOff = flake.pos.y / height;
        let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
        let wind = p5.Vector.fromAngle(wAngle);
        wind.mult(0.1);

        flake.applyForce(gravity);
        flake.applyForce(wind);


        flake.update();
        flake.render();
    }
}
