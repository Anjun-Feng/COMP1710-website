let canvas;
let canvasWidth, canvasHeight;
const lanterns = [];

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
}

function windowResized() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(20, 20, 50);

    if (random() < 0.1) {
        lanterns.push(new Lantern());
    }

    for (let i = lanterns.length - 1; i >= 0; i--) {
        const lantern = lanterns[i];
        lantern.update();
        lantern.display();

        if (lantern.isOffscreen()) {
            lanterns.splice(i, 1);
        }
    }
}

class Lantern {
    constructor() {
        this.pos = createVector(random(width), height + random(height * 0.5));
        this.size = random(5, 12);
        this.speed = random(0.5, 2);
        this.color = color(random(220, 255), random(100, 180), random(50, 100));
        this.animationOffset = random(TWO_PI);
    }

    update() {
        this.pos.y -= this.speed;
        this.pos.x += sin(frameCount * 0.01 + this.animationOffset) * 0.5;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(sin(frameCount * 0.01 + this.animationOffset) * 0.2);

        // Draw main light
        fill(this.color);
        ellipse(0, 0, this.size * 0.5, this.size * 0.5);

        // Draw random light halos
        const numHalos = 5;
        for (let i = 0; i < numHalos; i++) {
            fill(this.color, random(50, 100));
            const haloSize = random(this.size * 0.6, this.size * 1.2);
            ellipse(0, 0, haloSize, haloSize);
        }

        pop();
    }

    isOffscreen() {
        return this.pos.y < -this.size;
    }
}